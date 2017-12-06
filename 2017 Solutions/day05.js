const fs = require('fs');

const data = fs.readFileSync('../2017 Solutions/inputs/day05Input.txt').toString();

const original = data.split('\r\n').map(Number);

// sliced original array, so I can reassign it after part 1 back to the original and get the right answer without commenting out the first function call!
let input = original.slice();
let steps = 0;
let move = '';
let currIndex = 0;


while (move !== undefined) {
    follow1();
}

function follow1() {
    move = input[currIndex];

    if (move === 0) {
        let newMove = input[currIndex] + 1;
        input.splice(currIndex, 1, newMove);
        steps++;
    } else if (move > 0 || move < 0) {
        let temp = move;
        let newMove = input[currIndex] + 1;
        input.splice(currIndex, 1, newMove);
        steps++;
        currIndex += temp;
    }
}

console.log(`It took ${steps} steps to exit the maze.`);

input = original.slice();
move = '';
steps = 0;
currIndex = 0;

while (move !== undefined) {
    follow2();
}

function follow2() {
    move = input[currIndex];
    let newMove = '';

    if (move === 0) {
        if (move >= 3) {
            newMove = input[currIndex] - 1;
        } else {
            newMove = input[currIndex] + 1;
        }
        input.splice(currIndex, 1, newMove);
        steps++;
    } else if (move > 0 || move < 0) {
        let temp = move;
        if (move >= 3) {
            newMove = input[currIndex] - 1;
        } else {
            newMove = input[currIndex] + 1;
        }
        input.splice(currIndex, 1, newMove);
        steps++;
        currIndex += temp;
    }
}

console.log(`For part 2, it took ${steps} steps to exit.`);
