/* tslint:disable */
/* eslint-disable */
/**
 * RIS::Journeys
 * ## Info  * powered by [DB Reisendeninformation](https://db-planet.deutschebahn.com/pages/reisendeninformation/apps/content/willkommen) * member of the [RIS-API](https://db.de/ris-api) family, the building kit for traveller informations * for details check out [RIS::Journeys](https://api-portal.hub.db.de/db/apis/product/ris-journeys) in the DB API Portal  ## Capabilities  ### Journey-Information  Provides detailed information for a particular journey [Fahrt] or a batch of up to 500 journeys, including:  * information on transport like journey-number [Fahrtnummer], category [externe Fahrtgattung], line [Linie], administration [Verwaltung], transport-type [Produktklasse] and direction texts [Richtungstexte] * departures [Abfahrten] and arrivals [Ankünfte] with information on cancellation [Haltausfall], additional [Zusatzhalt] and cancelled additional [zurückgenommener Zusatzhalt] * detailed information on schedule [Soll], forecast [Vorschau] and real times and scheduled and real platforms [Plattform / Gleis / Bussteig etc.] on a journey-event [Fahrtereignis] level * references to other transports representing replacement [Ersatz], relief [Entlastung], travels with [Vereinigung] including separation at [Trennung in] and continuation [Durchbindung] * cancelled stops [Haltausfall], additional stops [Zusatzhalt], cancelled additional stops [zurückgenommene Zusatzhalte] additional textual information [Freitexte] and possible restrictions on changing passengers [Fahrgastwechsel] and on demand stops [Bedarfshalt] * messages like disruptions [Störungen / Störungskommunikationen], attributes [Fahrtattribute / Sollmerkmale], ris cause codes [RIS Kundengrüner], ris quality deviations [RIS Qualitätsabweichungen] and general notes [Hinweistexte] * and much more  ### Journey-Searches  Powerful search functionallity for finding journeys by their journey-relation [fachliche Fahrt-Relation] or by attributes of a particular journey-event [Fahrtereignis], like  * date [Kalendertag der Fahrt] * journey number [Fahrtnummer] * administration [Verwaltung] * category [externe Gattung] * line [Linienname] * transport-types [Produktklassen]  ### Asynchronous change-notifications  The RIS-API event-system [RIS::Events](https://db-planet.deutschebahn.com/pages/reisendeninformation-ris-api/apps/content/events) can be used to get push-notifications in case information within RIS::Journeys changes. This enables use-cases like:  * refreshing ui in case information changes * doing something in your backend in case information changes * caching information and invalidate cache in case information changes  ## Getting Started  * visit our [documentation](https://ris-api.gitpages.tech.rz.db.de), learn how to [get started with openapi](https://developer-docs.deutschebahn.com/doku/apis/openapi.html) or how to [get started with asyncapi](https://developer-docs.deutschebahn.com/doku/apis/asyncapi.html) and check out our [coding-examples](https://developer-docs.deutschebahn.com/doku/apis) * bounty hunter, bug finder or just idea creator, we are thirsty to hear from you - get in touch with us by using [DB AnwenderEcho](https://anwenderecho.extranet.deutschebahn.com/ris-api/) or write an [email](mailto:ris-api@deutschebahn.com)
 *
 * The version of the OpenAPI document: 2.0.24
 * Contact: ris-fachbetrieb@deutschebahn.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import type { AxiosInstance, AxiosResponse } from 'axios';
import type { RequestArgs } from './base';
import { RequiredError } from './base';
import type { Configuration } from './configuration';

/**
 *
 * @export
 */
export const DUMMY_BASE_URL = 'https://example.com';

/**
 *
 * @throws {RequiredError}
 * @export
 */
export const assertParamExists = (
	functionName: string,
	paramName: string,
	paramValue: unknown,
) => {
	if (paramValue === null || paramValue === undefined) {
		throw new RequiredError(
			paramName,
			`Required parameter ${paramName} was null or undefined when calling ${functionName}.`,
		);
	}
};

/**
 *
 * @export
 */
export const setApiKeyToObject = async (
	object: any,
	keyParamName: string,
	configuration?: Configuration,
) => {
	if (configuration && configuration.apiKey) {
		const localVarApiKeyValue =
			typeof configuration.apiKey === 'function'
				? await configuration.apiKey(keyParamName)
				: await configuration.apiKey;
		object[keyParamName] = localVarApiKeyValue;
	}
};

/**
 *
 * @export
 */
export const setBasicAuthToObject = (
	object: any,
	configuration?: Configuration,
) => {
	if (configuration && (configuration.username || configuration.password)) {
		object['auth'] = {
			username: configuration.username,
			password: configuration.password,
		};
	}
};

/**
 *
 * @export
 */
export const setBearerAuthToObject = async (
	object: any,
	configuration?: Configuration,
) => {
	if (configuration && configuration.accessToken) {
		const accessToken =
			typeof configuration.accessToken === 'function'
				? await configuration.accessToken()
				: await configuration.accessToken;
		object['Authorization'] = 'Bearer ' + accessToken;
	}
};

/**
 *
 * @export
 */
export const setOAuthToObject = async (
	object: any,
	name: string,
	scopes: string[],
	configuration?: Configuration,
) => {
	if (configuration && configuration.accessToken) {
		const localVarAccessTokenValue =
			typeof configuration.accessToken === 'function'
				? await configuration.accessToken(name, scopes)
				: await configuration.accessToken;
		object['Authorization'] = 'Bearer ' + localVarAccessTokenValue;
	}
};

function setFlattenedQueryParams(
	urlSearchParams: URLSearchParams,
	parameter: any,
	key = '',
): void {
	if (parameter == null) return;
	if (typeof parameter === 'object') {
		if (Array.isArray(parameter)) {
			(parameter as any[]).forEach((item) =>
				setFlattenedQueryParams(urlSearchParams, item, key),
			);
		} else {
			Object.keys(parameter).forEach((currentKey) =>
				setFlattenedQueryParams(
					urlSearchParams,
					parameter[currentKey],
					`${key}${key !== '' ? '.' : ''}${currentKey}`,
				),
			);
		}
	} else {
		if (urlSearchParams.has(key)) {
			urlSearchParams.append(key, parameter);
		} else {
			urlSearchParams.set(key, parameter);
		}
	}
}

/**
 *
 * @export
 */
export const setSearchParams = (url: URL, ...objects: any[]) => {
	const searchParams = new URLSearchParams(url.search);
	setFlattenedQueryParams(searchParams, objects);
	url.search = searchParams.toString();
};

/**
 *
 * @export
 */
export const serializeDataIfNeeded = (
	value: any,
	requestOptions: any,
	configuration?: Configuration,
) => {
	const nonString = typeof value !== 'string';
	const needsSerialization =
		nonString && configuration && configuration.isJsonMime
			? configuration.isJsonMime(requestOptions.headers['Content-Type'])
			: nonString;
	return needsSerialization
		? JSON.stringify(value !== undefined ? value : {})
		: value || '';
};

/**
 *
 * @export
 */
export const toPathString = (url: URL) => url.pathname + url.search + url.hash;

/**
 *
 * @export
 */
export const createRequestFunction =
	(
		axiosArgs: RequestArgs,
		globalAxios: AxiosInstance,
		BASE_PATH: string,
		configuration?: Configuration,
	) =>
	<T = unknown, R = AxiosResponse<T>>(
		axios: AxiosInstance = globalAxios,
		basePath: string = BASE_PATH,
	) => {
		const axiosRequestArgs = {
			...axiosArgs.options,
			url:
				(configuration?.basePath || axios.defaults.baseURL || basePath) +
				axiosArgs.url,
		};
		return axios.request<T, R>(axiosRequestArgs);
	};
