import { useAbfahrt } from '@/client/Abfahrten/provider/AbfahrtProvider';
import { DetailsLink } from '@/client/Common/Components/Details/DetailsLink';
import { useCommonConfig } from '@/client/Common/provider/CommonConfigProvider';
import { Stack, css, styled } from '@mui/material';
import type { FC } from 'react';

const Extra = styled('span')(({ theme }) => ({
	fontSize: '.8em',
	color: theme.vars.palette.text.secondary,
}));

const widthCss = css`
  width: fit-content;
`;

interface Props {
	withLink?: boolean;
}
export const Name: FC<Props> = ({ withLink }) => {
	const { lineAndNumber } = useCommonConfig();
	const { abfahrt, journeyId } = useAbfahrt();
	const longDistance = abfahrt.train.name.endsWith(abfahrt.train.number);

	let trainName = <span>{abfahrt.train.name}</span>;
	if (withLink) {
		trainName = (
			<DetailsLink
				css={widthCss}
				train={abfahrt.previousTrain || abfahrt.train}
				evaNumberAlongRoute={abfahrt.currentStopPlace.evaNumber}
				initialDeparture={abfahrt.initialDeparture}
				journeyId={journeyId}
			>
				{trainName}
			</DetailsLink>
		);
	}

	return (
		<>
			<Stack>
				{abfahrt.previousTrain && <span>{abfahrt.previousTrain.name}</span>}
				{trainName}
			</Stack>
			{lineAndNumber && abfahrt.train.line && (
				<Extra>
					{longDistance
						? `Linie ${abfahrt.train.line}`
						: abfahrt.train.number !== '0' &&
							`${abfahrt.train.type} ${abfahrt.train.number}`}
				</Extra>
			)}
		</>
	);
};
