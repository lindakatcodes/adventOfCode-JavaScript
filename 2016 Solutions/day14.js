/*word to the wise, if anyone looks at this as an answer - you should create an array or table to store a bunch of hashes in for part 2. Running this way takes a ridiculously long time. If I had to rewrite this, I would store maybe 10,000 stretched hashes in an array, and then do the main part checking if it exists there or not. Then if the indexes start to reach more than 10,000 I'd add more hashes in some sort of increment, maybe 5.000 at a time or something. Would likely be much faster that way. */

/*--- Day 14: One-Time Pad ---

In order to communicate securely with Santa while you're on this mission, you've been using a one-time pad that you generate using a pre-agreed algorithm. Unfortunately, you've run out of keys in your one-time pad, and so you need to generate some more.

To generate keys, you first get a stream of random data by taking the MD5 of a pre-arranged salt (your puzzle input) and an increasing integer index (starting with 0, and represented in decimal); the resulting MD5 hash should be represented as a string of lowercase hexadecimal digits.

However, not all of these MD5 hashes are keys, and you need 64 new keys for your one-time pad. A hash is a key only if:

It contains three of the same character in a row, like 777. Only consider the first such triplet in a hash.
One of the next 1000 hashes in the stream contains that same character five times in a row, like 77777.
Considering future hashes for five-of-a-kind sequences does not cause those hashes to be skipped; instead, regardless of whether the current hash is a key, always resume testing for keys starting with the very next hash.

For example, if the pre-arranged salt is abc:

The first index which produces a triple is 18, because the MD5 hash of abc18 contains ...cc38887a5.... However, index 18 does not count as a key for your one-time pad, because none of the next thousand hashes (index 19 through index 1018) contain 88888.
The next index which produces a triple is 39; the hash of abc39 contains eee. It is also the first key: one of the next thousand hashes (the one at index 816) contains eeeee.
None of the next six triples are keys, but the one after that, at index 92, is: it contains 999 and index 200 contains 99999.
Eventually, index 22728 meets all of the criteria to generate the 64th key.
So, using our example salt of abc, index 22728 produces the 64th key.

Given the actual salt in your puzzle input, what index produces your 64th one-time pad key?

--- Part Two ---

Of course, in order to make this process even more secure, you've also implemented key stretching.

Key stretching forces attackers to spend more time generating hashes. Unfortunately, it forces everyone else to spend more time, too.

To implement key stretching, whenever you generate a hash, before you use it, you first find the MD5 hash of that hash, then the MD5 hash of that hash, and so on, a total of 2016 additional hashings. Always use lowercase hexadecimal representations of hashes.

For example, to find the stretched hash for index 0 and salt abc:

Find the MD5 hash of abc0: 577571be4de9dcce85a041ba0410f29f.
Then, find the MD5 hash of that hash: eec80a0c92dc8a0777c619d9bb51e910.
Then, find the MD5 hash of that hash: 16062ce768787384c81fe17a7a60c7e3.
...repeat many times...
Then, find the MD5 hash of that hash: a107ff634856bb300138cac6568c0f24.
So, the stretched hash for index 0 in this situation is a107ff.... In the end, you find the original hash (one use of MD5), then find the hash-of-the-previous-hash 2016 times, for a total of 2017 uses of MD5.

The rest of the process remains the same, but now the keys are entirely different. Again for salt abc:

The first triple (222, at index 5) has no matching 22222 in the next thousand hashes.
The second triple (eee, at index 10) hash a matching eeeee at index 89, and so it is the first key.
Eventually, index 22551 produces the 64th key (triple fff with matching fffff at index 22859.
Given the actual salt in your puzzle input and using 2016 extra MD5 calls of key stretching, what index now produces your 64th one-time pad key? */

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
