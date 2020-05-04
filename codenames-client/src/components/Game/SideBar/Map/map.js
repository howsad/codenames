import React from 'react';
import styled from 'styled-components';

const STATE_SUCCESS = 1;
const STATE_KILLER = 2;

//utility functions
function sliceArrayIntoGroups(arr, size) {
	if (arr.length === 0) { return arr; }
	return [ arr.slice(0, size), ...sliceArrayIntoGroups(arr.slice(size), size) ];
}

function getCardColor(state) {
	switch(state) {
		case STATE_SUCCESS:
			return '#40ad40';
		case STATE_KILLER:
			return 'black';
		default:
			return 'transparent';
	}
}

const GameMap = styled.div`
	margin-bottom: 20px;
`;
const GameMapRow = styled.div`
	display: flex;
`;
const GameMapCell = styled.div`
	flex: 1;
	height: 2.4rem;
	border: 1px solid black;
`;
const ColoredCell = styled(GameMapCell)`
	background: ${props => getCardColor(props.state)};
`;

const row = (row, i) => {
	return (
		<GameMapRow key={i}>
			{row.map((c, i) => <ColoredCell state={c} key={i}/>)}
		</GameMapRow>
	);
}

const map = (props) => {
	const mapRows = sliceArrayIntoGroups(props.map, props.rows);
	return (
		<GameMap>
			{mapRows.map((r, i) => row(r, i))}
		</GameMap>
	);
};

export default map;
