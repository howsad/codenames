//card states
const STATE_ACTIVE = 0;
const STATE_SUCCESS = 1;
const STATE_KILLER = 2;
const MODIFIER_FAIL_YOU = 0;
const MODIFIER_FAIL_OPPONENT = 1; 

const rows=5;
const columns=5;

const gameState = {};
let player = {};
const menuState = {
	"willHide": true,
};

const gameField = document.querySelector('.game-field');
const cardMenu = document.querySelector('.card-menu');

//utility functions
function sliceArrayIntoGroups(arr, size) {
	if (arr.length === 0) { return arr; }
	return [ arr.slice(0, size), ...sliceArrayIntoGroups(arr.slice(size), size) ];
}

function getCardClass(state) {
	switch(state) {
		case STATE_ACTIVE: 
			return '';
		case STATE_SUCCESS:
			return 'card-success';
		case STATE_KILLER:
			return 'card-killer';
	}
}

//DOM element factories
function createWordCardFooterElement(card) {
	teamToClass = t => {
		if (t === gameState.team) {
			return 'word-card-modifier-fail-you';
		} else {
			return 'word-card-modifier-fail-opponent';
		}
	};
	modifierElementFactory = t => `
		<div class="word-card-modifier ${teamToClass(t)}"></div>
	`;
	return `
			<div class="word-card-footer">
				${card.neutralFor.map(t => modifierElementFactory(t)).join('')}
			</div>
	`;
}

function createWordCardElement(card) {
	const isWordCard = card.state === STATE_ACTIVE;
	const cardBody = !isWordCard ? '' : `
			<span class="word">${card.word}</span>
			${createWordCardFooterElement(card)}
	`;
	return `
		<div class="card ${getCardClass(card.state)}" data-id=${card.id}>
			${cardBody}
		</div>
	`;
}

function createGameFieldRowElement(cardRow) {
	return `
		<div class="game-field-row">
			${cardRow.map((card, i) => createWordCardElement(card)).join('')}
		</div>
	`;
}

function createMapElement(map) {
	const mapRows = sliceArrayIntoGroups(map, rows);
	return `
		<div class="game-map">
			${mapRows.map((r, i) => createMapRowElement(r)).join('')}
		</div>
	`;
}

function createMapRowElement(mapRow) {
	return `
		<div class="game-map-row">
			${mapRow.map((c, i) => createMapCellElement(c)).join('')}
		</div>
	`;
}

function createMapCellElement(mapCell) {
	return `
		<div class="game-map-cell ${getCardClass(mapCell)}">
		</div>
	`;
}

function updateCardObject(id, update) {
	card = gameState.cards.find(c => c.id === id);
	if (update.state) {
		card.state = parseInt(update.state);
	}
	if (update.modifier) {
		const neutralFor = card.neutralFor;
		const modifier = update.modifier;
		if (!neutralFor.includes(modifier)) {
			neutralFor.push(modifier);
		}
	}
	return card;
}

function populateGameField() {
	const cardRows = sliceArrayIntoGroups(gameState.cards, columns).slice(0, rows);
	gameField.innerHTML = cardRows.map(row => createGameFieldRowElement(row)).join('');
}

//DOM element event handlers
function handleCardMenuOptionClick(e) {
	menuState.willHide = true;
	const state = e.currentTarget.dataset.state;
	const modifier = e.currentTarget.dataset.modifier;
	const update = {
		"state": state,
		"modifier": modifier
	};
	const card = updateCardObject(parseInt(menuState.cardId), update);
	const cardElement = document.querySelector(`[data-id="${card.id}"]`);
	if (card.state === STATE_ACTIVE) {
		//update footer
		cardElement.querySelector('.word-card-footer').innerHTML = createWordCardFooterElement(card);
	} else {
		cardElement.outerHTML = createWordCardElement(card);
	}
}

function handleCardMenuClick(e) {
	if (menuState.willHide === null) {
		menuState.willHide = false;
	}
}

function handleCardClick(e) {
	if (menuState.show || menuState.willHide) {
		return;
	}
	cardMenu.style.left = `${e.clientX}px`;
	cardMenu.style.top = `${e.clientY}px`;
	cardMenu.style.display = 'block';

	const cardMenuOptions = cardMenu.querySelectorAll('.card-menu-option');
	cardMenuOptions.forEach(cmo => cmo.addEventListener('click', handleCardMenuOptionClick));

	const cardElement = e.currentTarget;
	cardElement.classList.add('card-selected');

	menuState.show = true;
	menuState.cardId = cardElement.dataset.id;
	menuState.willHide = false;
}

function hideCardMenu() {
	if (menuState.willHide !== false) {
		if (menuState.show === true) {
			const cardElement = document.querySelector(`[data-id="${menuState.cardId}"]`);
			cardElement.classList.remove('card-selected');
		}
		cardMenu.style.display = 'none';
		menuState.show = false;
	}
	menuState.willHide = null;
}
	
//game initialization
document.addEventListener('click', hideCardMenu);
cardMenu.addEventListener('click', handleCardMenuClick);
hideCardMenu();

const events = new EventSource('http://localhost:3000/games/1/events');
events.addEventListener('game-join', e => {
	console.log(e.data);
	player = JSON.parse(e.data);
});
events.addEventListener('game-start', e => { 
	console.log("Game starts!"); 
	console.log(e.data); 
	Object.assign(gameState, JSON.parse(e.data));
	populateGameField();
	document.querySelector('.container').innerHTML += createMapElement(gameState.map);
	document.querySelectorAll('.card')
		.forEach(c => c.addEventListener('click', handleCardClick));
});
