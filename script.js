const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let currentPlayer = 'X';
let gameWon = false;

function checkWin() {
    const winningCombinations = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a[0]][a[1]] && board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]]) {
            gameWon = true;
            return combination;
        }
    }

    return null;
}

function handleClick(row, col) {
    if (gameWon || board[row][col]) return;

    board[row][col] = currentPlayer;
    const cellElement = document.getElementById(`cell-${row}-${col}`);
    cellElement.textContent = currentPlayer;

    const winningCombination = checkWin();
    if (winningCombination) {
        const [a, b, c] = winningCombination;
        document.getElementById(`cell-${a[0]}-${a[1]}`).classList.add('winning-cell');
        document.getElementById(`cell-${b[0]}-${b[1]}`).classList.add('winning-cell');
        document.getElementById(`cell-${c[0]}-${c[1]}`).classList.add('winning-cell');
        statusElement.textContent = `Player ${currentPlayer} wins!`;
    } else if (board.flat().every(cell => cell)) {
        statusElement.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusElement.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function createBoard() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cellElement = document.createElement('div');
            cellElement.className = 'cell';
            cellElement.id = `cell-${i}-${j}`;
            cellElement.addEventListener('click', () => handleClick(i, j));
            boardElement.appendChild(cellElement);
        }
    }
}

function resetBoard() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board[i][j] = '';
            const cellElement = document.getElementById(`cell-${i}-${j}`);
            cellElement.textContent = '';
            cellElement.classList.remove('winning-cell');
        }
    }

    currentPlayer = 'X';
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
    gameWon = false;
}

createBoard();
statusElement.textContent = `Player ${currentPlayer}'s turn`;
resetButton.addEventListener('click', resetBoard);
