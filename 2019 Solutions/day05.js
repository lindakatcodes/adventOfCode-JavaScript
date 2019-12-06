// Memory - initial puzzle input, a list of integers
const input = [3,225,1,225,6,6,1100,1,238,225,104,0,1102,83,20,225,1102,55,83,224,1001,224,-4565,224,4,224,102,8,223,223,101,5,224,224,1,223,224,223,1101,52,15,225,1102,42,92,225,1101,24,65,225,101,33,44,224,101,-125,224,224,4,224,102,8,223,223,1001,224,7,224,1,223,224,223,1001,39,75,224,101,-127,224,224,4,224,1002,223,8,223,1001,224,3,224,1,223,224,223,2,14,48,224,101,-1300,224,224,4,224,1002,223,8,223,1001,224,2,224,1,223,224,223,1002,139,79,224,101,-1896,224,224,4,224,102,8,223,223,1001,224,2,224,1,223,224,223,1102,24,92,225,1101,20,53,224,101,-73,224,224,4,224,102,8,223,223,101,5,224,224,1,223,224,223,1101,70,33,225,1101,56,33,225,1,196,170,224,1001,224,-38,224,4,224,102,8,223,223,101,4,224,224,1,224,223,223,1101,50,5,225,102,91,166,224,1001,224,-3003,224,4,224,102,8,223,223,101,2,224,224,1,224,223,223,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,1107,677,677,224,1002,223,2,223,1006,224,329,1001,223,1,223,1107,226,677,224,102,2,223,223,1005,224,344,101,1,223,223,108,677,677,224,1002,223,2,223,1006,224,359,101,1,223,223,107,677,677,224,1002,223,2,223,1006,224,374,1001,223,1,223,1007,677,677,224,102,2,223,223,1006,224,389,101,1,223,223,108,677,226,224,102,2,223,223,1006,224,404,101,1,223,223,1108,226,677,224,102,2,223,223,1005,224,419,1001,223,1,223,7,677,226,224,102,2,223,223,1005,224,434,101,1,223,223,1008,677,677,224,102,2,223,223,1006,224,449,1001,223,1,223,1007,677,226,224,1002,223,2,223,1006,224,464,101,1,223,223,1108,677,677,224,1002,223,2,223,1005,224,479,1001,223,1,223,107,226,226,224,1002,223,2,223,1005,224,494,101,1,223,223,8,226,677,224,102,2,223,223,1006,224,509,101,1,223,223,8,677,677,224,102,2,223,223,1006,224,524,101,1,223,223,1007,226,226,224,1002,223,2,223,1006,224,539,1001,223,1,223,107,677,226,224,102,2,223,223,1006,224,554,101,1,223,223,1107,677,226,224,1002,223,2,223,1006,224,569,1001,223,1,223,1008,226,677,224,102,2,223,223,1006,224,584,1001,223,1,223,1008,226,226,224,1002,223,2,223,1005,224,599,1001,223,1,223,7,677,677,224,1002,223,2,223,1005,224,614,1001,223,1,223,1108,677,226,224,1002,223,2,223,1005,224,629,101,1,223,223,7,226,677,224,1002,223,2,223,1005,224,644,1001,223,1,223,8,677,226,224,102,2,223,223,1005,224,659,101,1,223,223,108,226,226,224,102,2,223,223,1005,224,674,101,1,223,223,4,223,99,226];

// copy of initial input, so we can reset properly
let inputCopy = [...input];

// opcode 1 - get values at position 1&2 right after code, add together, store in position 3
// opcode 2 - get values at position 1&2 right after code, multiply, store in position 3
// opcode 3 - takes an input and stores in position 1
// opcode 4 - outputs value at position 1
// opcode 5 - if position 1 != 0, changes i to position 2; otherwise, does nothing
// opcode 6 - if position 1 == 9, changes i to position 2; otherwise, does nothing
// opcode 7 - if position 1 < position 2, position 3 is set to 1; otherwise, it's set to 0
// opcode 8 - if position 1 == position 2, position 3 is set to 1; otherwise, it's set to 0
// opcode 99 - stop program

function opcode1 (a, b, c, p) {
  let valA = ptest(p[0], a);
  let valB = ptest(p[1], b);
  inputCopy[c] = valA + valB;
  console.log(`op1: ${valA} + ${valB} = ${valA + valB}`)
}

function opcode2 (a, b, c, p) {
  let valA = ptest(p[0], a);
  let valB = ptest(p[1], b);
  inputCopy[c] = valA * valB;
  console.log(`op2: ${valA} * ${valB} = ${valA * valB}`)
}

function opcode3 (iv, s) {
  inputCopy[s] = iv;
  console.log(`op3: putting ${iv} into spot ${s}`)
}

function opcode4 (s, p) {
  let val = ptest(p[0], s);
  console.log(`op4: outputting ${val}`)
  return val;
}

function ptest(param, checkval) {
  if (param == 0 || !param) {
    return inputCopy[checkval];
  } else if (param == 1) {
    return checkval;
  }
}

function opcode5 () {
  
}

function opcode6 () {
  
}

function opcode7 () {
  
}

function opcode8 () {
  
}

// run through memory input, following instructions until 99 is hit
function runProgram() {
  for (let i = 0; i < inputCopy.length; i++) {
    if (inputCopy[i] === 99) {
      break;
    }
    
    let instruct = inputCopy[i].toString();
    let opval = parseInt(instruct.slice(-2), 10);
    let params = instruct.slice(0, -2).split('').reverse();
    

    let ione = inputCopy[i+1];
    let itwo = inputCopy[i+2];
    let ithree = inputCopy[i+3];

    switch (opval) {
      case 01:
        opcode1(ione, itwo, ithree, params);
        i += 3;
        break;
      case 02:
        opcode2(ione, itwo, ithree, params);
        i += 3;
        break;
      case 03:
        opcode3(inputval, ione);
        i++;
        break;
      case 04:
        let res = opcode4(ione, params);
        console.log(res);
        i++;
        break;
      case 05:
        
        break;
      case 06:
        
        break;
      case 07:
      
        break;
      case 08:
        
        break;
    }

  }
}

// for part 1, inputval is 1; for part 2, it's 5
let inputval = 1;
runProgram();