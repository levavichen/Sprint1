'use strict'

const MINE = '*'
const EMPTY = ''
const FLAG = '!'

var gBoard

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

function onInit() {

    gBoard = buildBoard(gLevel.SIZE)
    createMines(gBoard)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
    gGame.isOn = true
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

            strHTML += `<td class="${className}" onclick="onCellClicked(this, ${i}, ${j})" oncontextmenu=</td>`


        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
    console.log(gBoard)
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
    var numMinesNegs = cell.minesAroundCount

    if (!cell.isShown) {
        cell.isShown = true
        elCell.classList.add('shown')

        if (cell.isMine) {
            elCell.innerHTML += `${MINE}`
        } else {
            elCell.innerHTML += `${numMinesNegs}`
        }
    }

    if (!cell.isShown && cell.isMarked) {
        cell.isShown = true
        elCell.classList.add('shown')

    }
}

function onCellMarked(elCell) {
    const cell = gBoard[i][j]

    if (!cell.isShown && !cell.isMarked) {
        elCell.isMarked = true
        elCell.innerHTML += `${FLAG}`
    }
    if (cell.isMarked) {
        elCell.isMarked = false
        elCell.innerHTML -= `${FLAG}`

    }

}
