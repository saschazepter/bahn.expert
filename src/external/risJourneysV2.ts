import type { JourneyMatch } from '@/external/generated/risJourneys';
import {
	JourneysApi,
	Configuration as RisJourneysConfiguration,
} from '@/external/generated/risJourneysV2';
import type {
	JourneyEventBased,
	JourneyFindResult,
	JourneyInfo,
	StopPlaceEmbedded,
	Transport,
} from '@/external/generated/risJourneysV2';
import { getStopPlaceByEva } from '@/server/StopPlace/search';
import { axiosUpstreamInterceptor } from '@/server/admin';
import { CacheDatabase, getCache } from '@/server/cache';
import type { CommonProductInfo, JourneyFindResponse } from '@/types/journey';
import type { RouteStop } from '@/types/routing';
import axios from 'axios';
import { format, isBefore, isSameDay, subDays } from 'date-fns';

const risJourneysV2Configuration = new RisJourneysConfiguration({
	basePath: process.env.RIS_JOURNEYS_V2_URL,
	baseOptions: {
		headers: {
			'DB-Api-Key': process.env.RIS_JOURNEYS_V2_CLIENT_SECRET,
			'DB-Client-Id': process.env.RIS_JOURNEYS_V2_CLIENT_ID,
		},
	},
});

const axiosWithTimeout = axios.create({
	timeout: 6500,
});
axiosUpstreamInterceptor(axiosWithTimeout, 'ris-journeys-v2');
const client = new JourneysApi(
	risJourneysV2Configuration,
	undefined,
	axiosWithTimeout,
);

const journeyFindCache = getCache(CacheDatabase.JourneyFindV2);

const journeyCache = getCache(CacheDatabase.JourneyV2);

export const health = {
	has401: false,
};

const longDistanceTypes: string[] = ['HIGH_SPEED_TRAIN', 'INTERCITY_TRAIN'];
const trainTypes: string[] = [
	...longDistanceTypes,
	'INTER_REGIONAL_TRAIN',
	'REGIONAL_TRAIN',
	'CITY_TRAIN',
];

const mapTransportToTrain = (transport: Transport): CommonProductInfo => ({
	name: `${transport.category} ${
		longDistanceTypes.includes(transport.type)
			? transport.journeyNumber
			: transport.line || transport.journeyNumber
	}`,
	line: transport.line,
	type: transport.category,
	number: `${transport.journeyNumber}`,
	transportType: transport.type,
});

const mapStationShortToRouteStops = (
	station: StopPlaceEmbedded,
): RouteStop => ({
	station,
});

function getPriorityByTransportType(transportType: string) {
	switch (transportType) {
		case 'HIGH_SPEED_TRAIN':
			return 10;
		case 'INTERCITY_TRAIN':
			return 9;
		case 'INTER_REGIONAL_TRAIN':
			return 8;
		case 'REGIONAL_TRAIN':
			return 7;
		case 'CITY_TRAIN':
			return 6;
		case 'SUBWAY':
			return 5;
		case 'TRAM':
			return 4;
		case 'BUS':
			return 3;
		case 'FERRY':
			return 2;
		case 'SHUTTLE':
			return 1;
		case 'FLIGHT':
			return 0;
	}
	return 0;
}

export function sortJourneys(
	a: JourneyFindResult,
	b: JourneyFindResult,
): number;
export function sortJourneys(a: JourneyMatch, b: JourneyMatch): number;
export function sortJourneys(
	a: JourneyFindResult | JourneyMatch,
	b: JourneyFindResult | JourneyMatch,
) {
	if ('info' in a && 'info' in b) {
		return (
			getPriorityByTransportType(b.info.transportAtStart.type) -
			getPriorityByTransportType(a.info.transportAtStart.type)
		);
	}
	if ('transport' in a && 'transport' in b) {
		return (
			getPriorityByTransportType(b.transport.type) -
			getPriorityByTransportType(a.transport.type)
		);
	}
	return 0;
}

function mapToJourneyFindResponse(
	journeyFindResult: JourneyFindResult,
): JourneyFindResponse {
	return {
		// Technically wrong!
		journeyId: journeyFindResult.journeyID,
		train: mapTransportToTrain(journeyFindResult.info.transportAtStart),
		stops: [],
		firstStop: mapStationShortToRouteStops(journeyFindResult.info.origin),
		lastStop: mapStationShortToRouteStops(journeyFindResult.info.destination),
	};
}

async function fixSingleStopIfNeeded(stop: StopPlaceEmbedded) {
	if (!stop.name && stop.evaNumber) {
		try {
			const stopPlace = await getStopPlaceByEva(stop.evaNumber);
			if (stopPlace) {
				stop.name = stopPlace.name;
			}
		} catch {
			// do nothing
		}
	}
}

async function fixSingleJourneyInfo(info: JourneyInfo) {
	await Promise.all([
		fixSingleStopIfNeeded(info.origin),
		fixSingleStopIfNeeded(info.destination),
	]);
}

async function fixJourneysFoundIfNeeded(
	journeys: JourneyFindResult[],
): Promise<void> {
	await Promise.all(
		journeys.flatMap(async (j) => fixSingleJourneyInfo(j.info)),
	);
}

function findAdministrationFilter(
	matches: JourneyFindResult[],
	administration?: string,
) {
	if (administration) {
		const filtered = matches.filter(
			(m) =>
				m.journeyRelation.headerAdministrationID === administration ||
				m.journeyRelation.startAdministrationID === administration,
		);
		if (filtered.length) {
			return filtered;
		}
	}
	return matches;
}

function findCategoryFilter(matches: JourneyFindResult[], category?: string) {
	if (category) {
		const filtered = matches.filter(
			(m) =>
				m.journeyRelation.startCategory.toLowerCase() ===
				category.toLowerCase(),
		);
		if (filtered.length) {
			return filtered;
		}
	}
	return matches;
}

async function innerFindJourney(
	trainNumber: number,
	date: Date,
	withOEV?: boolean,
): Promise<JourneyFindResult[]> {
	try {
		if (date) {
			const sevenDaysAgo = subDays(new Date(), 7);
			const olderThan7Days = isBefore(date, sevenDaysAgo);
			if (olderThan7Days) {
				return [];
			}
		}

		const cacheKey = `${trainNumber}|${format(date, 'yyyy-MM-dd')}|${withOEV ?? false}`;

		const cacheHit = await journeyFindCache.get(cacheKey);
		if (cacheHit) {
			return cacheHit;
		}

		const result = await client.find({
			journeyNumber: trainNumber,
			// category,
			date: format(date, 'yyyy-MM-dd'),
			transportTypes: withOEV ? undefined : trainTypes,
			limit: 500,
		});

		result.data.journeys = result.data.journeys.filter((j) =>
			isSameDay(new Date(j.journeyRelation.startTime), date),
		);

		await fixJourneysFoundIfNeeded(result.data.journeys);

		result.data.journeys.sort(sortJourneys);

		void journeyFindCache.set(cacheKey, result.data.journeys);

		return result.data.journeys;
	} catch (e) {
		if (axios.isAxiosError(e) && e.response?.status === 401) {
			health.has401 = true;
		}
		return [];
	}
}

export async function findJourney(
	trainNumber: number,
	date: Date,
	category?: string,
	withOEV?: boolean,
	administration?: string,
): Promise<JourneyFindResponse[]> {
	const baseResult = await innerFindJourney(trainNumber, date, withOEV);
	const administrationFiltered = findAdministrationFilter(
		baseResult,
		administration,
	);
	const categoryFiltered = findCategoryFilter(administrationFiltered, category);

	return Promise.all(categoryFiltered.map(mapToJourneyFindResponse));
}

export async function getJourneyDetails(
	journeyId: string,
): Promise<JourneyEventBased | undefined> {
	try {
		if (await journeyCache.exists(journeyId)) {
			return await journeyCache.get(journeyId);
		}
		const r = await client.journeyEventBasedById({
			journeyID: journeyId,
			includeReferences: true,
		});

		if (r.data.events) {
			await Promise.all(
				r.data.events.map((e) => fixSingleStopIfNeeded(e.stopPlace)),
			);

			await fixSingleJourneyInfo(r.data.info);
		}

		if (r.data) {
			void journeyCache.set(journeyId, r.data);
		}

		return r.data;
	} catch (e) {
		if (axios.isAxiosError(e) && e.response?.status === 401) {
			health.has401 = true;
		}
		if (axios.isAxiosError(e) && e.response?.status === 404) {
			void journeyCache.set(journeyId, undefined);
		}
		return undefined;
	}
}
