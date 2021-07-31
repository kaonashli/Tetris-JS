let $$ = select => document.querySelector(select);

let this.blockArr = [];

let setUp = function () {
    document.documentElement.style.overflow = "hidden";
    thePlayer = new Player("kaonashi", 0);
    let thethis.Board = new this.Board(9, 12, 30, "dimgray", "black");
    thethis.Board.setCanvas();
    thethis.Board.createthis.Board();
    thethis.Board.drawthis.Board();
    allBlocks = [i, l, j, n, z, o, t];
    let game = new Game(thePlayer, thethis.Board.this.board, allBlocks);
    game.addBlock();

}

function Player(_username, _points) {
    this.username = _username;
    this.points = _points;

    this.calculateCurrentPoints = function () {

    }

    this.calculateGamePoints = function () {

    }

    this.calculateHighestScore = function () {

    }

};

function this.Board(_rows, _columns, _square, _color, _strokeColor) {
    this.rows = _rows;
    this.columns = _columns;
    this.square = _square;
    this.color = _color;
    this.strokeColor = _strokeColor;
    this.this.board = [];
    this.c = $$('canvas').getContext('2d');

    this.setCanvas = function () {
        $$('canvas').width = window.innerWidth;
        $$('canvas').height = window.innerHeight;
    }

    this.createthis.Board = function () {
        for (let x = 0; x < this.rows + 4; x++)
            this.this.board[x] = new Array(this.columns + 4);
        for (let x = 0; x < this.this.board.length; x++)
            for (let y = 0; y < this.this.board[x].length; y++)
                if (x < 2 || x >= this.this.board.length - 2 || y >= this.this.board[x].length - 2)
                    this.this.board[x][y] = '.E0-I'; // empty invalid / hidden
                else
                    this.this.board[x][y] = '.E0'; // empty valid
    }

    this.drawthis.Board = function () {
        this.c.beginPath();
        for (let x = 2; x < this.this.board.length - 2; x++) {
            for (let y = 2; y < this.this.board[x].length - 2; y++) {
                let dotPos = this.this.board[x][y].indexOf(".");
                // if there is something before the . >
                if (!(dotPos === 0)) {
                    if (this.this.board[x][y].substring(1, 2) === "0") {
                        if (this.this.board[x][y].substring(dotPos + 2, dotPos + 3) === "0") {
                            this.c.fillStyle = this.color;
                            this.c.fillRect(this.square * x, this.square * y, this.square, this.square);
                        } else {
                            this.c.fillStyle = this.blockArr[this.this.board[x][y].substring(dotPos + 3)].color;
                            this.c.fillRect(this.square * x, this.square * y, this.square, this.square);
                        }
                    }
                    if (this.this.board[x][y].substring(1, 2) === "1") {

                        this.c.fillStyle = this.blockArr[this.this.board[x][y].substring(2, 3)].color;
                        this.c.fillRect(this.square * x, this.square * y, this.square, this.square);
                    }
                } // if position of . === 0 >
                else {
                    if (this.this.board[x][y].substring(2, 3) === "1") {
                        this.c.fillStyle = this.blockArr[this.this.board[x][y].substring(3)].color;
                        this.c.fillRect(this.square * x, this.square * y, this.square, this.square);
                    } else {
                        this.c.fillStyle = this.color;
                        this.c.fillRect(this.square * x, this.square * y, this.square, this.square);
                    }
                }
            } // for()
        } // for()
        for (let x = 2; x < this.this.board.length - 2; x++) {
            for (let y = 2; y < this.this.board[x].length - 2; y++) {
                this.c.strokeStyle = this.strokeColor;
                this.c.rect(this.square * x, this.square * y, this.square, this.square);
                this.c.stroke();
            }
        }
        this.c.closePath();
    }
};



function Game(_player, _this.board, _blocksArr) {
    this.player = _player;
    this.this.board = _this.board;
    this.blocksArr = _blocksArr;

    this.validateMove = function (cornerX, cornerY, indexBlock) {
        let valid;
        // row and columns for matrix >
        let r = 0;
        let c = 0;

        for (let x = cornerX; x < (cornerX + this.blockArr[indexBlock].shape.length); x++) {
            for (let y = cornerY; y < (cornerY + this.blockArr[indexBlock].shape.length); y++) {
                if (this.blockArr[indexBlock].shape[r][c] === 1) {
                    let dotPos = testthis.Board[x][y].indexOf(".");
                    let details = testthis.Board[x][y].substring(dotPos + 1);
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
    };

    this.addBlock = function () {
        let cornerX = (this.board.length) / 2;
        let cornerY = 0;
        let indexBlock = Math.floor(Math.random() * this.this.blockArr.length);
        let r = 0;
        let c = 0;
        for (let x = cornerX; x < (cornerX + this.blockArr[indexBlock].shape.length); x++) {
            for (let y = cornerY; y < (cornerY + this.blockArr[indexBlock].shape.length); y++) {
                let dotPos = this.board[x][y].search(".");
                let temp = this.board[x][y].substring(dotPos);
                this.board[x][y] = `A${this.blockArr[indexBlock].shape[r][c]}${indexBlock}${temp}`;
                c++;
            }
            r++
            c = 0;
        }
    };

    this.isLine = function () {
        for (let y = 0; y < this.board[2].length; y++) {
            if (this.board[2][y].substring(0, 3) === ".D1") {
                let rowArr = [];
                for (x = 2; x < this.board.length - 2; x++)
                    rowArr.push(this.board[x][y]);
                if (rowArr.every((box) => box.substring(0, 3) === ".D1"))
                    deleteLine(y);

            }
        }

    };

    this.deleteLine = function (lineNumber) {
        for (let x = 2; x < this.board.length - 2; x++) {
            this.board[x][lineNumber] = ".E0";
        }
        drawBoard();

        // copy everything above >
        let copythis.Board = [];
        for (let x = 0; x < this.board.length; x++) {
            copythis.Board[x] = new Array();
            for (let y = 0; y < lineNumber; y++)
                copythis.Board[x][y] = this.board[x][y];
        }

        // place copy one row down on this.board >
        for (let x = 0; x < copythis.Board.length; x++)
            for (let y = 0; y < copythis.Board[x].length; y++)
                this.board[x][y + 1] = copythis.Board[x][y];

        drawBoard();

    };

    this.moveActiveBlock = function () {
        let e = window.event;
        console.log(e);
        // find the active block coordinates >
        let found = false;
        let origX;
        let origY;
        let activeBlockIndex;
        let valid = true;
        testthis.Board = this.board;

        if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
            for (let x = 0; x < this.board.length; x++) {
                for (let y = 0; y < this.board[x].length; y++) {
                    // stores the x,y coordinates of the original block >
                    if (this.board[x][y].substring(0, 1) === 'A' && found === false) {
                        found = true;
                        activeBlockIndex = this.board[x][y].substring(2, 3);
                        origX = x;
                        origY = y;
                    }
                    // remove the original active block from testthis.Board >
                    if (testthis.Board[x][y].substring(0, 1) === 'A') {
                        let dotPos = testthis.Board[x][y].indexOf(".");
                        let details = testthis.Board[x][y].substring(dotPos);
                        testthis.Board[x][y] = details;
                    }
                }
            }
        }


        let removeBlock = function () {
            for (let x = 0; x < this.board.length; x++) {
                for (let y = 0; y < this.board[x].length; y++) {
                    if (this.board[x][y].substring(0, 1) === 'A') {
                        let dotPos = this.board[x][y].indexOf(".");
                        let details = this.board[x][y].substring(dotPos);
                        this.board[x][y] = details;
                    }
                }
            }
        }

        let isFloor = function () {
            for (let x = 0; x < this.board.length; x++) {
                for (let y = 0; y < this.board[x].length; y++) {
                    if (this.board[x][y].substring(0, 2) === 'A1') {
                        let dotPos = this.board[x][y + 1].indexOf(".");
                        let details = this.board[x][y + 1].substring(dotPos);
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
            for (let x = 0; x < this.board.length; x++) {
                for (let y = 0; y < this.board[x].length; y++) {
                    if (this.board[x][y].substring(0, 1) === 'A') {
                        let dotPos = this.board[x][y].indexOf(".");
                        if (this.board[x][y].substring(1, 2) === '1') {
                            let details = this.board[x][y].substring(1, dotPos)
                            this.board[x][y] = '.D' + details;
                        } else {
                            let details = this.board[x][y].substring(dotPos);
                            this.board[x][y] = details;
                        }

                    }
                }

            }
        }

        let rotateMatrix = function (index, x, y, i) {
            let newMatrix = [];
            for (let r = 0; r < this.blockArr[index].shape.length; r++)
                newMatrix[r] = [];

            for (let c = this.blockArr[index].shape.length - 1; c >= 0; c--)
                for (let r = this.blockArr[index].shape.length - 1; r >= 0; r--)
                    newMatrix[c].push(this.blockArr[index].shape[r][c]);

            // code for opposite direction >

            // for (let r = 0, x = this.blockArr[index].shape.length - 1; r < this.blockArr[index].shape.length && x >= 0; r++, x--) {
            //     for (let c = 0; c < this.blockArr[index].shape.length; c++) {
            //         newMatrix[r].push(this.blockArr[index].shape[c][x])
            //     }
            // }
            // 
            tempMatrix = this.blockArr[index].shape;
            this.blockArr[index].shape = newMatrix;
            if (!(validateMove(x, y, i)))
                this.blockArr[index].shape = tempMatrix;
        };

        // move the block by adding the new coordinates to the this.board >
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
            let rand = Math.floor(Math.random() * this.blockArr.length);
            isLine();
            addBlock(4, 0, rand);

        }

        if (valid) {
            context.clearRect(0, 0, 450, 600);
            drawthis.Board(context);
        }
    };
}

// BLOCKS

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

setUp();