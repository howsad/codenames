import CardState from '../state/CardState.js';

const gameStart = (setGame, setCards) => e => {
	console.log("Game starts!");
	const game = JSON.parse(e.data);
	const togglePopup = (id) => () => {
		const card = cards.cards.find(c => c.id === id);
		if (!card.state.toggleable()) {
			return cards;
		}
		const newCards = {...cards};
		cards.cards[id] = {...card, state: card.state.togglePopup()};
		setCards(newCards);
	};
	const cardFactory = json => {
		const card = {...json};
		card.state = new CardState(card.state);
		card.togglePopup = togglePopup(card.id);
		return card;
	};
	const cards = {};
	cards.cardFactory = cardFactory;
	cards.cards = game.cards.map(c => cardFactory(c));
	setCards(cards);
	setGame(game);
};

const gamePhase = setGame => e => {
	const {phase, capabilities} = JSON.parse(e.data);
	setGame(g => ({...g, phase, capabilities}));
};

const cardUpdate = setCards => e => {
	const card = JSON.parse(e.data);
	setCards(cs => {
		const cards = {...cs};
		cards.cards[card.id] = cards.cardFactory(card);
		return cards;
	});
};

const tokens = setGame => e => {
	const tokens = JSON.parse(e.data);
	setGame(g => ({...g, tokens}));
};

const clue = setGame => e => {
	const clue = JSON.parse(e.data);
	setGame(g => {
		const clues = [...g.clues, clue];
		return {...g, clues: clues};
	});
};

export { gameStart, gamePhase, cardUpdate, tokens, clue };
