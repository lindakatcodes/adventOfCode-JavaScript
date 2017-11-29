//shoutout to u/snorkl-the-dolphine and u/douglowder!

/*--- Day 8: Two-Factor Authentication ---

You come across a door implementing what you can only assume is an implementation of two-factor authentication after a long game of requirements telephone.

To get past the door, you first swipe a keycard (no problem; there was one on a nearby desk). Then, it displays a code on a little screen, and you type that code on a keypad. Then, presumably, the door unlocks.

Unfortunately, the screen has been smashed. After a few minutes, you've taken everything apart and figured out how it works. Now you just have to work out what the screen would have displayed.

The magnetic strip on the card you swiped encodes a series of instructions for the screen; these instructions are your puzzle input. The screen is 50 pixels wide and 6 pixels tall, all of which start off, and is capable of three somewhat peculiar operations:

rect AxB turns on all of the pixels in a rectangle at the top-left of the screen which is A wide and B tall.
rotate row y=A by B shifts all of the pixels in row A (0 is the top row) right by B pixels. Pixels that would fall off the right end appear at the left end of the row.
rotate column x=A by B shifts all of the pixels in column A (0 is the left column) down by B pixels. Pixels that would fall off the bottom appear at the top of the column.
For example, here is a simple sequence on a smaller screen:

rect 3x2 creates a small rectangle in the top-left corner:

###....
###....
.......
rotate column x=1 by 1 rotates the second column down by one pixel:

#.#....
###....
.#.....
rotate row y=0 by 4 rotates the top row right by four pixels:

....#.#
###....
.#.....
rotate column x=1 by 1 again rotates the second column down by one pixel, causing the bottom pixel to wrap back to the top:

.#..#.#
#.#....
.#.....
As you can see, this display technology is extremely powerful, and will soon dominate the tiny-code-displaying-screen market. That's what the advertisement on the back of the display tries to convince you, anyway.

There seems to be an intermediate check of the voltage used by the display: after you swipe your card, if the screen did work, how many pixels should be lit?

--- Part Two ---

You notice that the screen is only capable of displaying capital letters; in the font it uses, each letter is 5 pixels wide and 6 tall.

After you swipe your card, what code is the screen trying to display? */

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


