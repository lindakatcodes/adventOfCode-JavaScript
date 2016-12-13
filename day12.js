
//puzzle input and test input
var input = ['cpy 1 a', 'cpy 1 b', 'cpy 26 d', 'jnz c 2', 'jnz 1 5', 'cpy 7 c', 'inc d', 'dec c', 'jnz c -2', 'cpy a c', 'inc a', 'dec b', 'jnz b -2', 'cpy c b', 'dec d', 'jnz d -6', 'cpy 13 c', 'cpy 14 d', 'inc a', 'dec d', 'jnz d -2', 'dec c', 'jnz c -5'];

var test = ['cpy 41 a', 'inc a', 'inc a', 'dec a', 'jnz a 2', 'dec a'];

//registers
var a = 0;
var b = 0;
var c = 0;
var d = 0;

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
    var bits = line.split(' ');
    //console.log('Executing ' + line);
    if (bits[0] === 'cpy') {
        var amt = 0;
        if (bits[1] === 'a' || bits[1] === 'b' || bits[1] === 'c' || bits[1] === 'd') {
            amt = getVar(bits[1]);
        } else {
            amt = Number(bits[1]);
        }
        switch (bits[2]) {
            case 'a':
                a += amt;
                break;
            case 'b':
                b += amt;
                break;
            case 'c':
                c += amt;
                break;
            case 'd':
                d += amt;
                break;
        }
    }
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
    if (bits[0] === 'jnz') {
        var num = bits[1];
        if (bits[1] === 'a' || bits[1] === 'b' || bits[1] === 'c' || bits[1] === 'd') {
            num = getVar(bits[1]);
        }
        if (num !== 0) {
            var move = Number(bits[2]);
            var newPos = 0;
            newPos = pos + move;
            if (newPos <= input.length) {
                return newPos;
            }
        } 
    }
    //console.log("Line: " + line + "; current var values: a = " + a + "; b = " + b + "; c = " + c + "; d = " + d);
    return false;
}

for (var i = 0; i < input.length; i++) {
    var run = parseInput(input[i], i);
    if (run) {
        i = run - 1;
        run = false;
    }
}

console.log("Final values: a = " + a + "; b = " + b + "; c = " + c + "; d = " + d);