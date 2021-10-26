import { createRequire } from 'module';
import * as h from '../helpers.js';

const require = createRequire(import.meta.url);
const fs = require('fs');

const data = fs.readFileSync('./2020 Solutions/inputs/day25input.txt').toString();
const [cardKey, doorKey] = h.numInput(data);

const DIV_NUM = 20201227;
let cardLoopSize = 0;
let doorLoopSize = 0;
let encryptionKey = 0;

function runLoop(value, subNum) {
  // set value to itself * subject
  const firstStep = value * subNum;
  // set value to % divNum
  const secondStep = firstStep % DIV_NUM;
  return secondStep;
}

// figure out card loop size
let cardStartVal = 1;
while (cardStartVal !== cardKey) {
  const nextVal = runLoop(cardStartVal, 7);
  cardLoopSize++;
  cardStartVal = nextVal;
}
console.log(cardLoopSize);
// figure out door loop size
let doorStartVal = 1;
while (doorStartVal !== doorKey) {
  const nextVal = runLoop(doorStartVal, 7);
  doorLoopSize++;
  doorStartVal = nextVal;
}
console.log(doorLoopSize);
// once numbers are found, send to each other
// card uses door key, transforms it by card loop size
cardStartVal = 1;
for (let i = 0; i < cardLoopSize; i++) {
  cardStartVal = runLoop(cardStartVal, doorKey);
}
encryptionKey = cardStartVal;
console.log(encryptionKey);
// door uses card key, transforms it by door loop size
doorStartVal = 1;
for (let i = 0; i < doorLoopSize; i++) {
  doorStartVal = runLoop(doorStartVal, cardKey);
}
encryptionKey = doorStartVal;
console.log(encryptionKey);
// both those numbers should be the same - the encryption key
