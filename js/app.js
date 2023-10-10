const board = document.querySelector('.board')

// pieces SVG's
const blackKing = "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg"
const blackQueen = "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg"
const blackRook = "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg"
const blackBishop = "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg"
const blackKnight = "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg"
const blackPawn = "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"
const whiteKing =  "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg"
const whiteQueen =  "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg"
const whiteRook =  "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg"
const whiteBishop =  "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg"
const whiteKnight =  "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg"
const whitePawn =  "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg"

// global variables declaration
let moveCount = 0
let currentMoves = []
let activePiece = null
let currentOnClickMaps = []
let changedPiece = null
let hasWhiteKingMoved = false
let hasBlackKingMoved = false
let hasRightWhiteRookMoved = false
let hasLeftBlackRookMoved = false
let hasRightBlackRookMoved = false
let hasLeftWhiteRookMoved = false


// start game
window.addEventListener('load',gameStart)

// board init
function initBoard(){
    for (let i = 0; i < 9; ++i){
        let tempRow = document.createElement('tr')
        tempRow.classList.add('row')
        for (let j = 0; j < 9; ++j){
            let tempCell = document.createElement('td')
            tempCell.id = `cell-${i}-${j}`
            tempCell.classList.add('cell')
            if (i === 0){
                tempCell.classList.add('outline')
               if (j !== 0){ 
                tempCell.appendChild(document.createTextNode(String.fromCharCode(j + 97 - 1)))
            }
        }
            else if (j === 0){
                tempCell.classList.add('outline')
               if (i !== 0){ 
                tempCell.appendChild(document.createTextNode(i))
            }
        }
        else {
            tempCell.classList.add('colored')
            tempCell.appendChild(document.createElement("img"))
            if (i == 7){
                tempCell.firstElementChild.src = whitePawn
                tempCell.classList.add('pawn')
            }
            else if (i == 2){
                tempCell.firstElementChild.src = blackPawn
                tempCell.classList.add('pawn')
            }
             if (i === 1 || i === 8) {
                switch (j){
                    case 1:
                    case 8:
                        tempCell.firstElementChild.src = i === 1 ? blackRook : whiteRook;
                        tempCell.classList.add('rook')
                        break;
                    
                    case 2:
                    case 7:
                        tempCell.firstElementChild.src = i === 1 ? blackKnight : whiteKnight;
                        tempCell.classList.add('knight')
                        break;
                    
                    case 3:
                    case 6:
                        tempCell.firstElementChild.src = i === 1 ? blackBishop : whiteBishop;
                        tempCell.classList.add('bishop')
                        break;
                    case 4:
                        tempCell.firstElementChild.src = i === 1 ? blackQueen : whiteQueen;
                        tempCell.classList.add('queen')
                        break;
                    default:
                        tempCell.firstElementChild.src = i === 1 ? blackKing : whiteKing;
                        tempCell.classList.add('king')
                        break;
                }
            }
            }
            tempRow.appendChild(tempCell)
        }
        board.appendChild(tempRow)
    }
}

// move validation decorator
function checkValidity(func) {
    return function() {
        
        if ((this.firstElementChild.src.includes('dt45') && moveCount % 2 === 1) ||
            (this.firstElementChild.src.includes('lt45') && moveCount % 2 === 0)) {

            document.querySelectorAll('.available-move').forEach( e => {
                e.classList.remove('available-move')
            })
            func.apply(this, arguments);
        }
    };
}

function pawnMove(){
    const location = getLocation(this)
    const row = location[0]
    const column = location[1]
    const validMoves = []
    if (row == 8 || row == 1){
        turnToNewPiece(this)
    }
    else if (moveCount % 2 === 0){
        if (row === 7) {
            checkEmptyCell(row - 2,column,validMoves)
        }
        checkEmptyCell(row - 1, column, validMoves)
    }
    else {
        if (row === 2) {
            validMoves.push({
                row : (row) + 2 ,
                column : (column)
               })
        }
        validMoves.push({
            row : (row) + 1 ,
            column : (column)
           })
    }
    currentMoves =  validMoves
    changePressableCells(this) 
}


function rookMove() {
    const location = getLocation(this);
    const row = location[0]
    const column = location[1]
    const validMoves = [];
     for (let i = column + 1; i <= 8; i++) {
        if (!checkEmptyCell(row,i,validMoves)) {
            break;
        }
    }
    for (let i = column - 1; i >= 1; i--) {
        if (!checkEmptyCell(row,i,validMoves)) {
            break;
        }
    }

    for (let i = row + 1; row <= 8; i++) {
        if (!checkEmptyCell(i,column,validMoves)) {
            break;
        }
    }
    for (let i = row - 1; i >= 1; i--) {
        if (!checkEmptyCell(i,column,validMoves)) {
            break;
        }
    }
    currentMoves =  validMoves;
    changePressableCells(this) 
}
function bishopMove() {
    
    const location = getLocation(this);
    const row = location[0];
    const column = location[1];
    const validMoves = [];
    for (let i = 1; i <= 8; i++) { 
           if (!checkEmptyCell(row - i, column + i,validMoves)) {
            break;
        }
    }
    for (let i = 1; i <= 8; i++) {
        if (!checkEmptyCell(row - i, column - i,validMoves)) {
                break;
        }
    }

    for (let i = 1; i <= 8; i++) {
        if (!checkEmptyCell(row + i, column + i,validMoves)) {
           break;
        }
    }
    for (let i = 1; i <= 8; i++) {
        if (!checkEmptyCell(row + i, column - i,validMoves)) {
           break;
        }
    }

    currentMoves = validMoves;
    changePressableCells(this);
}

function knightMove() {
    const location = getLocation(this);
    const row = location[0]
    const column = location[1]
    const validMoves = [];
    checkEmptyCell(row + 2, column + 1, validMoves)
    checkEmptyCell(row + 2, column - 1, validMoves)
    checkEmptyCell(row - 2, column + 1, validMoves)
    checkEmptyCell(row - 2, column - 1, validMoves)
    checkEmptyCell(row + 1, column + 2, validMoves)
    checkEmptyCell(row + 1, column - 2, validMoves)
    checkEmptyCell(row - 1, column + 2, validMoves)
    checkEmptyCell(row - 1, column - 2, validMoves)
    currentMoves =  validMoves;
    changePressableCells(this) 
}

function queenMove() {
    const location = getLocation(this);
    const row = location[0]
    const column = location[1]
    const validMoves = [];
    for (let i = column + 1; i <= 8; i++) {
        if (!checkEmptyCell(row,i,validMoves)) {
            break;
        }
    }
    for (let i = column - 1; i >= 1; i--) {
        if (!checkEmptyCell(row,i,validMoves)) {
            break;
        }
    }

    for (let i = row + 1; row <= 8; i++) {
        if (!checkEmptyCell(i,column,validMoves)) {
            break;
        }
    }
    for (let i = row - 1; i >= 1; i--) {
        if (!checkEmptyCell(i,column,validMoves)) {
            break;
        }
    }
    for (let i = 1; i <= 8; i++) { 
        if (!checkEmptyCell(row - i, column + i,validMoves)) {
         break;
     }
 }
 for (let i = 1; i <= 8; i++) {
     if (!checkEmptyCell(row - i, column - i,validMoves)) {
             break;
     }
 }

 for (let i = 1; i <= 8; i++) {
     if (!checkEmptyCell(row + i, column + i,validMoves)) {
        break;
     }
 }
 for (let i = 1; i <= 8; i++) {
     if (!checkEmptyCell(row + i, column - i,validMoves)) {
        break;
     }
 }
    currentMoves =  validMoves;
    changePressableCells(this) 
}

function kingMove() {
    const location = getLocation(this);
    const row = location[0]
    const column = location[1]
    const validMoves = [];
    checkEmptyCell(row + 1,column + 1,validMoves)
    checkEmptyCell(row + 1,column - 1,validMoves)
    checkEmptyCell(row + 1,column,validMoves)
    checkEmptyCell(row,column - 1,validMoves)
    checkEmptyCell(row,column + 1,validMoves)
    checkEmptyCell(row - 1,column + 1,validMoves)
    checkEmptyCell(row - 1,column - 1,validMoves)
    checkEmptyCell(row - 1,column,validMoves)
    currentMoves =  validMoves;
    changePressableCells(this) 
}

function changePressableCells(piece) {
    activePiece = piece
    resetPiecesOnClicks()
    currentOnClickMaps = currentMoves.map(piece => {
        const pieceObject = document.querySelector(`#cell-${piece.row}-${piece.column}`)
        return {'piece' : pieceObject, onc : pieceObject.onclick}
    } )
    currentOnClickMaps.forEach( pieceObject => {
        let currentPiece = pieceObject.piece
        currentPiece.classList.add("available-move");
        currentPiece.onclick = () => {
            currentPiece.firstElementChild.src = piece.firstElementChild.src
            piece.firstElementChild.src = ' '
            resetPiecesOnClicks()
            currentPiece.onclick = piece.onclick
            piece.onclick = null
            changedPiece = currentPiece
            moveCount++;
            document.querySelectorAll('.available-move').forEach( e => {
                e.classList.remove('available-move')
            })
        }
    })
}

function resetPiecesOnClicks() {
    currentOnClickMaps.forEach( pieceObject => {
       if (pieceObject.piece !== changedPiece){ 
        pieceObject.piece.onclick = pieceObject.onc }
    })
}

function checkEmptyCell(row,column,validMoves) {
   if (isValidMove(row,column)) { 
    const src = board.children[row].children[column].firstElementChild.src
    if (src === 'http://127.0.0.1:5500/html/' || src === '') {
        validMoves.push({
            'row' : row, 'column' : column
        })
        return true
    }
    return false
}
}

function getLocation(piece){
    let location = piece.id.split('-')
    return location.slice(1,3).map( x => parseInt(x))
}

function isValidMove(row,column){
    return row > 0 && column > 0 && row < 9 && column < 9
}

// Initial OnClick's
function onClickInit(){
    const pawns = document.querySelectorAll('.pawn')

    pawns.forEach( (el) => {
        el.onclick = checkValidity(pawnMove)
    })
    const bishops = document.querySelectorAll('.bishop')

    bishops.forEach( (el) => {
        el.onclick = checkValidity(bishopMove)
    })
    const knights = document.querySelectorAll('.knight')

    knights.forEach( (el) => {
        el.onclick = checkValidity(knightMove)
    })
    const rooks = document.querySelectorAll('.rook')

    rooks.forEach( (el) => {
        el.onclick = checkValidity(rookMove)
    })
    const queens = document.querySelectorAll('.queen')

    queens.forEach( (el) => {
        el.onclick = checkValidity(queenMove)
    })
    const kings = document.querySelectorAll('.king')

    kings.forEach( (el) => {
        el.onclick = checkValidity(kingMove)
    })

}

function gameStart() {
    initBoard()
    onClickInit()

}





