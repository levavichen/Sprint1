'use strict'

function createMines(board) {
    board[1][1].isMine = true
    board[2][2].isMine = true
    
}

// function createMines(board) {
//     for (var i = 0; i < gLevel.MINES; i++) {
//         var rowIdx = getRandomIntInclusive(0, gLevel.SIZE - 1)
//         var colIdx = getRandomIntInclusive(0, gLevel.SIZE - 1)
//         board[rowIdx][colIdx].isMine = true
//     }
// }

