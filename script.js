let board = ['', '', '', '', '', '', '', '', '']; 
let currentPlayer = 'X'; 
let gameOver = false;

const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');

function createBoard() {
    boardElement.innerHTML = ''; 
    for (let i = 0; i < 9; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.addEventListener('click', () => makeMove(i));
        boardElement.appendChild(square);
    }
}

function updateBoard() {
    const squares = document.querySelectorAll('.square');
    squares.forEach((square, index) => {
        square.innerHTML = ''; // Eski rasmni olish
        if (board[index] === 'X') {
            square.textContent = 'X'; // X belgisi matn sifatida
            square.classList.add('x'); // X rangini qo‘shish
            square.classList.remove('o'); // O rangini olib tashlash
        } else if (board[index] === 'O') {
            square.textContent = 'O'; // O belgisi matn sifatida
            square.classList.add('o'); // O rangini qo‘shish
            square.classList.remove('x'); // X rangini olib tashlash
        }
    });
}

function makeMove(index) {
    if (board[index] === '' && !gameOver) {
        board[index] = currentPlayer;
        updateBoard();
        if (checkWinner()) {
            gameOver = true;
            messageElement.textContent = ${currentPlayer} wins!;
        } else if (board.every(cell => cell !== '')) {
            gameOver = true;
            messageElement.textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    messageElement.textContent = '';
    updateBoard();
}

createBoard();
updateBoard();
