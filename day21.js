
//read input
var fs = require('fs');
var file = fs.readFileSync('\day21input.txt', 'utf8');
var input = file.split('\r\n');

//obvious - password (s)
var password = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
var posInd = [];

//test directions 
var testops = [
    'swap position 4 with position 0', //ebcda
    'swap letter d with letter b', //edcba
    'reverse positions 0 through 4', //abcde
    'rotate left 1 step', //bcdea
    'move position 1 to position 4', //bdeac
    'move position 3 to position 0', //abdec
    'rotate based on position of letter b', //ecabd
    'rotate based on position of letter d' //decab
]

//function to swap position
var swapPos = function (x, y) {
    var xval = password[x];
    var yval = password[y];
    password[x] = yval;
    password[y] = xval;
};

//function to swap letters
var swapLetters = function (x, y) {
    var xspot = password.indexOf(x);
    var yspot = password.indexOf(y);
    password[xspot] = y;
    password[yspot] = x;
};

//function to rotate left or right by x steps
var rotateSteps = function (direction, steps) {
    if (direction === 'left') {
        for (var a = steps; a > 0; a--) {
            var left = password.splice(0, 1);
            password.push(left[0]);
        }
    } else if (direction === 'right') {
         for (var b = 0; b < steps; b++) {
        var right = password.splice(password.length - 1, 1);
        password.unshift(right[0]);
        }
    }
};

var rotateStepsR = function (direction, steps) {
    if (direction === 'right') {
        for (var a = steps; a > 0; a--) {
            var left = password.splice(0, 1);
            password.push(left[0]);
        }
    } else if (direction === 'left') {
         for (var b = 0; b < steps; b++) {
        var right = password.splice(password.length - 1, 1);
        password.unshift(right[0]);
        }
    }
};

//function to rotate by position of letter
var rotatePos = function (letter, ind) {
    var spot = password.indexOf(letter);
    posInd.push([ind, spot]);
    var steps = 1 + spot;
    if (spot >= 4) {
        steps += 1;
    }
    for (var c = 0; c < steps; c++) {
        var right2 = password.splice(password.length - 1, 1);
        password.unshift(right2[0]);
    }
};

var rotatePosR = function (letter, ind) { 
    var curr = password.indexOf(letter);
    var orig;    
    for (var a = 0; a < posInd.length; a++) {
        if (posInd[a][0] == ind) {
            orig = posInd[a][1];
            break;
        }
    }
    var spot = curr - orig;
    var steps = 1 + spot;
    if (spot >= 4) {
        steps += 1;
    }
    for (var a = steps; a > 0; a--) {
            var left2 = password.splice(0, 1);
            password.push(left2[0]);
        }
}; 

//function to reverse range of password
var reverse = function (start, stop) {
    var range = password.slice(start, stop + 1);
    range.reverse();
    password.splice(start, range.length, range[0]); 
    for (var j = 1; j < range.length; j++) {
        password.splice(start + j, 0, range[j]);
    }
};

//function to move one letter to other position
var move = function (x, y) { 
    var xmove = password.splice(x, 1);
    password.splice(y, 0, xmove[0]);
};

//parsing through the input and performing required function for each line

    for (var i = 0; i < input.length; i++) {
        var line = input[i].split(' ');
        if (line[0] === 'swap') {
            if (line[1] === 'position') {
                swapPos(parseInt(line[2]), parseInt(line[5]));
            } else if (line[1] === 'letter') {
                swapLetters(line[2], line[5]);
            }
        } else if (line[0] === 'rotate') {
            if (line[1] === 'based') {
                rotatePos(line[line.length - 1], i);
            } else {
                rotateSteps(line[1], parseInt(line[2]));
            }
        } else if (line[0] === 'reverse') {
            reverse(parseInt(line[2]), parseInt(line[4]));
        } else if (line[0] === 'move') {
            move(parseInt(line[2]), parseInt(line[5]));
        }
    }


//rejoin password to string and log
var scramble = password.join('');
console.log(scramble);

password = ['g', 'b', 'h', 'c', 'e', 'f', 'a', 'd'];

for (var h = input.length - 1; h >= 0; h--) {
        var line = input[h].split(' ');
        if (line[0] === 'swap') {
            if (line[1] === 'position') {
                swapPos(parseInt(line[2]), parseInt(line[5]));
            } else if (line[1] === 'letter') {
                swapLetters(line[2], line[5]);
            }
        } else if (line[0] === 'rotate') {
            if (line[1] === 'based') {
                rotatePosR(line[line.length - 1], h);
            } else {
                rotateStepsR(line[1], parseInt(line[2]));
            }
        } else if (line[0] === 'reverse') {
            reverse(parseInt(line[2]), parseInt(line[4]));
        } else if (line[0] === 'move') {
            move(parseInt(line[5]), parseInt(line[2]));
        }
    }

var unscramble = password.join('');
console.log(unscramble);
