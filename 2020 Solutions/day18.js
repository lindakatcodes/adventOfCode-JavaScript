import { createRequire } from 'module';
import * as h from '../helpers.js';

const require = createRequire(import.meta.url);
const fs = require('fs');

const data = fs.readFileSync('./2020 Solutions/inputs/day18input.txt').toString();

const equations = h.strInput(data).map((line) => line.replaceAll(' ', ''));

// example answers for part 1 should be: 71 / 51 / 26 / 437 / 12240 / 13632
// example answer for part 2 should be: 231 / 51 / 46 / 1445 / 669060 / 23340
const answers = [];

// part 1 - parenthesis first, then each operation in order - + and * are the same precendence
function solveQ1(eq) {
  let finalAnswer = 0;
  const firstOpenIdx = eq.indexOf('(', 0);
  if (firstOpenIdx < 0) {
    // solve directly - no open
    const brokenUp = eq.split(/(\+|\*)/);
    const answer = brokenUp.reduce((acc, val, idx, innerEq) => {
      if (idx === 0) {
        // first value, just push it directly into acc
        const newVal = acc + Number(val);
        return newVal;
      }
      if (val === '*' || val === '+') {
        // do the math of acc and next val
        const nextVal = innerEq[idx + 1];
        let miniAnswer = 0;
        if (val === '+') {
          miniAnswer = acc + Number(nextVal);
        } else {
          miniAnswer = acc * Number(nextVal);
        }
        return miniAnswer;
      }
      // already handled this, just return the acc
      return acc;
    }, 0);
    return answer;
  }
  const firstEndIdx = eq.indexOf(')', 0);
  const eqSlice = eq.slice(firstOpenIdx + 1, firstEndIdx);
  let eqCopywithAnswer = '';
  // before we work on the inner, make sure we don't have more parens - if we do, keep narrowing until we don't
  if (eqSlice.includes('(')) {
    const nextOpenIdx = eq.indexOf('(', firstOpenIdx + 1);
    const nextEqSlice = eq.slice(nextOpenIdx + 1, firstEndIdx);
    const miniAnswer = solveQ1(nextEqSlice);
    eqCopywithAnswer = `${eq.slice(0, nextOpenIdx)}${miniAnswer}${eq.slice(firstEndIdx + 1)}`;
  } else {
    const innerAnswer = solveQ1(eqSlice);
    eqCopywithAnswer = `${eq.slice(0, firstOpenIdx)}${innerAnswer}${eq.slice(firstEndIdx + 1)}`;
  }
  // if still work to do, keep repeating
  if (eqCopywithAnswer.includes('+') || eqCopywithAnswer.includes('*')) {
    finalAnswer = solveQ1(eqCopywithAnswer);
  }
  return finalAnswer;
} // end of function

// part 2 - parenthesis first, but addition happens before multiplication
function solveQ2(eq) {
  let finalAnswer = 0;
  const firstOpenIdx = eq.indexOf('(', 0);
  if (firstOpenIdx < 0) {
    // solve directly - no open
    // do addition first
    const plusIdxs = eq
      .split(/(\+|\*)/)
      .map((val, idx) => (val === '+' ? idx : null))
      .filter((val) => val !== null);
    let partial = eq;
    plusIdxs.forEach((idxP, i) => {
      const broken = partial.split(/(\+|\*)/);
      let piece = '';
      let add = 0;
      if (i === 0) {
        add = Number(broken[idxP - 1]) + Number(broken[idxP + 1]);
        piece = `${broken.slice(0, idxP - 1).join('')}${add}${broken.slice(idxP + 2).join('')}`;
      } else {
        const newIdx = broken.indexOf('+');
        add = Number(broken[newIdx - 1]) + Number(broken[newIdx + 1]);
        piece = `${broken.slice(0, newIdx - 1).join('')}${add}${broken.slice(newIdx + 2).join('')}`;
      }
      partial = piece;
    });
    const brokenUp = partial.split(/(\*)/);
    const answer = brokenUp.reduce((acc, val, idx, innerEq) => {
      if (idx === 0) {
        // first value, just push it directly into acc
        const newVal = acc + Number(val);
        return newVal;
      }
      if (val === '*') {
        // do the math of acc and next val
        const nextVal = innerEq[idx + 1];
        return acc * Number(nextVal);
      }
      // already handled this, just return the acc
      return acc;
    }, 0);
    return answer;
  }
  const firstEndIdx = eq.indexOf(')', 0);
  const eqSlice = eq.slice(firstOpenIdx + 1, firstEndIdx);
  let eqCopywithAnswer = '';
  // before we work on the inner, make sure we don't have more parens - if we do, keep narrowing until we don't
  if (eqSlice.includes('(')) {
    const nextOpenIdx = eq.indexOf('(', firstOpenIdx + 1);
    const nextEqSlice = eq.slice(nextOpenIdx + 1, firstEndIdx);
    const miniAnswer = solveQ2(nextEqSlice);
    eqCopywithAnswer = `${eq.slice(0, nextOpenIdx)}${miniAnswer}${eq.slice(firstEndIdx + 1)}`;
  } else {
    const innerAnswer = solveQ2(eqSlice);
    eqCopywithAnswer = `${eq.slice(0, firstOpenIdx)}${innerAnswer}${eq.slice(firstEndIdx + 1)}`;
  }
  // if still work to do, keep repeating
  if (eqCopywithAnswer.includes('+') || eqCopywithAnswer.includes('*')) {
    finalAnswer = solveQ2(eqCopywithAnswer);
  }
  return finalAnswer;
} // end of function

// part 1 - call solve for each problem
equations.forEach((problem) => {
  const eqSolution = solveQ1(problem);
  answers.push(eqSolution);
});

const sum1 = answers.reduce((first, second) => first + second);
console.log(`part 1: `);
console.log(sum1);

// part 2 - call solve for each problem
h.clearArr(answers);
equations.forEach((problem) => {
  const eqSolution = solveQ2(problem);
  answers.push(eqSolution);
});

const sum2 = answers.reduce((first, second) => first + second);
console.log(`part 2: `);
console.log(sum2);
