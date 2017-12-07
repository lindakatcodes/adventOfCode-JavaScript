const input = [2, 8, 8, 5, 4, 2, 3, 1, 5, 5, 1, 2, 15, 13, 5, 14];

let round1 = input.slice();
let numStates = 0;
let prevStates = [];
let numCycles = 0;
let cycleInit = '';

function redist() {
    // find highest num in array
    let highValue = 0;
    let highIndex = 0;

    for (let i = 0; i < round1.length; i++) {
        let curr = round1[i];
        if (curr > highValue) {
            highValue = curr;
        }
    }
    // set that index to 0, store the number it was
    highIndex = round1.indexOf(highValue);
    round1.splice(highIndex, 1, 0);
    // while that number isn't 0, go to each index and add 1, checking for end of array and looping back around
    while (highValue !== 0) {
        highIndex++;
        if (highIndex >= round1.length) {
            highIndex = 0;
        }
        round1.splice(highIndex, 1, round1[highIndex] + 1);
        highValue--;
    }
    // update state counter, if in part 1
    if (cycleInit === '') {
        numStates++;
    }
    // while this array order doesn't equal one in our store, repeat
    let stateString = round1.join(' ');
    if (cycleInit === '') {
        if (prevStates.indexOf(stateString) === -1) {
            let copy = round1.slice().join(' ');
            prevStates.push(copy);
            redist();
        } else {
            cycleInit = stateString;
            redist();
        }
    } else {
        numCycles++;
        if (stateString !== cycleInit) {
            redist();
        } else if (stateString === cycleInit) {
            return;
        }
    }
}

redist();
console.log(`Part 1: the inifite loop was detected after ${numStates} iterations.`);
console.log(`Part 2: the loop has ${numCycles} cycles.`);
