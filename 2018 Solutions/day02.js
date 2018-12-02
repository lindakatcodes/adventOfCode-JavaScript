const fs = require('fs');

// Change number on input file before use
const data = fs.readFileSync('../2018 Solutions/inputs/day02input.txt').toString();

// Need an array of strings?
const input = data.split('\r\n');

let countDouble = 0;
let countTriple = 0;

for (let i = 0; i < input.length; i++) {
    let label = input[i].split('');
    let letterCount = {};

    label.reduce((letters, letter) => {
        if (letter in letterCount) {
            letterCount[letter]++;
        } else {
            letterCount[letter] = 1;
        }
        return letters;
    }, 0);

    let checkCounts = Object.values(letterCount);
    if (checkCounts.includes(2)) {
        countDouble++;
    }
    if (checkCounts.includes(3)) {
        countTriple++;
    }
}

let checksum = countDouble * countTriple;
console.log(checksum);

for (let i = 0; i < input.length; i++) {
    let root = input[i];

    for (let j = i+1; j < input.length; j++) {
        let currName = input[j];

        if (compareNames(root, currName)) {
            return;
        }
    }
}

function compareNames(first, second) {
    let differences = 0;
    let locations = [];
    for (let k = 0; k < first.length; k++) {
        if (first[k] === second[k]) {
            continue;
        } else {
            differences++;
            locations.push(k);
        }
    }

    if (differences === 1) {
        const letterArray = first.split('');
        const removeLetter = letterArray.splice(locations[0], 1);
        const matchingLetters = letterArray.join('');
        console.log(`same letters: ${matchingLetters}`);
        return true;
    } else {
        return false;
    }

    differences = 0;
    locations = [];
}