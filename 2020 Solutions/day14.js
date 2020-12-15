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
    const location = parseInt(split[0].match(/(\d+)/)[0]);
    const num = parseInt(split[1]);
    return [location, num];
  }
  const singleMask = split[1].split('');
  masks.push(singleMask);
  return undefined;
});

// console.log(dataPoints);
// console.log(mask);

let currMask = masks[0];
let currMaskIdx = 0;

function getFullStr(str, len) {
  const digitLen = str.length;
  let withZeroes = '';
  for (let x = 0; x < len - digitLen; x++) {
    withZeroes += '0';
  }
  withZeroes += str;
  return withZeroes;
}

// part 1
function mapMask(str) {
  const afterMask = str.map((digit, idx) => {
    if (currMask[idx] !== 'X') {
      return currMask[idx];
    }
    return digit;
  });
  return afterMask;
}

// part 2
function mapMaskv2(str) {
  const afterMask = str.map((digit, idx) => {
    if (currMask[idx] === '1') {
      return '1';
    }
    if (currMask[idx] === 'X') {
      return 'X';
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

function getIterations(xIdx, arr) {
  const versions = [];
  const possible = 2 ** xIdx.length;

  for (let i = 0; i < possible; i++) {
    // const strLen = '0'.repeat(xIdx.length).split('');
    const tempStr = i.toString(2);
    const binary = getFullStr(tempStr, xIdx.length);

    const newVersion = [...arr];
    xIdx.forEach((indexVal, idx) => {
      newVersion[indexVal] = binary[idx];
    });
    versions.push(newVersion.join(''));
  }

  return versions;
}

// part 1
const values = new Map();
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

// part 2
const values2 = new Map();
for (let i = 0; i < dataPoints.length; i++) {
  if (dataPoints[i] === undefined) {
    if (i !== 0) {
      currMaskIdx++;
      currMask = masks[currMaskIdx];
    }
  } else {
    const binaryNum = dataPoints[i][0].toString(2);
    const fullStr = getFullStr(binaryNum, 36).split('');
    // console.log(`str: ${fullStr.join('')}`);
    const mappedVal = mapMaskv2(fullStr);
    // console.log(mappedVal);
    const xIndexes = [];
    mappedVal.forEach((digit, idx) => (digit === 'X' ? xIndexes.push(idx) : null));
    // console.log(xIndexes);
    // console.log(mappedVal);

    const newAdds = getIterations(xIndexes, mappedVal);
    newAdds.forEach((address) => {
      const converted = convertVal(address);
      values2.set(converted, dataPoints[i][1]);
    });
  }
}

// console.log(values2);

let sum2 = 0;
for (const val of values2.values()) {
  sum2 += val;
}
console.log(sum2);
