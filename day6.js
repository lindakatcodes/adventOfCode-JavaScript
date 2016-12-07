/*--- Day 6: Signals and Noise ---

Something is jamming your communications with Santa. Fortunately, your signal is only partially jammed, and protocol in situations like this is to switch to a simple repetition code to get the message through.

In this model, the same message is sent repeatedly. You've recorded the repeating message signal (your puzzle input), but the data seems quite corrupted - almost too badly to recover. Almost.

All you need to do is figure out which character is most frequent for each position. For example, suppose you had recorded the following messages:

eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar

The most common character in the first column is e; in the second, a; in the third, s, and so on. Combining these characters returns the error-corrected message, easter.

Given the recording in your puzzle input, what is the error-corrected version of the message being sent?

--- Part Two ---

Of course, that would be the message - if you hadn't agreed to use a modified repetition code instead.

In this modified code, the sender instead transmits what looks like random data, but for each character, the character they actually want to send is slightly less likely than the others. Even after signal-jamming noise, you can look at the letter distributions in each column and choose the least common letter to reconstruct the original message.

In the above example, the least common character in the first column is a; in the second, d, and so on. Repeating this process for the remaining characters produces the original message, advent.

Given the recording in your puzzle input and this new decoding methodology, what is the original message that Santa is trying to send?
*/

//managed on my own today, though I mis-counted the input length at first and spent way too long trying to fix code that wasn't broken and was only missing the last two letters -argh! lolz
//keys to hold all the characters and counts
var key1 = {};
var key2 = {};
var key3 = {};
var key4 = {};
var key5 = {};
var key6 = {};
var key7 = {};
var key8 = {};

//read in input
var fs = require('fs');
var file = fs.readFileSync('\day6input.txt', 'utf8');
var input = file.split('\r\n');

//test input
var test = ['eedadn', 'drvtee', 'eandsr', 'raavrd', 'atevrs', 'tsrnev', 'sdttsa', 'rasrtv', 'nssdts', 'ntnada', 'svetve', 'tesnvt', 'vntsnd', 'vrdear', 'dvrsen', 'enarar'];

//count letters in each position
for (var i = 0; i < input.length; i++) {
    if (key1[input[i][0]]) {
        key1[input[i][0]]++;
    } else {
        key1[input[i][0]] = 1;
    }
    if (key2[input[i][1]]) {
        key2[input[i][1]]++;
    } else {
        key2[input[i][1]] = 1;
    }
    if (key3[input[i][2]]) {
        key3[input[i][2]]++;
    } else {
        key3[input[i][2]] = 1;
    }
    if (key4[input[i][3]]) {
        key4[input[i][3]]++;
    } else {
        key4[input[i][3]] = 1;
    }
    if (key5[input[i][4]]) {
        key5[input[i][4]]++;
    } else {
        key5[input[i][4]] = 1;
    }
    if (key6[input[i][5]]) {
        key6[input[i][5]]++;
    } else {
        key6[input[i][5]] = 1;
    }
    if (key7[input[i][6]]) {
        key7[input[i][6]]++;
    } else {
        key7[input[i][6]] = 1;
    }
    if (key8[input[i][7]]) {
        key8[input[i][7]]++;
    } else {
        key8[input[i][7]] = 1;
    }
}

//sort each array by count and letter - use reverse for part one to get most common, comment it out for part two to get least common
var sorted1 = [];
for (letter in key1) {
    sorted1.push([letter, key1[letter]]);
}
sorted1.sort(function (a, b) {
    var c1 = a[0].toLowerCase();
    var c2 = b[0].toLowerCase();

    var n1 = a[1];
    var n2 = b[1];

    if (n1 < n2) return -1;
    if (n1 > n2) return 1;
    if (c1 > c2) return -1;
    if (c1 < c2) return 1;
    return 0;
})//.reverse();


var sorted2 = [];
for (letter in key2) {
    sorted2.push([letter, key2[letter]]);
}
sorted2.sort(function (a, b) {
    var c1 = a[0];
    var c2 = b[0];

    var n1 = a[1];
    var n2 = b[1];

    if (n1 < n2) return -1;
    if (n1 > n2) return 1;
    if (c1 > c2) return -1;
    if (c1 < c2) return 1;
    return 0;
})//.reverse();


var sorted3 = [];
for (letter in key3) {
    sorted3.push([letter, key3[letter]]);
}
sorted3.sort(function (a, b) {
    var c1 = a[0];
    var c2 = b[0];

    var n1 = a[1];
    var n2 = b[1];

    if (n1 < n2) return -1;
    if (n1 > n2) return 1;
    if (c1 > c2) return -1;
    if (c1 < c2) return 1;
    return 0;
})//.reverse();


var sorted4 = [];
for (letter in key4) {
    sorted4.push([letter, key4[letter]]);
}
sorted4.sort(function (a, b) {
    var c1 = a[0];
    var c2 = b[0];

    var n1 = a[1];
    var n2 = b[1];

    if (n1 < n2) return -1;
    if (n1 > n2) return 1;
    if (c1 > c2) return -1;
    if (c1 < c2) return 1;
    return 0;
})//.reverse();


var sorted5 = [];
for (letter in key5) {
    sorted5.push([letter, key5[letter]]);
}
sorted5.sort(function (a, b) {
    var c1 = a[0];
    var c2 = b[0];

    var n1 = a[1];
    var n2 = b[1];

    if (n1 < n2) return -1;
    if (n1 > n2) return 1;
    if (c1 > c2) return -1;
    if (c1 < c2) return 1;
    return 0;
})//.reverse();


var sorted6 = [];
for (letter in key6) {
    sorted6.push([letter, key6[letter]]);
}
sorted6.sort(function (a, b) {
    var c1 = a[0];
    var c2 = b[0];

    var n1 = a[1];
    var n2 = b[1];

    if (n1 < n2) return -1;
    if (n1 > n2) return 1;
    if (c1 > c2) return -1;
    if (c1 < c2) return 1;
    return 0;
})//.reverse();


var sorted7 = [];
for (letter in key7) {
    sorted7.push([letter, key7[letter]]);
}
sorted7.sort(function (a, b) {
    var c1 = a[0];
    var c2 = b[0];

    var n1 = a[1];
    var n2 = b[1];

    if (n1 < n2) return -1;
    if (n1 > n2) return 1;
    if (c1 > c2) return -1;
    if (c1 < c2) return 1;
    return 0;
})//.reverse();


var sorted8 = [];
for (letter in key8) {
    sorted8.push([letter, key8[letter]]);
}
sorted8.sort(function (a, b) {
    var c1 = a[0];
    var c2 = b[0];

    var n1 = a[1];
    var n2 = b[1];

    if (n1 < n2) return -1;
    if (n1 > n2) return 1;
    if (c1 > c2) return -1;
    if (c1 < c2) return 1;
    return 0;
})//.reverse();

//put together message
var message = [];
message[0] = sorted1[0][0];
message[1] = sorted2[0][0];
message[2] = sorted3[0][0];
message[3] = sorted4[0][0];
message[4] = sorted5[0][0];
message[5] = sorted6[0][0];
message[6] = sorted7[0][0];
message[7] = sorted8[0][0];
var final = message.join('');

console.log(final);
