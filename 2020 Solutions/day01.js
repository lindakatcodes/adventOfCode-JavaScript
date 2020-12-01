import { createRequire } from 'module';
import * as h from '../helpers.js';

const require = createRequire(import.meta.url);
const fs = require('fs');

const data = fs.readFileSync('./2020 Solutions/inputs/day01input.txt').toString();

const numarr = h.numInput(data);
let multiplied = 0;

// part 1
for (let i = 0; i < numarr.length; i++) {
  const numOne = numarr[i];
  for (let j = 1; j < numarr.length; j++) {
    const numTwo = numarr[j];
    if (numOne + numTwo === 2020) {
      multiplied = numOne * numTwo;
      break;
    }
  }
}

// part 2
const pairs = [];
for (let i = 0; i < numarr.length; i++) {
  const numOne = numarr[i];
  for (let j = 1; j < numarr.length; j++) {
    const numTwo = numarr[j];
    const twoAdded = numOne + numTwo;
    pairs.push(twoAdded);
    const remainder = 2020 - twoAdded;

    const missingNum = numarr.find((num) => num === remainder);

    if (missingNum) {
      multiplied = numOne * numTwo * remainder;
      break;
    }
  }
}

console.log(multiplied);
