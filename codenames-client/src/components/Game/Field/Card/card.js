import React from 'react';
import styled from 'styled-components';

import CardFooter from './cardFooter.js';
import { active, success, fail, selected } from '../../Style/style.js';

const ROLE_SUCCESS = 1;
const ROLE_KILLER = 2;

function getCardStyle(state) {
	if (state.popup) {
		return selected;
	}
	switch(state.role) {
		case ROLE_SUCCESS:
			return success;
		case ROLE_KILLER:
			return fail;
		default:
			return active;
	}
}

const SCard = styled.div`
	border: 3px solid #AF3800;
	border-radius: 10px;
	margin: 10px;
	padding: 18px 10px 10px 10px;
	width: 13rem;
	text-transform: uppercase;
	transition: all .17s ease;
	font-size: x-large;
	font-weight: 600;
	${props => getCardStyle(props.state)}
`;
const Word = styled.span`
	display: inline-block;
	border-radius: 5px;
	width: 90%;
	background: rgb(255, 255, 255, 0.8);
	padding: 5px;
`;

const Card = (props) => {
	return (
		<SCard state={props.state} onClick={props.togglePopup}>
			<Word>{props.word}</Word>
			<CardFooter state={props.state} tokens={props.neutralFor} cardId={props.id} sendMove={props.sendMove} capabilities={props.capabilities}/>
		</SCard>
	);
};

export default Card;
