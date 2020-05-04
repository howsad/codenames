import React from 'react';
import styled from 'styled-components';

import { active, inactive } from '../../Style/style.js';

const SEndTurnForm = styled.form`
	margin: auto;
`;
const EndTurnSubmit = styled.input`
	font-size: x-large;
	border: 3px solid #AF3800;
	border-radius: 5px;
	margin: auto;
	cursor: ${props => props.active ? "pointer" : "default"};
	background: #fe621d14;
	padding: 10px;
	${props => props.active ? active : inactive}
`;
const STokens = styled.div`
	display: flex;
	border: 3px solid #AF3800;
	border-radius: 5px;
	margin-bottom: 20px;
	padding: 5px;
`;
const STokensCounter = styled.span`
	margin: 10px;
`;
const STokensCount = styled.div`
	font-size: xx-large;
`;
const SCounterLabel = styled.span`
`;

const TokensCounter = (props) => {
	return (
		<STokensCounter>
			<STokensCount>{props.count}</STokensCount>
			<SCounterLabel>{props.label}</SCounterLabel>
		</STokensCounter>
	);
};

const Tokens = (props) => {
	const handleSubmit = async (event) => {
		event.preventDefault();
		props.sendMove({});
	};

	return (
		<STokens>
			<TokensCounter label="ходов" count={props.totalTokens}/>
			<TokensCounter label="ошибок" count={props.mistakeTokens}/>
			<SEndTurnForm onSubmit={handleSubmit}>
				<EndTurnSubmit type="submit" value="Завершить ход" active={props.active}/>
			</SEndTurnForm>
		</STokens>
	);
};

export default Tokens;
