/*
--- Day 3: Spiral Memory ---

You come across an experimental new kind of memory stored on an infinite two-dimensional grid.

Each square on the grid is allocated in a spiral pattern starting at a location marked 1 and then counting up while spiraling outward. For example, the first few squares are allocated like this:

17  16  15  14  13
18   5   4   3  12
19   6   1   2  11
20   7   8   9  10
21  22  23---> ...
While this is very space-efficient (no squares are skipped), requested data must be carried back to square 1 (the location of the only access port for this memory system) by programs that can only move up, down, left, or right. They always take the shortest path: the Manhattan Distance between the location of the data and square 1.

For example:

Data from square 1 is carried 0 steps, since it's at the access port.
Data from square 12 is carried 3 steps, such as: down, left, left.
Data from square 23 is carried only 2 steps: up twice.
Data from square 1024 must be carried 31 steps.
How many steps are required to carry the data from the square identified in your puzzle input all the way to the access port?

--- Part Two ---

As a stress test on the system, the programs here clear the grid and then store the value 1 in square 1. Then, in the same allocation order as shown above, they store the sum of the values in all adjacent squares, including diagonals.

So, the first few squares' values are chosen as follows:

Square 1 starts with the value 1.
Square 2 has only one adjacent filled square (with value 1), so it also stores 1.
Square 3 has both of the above squares as neighbors and stores the sum of their values, 2.
Square 4 has all three of the aforementioned squares as neighbors and stores the sum of their values, 4.
Square 5 only has the first and fourth squares as neighbors, so it gets the value 5.
Once a square is written, its value does not change. Therefore, the first few squares would receive the following values:

147  142  133  122   59
304    5    4    2   57
330   10    1    1   54
351   11   23   25   26
362  747  806--->   ...
What is the first value written that is larger than your puzzle input?
*/

// add 2 onto counter
// multiply counter by itself - this is number of numbers to add
// increase number counter
// if input is not contained in numbers - repeat

let counter = 1;
let maxNum = 1;
let numIndex, 
numPos = 0;
let botLeft, 
topLeft, 
topRight = 0;
let top, 
left, 
bottom, 
right, 
corner = false;

let input = 347991;

expandSquare();

function findPosition(num, start, end) {
    if (right) {
        numPos = 1;
    }
    while (num > start) {
        numPos++;
        start++;
    }
}

function expandSquare() {
    counter += 2;
    maxNum = counter * counter;
    botLeft = maxNum - (counter - 1);
    topLeft = botLeft - (counter - 1);
    topRight = topLeft - (counter - 1);

    if (input > maxNum) {
        expandSquare();
    }
}

if (maxNum > input && input > botLeft) {
    bottom = true;
    findPosition(input, botLeft, maxNum);
} else if (botLeft > input && input > topLeft) {
    left = true;
    findPosition(input, topLeft, botLeft);
} else if (topLeft > input && input > topRight) {
    top = true;
    findPosition(input, topRight, topLeft);
} else if (input == maxNum || input == botLeft || input == topLeft || input == topRight) {
    corner = true;
} else {
    right = true;
    findPosition(input, topRight - (counter - 2), topRight);
}

let inputPlace = '';

if (bottom) {
    inputPlace += 'Bottom row';
} else if (top) {
    inputPlace += 'Top row';
} else if (left) {
    inputPlace += 'Left column';
} else if (right) {
    inputPlace += 'Right column';
} else if (corner) {
    inputPlace += 'corner';
}

// regardless of direction, we need to divide the counter by 2 to get the center row index - 0 based, so round down
let centerIndex = Math.floor(counter / 2);

if (inputPlace == 'corner') {
    numIndex = centerIndex + centerIndex;
} else {
    numIndex = centerIndex + Math.abs((centerIndex - numPos));
}

console.log(`Input is ${input}. The highest number in the spiral is ${maxNum}. Our spiral has ${counter} rows and columns. Bottom left is ${botLeft}, top left is ${topLeft}, and top right is ${topRight}. Our input is on the ${inputPlace}. We need to move ${numIndex} spaces to reach the center.`);

// Couldn't figure out how to code part 2 - ended up using Excel and just brute forcing the thing. Will try to figure it out...someday.

