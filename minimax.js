const board = document.getElementById("board");
const winnerElement = document.getElementById("winner");
const aiButton = document.getElementById("aiButton");
const playerButton = document.getElementById("playerButton")
let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;
let aiStarts = false;

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }

    if (boardState.every(cell => cell !== "")) {
        return "Tie";
    }

    return null;
}

function minimax(board, depth, maximizingPlayer) {
    const scores = {
        X: -1,
        O: 1,
        Tie: 0
    };

    const winner = checkWinner();

    if (winner !== null) {
        return scores[winner];
    }

    if (maximizingPlayer) {
        let maxEval = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = "O";
                const eval = minimax(board, depth + 1, false);
                board[i] = "";
                maxEval = Math.max(maxEval, eval);
            }
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = "X";
                const eval = minimax(board, depth + 1, true);
                board[i] = "";
                minEval = Math.min(minEval, eval);
            }
        }
        return minEval;
    }
}

function bestMove() {
    let bestScore = -Infinity;
    let move = null;

    for (let i = 0; i < boardState.length; i++) {
        if (boardState[i] === "") {
            boardState[i] = "O";
            const score = minimax(boardState, 0, false);
            boardState[i] = "";
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    return move;
}

function handleClick(event) {
    if (gameOver) return;

    const cellIndex = event.target.dataset.index;

    if (boardState[cellIndex] === "") {
        boardState[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";

        const winner = checkWinner();
        if (winner) {
            if (winner === "Tie") {
                winnerElement.textContent = "Empate!";
            } else {
                winnerElement.textContent = `Vitória do Jogador ${winner}!`;
            }
            gameOver = true;
        }

        if (currentPlayer === "O" && !gameOver) {
            const aiMove = bestMove();
            boardState[aiMove] = "O";
            document.querySelector(`[data-index="${aiMove}"]`).textContent = "O";

            const aiWinner = checkWinner();
            if (aiWinner) {
                if (aiWinner === "Tie") {
                    winnerElement.textContent = "Empate!";
                } else {
                    winnerElement.textContent = "Vitória do Jogador O!";
                }
                gameOver = true;
            }

            currentPlayer = "X";
        }
    }
}

function startGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;
    winnerElement.textContent = "";
    board.innerHTML = "";

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
    }

    if (aiStarts) {
        const aiMove = bestMove();
        boardState[aiMove] = "O";
        document.querySelector(`[data-index="${aiMove}"]`).textContent = "O";
        currentPlayer = "X";
    }
}

playerButton.addEventListener("click", () => {
    aiStarts = false

    startGame();
});

aiButton.addEventListener("click", () => {
    aiStarts = true
    
    startGame();
});