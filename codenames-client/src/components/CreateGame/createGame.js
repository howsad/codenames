import React, { useState } from 'react';
import {
  Route,
  Redirect,
} from "react-router-dom";
import styled from 'styled-components';

import createGame from '../../api/createGame.js';

const Layout = styled.div`
	display: flex;
	flex-direction: column;
`;
const SHeader = styled.h1`
`;
const SForm = styled.form`
	display: flex;
	flex-direction: column;
	font-size: x-large;
	margin: auto;
	min-width: 7em;
	border: 3px solid #AF3800;
	border-radius: 10px;
	padding: 15px;
	background: #fe621d14;
`;
const SLabel = styled.label`
	text-align: left;
`;
const SNumberInput = styled.input.attrs(props => ({
	type: "number"
}))`
	width: 2em;
	font-size: x-large;
	float: right;
`;
const SSubmit = styled.input.attrs(props => ({
	type: "submit"
}))`
	margin-top: 10px;
	font-size: x-large;
`;


const Form = (props) => {
	const [turns, setTurns] = useState(9);
	const [mistakes, setMistakes] = useState(9);
	const handleTurnsChange = (event) => {
		setTurns(Number.parseInt(event.target.value));
	};
	const handleMistakesChange = (event) => {
		setMistakes(Number.parseInt(event.target.value));
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		const createGameRs = await createGame({turns, mistakes});
		console.log(createGameRs);
		props.setGame(createGameRs);
	};

	return (
		<SForm onSubmit={handleSubmit}>
			<SLabel>Ходов
				<SNumberInput onChange={handleTurnsChange} value={turns}/>
			</SLabel>
			<SLabel>Ошибок
				<SNumberInput onChange={handleMistakesChange} value={mistakes}/>
			</SLabel>
			<SSubmit value="Создать игру"/>
		</SForm>
	);
};

const CreateGame = (props) => {
	const [game, setGame] = useState({});

	return (
		<Route path="/">
			{game.id ? <Redirect to={`/${game.id}`}/> : 
		<Layout>
			<SHeader>Let's play Codenames</SHeader>
			<Form setGame={setGame}/>
		</Layout>}
		</Route>
	);
};

export default CreateGame;
