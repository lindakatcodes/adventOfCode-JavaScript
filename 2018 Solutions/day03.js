const fs = require('fs');

// Change number on input file before use
const data = fs.readFileSync('../2018 Solutions/inputs/day03Input.txt').toString();

// Need an array of strings?
const input = data.split('\r\n');

const fabric = Array(1000);
fabric.fill('.'.repeat(1000));

let cleanIds = [];
let superCleanIds = [];

function fillSpaces(left, top, width, height, id) {
    // this will count how many bits don't have an x - not overlapped
    let overlap = 0;
    // row = top & height, col = left & width
    for (let j = 0; j < height; j++) {
        let col = top + j;
        // go down from top of fabric
        let start = fabric[col].split('');
        // go in from left, change next size[0] spaces
        let row = start.slice(left, (left + width));
        let newRow = row.map(space => (space === '.' ? '#' : 'X'));
        if (!newRow.includes('X')) {
            overlap++;
        }
        start.splice(left, width, ...newRow);
        fabric[col] = start.join('');
        // go down one & repeat until size[1] reached
    }

    if (overlap === height) {
        let noNumSign = id.split('');
        noNumSign.splice(0, 1);
        cleanIds.push(noNumSign.join(''));
    }
}

for (let i = 0; i < input.length; i++) {
    const instruct = input[i].split(' ');
    const location = instruct[2].substring(0, instruct[2].length - 1).split(',').map(Number);
    const size = instruct[3].split('x').map(Number);

    fillSpaces(location[0], location[1], size[0], size[1], instruct[0]);
}

let squareInches = 0;

fabric.map((row) => {
    let rowCount = row.split('').reduce((acc, curr) => {
        if (curr === 'X') {
            squareInches++;
        }
    }, 0);
    return rowCount;
});

console.log(squareInches);

function checkSpaces(left, top, width, height, id) {
    let overlap = 0;

    for (let j = 0; j < height; j++) {
        let col = top + j;
        // go down from top of fabric
        let start = fabric[col].split('');
        // go in from left, change next size[0] spaces
        let row = start.slice(left, (left + width));
        if (!row.includes('X')) {
            overlap++;
        }
    }

    if (overlap === height) {
        superCleanIds.push(id);
    }
}

// double checking cleanIds list to see what's still clean
for (let i = 0; i < cleanIds.length; i++) {
    const currId = parseInt(cleanIds[i], 10);
    const instruct = input[currId - 1].split(' ');
    const location = instruct[2].substring(0, instruct[2].length - 1).split(',').map(Number);
    const size = instruct[3].split('x').map(Number);

    checkSpaces(location[0], location[1], size[0], size[1], instruct[0]);
}


console.log(superCleanIds);
