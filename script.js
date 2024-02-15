document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const restartBtn = document.getElementById('restartBtn');
    let currentPlayer = 'X';
    let gameStatus = ['','','','','','','','',''];
    let movesLeft = 9;

    // Create board cells
    for(let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }

    // Handle cell click
    function handleCellClick(e) {
        const index = e.target.dataset.index;
        if (gameStatus[index] === '' && movesLeft > 0) {
            gameStatus[index] = currentPlayer;
            e.target.textContent = currentPlayer;
            movesLeft--;
            checkWinner();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    // Check for winner
    function checkWinner() {
        const winPatterns = [
            [0,1,2], [3,4,5], [6,7,8], // Rows
            [0,3,6], [1,4,7], [2,5,8], // Columns
            [0,4,8], [2,4,6]            // Diagonals
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameStatus[a] !== '' && gameStatus[a] === gameStatus[b] && gameStatus[a] === gameStatus[c]) {
                status.textContent = `${currentPlayer} wins!`;
                removeCellListeners();
                return;
            }
        }

        if (movesLeft === 0) {
            status.textContent = "It's a draw!";
            return;
        }
    }

    // Remove cell click listeners
    function removeCellListeners() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.removeEventListener('click', handleCellClick);
        });
    }

    // Restart game
    restartBtn.addEventListener('click', function() {
        currentPlayer = 'X';
        gameStatus = ['','','','','','','','',''];
        movesLeft = 9;
        status.textContent = '';
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.textContent = '';
            cell.addEventListener('click', handleCellClick);
        });
    });
});
