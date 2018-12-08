const fs = require('fs');

// Change number on input file before use
const data = fs.readFileSync('../2018 Solutions/inputs/day05input.txt').toString();

const input = data.split('');

// 65-90 upper, 97-122 lower
const lowerNums = [97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122];
const upperNums = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90];

function numCheck(one, two) {
    // are they both lower or both upper? close out
    if (lowerNums.includes(one) && lowerNums.includes(two)) {
        return false;
    } else if (upperNums.includes(one) && upperNums.includes(two)) {
        return false;
    }

    // okay, so mixed case - check if same letter
    if (one < two) {
        let upperIndex = upperNums.indexOf(one);
        let lowerIndex = lowerNums.indexOf(two);

        if (lowerIndex === upperIndex) {
            return true;
        }
    } else {
        let upperIndex = upperNums.indexOf(two);
        let lowerIndex = lowerNums.indexOf(one);

        if (lowerIndex === upperIndex) {
            return true;
        }
    }
    return false;
}

function testPolymer(array) {
    let lettersRemoved = 0;
    array.reduce((acc, curr, idx) => {
        let next = array[idx + 1];
        if (next === undefined) {
            return array;
        }
        let volatile = numCheck(curr.charCodeAt(0), next.charCodeAt(0));
        if (volatile) {
            array.splice(idx, 2);
            lettersRemoved++;
        }
        return array;
    }, []);

    if (lettersRemoved > 0) {
        testPolymer(array);
    }
    return array;
}

let part1 = Array.from(input);

testPolymer(part1);

console.log(`Length of polyer after analysis is ${part1.length}`);

// Part 2!
const convertLetters = input.join('').toLowerCase();
let uniqueLetters = Array.from(new Set(convertLetters));
let shortestLength = input.length;

function removeTrouble(arr, letter) {
    let upperLetter = letter.toUpperCase();
    let lowerLetter = letter.toLowerCase();
    let removed = 0;

    arr.map((x, idx) => {
        if (x === upperLetter || x === lowerLetter) {
            arr.splice(idx, 1);
            removed++;
        }
    });

    if (removed > 0) {
        removeTrouble(arr, letter);
    }

    return arr;
}

for (let i = 0; i < uniqueLetters.length; i++) {
    let arrCopy = Array.from(input);
    let test = removeTrouble(arrCopy, uniqueLetters[i]);
    let testLength = testPolymer(test).length;
    if (testLength < shortestLength) {
        shortestLength = testLength;
    }
}

console.log(`The shortest possible length is ${shortestLength}`);
