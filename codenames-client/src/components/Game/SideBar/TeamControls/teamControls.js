import React from 'react';
import styled from 'styled-components';

const TEAM_BLUE = 'blue';
const TEAM_RED = 'red';

function getTeamColor(team) {
	switch(team) {
		case TEAM_RED:
			return '#C92020';
		case TEAM_BLUE:
			return '#083D77';
		default:
			return 'transparent';
	}
}
const SMessage = styled.div`
	margin-bottom: 15px;
	text-align: left;
`;
const STeam = styled.span`
	font-size: x-large;
	color: ${props => getTeamColor(props.team)};
	text-transform: uppercase;
	margin-right: 15px;
`;
const SText = styled.span`
	font-size: x-large;
`;

const teamName = (team) => {
	switch(team) {
		case TEAM_RED:
			return 'Красные';
		case TEAM_BLUE:
			return 'Синие';
		default:
			return 'Наблюдатель';
	}
};

const text = (capabilities) => {
	if (capabilities.includes('clue')) {
		return 'Делайте подсказку';
	}
	if (capabilities.includes('pick')) {
		return 'Выбирайте';
	}
	return 'Ждём выбора';
};

const Team = (props) => {
	return (
		<SMessage>
			<STeam team={props.team}>{teamName(props.team)}</STeam>
			<SText>{text(props.capabilities)}</SText>
		</SMessage>
	);
};

export default Team;
