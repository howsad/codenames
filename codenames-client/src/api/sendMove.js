const sendMove = (player, gameId) => async (restBody) => {
	const request = {
		...restBody,
		playerId: player.id,
	};
	const response = await fetch(`${process.env.REACT_APP_API_URL}/games/${gameId}/moves`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(request)
	});
	if (!response.ok) {
		console.log(await response.text());
	}
};

export default sendMove;
