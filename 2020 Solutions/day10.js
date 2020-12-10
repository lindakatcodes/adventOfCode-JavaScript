import { createRequire } from 'module';
import * as h from '../helpers.js';

const require = createRequire(import.meta.url);
const fs = require('fs');

const data = fs.readFileSync('./2020 Solutions/inputs/day10input.txt').toString();

const adapters = h.numInput(data);
const sortedAdapters = adapters.sort((a, b) => a - b);
console.log(sortedAdapters.length);
const diffs = {
  diff1: 0,
  diff2: 0,
  diff3: 1,
};
let currVal = 0;

for (let i = 0; i < sortedAdapters.length; i++) {
  const joltDiff = sortedAdapters[i] - currVal;
  console.log(joltDiff, sortedAdapters[i]);
  const addStr = `diff${joltDiff}`;
  diffs[addStr]++;
  currVal = sortedAdapters[i];
}

// console.log(diffs);
console.log(`part 1 answer: ${diffs.diff1 * diffs.diff3}`);

// part 2 copied from u/barricuda - honestly still don't quite understand why it works, but it does
sortedAdapters.unshift(0);
sortedAdapters.push(sortedAdapters[sortedAdapters.length - 1] + 3);

const poss = [1];

function seq(index, diff) {
  return sortedAdapters[index - diff] >= sortedAdapters[index] - 3 ? poss[index - diff] : 0;
}

for (let i = 1; i < sortedAdapters.length; i++) {
  const count = seq(i, 1) + seq(i, 2) + seq(i, 3);
  // console.log(count);
  poss.push(count);
}

console.log(poss);
console.log(poss[poss.length - 1]);
