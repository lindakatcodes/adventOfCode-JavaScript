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

function getFullStr(str) {
  const digitLen = str.length;
  let withZeroes = '';
  for (let x = 0; x < 36 - digitLen; x++) {
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
  // first make a version where everything's 0
  const zeroCopy = arr.map((val) => (val === 'X' ? '0' : val));
  versions.push(zeroCopy.join(''));
  // recursively loop over indexes, increasing num of indexes that are 1
  let nextAmt = 1;
  while (nextAmt <= xIdx.length) {
    for (let a = 0; a < xIdx.length; a++) {
      const newVersion = [...zeroCopy];
      newVersion[xIdx[a]] = '1';
      if (!versions.includes(newVersion.join(''))) {
        versions.push(newVersion.join(''));
      }
      for (let b = 1; b < xIdx.length; b++) {
        newVersion[xIdx[(a + b) % xIdx.length]] = '1';
        // console.log(newVersion.join(''));
        if (!versions.includes(newVersion.join(''))) {
          versions.push(newVersion.join(''));
        }
      }
    }
    nextAmt++;
  }

  // finally, make copy where all values are 1
  const oneCopy = arr.map((val) => (val === 'X' ? '1' : val));
  if (!versions.includes(oneCopy.join(''))) {
    versions.push(oneCopy.join(''));
  }
  return versions;
}

// part 1
// const values = new Map();
// for (let i = 0; i < dataPoints.length; i++) {
//   if (dataPoints[i] === undefined) {
//     if (i !== 0) {
//       currMaskIdx++;
//       currMask = masks[currMaskIdx];
//     }
//   } else {
//     const binaryNum = dataPoints[i][1].toString(2);
//     const fullStr = getFullStr(binaryNum).split('');
//     // console.log(`str: ${fullStr.join('')}`);
//     const mappedVal = mapMask(fullStr);
//     // console.log(afterMask);
//     values.set(dataPoints[i][0], mappedVal.join(''));
//   }
// }

// // console.log(values);

// let sum = 0;
// for (const val of values.values()) {
//   const dec = parseInt(convertVal(val), 10);
//   sum += dec;
// }
// console.log(sum);

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
    const fullStr = getFullStr(binaryNum).split('');
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

let sum = 0;
for (const val of values2.values()) {
  sum += val;
}
console.log(sum);
