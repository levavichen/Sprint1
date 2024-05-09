'use strict'
var isDarkMode = false

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
    if(!gGame.isOn)return
    
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
    console.log(shownCells)
    setTimeout(() => {
        gGame.isHint = false

        for (var i = 0; i < shownCells.length; i++) {
            shownCells[i].isShown = false
            console.log(shownCells)
        }
        gHints--
        renderHints()
        renderBoard(gBoard)
    }, 1000)
}

//BUG - when clicked on mine cells are not shown.

////MINES EXTERMINATOR///

function onExterminator() {
    if(!gGame.isOn)return

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
    setMinesNegsCount(gBoard)
}


////DARK MODE////

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

