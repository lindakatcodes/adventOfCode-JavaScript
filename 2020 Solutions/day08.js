import { createRequire } from 'module';
import * as h from '../helpers.js';

const require = createRequire(import.meta.url);
const fs = require('fs');

const data = fs.readFileSync('./2020 Solutions/inputs/day08input.txt').toString();

const program = h.strInput(data).map((bit) => bit.split(' '));

// need to know what instructions we've seen already
const seen = [];
let counter = 0;
let repeated = false;
let currIndex = 0;

function runLine(line) {
  // console.log(line);
  const [_, sign, num] = line[1].trim().split(/(-|\+)/);
  // console.log(sign, num);
  if (line[0] === 'acc') {
    counter = sign === '-' ? counter - parseInt(num, 10) : counter + parseInt(num, 10);
  } else if (line[0] === 'jmp') {
    const newIndex = sign === '-' ? currIndex - parseInt(num, 10) - 1 : currIndex + parseInt(num, 10) - 1;
    currIndex = newIndex;
  }
  currIndex += 1;
  return currIndex;
}

// do instructions - before each step, see if we've seen this line before - if so, stop. If not, add this index to seen and perform the instruction.
function runProgram(inst) {
  while (!repeated) {
    // if our index is at the end of the array, break loop
    if (currIndex >= inst.length) {
      break;
    }
    if (seen.includes(currIndex)) {
      repeated = true;
      break;
    } else {
      seen.push(currIndex);
      runLine(inst[currIndex]);
    }
  }
  return repeated;
}

// part 1 - just need to run once and log counter when program breaks
runProgram(program);
console.log(`Initial count: `);
console.log(counter);

// part 2 - need to change one jmp/nop to make the program actually end
const possibleIndexes = [];
program.forEach((line, index) => {
  if (line[0] === 'jmp' || line[0] === 'nop') {
    possibleIndexes.push(index);
  }
});

function resetValues() {
  h.clearArr(seen);
  counter = 0;
  repeated = false;
  currIndex = 0;
}

for (let i = 0; i < possibleIndexes.length; i++) {
  // make sure our values are all reset
  resetValues();
  // get the index to test, and swap the changed version into a copy of the program
  const testingIndex = possibleIndexes[i];
  const programCopy = [...program];
  const itemToSwitch = programCopy[testingIndex];
  let switchedItem = '';
  if (itemToSwitch[0] === 'jmp') {
    switchedItem = ['nop', itemToSwitch[1]];
  } else {
    switchedItem = ['jmp', itemToSwitch[1]];
  }
  programCopy.splice(testingIndex, 1, switchedItem);
  // run the program and see if we exit early
  const testResult = runProgram(programCopy);
  if (!testResult) {
    // repeated never changed, so we broke the cycle! end loop
    console.log(`cycle broken! final result: `);
    console.log(counter);
  }
  // otherwise repeated turned true, so we did not break the loop - run again with next value
}
