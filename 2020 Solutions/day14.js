import { createRequire } from 'module';
import * as h from '../helpers.js';

const require = createRequire(import.meta.url);
const fs = require('fs');

const data = fs.readFileSync('./2020 Solutions/inputs/day14input.txt').toString();

const program = h.strInput(data);
const masks = [];

const dataPoints = program.map((row) => {
  const split = row.split(' = ');
  // console.log(split);
  if (!row.includes('mask')) {
    const location = split[0].match(/(\d+)/)[0];
    const num = parseInt(split[1]);
    return [location, num];
  }
  const singleMask = split[1].split('');
  masks.push(singleMask);
});

// console.log(dataPoints);
// console.log(mask);

const values = new Map();
let currMask = masks[0];
let currMaskIdx = 0;

function getFullStr(str) {
  const digitLen = str.length;
  let withZeroes = '';
  for (let x = 0; x < 36 - digitLen; x++) {
    withZeroes += '0';
  }
  withZeroes += str;
  return withZeroes;
}

function mapMask(str) {
  const afterMask = str.map((digit, idx) => {
    if (currMask[idx] !== 'X') {
      return currMask[idx];
    }
    return digit;
  });
  return afterMask;
}

function convertVal(value) {
  const strNum = parseInt(value, 2);
  const decStr = strNum.toString();
  return decStr;
}

for (let i = 0; i < dataPoints.length; i++) {
  if (dataPoints[i] === undefined) {
    if (i !== 0) {
      currMaskIdx++;
      currMask = masks[currMaskIdx];
    }
  } else {
    const binaryNum = dataPoints[i][1].toString(2);
    const fullStr = getFullStr(binaryNum).split('');
    // console.log(`str: ${fullStr.join('')}`);
    const mappedVal = mapMask(fullStr);
    // console.log(afterMask);
    values.set(dataPoints[i][0], mappedVal.join(''));
  }
}

// console.log(values);

let sum = 0;
for (const val of values.values()) {
  const dec = parseInt(convertVal(val), 10);
  sum += dec;
}
console.log(sum);
