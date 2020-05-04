import React, { useState } from 'react';
import styled from 'styled-components';

import { active, inactive } from '../../Style/style.js';

const StyledClueForm = styled.form`
	border: 3px solid #AF3800;
	border-radius: 5px;
	padding-left: 5px;
	position: relative;
	${props => props.active ? active : inactive}
`;
const ClueInput = styled.input.attrs(props => ({
	disabled: !props.active
}))`
	width: 100%;
	font-size: x-large;
	text-transform: uppercase;
	font-weight: 600;
	border-radius: 5px;
	background: transparent;
	border: none;
	padding: 0;
	color: #4c1700;
`;
const SClueSubmit = styled.input.attrs(props => ({
	disabled: !props.active
}))`
	border: none;
	background: transparent;
	font-size: x-large;
	cursor: ${props => props.active ? "pointer" : "default"};
	padding: 0;
	position: absolute;
	right: 0;
`;

const ClueForm = (props) => {
	const [clue, setClue] = useState({value: ''});
	const handleChange = (event) => {
		setClue({value: event.target.value});
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		setClue({value: ''});
		props.sendMove({clue: clue.value});
	};
	
	return (
		<StyledClueForm onSubmit={handleSubmit} active={props.active}>
			<ClueInput type="text" value={clue.value} onChange={handleChange} active={props.active}/>
			<SClueSubmit type="submit" value="➡️" active={props.active}/>
		</StyledClueForm>
	);
};

export default ClueForm;
