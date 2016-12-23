

var fs = require('fs');
var file = fs.readFileSync('\day21input.txt', 'utf8');
var input = file.split('\r\n');

var password = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

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


var swapPos = function (x, y) {
    var xval = password[x];
    var yval = password[y];
    password[x] = yval;
    password[y] = xval;
};

var swapLetters = function (x, y) {
    var xspot = password.indexOf(x);
    var yspot = password.indexOf(y);
    password[xspot] = y;
    password[yspot] = x;
};

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

var rotatePos = function (letter) {
    var spot = password.indexOf(letter);
    var steps = 1 + spot;
    if (spot >= 4) {
        steps += 1;
    }
    for (var c = 0; c < steps; c++) {
        var right2 = password.splice(password.length - 1, 1);
        password.unshift(right2[0]);
    }
};

var reverse = function (start, stop) {
    var range = password.slice(start, stop + 1);
    range.reverse();
    password.splice(start, range.length, range[0]); 
    for (var j = 1; j < range.length; j++) {
        password.splice(start + j, 0, range[j]);
    }
};

var move = function (x, y) { 
    var xmove = password.splice(x, 1);
    password.splice(y, 0, xmove[0]);
};


for (var i = 0; i < input.length; i++) {
    var line = input[i].split(' ');
    if (line[0] === 'swap') {
        if (line[1] === 'position') {
            swapPos(line[2], line[5]);
        } else if (line[1] === 'letter') {
            swapLetters(line[2], line[5]);
        }
    } else if (line[0] === 'rotate') {
        if (line[1] === 'based') {
            rotatePos(line[line.length - 1]);
        } else {
            rotateSteps(line[1], line[2]);
        }
    } else if (line[0] === 'reverse') {
        reverse(line[2], line[4]);
    } else if (line[0] === 'move') {
        move(line[2], line[5]);
    }
}

var scramble = password.join('');
console.log(scramble);
