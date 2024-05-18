// script.js
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('resetButton');
    const gameBoard = document.getElementById('gameBoard');
    const playerSelection = document.getElementById('playerSelection');
    const player1Button = document.getElementById('player1Button');
    const player2Button = document.getElementById('player2Button');
    let currentPlayer;
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let player1 = 'X';
    let player2 = 'O';

    const confettiSettings = { target: 'confettiCanvas' };
    const confetti = new ConfettiGenerator(confettiSettings);

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (event) => {
        const cell = event.target;
        const cellIndex = parseInt(cell.getAttribute('data-index'));

        if (board[cellIndex] !== '' || !gameActive) {
            return;
        }

        board[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner()) {
            const winner = currentPlayer === player1 ? 'Player 1' : 'Player 2';
            displayWinningMessage(`${winner} wins!`);
            gameActive = false;
            startConfetti();
            return;
        }

        if (!board.includes('')) {
            displayWinningMessage("It's a draw!");
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkWinner = () => {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return board[index] === currentPlayer;
            });
        });
    };

    const resetGame = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => cell.textContent = '');
        gameActive = true;
        gameBoard.style.display = 'none';
        resetButton.style.display = 'none';
        playerSelection.style.display = 'block';
        stopConfetti();
    };

    const startGame = (player) => {
        currentPlayer = player;
        playerSelection.style.display = 'none';
        gameBoard.style.display = 'grid';
        resetButton.style.display = 'block';
    };

    const displayWinningMessage = (message) => {
        setTimeout(() => {
            alert(message);
        }, 100); // Short delay to ensure the message pops up after the last move is displayed
    };

    const startConfetti = () => {
        confetti.render();
    };

    const stopConfetti = () => {
        confetti.clear();
    };

    player1Button.addEventListener('click', () => startGame(player1));
    player2Button.addEventListener('click', () => startGame(player2));
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
});
