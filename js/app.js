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

https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg
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
            }
            else if (i == 2){
                tempCell.firstElementChild.src = blackPawn
            }
           
                // if (i === 1){
                //     tempCell.firstElementChild.src = blackRook
                // }
                // if (i === 8){
                //     tempCell.firstElementChild.src = whiteRook

                // }
             if (i === 1 || i === 8) {
                switch (j){
                    case 1:
                    case 8:
                        tempCell.firstElementChild.src = i === 1 ? blackRook : whiteRook;
                        break;
                    
                    case 2:
                    case 7:
                        tempCell.firstElementChild.src = i === 1 ? blackKnight : whiteKnight;
                        break;
                    
                    case 3:
                    case 6:
                        tempCell.firstElementChild.src =i === 1 ? blackBishop : whiteBishop;
                        break;
                    case 4:
                        tempCell.firstElementChild.src = i === 1 ? blackQueen : whiteQueen;
                        break;
                    default:
                        tempCell.firstElementChild.src = i === 1 ? blackKing : whiteKing;
                        break;
                }
            }
            }
            tempRow.appendChild(tempCell)
        }
        board.appendChild(tempRow)
    }
}

initBoard()