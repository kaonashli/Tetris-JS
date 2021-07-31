let $$ = sel => document.querySelector(sel);
let board = [];
let testBoard;
let blockArr = [];
const ROWS = 9;
const COLS = 12;
const SQUARE = 30;
const BOARDCOLOR = 'dimgray';
let theFloor = [];
document.documentElement.style.overflow = "hidden";

let setUp = function () {
    createBoard();
    $$('canvas').width = window.innerWidth;
    $$('canvas').height = window.innerHeight;
    context = $$('canvas').getContext('2d');
    rand = Math.floor(Math.random() * (blockArr.length));
    addBlock(3, 0, rand);
    drawBoard(context);

}

let createBoard = function () {
    for (let x = 0; x < ROWS + 4; x++)
        board[x] = new Array(COLS + 4);
    for (let x = 0; x < board.length; x++)
        for (let y = 0; y < board[x].length; y++)
            if (x < 2 || x >= board.length - 2 || y >= board[x].length - 2)
                board[x][y] = '.E0-I'; // empty invalid / hidden
            else
                board[x][y] = '.E0'; // empty valid

}

let drawBoard = function (c) {
    c.beginPath();
    for (let x = 2; x < board.length - 2; x++) {
        for (let y = 2; y < board[x].length - 2; y++) {
            let dotPos = board[x][y].indexOf(".");
            // if there is something before the . >
            if (!(dotPos === 0)) {
                if (board[x][y].substring(1, 2) === "0") {
                    if (board[x][y].substring(dotPos + 2, dotPos + 3) === "0") {
                        c.fillStyle = BOARDCOLOR;
                        c.fillRect(SQUARE * x, SQUARE * y, SQUARE, SQUARE);
                    } else {
                        c.fillStyle = blockArr[board[x][y].substring(dotPos + 3)].color;
                        c.fillRect(SQUARE * x, SQUARE * y, SQUARE, SQUARE);
                    }
                }
                if (board[x][y].substring(1, 2) === "1") {

                    c.fillStyle = blockArr[board[x][y].substring(2, 3)].color;
                    c.fillRect(SQUARE * x, SQUARE * y, SQUARE, SQUARE);
                }
            } // if position of . === 0 >
            else {
                if (board[x][y].substring(2, 3) === "1") {
                    c.fillStyle = blockArr[board[x][y].substring(3)].color;
                    c.fillRect(SQUARE * x, SQUARE * y, SQUARE, SQUARE);
                } else {
                    c.fillStyle = BOARDCOLOR;
                    c.fillRect(SQUARE * x, SQUARE * y, SQUARE, SQUARE);
                }
            }
        } // for()
    } // for()
    for (let x = 2; x < board.length - 2; x++) {
        for (let y = 2; y < board[x].length - 2; y++) {
            c.strokeStyle = 'black';
            c.rect(SQUARE * x, SQUARE * y, SQUARE, SQUARE);
            c.stroke();
        }
    }
    c.closePath();
}

// (1) return true or false if move is valid >
// (2) checks to see if the block has reached the floor >
let validateMove = function (cornerX, cornerY, indexBlock) {
    let valid;
    // row and columns for matrix >
    let r = 0;
    let c = 0;

    for (let x = cornerX; x < (cornerX + blockArr[indexBlock].shape.length); x++) {
        for (let y = cornerY; y < (cornerY + blockArr[indexBlock].shape.length); y++) {
            if (blockArr[indexBlock].shape[r][c] === 1) {
                let dotPos = testBoard[x][y].indexOf(".");
                let details = testBoard[x][y].substring(dotPos + 1);
                if (details.substring(0, 1) === "D") {
                    return false;
                } else if (details.substring(details.length - 1) === "I") {
                    return false;
                } else {
                    valid = true;
                }
            } else {
                valid = true;
            }
            c++;
        }
        r++
        c = 0;
    }
    return valid;
}

let addBlock = function (cornerX, cornerY, indexBlock) {
    r = 0;
    c = 0;
    for (let x = cornerX; x < (cornerX + blockArr[indexBlock].shape.length); x++) {
        for (let y = cornerY; y < (cornerY + blockArr[indexBlock].shape.length); y++) {
            let dotPos = board[x][y].search(".");
            let temp = board[x][y].substring(dotPos);
            board[x][y] = `A${blockArr[indexBlock].shape[r][c]}${indexBlock}${temp}`;
            c++;
        }
        r++
        c = 0;
    }
}

// returns true if there is a line >
let isLine = function () {

    for (let y = 0; y < board[2].length; y++) {
        if (board[2][y].substring(0, 3) === ".D1") {
            let rowArr = [];
            for (x = 2; x < board.length - 2; x++)
                rowArr.push(board[x][y]);
            if (rowArr.every((box) => box.substring(0, 3) === ".D1"))
                deleteLine(y);

        }
    }
}

// (1) makes line empty
// (2) copy everything above
// (3) delete everything above
// (4) shift everything above down
let deleteLine = function (lineNumber) {

    for (let x = 2; x < board.length - 2; x++) {
        board[x][lineNumber] = ".E0";
    }
    drawBoard(context);

    // copy everything above >
    let copyBoard = [];
    for (let x = 0; x < board.length; x++) {
        copyBoard[x] = new Array();
        for (let y = 0; y < lineNumber; y++)
            copyBoard[x][y] = board[x][y];
    }

    // place copy one row down on board >
    for (let x = 0; x < copyBoard.length; x++)
        for (let y = 0; y < copyBoard[x].length; y++)
            board[x][y + 1] = copyBoard[x][y];

    drawBoard(context);


}

let endGame = function () {

    location.href = "loser.html";


}

let moveActiveBlock = function () {
    let e = window.event;
    console.log(e);
    // find the active block coordinates >
    let found = false;
    let origX;
    let origY;
    let activeBlockIndex;
    let valid = true;
    testBoard = board;

    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
        for (let x = 0; x < board.length; x++) {
            for (let y = 0; y < board[x].length; y++) {
                // stores the x,y coordinates of the original block >
                if (board[x][y].substring(0, 1) === 'A' && found === false) {
                    found = true;
                    activeBlockIndex = board[x][y].substring(2, 3);
                    origX = x;
                    origY = y;
                }
                // remove the original active block from testBoard >
                if (testBoard[x][y].substring(0, 1) === 'A') {
                    let dotPos = testBoard[x][y].indexOf(".");
                    let details = testBoard[x][y].substring(dotPos);
                    testBoard[x][y] = details;
                }
            }
        }
    }


    let removeBlock = function () {
        for (let x = 0; x < board.length; x++) {
            for (let y = 0; y < board[x].length; y++) {
                if (board[x][y].substring(0, 1) === 'A') {
                    let dotPos = board[x][y].indexOf(".");
                    let details = board[x][y].substring(dotPos);
                    board[x][y] = details;
                }
            }
        }
    }

    let isFloor = function () {
        for (let x = 0; x < board.length; x++) {
            for (let y = 0; y < board[x].length; y++) {
                if (board[x][y].substring(0, 2) === 'A1') {
                    let dotPos = board[x][y + 1].indexOf(".");
                    let details = board[x][y + 1].substring(dotPos);
                    if (details.substring(1, 2) === "D") {
                        if (y === 0)
                            endGame();
                        return true;
                    } else if (details.substring(details.length - 1) === "I") {
                        return true;
                    }
                }

            }

        }
        return false;
    }

    let makeFloor = function () {
        for (let x = 0; x < board.length; x++) {
            for (let y = 0; y < board[x].length; y++) {
                if (board[x][y].substring(0, 1) === 'A') {
                    let dotPos = board[x][y].indexOf(".");
                    if (board[x][y].substring(1, 2) === '1') {
                        let details = board[x][y].substring(1, dotPos)
                        board[x][y] = '.D' + details;
                    } else {
                        let details = board[x][y].substring(dotPos);
                        board[x][y] = details;
                    }

                }
            }

        }
    }

    // move the block by adding the new coordinates to the board >
    if (e.key === "ArrowDown") {
        if (validateMove(origX, origY + 1, activeBlockIndex)) {
            removeBlock();
            addBlock(origX, origY + 1, activeBlockIndex)
        } else {
            valid = false;
            addBlock(origX, origY, activeBlockIndex)
        }
    } else if (e.key === "ArrowLeft") {
        if (validateMove(origX - 1, origY, activeBlockIndex)) {
            removeBlock();
            addBlock(origX - 1, origY, activeBlockIndex)
        } else {
            valid = false;
            addBlock(origX, origY, activeBlockIndex)
        }
    } else if (e.key === "ArrowRight") {
        if (validateMove(origX + 1, origY, activeBlockIndex)) {
            removeBlock();
            addBlock(origX + 1, origY, activeBlockIndex)
        } else {
            valid = false;
            addBlock(origX, origY, activeBlockIndex)
        }
    } else if (e.key === "ArrowUp") {
        rotateMatrix(activeBlockIndex, origX, origY, activeBlockIndex);
        addBlock(origX, origY, activeBlockIndex);
    } else {
        valid = false;
    }

    if (isFloor()) {
        makeFloor();
        let rand = Math.floor(Math.random() * blockArr.length);
        isLine();
        addBlock(4, 0, rand);

    }

    if (valid) {
        context.clearRect(0, 0, 450, 600);
        drawBoard(context);
    }

}

let rotateMatrix = function (index, x, y, i) {
    let newMatrix = [];
    for (let r = 0; r < blockArr[index].shape.length; r++)
        newMatrix[r] = [];

    for (let c = blockArr[index].shape.length - 1; c >= 0; c--)
        for (let r = blockArr[index].shape.length - 1; r >= 0; r--)
            newMatrix[c].push(blockArr[index].shape[r][c]);

    // code for opposite direction >

    // for (let r = 0, x = blockArr[index].shape.length - 1; r < blockArr[index].shape.length && x >= 0; r++, x--) {
    //     for (let c = 0; c < blockArr[index].shape.length; c++) {
    //         newMatrix[r].push(blockArr[index].shape[c][x])
    //     }
    // }
    // 
    tempMatrix = blockArr[index].shape;
    blockArr[index].shape = newMatrix;
    if (!(validateMove(x, y, i)))
        blockArr[index].shape = tempMatrix;
}

// Objects -------------------------------------------------------

let l = {
    color: 'orange',
    shape: [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1]
    ]
}

let t = {
    color: 'fuchsia',
    shape: [
        [1, 0, 0],
        [1, 1, 0],
        [1, 0, 0]
    ]
}

let o = {
    color: 'yellow',
    shape: [
        [1, 1],
        [1, 1]
    ]
}

let j = {
    color: 'blue',
    shape: [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ]
}

let n = {
    color: 'lime',
    shape: [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0]
    ]
}

let z = {
    color: 'red',
    shape: [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0]
    ]
}

let i = {
    color: 'cyan',
    shape: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0]
    ]
}

blockArr = [i, l, j, n, z, o, t];

setUp();
$(window).on('keydown', moveActiveBlock);

// $(window).trigger(e);
setInterval(moveActiveBlock, 2000);