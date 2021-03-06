//Shoutout to u/bluewave41 for letting me know copy means to fully replace the value, not just add to it! 

/*--- Day 12: Leonardo's Monorail ---

You finally reach the top floor of this building: a garden with a slanted glass ceiling. Looks like there are no more stars to be had.

While sitting on a nearby bench amidst some tiger lilies, you manage to decrypt some of the files you extracted from the servers downstairs.

According to these documents, Easter Bunny HQ isn't just this building - it's a collection of buildings in the nearby area. They're all connected by a local monorail, and there's another building not far from here! Unfortunately, being night, the monorail is currently not operating.

You remotely connect to the monorail control systems and discover that the boot sequence expects a password. The password-checking logic (your puzzle input) is easy to extract, but the code it uses is strange: it's assembunny code designed for the new computer you just assembled. You'll have to execute the code and get the password.

The assembunny code you've extracted operates on four registers (a, b, c, and d) that start at 0 and can hold any integer. However, it seems to make use of only a few instructions:

cpy x y copies x (either an integer or the value of a register) into register y.
inc x increases the value of register x by one.
dec x decreases the value of register x by one.
jnz x y jumps to an instruction y away (positive means forward; negative means backward), but only if x is not zero.
The jnz instruction moves relative to itself: an offset of -1 would continue at the previous instruction, while an offset of 2 would skip over the next instruction.

For example:

cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a

The above code would set register a to 41, increase its value by 2, decrease its value by 1, and then skip the last dec a (because a is not zero, so the jnz a 2 skips it), leaving register a at 42. When you move past the last instruction, the program halts.

After executing the assembunny code in your puzzle input, what value is left in register a?

--- Part Two ---

As you head down the fire escape to the monorail, you notice it didn't start; register c needs to be initialized to the position of the ignition key.

If you instead initialize register c to be 1, what value is now left in register a? */


//puzzle input and test input
var input = ['cpy 1 a', 'cpy 1 b', 'cpy 26 d', 'jnz c 2', 'jnz 1 5', 'cpy 7 c', 'inc d', 'dec c', 'jnz c -2', 'cpy a c', 'inc a', 'dec b', 'jnz b -2', 'cpy c b', 'dec d', 'jnz d -6', 'cpy 13 c', 'cpy 14 d', 'inc a', 'dec d', 'jnz d -2', 'dec c', 'jnz c -5'];

var test = ['cpy 41 a', 'inc a', 'inc a', 'dec a', 'jnz a 2', 'dec a'];

//registers - for part 2, simply change c from 0 to 1
var a = 0;
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
    //jump - check the first number to be sure it's not zero (being read as a string is fine here as !== will still read it as not zero)
    //then and the move step to your current position and return that number to your for loop so it'll go over the correct line, as long as you're not past the overall length
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
    return false; // so assigning run to this function below will only change i if it's a valid jump move
}

for (var i = 0; i < input.length; i++) {
    var run = parseInput(input[i], i);
    if (run) {
        i = run - 1; //-1 so the for loop will do the right line after it increases it by 1 on the next iteration
        run = false; //reset so it doesn't read if it's not meant to
    }
}

console.log("Final values: a = " + a + "; b = " + b + "; c = " + c + "; d = " + d);
