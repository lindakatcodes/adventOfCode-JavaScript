import { createRequire } from 'module';
import * as h from '../helpers.js';

const require = createRequire(import.meta.url);
const fs = require('fs');

const data = fs.readFileSync('./2020 Solutions/inputs/day02input.txt').toString();

const parsedData = h.strInput(data).map(function (bit) {
  const broken = bit.split(' ');
  const range = broken[0].split('-');
  const cleanLetter = broken[1].slice(0, broken[1].length - 1);
  return [range, cleanLetter, broken[2]];
});

// part 1
// let valid1 = 0;

// parsedData.forEach((list) => {
//   const neededLetter = list[1];
//   const password = list[2].split('');
//   const letterCount = password.filter((letter) => letter === neededLetter);
//   if (letterCount.length >= list[0][0] && letterCount.length <= list[0][1]) {
//     valid1++;
//   }
// });

// console.log(valid1);

// part 2
let valid2 = 0;

parsedData.forEach((list) => {
  const neededLetter = list[1];
  const password = list[2].split('');
  const letsToCheck = [password[list[0][0] - 1], password[list[0][1] - 1]];
  const passes = letsToCheck.filter((letter) => letter === neededLetter);
  if (passes.length === 1) {
    valid2++;
  }
});

console.log(valid2);
