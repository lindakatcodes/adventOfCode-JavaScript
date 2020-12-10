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

console.log(diffs);
console.log(`part 1 answer: ${diffs.diff1 * diffs.diff3}`);
