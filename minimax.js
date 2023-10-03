const boardDiv = document.getElementById('board');
const resultDiv = document.getElementById('result');
const startScreen = document.getElementById('startScreen');
const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';


function startGame(startingPlayer) {
  currentPlayer = startingPlayer;
  startScreen.style.display = 'none';
  boardDiv.style.display = 'grid';
  renderBoard();

  if (startingPlayer === 'O') {
    
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
    const startTime = performance.now(); 
  
    const bestMove = getBestMove(board, currentPlayer);
    console.log(getEmptyCells(board))
    board[bestMove.index] = currentPlayer;
    renderBoard();
    if (isGameOver(board)) {
      displayResult();
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  
    const endTime = performance.now(); 
    const executionTime = endTime - startTime; 
    console.log(`Tempo de execução: ${executionTime}ms`);
 
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

const winningCombinations = [
[0, 1, 2], [3, 4, 5], [6, 7, 8], 
[0, 3, 6], [1, 4, 7], [2, 5, 8], 
[0, 4, 8], [2, 4, 6] 
];

for (const combination of winningCombinations) {
const [a, b, c] = combination;
if (board[a] && board[a] === board[b] && board[a] === board[c]) {
  return board[a]; 
}
}

if (!board.includes('')) {
return 'Empate'; 
}

return null; 
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
board[index] = ''; 

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
        board[index] = ''; 
        bestScore = Math.max(score, bestScore);
    }
    return bestScore;
  } else {
  let bestScore = Infinity;
  for (const move of getEmptyCells(board)) {
      const index = move.index;
      board[index] = player === 'X' ? 'O' : 'X';
      const score = minimax(board, depth + 1, true, player);
      board[index] = ''; 
      bestScore = Math.min(score, bestScore);
  }
    return bestScore;
  }
}