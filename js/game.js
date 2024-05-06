'use strict'

const MINE = '*'
const EMPTY = ''
const MARK = '#'

var gBoard
var gcounter

var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function gameSetup(size, mines) {
    gLevel.SIZE = size
    gLevel.MINES = mines
    onInit()
}

function onInit() {

    gBoard = buildBoard(gLevel.SIZE)
    createMines(gBoard)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
    gGame.isOn = true
    gcounter = 0
}

function buildBoard(size) {
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            board[i][j] = cell
        }
    }
    return board
}


function renderBoard(gBoard) {
    var strHTML = ''

    for (var i = 0; i < gBoard.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < gBoard[0].length; j++) {

            const cell = gBoard[i][j]
            var className = `cell cell-${i}-${j}`
            var value = ''

            if (cell.isShown) {
                className += ' shown'
                if (cell.isMine) {
                    value = MINE

                } else {
                    value = cell.minesAroundCount
                    if (cell.minesAroundCount === 0) {
                        value = ''
                    }
                }
            }

            if (cell.isMarked) {
                value = MARK
            }


            strHTML += `<td class="${className}"  
            onclick="onCellClicked(this, ${i}, ${j})" 
            oncontextmenu="onCellMarked(this) " data-i="${i}" data-j="${j}">${value} </td>`

        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            board[i][j].minesAroundCount = countNeighbors(i, j, board)
        }
    }
}


function onCellClicked(elCell, i, j) {
    const cell = gBoard[i][j]
    gcounter++

    if (cell.minesAroundCount === 0) expandShown(gBoard, elCell, i, j)

    if (gcounter === 1) {
        cell.isMine = false
    }

    if (cell.isMarked) return
    if (cell.isMine) showAllMines()
    if (!cell.isShown) {
        cell.isShown = true

        if (!cell.isShown && cell.isMarked) {
            cell.isMarked = false
        }
    }

    checkGameOver()
    renderBoard(gBoard)
}

function onCellMarked(elCell) {
    // event.preventDefault()
    const i = +elCell.dataset.i
    const j = +elCell.dataset.j

    const cell = gBoard[i][j]

    if (!cell.isShown && !cell.isMarked) {
        cell.isMarked = true
        renderBoard(gBoard)
        return
    }
    if (cell.isMarked) {
        cell.isMarked = false
        renderBoard(gBoard)
    }
    checkGameOver()
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

function checkGameOver() {

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const cell = gBoard[i][j]

            if (cell.isMine && !cell.isMarked) return
            if (!cell.isMine && !cell.isShown) return
        }
    }
    console.log('win')
    gGame.isOn = false
}

function expandShown(board, elCell, i, j) {

    console.log(elCell)

    const rowIdx = +elCell.dataset.i
    const colIdx = +elCell.dataset.j

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue
            if (i === rowIdx && j === colIdx) continue
            var cell = board[i][j]
            if (cell.minesAroundCount != 0) {
                cell.isShown = true
            }
        }
    }
    renderBoard(gBoard)

}