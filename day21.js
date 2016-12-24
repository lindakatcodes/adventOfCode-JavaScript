//cannot for the life of me get part 2 to return the correct answer. NO IDEA WHAT'S WRONG. correct should be gahedfcb

/* --- Day 21: Scrambled Letters and Hash ---

The computer system you're breaking into uses a weird scrambling function to store its passwords. It shouldn't be much trouble to create your own scrambled password so you can add it to the system; you just have to implement the scrambler.

The scrambling function is a series of operations (the exact list is provided in your puzzle input). Starting with the password to be scrambled, apply each operation in succession to the string. The individual operations behave as follows:

swap position X with position Y means that the letters at indexes X and Y (counting from 0) should be swapped.
swap letter X with letter Y means that the letters X and Y should be swapped (regardless of where they appear in the string).
rotate left/right X steps means that the whole string should be rotated; for example, one right rotation would turn abcd into dabc.
rotate based on position of letter X means that the whole string should be rotated to the right based on the index of letter X (counting from 0) as determined before this instruction does any rotations. Once the index is determined, rotate the string to the right one time, plus a number of times equal to that index, plus one additional time if the index was at least 4.
reverse positions X through Y means that the span of letters at indexes X through Y (including the letters at X and Y) should be reversed in order.
move position X to position Y means that the letter which is at index X should be removed from the string, then inserted such that it ends up at index Y.
For example, suppose you start with abcde and perform the following operations:

swap position 4 with position 0 swaps the first and last letters, producing the input for the next step, ebcda.
swap letter d with letter b swaps the positions of d and b: edcba.
reverse positions 0 through 4 causes the entire string to be reversed, producing abcde.
rotate left 1 step shifts all letters left one position, causing the first letter to wrap to the end of the string: bcdea.
move position 1 to position 4 removes the letter at position 1 (c), then inserts it at position 4 (the end of the string): bdeac.
move position 3 to position 0 removes the letter at position 3 (a), then inserts it at position 0 (the front of the string): abdec.
rotate based on position of letter b finds the index of letter b (1), then rotates the string right once plus a number of times equal to that index (2): ecabd.
rotate based on position of letter d finds the index of letter d (4), then rotates the string right once, plus a number of times equal to that index, plus an additional time because the index was at least 4, for a total of 6 right rotations: decab.
After these steps, the resulting scrambled password is decab.

Now, you just need to generate a new scrambled password and you can access the system. Given the list of scrambling operations in your puzzle input, what is the result of scrambling abcdefgh?

--- Part Two ---

You scrambled the password correctly, but you discover that you can't actually modify the password file on the system. You'll need to un-scramble one of the existing passwords by reversing the scrambling process.

What is the un-scrambled version of the scrambled password fbgdceah? */


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

//function to reverse rotating by step
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

//function to reverse rotating by position
var rotatePosR = function (letter, ind) {
    var curr = password.indexOf(letter);    
    var orig;    
    for (var a = posInd.length - 1; a >= 0; a--) {
        if (posInd[a][0] == ind) {
            orig = posInd[a][1];
            break;
        }
    }
    var spot = curr;
    while (spot !== orig) {
        var steps = spot;
        var left2 = password.splice(0, 1);
        password.push(left2[0]);
        spot = password.indexOf(letter);
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
function parse(password) {
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
    return password;
}

//rejoin password to string and log
var part1 = parse(password);
var scramble = part1.join('');
console.log(scramble);

//set new password for part 2
password = ['f', 'b', 'g', 'd', 'c', 'e', 'a', 'h'];

//reverse function
function parseR(password) {
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
return password;
}

var part2 = parseR(password);
var unscramble = part2.join('');
console.log(unscramble);
