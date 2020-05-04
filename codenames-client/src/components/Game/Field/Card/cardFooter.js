import React from 'react';
import styled from 'styled-components';

const TEAM_BLUE = 'blue';
const TEAM_RED = 'red';

function getTokenColor(team) {
	switch(team) {
		case TEAM_RED:
			return '#C92020';
		case TEAM_BLUE:
			return '#083D77';
		default:
			return 'transparent';
	}
}

const SCardFooter = styled.div`
	height: 3rem;
	display: flex;
`;
const CardFooterToken = styled.div`
	border-radius: 5px;
	height: 2rem;
	width: 2rem;
	background: ${props => getTokenColor(props.team)};
	margin-top: 13px;
`;
const SPickForm = styled.div`
	margin-left: auto;
	margin-top: auto;
`;
const SubmitPickButton = styled.button`
	background: transparent;
	font-size: x-large;
	cursor: pointer;
	border: 3px solid hsla(0, 0%, 39%, 1);
	padding-left: 1px;
	box-shadow: inset 0 0 7px hsla(107, 0%, 50%, 0.3);
	border-radius: 100%;
	width: 2.2rem;
	height: 2.2rem;
`;

const PickForm = (props) => {
	const hidePickForm = !props.state.pickFormVisible(props.capabilities);
	const button = hidePickForm ? '' : <SubmitPickButton onClick={props.handleSubmit}>✔️</SubmitPickButton>;

	return (
		<SPickForm onSubmit={props.handleSubmit}>
			{button}
		</SPickForm>
	);
};

const CardFooter = (props) => {
	const handleSubmit = (id) => async (event) => {
		console.log(JSON.stringify(props));
		event.preventDefault();
		props.sendMove({pick: id});
	};

	return (
		<SCardFooter>
			{props.tokens.map(t => <CardFooterToken team={t} key={t}/>)}
			<PickForm state={props.state} handleSubmit={handleSubmit(props.cardId)} capabilities={props.capabilities}/>
		</SCardFooter>
	);
};

export default CardFooter;
