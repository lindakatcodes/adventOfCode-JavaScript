const fs = require('fs');

const data = fs.readFileSync('../2017 Solutions/inputs/day22Input.txt').toString();

const input = data.split('\r\n');

// increase size of input with clean nodes
let cols = 500;

let init = input.length;

for (let a = 0; a < init; a++) {
    let newLen = Math.floor(cols / 2) - Math.floor(init / 2);
    let temp = Array.from(input[a]);
    temp.unshift(Array(newLen).fill('.').join(''));
    temp.push(Array(newLen + 1).fill('.').join(''));
    let full = temp.join('');
    input.splice(a, 1, full);
}

while (input.length < 500) {
    input.unshift(Array(cols).fill('.').join(''));
    input.push(Array(cols).fill('.').join(''));
}

let current = [Math.floor(input.length / 2), Math.floor(input[0].length / 2)];
let direction = 'U';

let rounds = 10000000;
let infected = 0;

function burst(curr, dir) {
    let currNode = input[curr[0]][curr[1]];
    let newStatus = '';

    if (currNode === '#') {
        direction = changeDir('r', dir);
        newStatus = 'F';
    } else if (currNode === '.') {
        direction = changeDir('l', dir);
        newStatus = 'W';
    } else if (currNode === 'W') {
        newStatus = '#';
        infected++;
    } else if (currNode === 'F') {
        direction = changeDir('rev', dir);
        newStatus = '.';
    }

    switch (direction) {
    case 'U':
        current = [curr[0] - 1, curr[1]];
        break;
    case 'D':
        current = [curr[0] + 1, curr[1]];
        break;
    case 'L':
        current = [curr[0], curr[1] - 1];
        break;
    case 'R':
        current = [curr[0], curr[1] + 1];
        break;
    }

    let updatedRow = input[curr[0]].slice(0, curr[1]) + newStatus + input[curr[0]].slice(curr[1] + 1);

    input.splice(curr[0], 1, updatedRow);
}

function changeDir(change, currDir) {
    if (change === 'l') {
        switch (currDir) {
        case 'U':
            return 'L';
            break;
        case 'D':
            return 'R';
            break;
        case 'L':
            return 'D';
            break;
        case 'R':
            return 'U';
            break;
        }
    } else if (change === 'r') {
        switch (currDir) {
        case 'U':
            return 'R';
            break;
        case 'D':
            return 'L';
            break;
        case 'L':
            return 'U';
            break;
        case 'R':
            return 'D';
            break;
        }
    } else if (change === 'rev') {
        switch (currDir) {
        case 'U':
            return 'D';
            break;
        case 'D':
            return 'U';
            break;
        case 'L':
            return 'R';
            break;
        case 'R':
            return 'L';
            break;
        }
    }
}

for (let i = 0; i < rounds; i++) {
    burst(current, direction);
}

console.log(`Bursts of activity: ${rounds} causing ${infected} infections.`);
