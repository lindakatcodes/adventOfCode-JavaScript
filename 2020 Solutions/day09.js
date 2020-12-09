import { createRequire } from 'module';
import * as h from '../helpers.js';

const require = createRequire(import.meta.url);
const fs = require('fs');

const data = fs.readFileSync('./2020 Solutions/inputs/day09input.txt').toString();

const xmas = h.numInput(data);
const preamble = 25;
let nonSum = 0;

// check if a sum of two numbers equals a provided number
function sumExists(range, num) {
  let exists = false;

  for (let i = 0; i < range.length; i++) {
    const firstNum = range[i];
    const match = range.find((val) => val + firstNum === num);
    if (match) {
      exists = true;
      break;
    }
  }
  return exists;
}

// starting from a specific index, add next numbers until we meet the numNeeded - if exact match, return the range; if we go over, return false
function sumOfNum(numNeeded, startIndex) {
  let acc = xmas[startIndex];

  for (let i = startIndex + 1; i < xmas.length; i++) {
    if (xmas[i] !== numNeeded) {
      acc += xmas[i];
      if (acc === numNeeded) {
        return [startIndex, i];
      }
      if (acc > numNeeded) {
        return false;
      }
    }
  }
  return false;
}

// part 1 - find the first number that doesn't match the pattern
for (let i = 0; i < xmas.length; i++) {
  const testRange = xmas.slice(i, i + preamble);
  const numToCheck = xmas[preamble + i];
  const fitsPattern = sumExists(testRange, numToCheck);
  if (!fitsPattern) {
    nonSum = numToCheck;
    break;
  }
}

console.log(nonSum);

// part 2 - find the range that adds up to that number, then return the sum of the smallest and largest nums from that range
let breakNum = 0;
for (let i = 0; i < xmas.length; i++) {
  const sumRange = sumOfNum(nonSum, i);
  if (sumRange !== false) {
    const answerRange = xmas.slice(sumRange[0], sumRange[1] + 1);
    // console.log(answerRange);
    const sorted = answerRange.sort((a, b) => a - b);
    // console.log(sorted);
    breakNum = sorted[0] + sorted[sorted.length - 1];
    break;
  }
}

console.log(breakNum);
