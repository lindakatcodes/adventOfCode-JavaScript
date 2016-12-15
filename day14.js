/*word to the wise, if anyone looks at this as an answer - you should create an array or table to store a bunch of hashes in for part 2. Running this way takes a ridiculously long time. If I had to rewrite this, I would store maybe 10,000 stretched hashes in an array, and then do the main part checking if it exists there or not. Then if the indexes start to reach more than 10,000 I'd add more hashes in some sort of increment, maybe 5.000 at a time or something. Would likely be much faster that way. */

//load crypto library for md5 hash
var crypto = require('crypto');

//puzzle input and integer var
var salt =  'ngcjuoqr';
var i = 0;

//store passing keys and temp holds for possible key checking
var good = [];
var possible = "";
var ind = 0;
var char = "";
var found = false;

//for part 2 - hash the initial hash 2016 times, then use that final hash for comparision - needed for next and check
function stretch(key) {
    var s = 0; 
    var other = key;
    while (s < 2016) {
        var temp = crypto.createHash('md5').update(other).digest('hex');
        other = temp;
        s++;
    }
    return other;
}
//create hash and check quals - contains 3 of same char in a row, then 1 of next 1000 must contain same char 5 times in a row
while (good.length < 64) {
    var prev = crypto.createHash('md5').update(salt + i).digest('hex');
    var next = stretch(prev);
    for (var l = 0; l < next.length; l++) {
        if (next[l + 1] == next[l] && next[l + 2] == next[l]) {
            char = next[l];
            possible = next;
            ind = i + 1;
            break;
        }
    }
    if (possible) {
        for (var j = 0; j < 1000; j++) {
            var test = crypto.createHash('md5').update(salt + ind).digest('hex');
            var check = stretch(test);
            for (var k = 0; k < check.length; k++) {
                if (char == check[k] && char == check[k + 1] && char == check[k + 2] && char == check[k + 3] && char == check[k + 4]) {
                    good.push(next);
                    console.log(good.length + "Found one! Index " + i); //especially helpful while running part 2, which takes for-ev-er (since I didn't think of storing the hashes instead of creating them each time until after it was late and already running lolz)
                    found = true;
                    break;
                }
            }
            if (found === true) {
                break;
            }
            ind++;
        }
    }
    possible = '';
    ind = 0;
    found = false;
    i++;
}

console.log("The 64th key index is " + (i - 1));
