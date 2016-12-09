//shoutout to u/snorkl-the-dolphine and u/douglowder!

//A width goes across, B height goes down : Y is row and X is col
//read and store input, set width and height
var fs = require('fs');
var file = fs.readFileSync('\day8input.txt', 'utf8');
var input = file.split('\n');
var width = 50;
var height = 6;

//test input
var test = ['rect 3x2', 'rotate column x=1 by 1', 'rotate row y=0 by 4', 'rotate column x=1 by 1'];
var twidth = 7;
var theight = 3;

//set up the initial board
var board = [];
for (var i = 0; i < height; i++) {
    board[i] = [];
    for (var j = 0; j < width; j++) {
        board[i][j] = ' ';
    }
}

//function to fill in rectangle
function setRect(width, height) {
    for (var h = 0; h < height; h++) {
        for (var w = 0; w < width; w++) {
            board[h][w] = '#';
        }
    }
};

//TIL: you can create your own prototypes! Nifty. length - number to rotate by % length, that whatever's left and add to the front of the array 
Array.prototype.rotate = function( n ) {
  n = this.length - n % this.length;
  this.unshift.apply( this, this.splice( n, this.length ) )
  return this;
};

//rotate row
function rotateRow(board, y, n) {
    board[y].rotate(n);
};

//rotate column
function rotateCol(board, x, n) {
    var temp = [];
    for (var s = 0; s < board.length; s++) {
        temp.push(board[s][x]);
    }
    temp.rotate(n);
    for (var t = 0; t < board.length; t++) {
        board[t][x] = temp[t];
    }
};

//read in the input and execute whichever function it requires
function readInput(str) {
    var bits = str.split(' ');
    if (bits[0] === 'rect') {
        var fill = bits[1].split('x');
        var x = fill[0];
        var y = fill[1];
        setRect(x, y);
    } else if (bits[0] === 'rotate') {
        if (bits[1] === 'row') {
            var ysplit = bits[2].split('=');
            y = Number(ysplit[1]);
            var n = Number(bits[4]);
            rotateRow(board, y, n);
        } else if (bits[1] === 'column') {
            var xsplit = bits[2].split('=');
            x = Number(xsplit[1]);
            n = Number(bits[4]);
            rotateCol(board, x, n);
        }
    }
};

//fill the board and log answers
for (var i = 0; i < input.length; i++) {
    var lines = input[i];
    readInput(lines);
}

//count the number of 'lit' pixels
var count = 0; 
for (var z = 0; z < height; z++) {
    for (var r = 0; r < width; r++) {
            if ((board[z][r]) === '#') {
                count++;
            }
        }
}

//log pixels lit
console.log("Pixels lit: " + count);
    
//print out the array to see the hidden message
var w = board.length;
var h = board[0].length;
for (var k = 0; k < w; k++) {
    var s = "";
    for (var l = 0; l < h; l++) {
        s = s + board[k][l];
    }
    console.log(s);
}


