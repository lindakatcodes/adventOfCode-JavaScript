//part 1 solved thanks to lots of people posting about the Numberphile video; part 2 thanks to u/BOT-Brad 

var input = 3004953;

//part 1 - thanks to numberphile video on Josephus problem - converts input to binary, removes first number, adds it to the end, then converts back to decimal
var string = input.toString(2);
var arr = string.split('');
var first = arr.shift();
arr.push(first);
var newbin = arr.join('');
var num = parseInt(newbin, 2);
var ans = num.toString(10);
console.log(ans);

//part 2 - writing from BOT-Brad: 
/*Noticed that in the pattern of 1,2,4,10,28,82... where n+1 was equal to 3n-2, the winner would always be elf #1. From this, every additional elf would simply rotate the problem around by 1 elf, unless the winning elf was now equal to the number of elves, then each additional elf would increment the winning elf # by two. */
function largest3n() {
    var a = 2;
    while (a < input) {
        a = a * 3 - 2;
    }
    return (a + 2) / 3;
}

var winner = input - largest3n() + 1;

if (winner >= input) {
    winner = winner * 2 - 9;
}

console.log(winner);

