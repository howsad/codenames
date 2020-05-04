import React from 'react';
import styled from 'styled-components';

import ClueForm from './ClueForm/clueForm.js';
import GameMap from './Map/map.js';
import Tokens from './Tokens/tokens.js';
import TeamControls from './TeamControls/teamControls.js';
import GameLog from './GameLog/gameLog.js';

const SSideBar = styled.div`
	flex: 1;
	padding: 10px 20px;
`;

const Sidebar = (props) => {
	const clueActive = props.capabilities.includes('clue');
	const endTurnActive = props.capabilities.includes('endTurn');
	return (
		<SSideBar>
			<TeamControls team={props.team} capabilities={props.capabilities}/>
			<GameMap map={props.map} rows={props.rows} columns={props.columns} />
			<Tokens {...props.tokens} sendMove={props.sendMove} active={endTurnActive}/>
			<GameLog clues={props.clues}/>
			<ClueForm sendMove={props.sendMove} active={clueActive}/>
		</SSideBar>
	);
};

export default Sidebar;
