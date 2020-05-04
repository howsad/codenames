const createGame = async (restBody) => {
	const response = await fetch(`${process.env.REACT_APP_API_URL}/games`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(restBody)
	});
	if (!response.ok) {
		console.log(await response.text());
	} else {
		return response.json();
	}
};

export default createGame;
