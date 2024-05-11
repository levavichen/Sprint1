'use strict'

function renderlives() {
    const elRemainingLives = document.querySelector('.remaining-lives')
    var strHTML = ''

    for (var i = 0; i < gLives; i++) {
        strHTML += `<span class = "lives"><img src="img/heart.png" alt="life" class="heart"></span>`
    }
    elRemainingLives.innerHTML = strHTML
}

function renderSmiley(currSmiley) {
    const elGameStatusImg = document.querySelector('.game-status-img')
    elGameStatusImg.innerHTML = currSmiley
    elGameStatusImg.onclick = onInit
}

////HINTS////

function renderHints() {
    const elHintsContainer = document.querySelector('.hints-container')
    var strHTML = ''

    for (var i = 0; i < gHints; i++) {
        strHTML += `<img class="hints" src="img/hint.png" alt="hint" onclick="onHint(this)">`
    }

    elHintsContainer.innerHTML = strHTML
}

function onHint(elHint) {
    if (!gGame.isOn) return

    elHint.src = 'img/hintOn.png'
    gGame.isHint = true
}

function showHint(board, rowIdx, colIdx) {
    var shownCells = []

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue
            var cell = board[i][j]
            if (!cell.isShown) {
                cell.isShown = true
                shownCells.push(cell)

            }
        }
    }

    setTimeout(() => {
        gGame.isHint = false

        for (var i = 0; i < shownCells.length; i++) {
            shownCells[i].isShown = false

        }
        gHints--
        renderHints()
        renderBoard(gBoard)
    }, 1000)
}

//BUG - when clicked on mine cells are not shown.

////MINES EXTERMINATOR///

function onExterminator() {
    if (!gGame.isOn) return

    var exterminatedMines = []

    for (var i = 0; i < 3; i++) {
        var mineIdx = getRandomIntInclusive(0, gMines.length - 1)
        var splicedMines = gMines.splice(mineIdx, 1)
        exterminatedMines.push(splicedMines[0])

    }

    for (var i = 0; i < exterminatedMines.length; i++) {
        var row = exterminatedMines[i].rowIdx
        var column = exterminatedMines[i].colIdx

        var exMine = gBoard[row][column]
        exMine.isMine = false
        console.log(exMine)
    }
    gLevel.MINES = gLevel.MINES -3
    setMinesNegsCount(gBoard)
    renderGameSetup()

}


////DARK MODE////
var isDarkMode = false

function onDarkMode() {

    isDarkMode = isDarkMode === false ? true : false

    var elHtml = document.querySelector('html')
    var elBoardContainer = document.querySelector('.board-container')
    var elButton = document.querySelector('.dark-mode')

    if (isDarkMode) {
        elButton.innerText = 'LIGHT MODE'
        elHtml.style.backgroundColor = "DarkSlateGrey"
        elBoardContainer.style.backgroundColor = "Black"

    } else {

        elButton.innerText = 'DARK MODE'
        elHtml.style.backgroundColor = "bisque"
        elBoardContainer.style.backgroundColor = "rgb(228, 191, 146)"
    }
}

////SAFE CLICK/////

function onSafeClick() {
    if (!gGame.isOn) return
    if (!isSafeClick) return

    gclicks--
    changeSafeClickText()

    var safeNotShownCells = []

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const cell = gBoard[i][j]

            if (!cell.isMine && !cell.isShown) {
                safeNotShownCells.push({ i, j })
            }
        }
    }

    var safeNotShownCellIdx = getRandomIntInclusive(0, safeNotShownCells.length - 1)

    for (var i = 0; i < safeNotShownCells.length; i++) {
        var row = safeNotShownCells[safeNotShownCellIdx].i
        var column = safeNotShownCells[safeNotShownCellIdx].j
    }

    var elSafeClickCell = document.querySelector(`.cell-${row}-${column}`)
    elSafeClickCell.classList.add("safe-cell-mode")

    setTimeout(() => {
        elSafeClickCell.classList.remove("safe-cell-mode")

    }, 2000)
}

function changeSafeClickText() {
    var elSafeClickText = document.querySelector('.safe-click-text')
    elSafeClickText.innerText = `${gclicks} clicks available`

    if (gclicks === 0) {
        elSafeClickText.innerText = 'No clicks available'
        isSafeClick = false
    }

}

///MEGA HINT////

function onMegaHint() {
    if (!gGame.isOn) return

}
