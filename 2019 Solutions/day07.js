// Memory - initial puzzle input, a list of integers
const input = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,
  27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5];

// copy of initial input, so we can reset properly
let inputCopy = [...input];

// opcode 1 - get values at position 1&2 right after code, add together, store in position 3
function opcode1 (a, b, c, p) {
  let valA = ptest(p[0], a);
  let valB = ptest(p[1], b);
  inputCopy[c] = valA + valB;
  // console.log(`op1: ${valA} + ${valB} = ${valA + valB}`)
}

// opcode 2 - get values at position 1&2 right after code, multiply, store in position 3
function opcode2 (a, b, c, p) {
  let valA = ptest(p[0], a);
  let valB = ptest(p[1], b);
  inputCopy[c] = valA * valB;
  // console.log(`op2: ${valA} * ${valB} = ${valA * valB}`)
}

// opcode 3 - takes an input and stores in position 1
function opcode3 (iv, s) {
  inputCopy[s] = iv;
  // console.log(`op3: putting ${iv} into spot ${s}`)
}

// opcode 4 - outputs value at position 1
function opcode4 (s, p) {
  let val = ptest(p[0], s);
  // console.log(`op4: outputting ${val}`)
  return val;
}

// opcode 5 - if position 1 != 0, changes i to position 2; otherwise, does nothing
function opcode5 (a, b, inp, p) {
  let valA = ptest(p[0], a);
  let valB = ptest(p[1], b);

  if (valA !== 0) {
    inp = valB;
  }
  // console.log(`op5: inst. pointer is now ${inp}`);
  return inp;
}

// opcode 6 - if position 1 == 0, changes i to position 2; otherwise, does nothing
function opcode6 (a, b, inp, p) {
  let valA = ptest(p[0], a);
  let valB = ptest(p[1], b);

  if (valA === 0) {
    inp = valB;
  }
  // console.log(`op6: inst. pointer is now ${inp}`);

  return inp;
}

// opcode 7 - if position 1 < position 2, position 3 is set to 1; otherwise, it's set to 0
function opcode7 (a, b, c, p) {
  let valA = ptest(p[0], a);
  let valB = ptest(p[1], b);

  if (valA < valB) {
    inputCopy[c] = 1;
  } else {
    inputCopy[c] = 0;
  }
  // console.log(`op7: comparing if ${valA} is < ${valB}`);
}

// opcode 8 - if position 1 == position 2, position 3 is set to 1; otherwise, it's set to 0
function opcode8 (a, b, c, p) {
  let valA = ptest(p[0], a);
  let valB = ptest(p[1], b);

  if (valA == valB) {
    inputCopy[c] = 1;
  } else {
    inputCopy[c] = 0;
  }
  // console.log(`op8: comparing if ${valA} equals ${valB}`);
}

// allows parameter modes - checks for 0 or 1, decides if returning actual number called or position of number in input
function ptest(param, checkval) {
  if (param == 0 || !param) {
    return inputCopy[checkval];
  } else if (param == 1) {
    return checkval;
  }
}

// opcode 99 - stop program

// run through memory input, following instructions until 99 is hit
async function runProgram(amp) {
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
        if (inputval1 === null) {
          let updatedInput = await getInput(amp);
          opcode3(updatedInput, ione);
          i++;
          break;
        } else {
          opcode3(inputval1, ione);
          i++;
          inputval1 = null;
          break;
        }
      case 04:
        let res = opcode4(ione, params);
        signals[amp].push(res);
        // console.log(`amp ${amp} is outputting ${res}`);
        i++;
        break;
      case 05:
        let checkt = opcode5(ione, itwo, i, params);
        if (i != checkt) {
          i = checkt - 1;
        } else {
          i += 2;
        }
        break;
      case 06:
        let checkf = opcode6(ione, itwo, i, params);
        if (i != checkf) {
          i = checkf - 1;
        } else {
          i += 2;
        }
        break;
      case 07:
        opcode7(ione, itwo, ithree, params);
        i += 3;
        break;
      case 08:
        opcode8(ione, itwo, ithree, params);
        i += 3;
        break;
    }
  }
}


let inputval1 = 0;
let inputval2 = 0;
let phaseSettingOptions = [0,1,2,3,4];
let phaseSettingOptions2 = [5,6,7,8,9];

let signals = [[],[],[],[],[0]];
let maxSignal = 0;
let amps = ['a', 'b', 'c', 'd', 'e'];

// Didn't feel like creating this, so found a method here: https://stackoverflow.com/a/20871714
const permutator = (inputArr) => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next))
      }
    }
  }

  permute(inputArr);

  return result;
}

let phaseSettings = permutator(phaseSettingOptions);
let phaseSettings2 = permutator(phaseSettingOptions2);

// phase 1 - set each amp to run until it's done, then pass the output to the next input

// function runAmp(phase, input) {
//   inputval1 = phase;
//   inputval2 = input; 
//   runProgram();
//   return signals[signals.length - 1];
// }

// for (let i = 0; i < phaseSettings.length; i++) {
//   let phaseOrder = phaseSettings2[i];
//   // run program 5 times, each time passing in the new output as the next input
//   for (let j = 0; j < amps.length; j++) {
//     // for part 1 - inputval2 needs to be reset to 0 for each run through
//      if (j === 0) {
//       inputval2 = 0;
//     } 
//     console.log(`running amp ${amps[j]}`);
//     inputval2 = runAmp(phaseOrder[j], inputval2);
//   }

//   if (inputval2 > maxSignal) {
//     maxSignal = inputval2;
//   }
// }

// function getInput(amp) {
//   let inputSig = amp - 1;
//   if (inputSig === -1) {
//     inputSig = 4;
//   }
//   let last = signals[inputSig].length - 1;
//   if (last < 0) {
//     getInput(amp);
//   }
//   // console.log(`new output for ${amps[amp]} is ${signals[inputSig][last]}`);
//   return signals[inputSig][last];
// }

// for (let i = 0; i < phaseSettings.length; i++) {
//   let phaseOrder2 = phaseSettings2[i];
//   for (let j = 0; j < amps.length; j++) {
//     inputval1 = phaseOrder2[j];
//     runProgram(j);
//   }

//   let endOutput = signals[4][signals[4].length - 1];
//   if (endOutput > maxSignal) {
//     maxSignal = endOutput;
//   }
// }



console.log(`Max signal: ${maxSignal}`);