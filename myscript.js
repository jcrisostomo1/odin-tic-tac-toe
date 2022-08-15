const game = (() => {
		let xTurn = true;
    const xState = [];
    const oState = [];
		const getxTurn = () => xTurn;
		const getoState = () => oState;
		const getxState = () => xState;
		const addValue = (type, value) => {
			if (type === "xState") {
				xState.push(value);
			} else if (type === "oState") {
				oState.push(value);
			}
		};
		const endTurn = () => {
			xTurn = !xTurn;
		};
		const restart = () => {
			xTurn = true;
			xState = [];
			oState = [];
		};
    const winningStates = [
        // Rows
        ['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8'],

        // Columns
        ['0', '3', '6'],
        ['1', '4', '7'],
        ['2', '5', '8'],

        // Diagonal
        ['0', '4', '8'],
        ['2', '4', '6']
    ];
	return {
		getxTurn,
		addValue,
		getxState,
		getoState,
		endTurn,
		restart,
		winningStates
	};
})();


document.addEventListener('click', event => {
	const target = event.target;
	const isCell = target.classList.contains('grid-cell');
	const isDisabled = target.classList.contains('disabled');
	
	if (isCell && !isDisabled) {
		const cellValue = target.dataset.value;

		game.getxTurn()
    ? game.addValue("xState", cellValue)
    : game.addValue("oState", cellValue)

		target.classList.add('disabled');
		target.classList.add(game.getxTurn() ? 'x' : 'o');

		game.endTurn();

		if (!document.querySelectorAll('.grid-cell:not(.disabled)').length) {
			document.querySelector('.game-over').classList.add('visible');
			document.querySelector('.game-over-text').textContent = 'Draw!';
		};
	};
});

document.querySelector('.restart').addEventListener('click', () => {
	document.querySelector('.game-over').classList.remove('visible');
	document.querySelectorAll('.grid-cell').forEach(cell => {
			cell.classList.remove('disabled', 'x', 'o')
	});

	game.restart();
});



    