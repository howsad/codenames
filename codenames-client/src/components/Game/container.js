import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import GameField from './Field/field.js';
import SideBar from './SideBar/sidebar.js';

import { gameStart, gamePhase, cardUpdate, tokens, clue } from '../../events/events.js';
import sendMove from '../../api/sendMove.js';

const SContaner = styled.div`
	display: flex;
`;

const Container = (props) => {
	const { id } = useParams();

	const [game, setGame] = useState({});
	const [cards, setCards] = useState({});
	const [player, setPlayer] = useState({});
	const rows = 5;
	const columns = 5;

	useEffect(() => {
		const events = new EventSource(`${process.env.REACT_APP_API_URL}/games/${id}`);
		events.addEventListener('game-join', e => { setPlayer(JSON.parse(e.data)); });
		events.addEventListener('game-start', gameStart(setGame, setCards));
		events.addEventListener('game-phase', gamePhase(setGame));
		events.addEventListener('card-update', cardUpdate(setCards));
		events.addEventListener('tokens', tokens(setGame));
		events.addEventListener('clue', clue(setGame));
		events.addEventListener('game-over', () => alert('Game over!'));
		return () => events.close();
	}, [id]);

	if (!game.map) {
		return (
			<SContaner />
		);
	}

	return (
		<SContaner>
			<GameField cards={cards.cards} rows={rows} columns={columns} sendMove={sendMove(player, id)} capabilities={game.capabilities}/>
			<SideBar tokens={game.tokens} sendMove={sendMove(player, id)} map={game.map} rows={rows} columns={columns} team={game.team} clues={game.clues} capabilities={game.capabilities}/>
		</SContaner>
	);
};

export default Container;
