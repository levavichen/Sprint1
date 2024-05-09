'use strict'
var gMines = []

function createMines(board, clickedCellI, clickedCellJ) {

    for (var i = 0; i < gLevel.MINES;) {
        var rowIdx = getRandomIntInclusive(0, gLevel.SIZE - 1)
        var colIdx = getRandomIntInclusive(0, gLevel.SIZE - 1)

        if (rowIdx === clickedCellI && colIdx === clickedCellJ) continue
        if (!board[rowIdx][colIdx].isMine) {
            board[rowIdx][colIdx].isMine = true
            i++
            gMines.push({ rowIdx, colIdx })
        }
    }
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            board[i][j].minesAroundCount = countNeighbors(i, j, board)
        }
    }
}

function showAllMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const cell = gBoard[i][j]
            if (cell.isMine) {
                cell.isShown = true
                gGame.isOn = false
            }
        }
    }
}