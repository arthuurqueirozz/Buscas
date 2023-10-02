const boardDiv = document.getElementById('board');
const resultDiv = document.getElementById('result');
const startScreen = document.getElementById('startScreen');
const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';

// Função para começar o jogo com a escolha do jogador
function startGame(startingPlayer) {
  currentPlayer = startingPlayer;
  startScreen.style.display = 'none';
  boardDiv.style.display = 'grid';
  renderBoard();

  if (startingPlayer === 'O') {
    // Se o jogador escolher deixar a IA começar, a IA faz a primeira jogada
    makeComputerMove();
  }
}

function handleCellClick(index) {
  if (board[index] === '' && !isGameOver(board)) {
    board[index] = currentPlayer;
    renderBoard();
    if (isGameOver(board)) {
      displayResult();
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      if (currentPlayer === 'O') {
        makeComputerMove();
      }
    }
  }
}

function makeComputerMove() {
  const bestMove = getBestMove(board, currentPlayer);
  board[bestMove.index] = currentPlayer;
  renderBoard();
  if (isGameOver(board)) {
    displayResult();
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function renderBoard() {
  for (let i = 0; i < board.length; i++) {
    const cell = document.getElementsByClassName('cell')[i];
    cell.textContent = board[i];
  }
}

function displayResult() {
  const result = calculateResult(board);
  if (result === 'X' || result === 'O') {
    resultDiv.textContent = `${result} venceu!`;
  } else {
    resultDiv.textContent = 'Empate!';
  }
  boardDiv.removeEventListener('click', handleCellClick);
}

function calculateResult(board) {
// Verifique todas as possíveis combinações de vitória
const winningCombinations = [
[0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
[0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
[0, 4, 8], [2, 4, 6] // Diagonais
];

for (const combination of winningCombinations) {
const [a, b, c] = combination;
if (board[a] && board[a] === board[b] && board[a] === board[c]) {
  return board[a]; // Retorna o vencedor ('X' ou 'O')
}
}

if (!board.includes('')) {
return 'Empate'; // Empate se não houver células vazias
}

return null; // O jogo ainda está em andamento
}

function isGameOver(board) {
return calculateResult(board) !== null;
}

function getBestMove(board, player) {
const availableMoves = getEmptyCells(board);
let bestMove = null;
let bestScore = player === 'X' ? -Infinity : Infinity;

for (const move of availableMoves) {
const index = move.index;
board[index] = player;
const score = minimax(board, 0, false, player);
board[index] = ''; // Desfaz a jogada

if ((player === 'X' && score > bestScore) || (player === 'O' && score < bestScore)) {
  bestScore = score;
  bestMove = { index, score };
}
}

return bestMove;
}

function getEmptyCells(board) {
const emptyCells = [];
for (let i = 0; i < board.length; i++) {
if (board[i] === '') {
  emptyCells.push({ index: i });
}
}
return emptyCells;
}

function minimax(board, depth, isMaximizing, player) {
const result = calculateResult(board);

if (result === 'X') {
return 1;
} else if (result === 'O') {
return -1;
} else if (result === 'Empate') {
return 0;
}

if (isMaximizing) {
let bestScore = -Infinity;
for (const move of getEmptyCells(board)) {
  const index = move.index;
  board[index] = player;
  const score = minimax(board, depth + 1, false, player);
  board[index] = ''; // Desfaz a jogada
  bestScore = Math.max(score, bestScore);
}
return bestScore;
} else {
let bestScore = Infinity;
for (const move of getEmptyCells(board)) {
  const index = move.index;
  board[index] = player === 'X' ? 'O' : 'X';
  const score = minimax(board, depth + 1, true, player);
  board[index] = ''; // Desfaz a jogada
  bestScore = Math.min(score, bestScore);
}
return bestScore;
}
}