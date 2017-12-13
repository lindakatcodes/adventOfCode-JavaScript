const fs = require('fs');

const data = fs.readFileSync('../2017 Solutions/inputs/day12Input.txt').toString();
const dataArray = data.split('\r\n');
const input = dataArray.map(set => set.split(' '));

// start with 0
let connected = [0];
let tested = [];
let removed = [];

function getIndex(value) {
    for (let i = 0; i < input.length; i++) {
        if (input[i][0] == value) {
            return i;
        }
    }
}

function checkPrograms(val, ind) {
    // get number of connected array, and check it
    let testing = val;
    // add numbers it's connected with to an array
    let toTest = input[ind].slice(2);
    // get it's connections - if they're already in the connected array or already tested, skip
    for (let i = 0; i < toTest.length; i++) {
        let curr = parseInt(toTest[i], 10);
        if (connected.includes(curr) || tested.includes(curr)) {
            continue;
        } else {
            // otherwise, add to connected array
            connected.push(curr);
        }
    }
    // once the testing number is done, add it to tested
    tested.push(testing);
    // remove that index from input, so we can narrow down groups
    removed.push(input.splice(ind, 1));
}
// continue until all connected values are in tested
// get length of connected array - should be answer

let groups = 0;

function findGroups() {
    for (let i = 0; i < connected.length; i++) {
        let val = connected[i];
        let ind = getIndex(val);
        checkPrograms(val, ind);
    }

    groups++;

    if (input.length > 0) {
        let next = parseInt(input[0][0], 10);
        connected = [next];
        tested = [];
        findGroups();
    }
}

findGroups();

// console.log(`connected: ${connected.length}`);
console.log(`Num. of groups: ${groups}`);
