import { Connection } from '@/client/Common/Components/Connections/Connection';
import { FullTrainName } from '@/client/Common/Components/FullTrainName';
import { Loading, LoadingType } from '@/client/Common/Components/Loading';
import { trpc } from '@/router';
import type { JourneyResponse } from '@/types/journey';
import type { RouteStop } from '@/types/routing';
import Close from '@mui/icons-material/Close';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	Stack,
	styled,
	useMediaQuery,
} from '@mui/material';
import { formatDate } from 'date-fns';
import type { FC, MouseEvent } from 'react';

const PositionedCloseButton = styled(IconButton)`
	position: absolute;
	top: 0;
	right: 0;
`;

interface Props {
	journey: JourneyResponse;
	stop: Omit<RouteStop, 'arrival'> & Required<Pick<RouteStop, 'arrival'>>;
	open: boolean;
	toggle: (e: MouseEvent) => void;
}

export const ConnectionDisplay: FC<Props> = ({
	journey,
	stop,
	open,
	toggle,
}) => {
	const fullScreen = useMediaQuery((t) => t.breakpoints.down('md'));
	const connectionQuery = trpc.connections.connections.useQuery(
		{
			journeyId: journey.journeyId!,
			arrivalId: stop.arrival.id!,
			evaNumber: stop.station.evaNumber,
		},
		{
			enabled: Boolean(open && journey.journeyId && stop.arrival.id),
		},
	);

	return (
		<Dialog fullScreen={fullScreen} open={open} maxWidth="md" onClose={toggle}>
			<PositionedCloseButton onClick={toggle}>
				<Close />
			</PositionedCloseButton>
			<DialogTitle sx={{ fontSize: '.9em', marginRight: '1em' }}>
				Anschlüsse für <FullTrainName train={journey.train} /> in{' '}
				{stop.station.name} Ankunft {formatDate(stop.arrival.time, 'HH:mm')} an
				Gleis {stop.arrival.platform}
			</DialogTitle>
			<DialogContent>
				<Loading type={LoadingType.dots} check={connectionQuery.data}>
					{(connections) => (
						<Stack>
							{connections.connections?.map((c) => (
								<Connection key={c.journeyID} connection={c} />
							))}
						</Stack>
					)}
				</Loading>
			</DialogContent>
		</Dialog>
	);
};
