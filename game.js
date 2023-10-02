let board = ['','','','','','','','','']
let playerTime = 0
let gameOver = false;
let count = 0

let symbols=['o', 'x']
let winStates = [
    [0, 1, 2],
    [3, 4, 5],  
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]  
]

function handleMove(position){    
    
    if(gameOver) 
        return 

    if (board[position] == ''){
        
        board[position] = symbols[playerTime]
        
        gameOver = win()

        if(!gameOver)

        
            if(playerTime == 0){
                playerTime = 1
                count ++
            }else{
                playerTime = 0 
                count ++
            } 
    }

    return gameOver
}

function win(){

    for (let i = 0; i < winStates.length; i++){
        let seq = winStates[i]
        
        let pos0 = seq[0]
        let pos1 = seq[1]
        let pos2 = seq[2]

        if(board[pos0] == board[pos1] && 
            board[pos0] == board[pos2] && board[pos0] != ''){
            
            return true 
        }
    }

    return false
}
