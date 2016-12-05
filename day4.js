//u/asperellis - sort function borrowed; u/tuxitop for help with cyper (+/- 97)

//read file and split on \n
var fs = require('fs');
var file = fs.readFileSync('\day4input.txt', 'utf8')
var input = file.split('\r\n');

//setup variables - breaking input into chunks, vars for decypering, vars for sorting and adding ids
var room = "";
var secid = "";
var checksum = "";

var cipher = "";
var name = "";
var change = "";

var alpha = {}; 
var sum = 0;
var sorted = [];
var keycheck = "";


for (var i = 0; i < input.length; i++) {
    //break line into sequence, numbers, and bracketed letters - also set initial string to cipher
    var curr = input[i];
    cipher = curr.slice(0, -10).split('');
    room = curr.slice(0, -10).replace(/-/g, '');
    secid = curr.slice(-10, -7);
    checksum = curr.slice(-6, -1);
    //count occurances of each letter in sequence
    for (var j = 0; j < room.length; j++) {
        if (alpha[room[j]]) {
            alpha[room[j]]++;
        } else {
            alpha[room[j]] = 1;
        }    
    }
    //sort occurances by qty and alphabetically
    for (letter in alpha) {
        sorted.push([letter, alpha[letter]]);
    }
    sorted.sort(function (a, b) {
        var c1 = a[0].toLowerCase();
        var c2 = b[0].toLowerCase();

        var n1 = a[1];
        var n2 = b[1];

        if (n1 < n2) return -1;
        if (n1 > n2) return 1;
        if (c1 > c2) return -1;
        if (c1 < c2) return 1;
        return 0;
    }).reverse();

    //if bracketed letters match sorted occurances - real room, add id to sum
    var group = sorted.slice(0, 5);
    for (var t = 0; t < group.length; t++) {
        keycheck += group[t][0];
    }
    if (keycheck === checksum) {
        sum += Number(secid);
    }

    //decrypt room name 
    var key = Number(secid);
    for (var k = 0; k < cipher.length; k++) {
        var start = cipher[k].charCodeAt() - 97;
        if (start == -52) {
            start = " ";
            name += start;
        } else {
            change = (start + key) % 26 + 97;
            name += String.fromCharCode(change);
        } 
    }

    //if name contains north, likely the real room, print it out    
    if (name.includes('north')) {
        console.log("possible location: " + name + " in sector " + secid);
    }
    
    //reset variables for no cross-over
    room = "";
    secid = "";
    checksum = "";
    keycheck = "";
    name = "";
    alpha = {};
    sorted = [];
}
//print out sum var
console.log("sum of ids: " + sum);