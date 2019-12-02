// Memory - initial puzzle input, a list of integers
const input = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,6,19,1,19,5,23,2,13,23,27,1,10,27,31,2,6,31,35,1,9,35,39,2,10,39,43,1,43,9,47,1,47,9,51,2,10,51,55,1,55,9,59,1,59,5,63,1,63,6,67,2,6,67,71,2,10,71,75,1,75,5,79,1,9,79,83,2,83,10,87,1,87,6,91,1,13,91,95,2,10,95,99,1,99,6,103,2,13,103,107,1,107,2,111,1,111,9,0,99,2,14,0,0];

// copy of initial input, so we can reset properly
let inputCopy = [...input];

// noun - input for address 1; verb - input for address 2
let noun = 12;
let verb = 2;

// for part 2 - desired output to match - output is final value at address 0 when program is done
const desiredOutput = 19690720;

// test inputs for part 1
const testinput1 = [1,0,0,0,99];
const testinput2 = [2,3,0,3,99];
const testinput3 = [2,4,4,5,99,0];
const testinput4 = [1,1,1,4,99,5,6,0,99];

// opcode 1 - get values at position 1&2 right after code, add together, store in position 3
// opcode 2 - get values at position 1&2 right after code, multiply, store in position 3
// opcode 99 - stop program
function intCode (op, a, b, c) {
  let valA = inputCopy[a];
  let valB = inputCopy[b];

  if (op === 1) {
    inputCopy[c] = valA + valB;
  } else if (op === 2) {
    inputCopy[c] = valA * valB;
  }
}

// run through memory input, following instructions until 99 is hit
function runProgram() {
  for (let i = 0; i < inputCopy.length; i += 4) {
    if (inputCopy[i] === 99) {
      break;
    }
    intCode(inputCopy[i], inputCopy[i+1], inputCopy[i+2], inputCopy[i+3]);
  }
}

// for part 1 - insert noun & verb provided
inputCopy[1] = noun;
inputCopy[2] = verb;

runProgram();
console.log(`Part 1: position 0 value is ${inputCopy[0]}`);

// part 2 - test different values for noun & verb, insert into memory, run program - when desired output is matched, log noun & verb used & end cycle

for (let n = 0; n < 100; n++) {
  noun = n;
  let found = false;
  for (let v = 0; v < 100; v++) {
    verb = v;
    
    // reset copy to initial input, then replace noun & verb
    inputCopy = [...input];
    inputCopy[1] = noun;
    inputCopy[2] = verb;
    
    runProgram();
    let currentOutput = inputCopy[0];

    if (currentOutput === desiredOutput) {
      found = true;
      break;
    }
  }
  if (found) {
    break;
  }
}

console.log(`desired noun and verb are ${noun} & ${verb}; output value is ${inputCopy[0]}`);
console.log(`Part 2 - computed value is ${100 * noun + verb}`);
