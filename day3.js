//learning to read files, woo! much better than manually imputing the values lolz

/*--- Day 3: Squares With Three Sides ---

Now that you can think clearly, you move deeper into the labyrinth of hallways and office furniture that makes up this part of Easter Bunny HQ. This must be a graphic design department; the walls are covered in specifications for triangles.

Or are they?

The design document gives the side lengths of each triangle it describes, but... 5 10 25? Some of these aren't triangles. You can't help but mark the impossible ones.

In a valid triangle, the sum of any two sides must be larger than the remaining side. For example, the "triangle" given above is impossible, because 5 + 10 is not larger than 25.

In your puzzle input, how many of the listed triangles are possible?

--- Part Two ---

Now that you've helpfully marked up their design documents, it occurs to you that triangles are specified in groups of three vertically. Each set of three numbers in a column specifies a triangle. Rows are unrelated.

For example, given the following specification, numbers with the same hundreds digit would be part of the same triangle:

101 301 501
102 302 502
103 303 503
201 401 601
202 402 602
203 403 603
In your puzzle input, and instead reading by columns, how many of the listed triangles are possible? */


var fs = require('fs');
var file = fs.readFileSync('\day3input.txt', 'utf8').trim().replace(/\s+/g, " "); //trim outer spaces and inner spaces just made to a single space
//turn line breaks into space and split input into an array
var input = file.replace(/\n/g, " ").split(" ");

var tinput = [101, 301, 501, 102, 302, 502, 103, 303, 503, 201, 401, 601, 202, 402, 602, 203, 403, 603];
var meas = [];

var possible = 0;
var impossible = 0;
//values used for reading through file - rows only needed start, columns needed init values to show which column was currently used and mid/end to make keeping track easier
var start = 0;
var sinit = 0;
var mid = 3;
var minit = 3;
var end = 6;
var einit = 6;

//read rows and store each bit into meas
function readBits(file, start) {
    meas = [file[start], file[start + 1], file[start + 2]];
    //making sure it was reading the correct amount and number of values
    //console.log("Sides: " + meas[0] + " " + meas[1] + " " + meas[2]);
}

//read columns and store into meas
function newRead(file, start, mid, end) {
    if (start >= input.length) {
        if (sinit == 0) {
            start = 1;
            sinit = 1;
        } else if (sinit == 1) {
            start = 2;
        }
    }
    meas.push(file[start]);
    if (mid >= input.length) {
        if (minit == 3) {
            mid = 4;
            minit = 4;
        } else if (minit == 4) {
            mid = 5;
        }
    }
    meas.push(file[mid]);
    if (end >= input.length) {
        if (einit == 6) {
            end = 7;
            einit = 7;
        } else if (einit == 7) {
            end = 8;
        }
    }
    meas.push(file[end]);
    //same as in readBits
    //console.log("Sides: " + meas[0] + " " + meas[1] + " " + meas[2]);
    return [start, mid, end];
}

//see if it meets triangle rule - any two sides summed are larger than other side
function testBit() {
    //readBits commented out to run part 2 test
    //readBits(input, start);
    var bit = newRead(input, start, mid, end);

    var try1 = Number(meas[0]) + Number(meas[1]);
    var try2 = Number(meas[1]) + Number(meas[2]);
    var try3 = Number(meas[2]) + Number(meas[0]);

    //make sure math was working correctly - had to add number test to tries bc they were reading as strings and messing up the math    
    //console.log("Test1: " + try1 + " > " + meas[2] + "; Test2: " + try2 + " > " + meas[0] + "; Test3: " + try3 + " > " + meas[1]);

    if (try1 > meas[2] && try2 > meas[0] && try3 > meas[1]) {
        possible++;
    } else {
        impossible++;
    }
    //reset/increment variables so there's no residual crossover
    start = bit[0] + 9;
    mid = bit[1] + 9;
    end = bit[2] + 9;
    meas = [];
}

//actually run test on full input
for (var i = 0; i < input.length/3; i++) {
    testBit();
}

//compared length/3 of input to be sure it was reading all lines
//console.log("Length of input: " + input.length/3);
console.log("Possible triangles: " + possible + "; impossible triangles: " + impossible);
