import { trpc } from '@/router';
import type { TrainInfo } from '@/types/iris';

export type FallbackTrainsForCoachSequence = Pick<
	TrainInfo,
	'admin' | 'number' | 'type'
>;

export const useCoachSequence = (
	trainNumber: number,
	currentEvaNumber: string,
	scheduledDeparture: Date,
	trainCategory: string,
	initialDeparture?: Date,
	administration?: string,
	fallback: FallbackTrainsForCoachSequence[] = [],
) => {
	const baseOptions = {
		evaNumber: currentEvaNumber,
		departure: scheduledDeparture,
		initialDeparture,
	};
	const mainSequence = trpc.coachSequence.sequence.useQuery({
		...baseOptions,
		trainNumber,
		category: trainCategory,
		administration,
	});

	const fallbackSequences = fallback.map((f) =>
		trpc.coachSequence.sequence.useQuery({
			trainNumber: Number.parseInt(f.number),
			category: f.type,
			administration: f.admin,
			...baseOptions,
		}),
	);

	if (fallback.length) {
		if (mainSequence.isFetched) {
			if (mainSequence.data) {
				return mainSequence.data;
			}
			return fallbackSequences.find((f) => f.data)?.data;
		}
	}

	return mainSequence.data;
};
