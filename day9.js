//shoutout to u/rhardih for sharing the algorithm for part two - worked like a charm! part one I figured out on my own with the help of learning vs code's debugger

/*--- Day 9: Explosives in Cyberspace ---

Wandering around a secure area, you come across a datalink port to a new part of the network. After briefly scanning it for interesting files, you find one file in particular that catches your attention. It's compressed with an experimental format, but fortunately, the documentation for the format is nearby.

The format compresses a sequence of characters. Whitespace is ignored. To indicate that some sequence should be repeated, a marker is added to the file, like (10x2). To decompress this marker, take the subsequent 10 characters and repeat them 2 times. Then, continue reading the file after the repeated data. The marker itself is not included in the decompressed output.

If parentheses or other characters appear within the data referenced by a marker, that's okay - treat it like normal data, not a marker, and then resume looking for markers after the decompressed section.

For example:

ADVENT contains no markers and decompresses to itself with no changes, resulting in a decompressed length of 6.
A(1x5)BC repeats only the B a total of 5 times, becoming ABBBBBC for a decompressed length of 7.
(3x3)XYZ becomes XYZXYZXYZ for a decompressed length of 9.
A(2x2)BCD(2x2)EFG doubles the BC and EF, becoming ABCBCDEFEFG for a decompressed length of 11.
(6x1)(1x3)A simply becomes (1x3)A - the (1x3) looks like a marker, but because it's within a data section of another marker, it is not treated any differently from the A that comes after it. It has a decompressed length of 6.
X(8x2)(3x3)ABCY becomes X(3x3)ABC(3x3)ABCY (for a decompressed length of 18), because the decompressed data from the (8x2) marker (the (3x3)ABC) is skipped and not processed further.
What is the decompressed length of the file (your puzzle input)? Don't count whitespace.

--- Part Two ---

Apparently, the file actually uses version two of the format.

In version two, the only difference is that markers within decompressed data are decompressed. This, the documentation explains, provides much more substantial compression capabilities, allowing many-gigabyte files to be stored in only a few kilobytes.

For example:

(3x3)XYZ still becomes XYZXYZXYZ, as the decompressed section contains no markers.
X(8x2)(3x3)ABCY becomes XABCABCABCABCABCABCY, because the decompressed data from the (8x2) marker is then further decompressed, thus triggering the (3x3) marker twice for a total of six ABC sequences.
(27x12)(20x12)(13x14)(7x10)(1x12)A decompresses into a string of A repeated 241920 times.
(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN becomes 445 characters long.
Unfortunately, the computer you brought probably doesn't have enough memory to actually decompress the file; you'll have to come up with another way to get its decompressed length.

What is the decompressed length of the file using this improved format? */

//read input
var fs = require('fs');
var file = fs.readFileSync('\day9input.txt', 'utf8');

//vars - store decompressed string, start and end pointers, length of marker, marker, temp storage for substring, and bit to copy
var newline = "";
var pointStart = "";
var pointEnd = "";
var markLen = 0;
var marker = "";
var temp = "";
var tocopy = "";

//part one solution
function partOne() {
    for (var i = 0; i < file.length; i++) {
        //set current point
        pointStart = file[i];
        if (pointStart === "(") {
            var a = i + 1;
            //find where the close bracket is
            pointEnd = file[a];
            while (pointEnd !== ")") {
                a++;
                pointEnd = file[a];
            }
            //store marker string, get length of full marker, and split the marker into bits to copy and how many times
            temp = file.substring(i + 1, a);
            markLen = temp.length + 2;
            marker = temp.split("x");
            //store the string you need to copy & copy it the required amount of times
            tocopy = file.substring(a + 1, a + (1 + Number(marker[0])));
            for (var j = 0; j < marker[1]; j++) {
                newline += tocopy;
            }
            //move i to the current end of the tocopy bit (-1 since the for loop will add the last 1 needed)
            i += markLen + Number(marker[0]) - 1;
            //reset pointEnd so the next time you need it it'll go through the while loop
            pointEnd = "";
        } else {
            //if not a ( bracket, just add that char to the new string
            newline += pointStart;
        }
    }
}

//call part one and log the length of decompressed string
partOne();
console.log(newline.length);

//vars for part two: an array to store weight values; length counter; start and close bracket holders; temp and mark to read marker, and spot to hold end of marker place
var weighted = [];
var len2 = 0;
var pointer = "";
var close = "";
var mark2 = "";
var temp2 = "";
var spot = "";

//part two solution
function partTwo() {
    //set length of weighted array and fill with 1's
    weighted.length = file.length;
    weighted.fill(1);
    for (var a = 0; a < file.length; a++) {
        //set current pointer
        pointer = file[a];
        //if pointer isn't an open bracket, add it's value to length counter
        if (pointer !== "(") {
            len2 += weighted[a];
            //else if it is a bracket, find the close bracket, get the marker and split it into two parts
        } else if (pointer === "(") {
            var b = a + 1;
            close = file[b];
            while (close !== ")") {
                b++;
                close = file[b];
            }
            temp2 = file.substring(a + 1, b);
            mark2 = temp2.split("x");
            //spot holds the place for right after close bracket
            spot = b + 1;
            //for number of spots in marker[0], multiply it's weight by number of repetitions
            for (var c = 0; c < Number(mark2[0]); c++) {
                weighted[spot] *= Number(mark2[1]);
                spot++;
            }
            //move a forward to end of marker so it'll increase one more on the next loop and start in the right spot
            a = b;
        }
    }
}

//call part two and log length
partTwo();
console.log(len2);
