document.addEventListener('DOMContentLoaded', () =>{
    let squares = document.querySelectorAll('.square')

    squares.forEach((square) => {
        square.addEventListener('click', handleClick)
    })
})

function handleClick(event) {
    let position = event.target.id

    if(count == 8){
        document.getElementById('winner').innerHTML = '<p>DRAW!</p>'
    }

    if(handleMove(position)){
        
        if (playerTime == 1) {
            document.getElementById('winner').innerHTML = '<p>The winner was X</p>'
        } else{
            document.getElementById('winner').innerHTML = '<p>The winner was O</p>'

        }
        
    }
    updateSquare(position)
    if(count == 8)
        return gameOver == true 

  
}

function updateSquare(position){
    let square = document.getElementById(position.toString())
    let symbol = board[position]
    square.innerHTML = `<div class="${symbol}"></div>`
}

function restartGame(){
    board = ['','','','','','','','','']
    playerTime = 0
    gameOver = false
    count = 0

    let squares = document.querySelectorAll('.square')
    
    squares.forEach((square) => {
        let symbol = board[square.id]
        square.innerHTML = `<div class="${symbol}"></div>`  
        document.getElementById('winner').innerText = ''
    })
}
