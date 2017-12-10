const fs = require('fs');

// Change number on input file before use
const input = fs.readFileSync('../2017 Solutions/inputs/day09Input.txt').toString();


let openGroup = false;
let openGarbage = false;
let openCount = 0;
let score = [];
let total = 0;
let garbagecount = 0;
let removed = [];
let totalRemoved = 0;

for (let i = 0; i < input.length; i++) {
    let current = input[i];

    // is this an exempt? then skip the next char
    if (current === '!') {
        i++;
        continue;
    }

    // first - is a garbage tag open? if so, group tags won't matter
    if (openGarbage) {
        // garbage is open - is this a close garbage tag?
        // close garbage? turn off garbage check
        if (current === '>') {
            openGarbage = false;
            removed.push(garbagecount);
            garbagecount = 0;
            continue;
        }
        // otherwise, doesn't count
        garbagecount++;
        continue;
    }
    // is there a group already open?
    if (openGroup && !openGarbage) {
        // is this an open tag?
        if (current === '{') {
            // if yes to both, inc open count
            openCount++;
        }
        if (current === '<') {
            openGarbage = true;
            continue;
        }
        // close group? add number to score, dec open group
        if (current === '}') {
            score.push(openCount);
            openCount--;
            if (openCount === 0) {
                openGroup = false;
            }
        }
    }

    if (current === '{' && !openGroup) {
        openGroup = true;
        openCount++;
    }
    if (current === '<' && !openGarbage) {
        openGarbage = true;
    }
}

if (score.length > 1) {
    total = score.reduce((a, b) => a + b);
} else if (score.length === 1) {
    total = score[0];
}

if (removed.length > 1) {
    totalRemoved = removed.reduce((a, b) => a + b);
} else if (removed.length === 1) {
    totalRemoved = removed[0];
}

console.log(`Total score: ${total} and total removed = ${totalRemoved}`);
