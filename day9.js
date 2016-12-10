//shoutout to u/rhardih for sharing the algorithm for part two - worked like a charm! part one I figured out on my own with the help of learning vs code's debugger

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