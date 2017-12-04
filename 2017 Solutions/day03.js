// add 2 onto counter
// multiply counter by itself - this is number of numbers to add
// increase number counter
// if input is not contained in numbers - repeat

let counter = 1;
let maxNum = 1;
let numIndex, numPos = 0;
let botLeft, topLeft, topRight = 0;
let top, left, bottom, right, corner = false;

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

//Couldn't figure out how to code part 2 - ended up using Excel and just brute forcing the thing. Will try to figure it out...someday.

