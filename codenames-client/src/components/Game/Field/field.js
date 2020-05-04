import React from 'react';
import styled from 'styled-components';

import Card from './Card/card.js';

//utility functions
function sliceArrayIntoGroups(arr, size) {
	if (arr.length === 0) { return arr; }
	return [ arr.slice(0, size), ...sliceArrayIntoGroups(arr.slice(size), size) ];
}

const GameField = styled.div`
	flex: 4;
`;
const GameFieldRow = styled.div`
	display: flex;
`;

const row = (row, i, sendMove, capabilities) => {
	return (
		<GameFieldRow key={i}>
			{row.map((c, i) => <Card {...c} key={c.id} sendMove={sendMove} capabilities={capabilities}/>)}
		</GameFieldRow>
	);
}

const Field = (props) => {
	const mapRows = sliceArrayIntoGroups(props.cards, props.rows);
	return (
		<GameField>
			{mapRows.map((r, i) => row(r, i, props.sendMove, props.capabilities))}
		</GameField>
	);
};

export default Field;
