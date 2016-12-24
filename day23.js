
//puzzle input and test input
var input = ['cpy a b', 'dec b', 'cpy a d', 'cpy 0 a', 'cpy b c', 'inc a', 'dec c', 'jnz c -2', 'dec d', 'jnz d -5', 'dec b', 'cpy b c', 'cpy c d', 'dec d', 'inc c', 'jnz d -2', 'tgl c', 'cpy -16 c', 'jnz 1 c', 'cpy 84 c', 'jnz 71 d','inc a', 'inc d', 'jnz d -2', 'inc c', 'jnz c -5'];

var test = ['cpy 2 a', 'tgl a', 'tgl a', 'tgl a', 'cpy 1 a', 'dec a', 'dec a'];

//registers
var a = 12;
var b = 0;
var c = 0;
var d = 0;

//helper function to return the register if it's passed as an argument
function getVar(bit) {
    switch (bit) {
            case 'a':
                return a;
            case 'b':
                return b;
            case 'c':
                return c;
            case 'd':
                return d;
        }
};

function parseInput(line, pos) {
    var bits = line.split(' '); //split up the line you're working on
    //cpy - get the amount you're copying, make sure it's read as a number, and assign it to the requested register
    if (bits[0] === 'cpy') {
        var amt = 0;
        if (bits[1] === 'a' || bits[1] === 'b' || bits[1] === 'c' || bits[1] === 'd') {
            amt = getVar(bits[1]);
        } else {
            amt = Number(bits[1]);
        }
        switch (bits[2]) {
            case 'a':
                a = amt;
                break;
            case 'b':
                b = amt;
                break;
            case 'c':
                c = amt;
                break;
            case 'd':
                d = amt;
                break;
        }
    }
    //increase by 1
    if (bits[0] === 'inc') {
        switch (bits[1]) {
            case 'a':
                a ++;
                break;
            case 'b':
                b ++;
                break;
            case 'c':
                c ++;
                break;
            case 'd':
                d ++;
                break;
        }
    }
    //decrease by 1
    if (bits[0] === 'dec') {
        switch (bits[1]) {
            case 'a':
                a --;
                break;
            case 'b':
                b --;
                break;
            case 'c':
                c --;
                break;
            case 'd':
                d --;
                break;
        }
    }
    //jump - check the first number to be sure it's not zero 
    //then add the move step to your current position and return that number to your for loop so it'll go over the correct line, as long as you're not past the overall length
    if (bits[0] === 'jnz') {
        var num;
        if (bits[1] === 'a' || bits[1] === 'b' || bits[1] === 'c' || bits[1] === 'd') {
            num = getVar(bits[1]);
        } else {
            num = Number(bits[1]);
        }
        if (num !== 0) {
            var move;
            if (bits[2] === 'a' || bits[2] === 'b' || bits[2] === 'c' || bits[2] === 'd') {
            move = getVar(bits[2]);
        } else {
            move = Number(bits[2]);
        }
            var newPos = 0;
            newPos = pos + move;
            if (newPos <= input.length) {
                return newPos;
            }
        } 
    }
    //toggle - simply sets to return true, main function of this is in for loop below
    if (bits[0] === 'tgl') {
        return true;
    }
    return false; // so assigning run to this function below will only change i if it's a valid jump move
}

for (var i = 0; i < input.length; i++) {
    var run = parseInput(input[i], i);
    if (typeof(run) === 'number') { //if run is a number, then it's meant for jump
        i = run - 1; //-1 so the for loop will do the right line after it increases it by 1 on the next iteration
        run = false; //reset so it doesn't read if it's not meant to
    }
    if (run === true) { //if run is true it's meant for toggle
        var bits2 = input[i].split(' ');
        var dir;
        var put;
        if (bits2[1] === 'a' || bits2[1] === 'b' || bits2[1] === 'c' || bits2[1] === 'd') { //get value for tgl
            dir = getVar(bits2[1]);
        } else {
            dir = Number(bits2[1]);
        }
        if ((i + dir) >= input.length) { //if it's past the scope of instructions, just go on
            continue;
        }
        var next = input[i + dir].split(' ');
        if (next == undefined) { //if next doesn't exist, go on
            continue;
        }
        if (next.length === 2) { //instructions for one-length arguments 
            if (next[0] == 'inc') {
                put = 'dec' + ' ' + next[1];
                input.splice(i + dir, 1, put);
            } else {
                put = 'inc' + ' ' + next[1];
                input.splice(i + dir, 1, put);
            }
        } else if (next.length === 3) { //instructions for two-length arguments
            if (next[0] == 'jnz') {
                put = 'cpy' + ' ' + next[1] + ' ' + next[2];
                input.splice(i + dir, 1, put);
            } else {
                put = 'jnz' + ' ' + next[1] + ' ' + next[2];
                input.splice(i + dir, 1, put);
            }
        }
        run = false; //reset for next go round
    }
}

console.log("Value of a is " + a);