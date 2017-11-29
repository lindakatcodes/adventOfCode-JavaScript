// shoutout to u/asperellis - sort function borrowed; u/tuxitop for help with cyper (+/- 97); thanks for sharing your code!

/*--- Day 4: Security Through Obscurity ---

Finally, you come across an information kiosk with a list of rooms. Of course, the list is encrypted and full of decoy data, but the instructions to decode the list are barely hidden nearby. Better remove the decoy data first.

Each room consists of an encrypted name (lowercase letters separated by dashes) followed by a dash, a sector ID, and a checksum in square brackets.

A room is real (not a decoy) if the checksum is the five most common letters in the encrypted name, in order, with ties broken by alphabetization. For example:

aaaaa-bbb-z-y-x-123[abxyz] is a real room because the most common letters are a (5), b (3), and then a tie between x, y, and z, which are listed alphabetically.
a-b-c-d-e-f-g-h-987[abcde] is a real room because although the letters are all tied (1 of each), the first five are listed alphabetically.
not-a-real-room-404[oarel] is a real room.
totally-real-room-200[decoy] is not.
Of the real rooms from the list above, the sum of their sector IDs is 1514.

What is the sum of the sector IDs of the real rooms?

--- Part Two ---

With all the decoy data out of the way, it's time to decrypt this list and get moving.

The room names are encrypted by a state-of-the-art shift cipher, which is nearly unbreakable without the right software. However, the information kiosk designers at Easter Bunny HQ were not expecting to deal with a master cryptographer like yourself.

To decrypt a room name, rotate each letter forward through the alphabet a number of times equal to the room's sector ID. A becomes B, B becomes C, Z becomes A, and so on. Dashes become spaces.

For example, the real name for qzmt-zixmtkozy-ivhz-343 is very encrypted name.

What is the sector ID of the room where North Pole objects are stored? */

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
