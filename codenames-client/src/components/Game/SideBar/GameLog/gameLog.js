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

const SGameLog = styled.div`
	border: 3px solid #AF3800;
	border-radius: 5px;
	width: 100%;
	box-sizing: border-box;
	resize: none;
	height: 269px;
	font-size: x-large;
	color: #4c1700;
	background: white;
	padding-left: 5px;
	overflow-y: auto;
`;
const SLogEntry = styled.div`
	text-align: left;
`;
const SLogText = styled.span`
	text-transform: uppercase;
	color: ${props => getTeamColor(props.team)};
`;

const LogEntry = (props) => {
	return (
		<SLogEntry>
			<SLogText team={props.clue.team}>{props.clue.clue}</SLogText>
		</SLogEntry>
	);
};

const GameLog = (props) => {
	const cluesText = props.clues.map((c, i) => <LogEntry key={i} clue={c}/>);
	return (
		<SGameLog>
			{cluesText}
		</SGameLog>
	);
};

export default GameLog;
