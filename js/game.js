'use strict'

const MINE = '<img src="img/mine.png" alt="mine" class="mine">'
const EMPTY = ''
const MARK = '<img src="img/flag.png" alt="flag" class="flag">'

var gSmiles = {
    normal: '<img src="img/normal.png" alt="normal" class="smiley">',
    win: '<img src="img/win.png" alt="win" class="smiley">',
    lose: '<img src="img/dead.png" alt="dead" class="smiley">'
}

var gBoard
var gcounter
var gLives
var gHints
var isFirstClick

var gLevel = {
    SIZE: 8,
    MINES: 14
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    isHint: false
}

function gameSetup(size, mines) {
    gLevel.SIZE = size
    gLevel.MINES = mines

    onInit()
}

function onInit() {
    gHints = 3
    gLives = 3
    gBoard = buildBoard(gLevel.SIZE)
    renderBoard(gBoard)
    renderlives()
    renderSmiley(gSmiles.normal)
    renderHints()

    gGame.isOn = true
    isFirstClick = true

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


function onCellClicked(elCell, i, j) {
    const rowIdx = +elCell.dataset.i
    const colIdx = +elCell.dataset.j
    const cell = gBoard[i][j]

    if (!gGame.isOn) return

    if (gGame.isHint) {
        showHint(gBoard, i, j)
    }

    if (isFirstClick) {
        createMines(gBoard, rowIdx, colIdx)
        setMinesNegsCount(gBoard)
        isFirstClick = false
    }

    if (cell.minesAroundCount === 0) expandShown(gBoard, elCell, i, j)

    if (cell.isMarked) return
    if (cell.isMine) {
        if (gLives > 1) {
            gLives--
            renderlives()
            return
        }
        if (gLives === 1)
            gLives = 0
        showAllMines()
        renderlives()
        renderSmiley(gSmiles.lose)

    }
    if (!cell.isShown) {
        cell.isShown = true
        gGame.shownCount++

        if (!cell.isShown && cell.isMarked) {
            cell.isMarked = false
        }
    }

    checkGameOver()
    renderBoard(gBoard)
}

function onCellMarked(elCell) {
    event.preventDefault()
    const i = +elCell.dataset.i
    const j = +elCell.dataset.j

    const cell = gBoard[i][j]

    if (!gGame.isOn) return

    if (!cell.isShown && !cell.isMarked) {
        cell.isMarked = true
        gGame.markedCount++
        renderBoard(gBoard)

    } else {
        if (cell.isMarked) {
            cell.isMarked = false
            gGame.markedCount--
            renderBoard(gBoard)
        }
    }
    checkGameOver()
}


function checkGameOver() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const cell = gBoard[i][j]

            if (cell.isMine && !cell.isMarked) return
            if (!cell.isMine && !cell.isShown) return
        }
    }
    renderSmiley(gSmiles.win)
    gGame.isOn = false
}

function expandShown(board, elCell, rowIdx, colIdx) {

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue
            if (i === rowIdx && j === colIdx) continue
            var cell = board[i][j]
            if (!cell.isShown) {
                cell.isShown = true
                if (cell.minesAroundCount === 0) {
                    expandShown(board, elCell, i, j)
                }
            }
        }
    }

    renderBoard(gBoard)
}

