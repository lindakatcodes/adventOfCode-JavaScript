// Memory - initial puzzle input, a list of integers
const input = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5];

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
function runProgram(amp) {
  for (let i = amp.pointer; i < inputCopy.length; i++) {
    if (inputCopy[i] === 99) {
      if (amp.haltCalled) {
        return amp.output;
      }
      amp.haltCalled = true;
      haltsCalled++;
      amp.pointer = i;
      return amp.output;
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
        if (amp.requestedInputs === 0) {
          opcode3(amp.inputPhase, ione);
          i++;
          amp.requestedInputs++;
          break;
        } else if (amp.requestedInputs === 1) {
          opcode3(amp.inputInit, ione);
          i++;
          amp.requestedInputs++;
          break;
        } else {
          opcode3(amp.inputSig, ione);
          i++;
          break;
        }
      case 04:
        let res = opcode4(ione, params);
        amp.output = res;
        i++;
        amp.pointer = i + 1;
        return amp.output;
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



let maxSignal = 0;


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

let phaseSettingOptions = [0,1,2,3,4];
let phaseSettingOptions2 = [5,6,7,8,9];

let phaseSettings = permutator(phaseSettingOptions);
let phaseSettings2 = permutator(phaseSettingOptions2);

// phase 2 settings
let amps = [{
  'name': 'a',
  'pointer': 0,
  'inputPhase': 0,
  'inputInit': 0,
  'inputSig': 0,
  'requestedInputs': 0,
  'output': 0,
  'haltCalled': false
},{
  'name': 'b',
  'pointer': 0,
  'inputPhase': 0,
  'inputInit': 0,
  'inputSig': 0,
  'requestedInputs': 0,
  'output': 0,
  'haltCalled': false
},{
  'name': 'c',
  'pointer': 0,
  'inputPhase': 0,
  'inputInit': 0,
  'inputSig': 0,
  'requestedInputs': 0,
  'output': 0,
  'haltCalled': false
},{
  'name': 'd',
  'pointer': 0,
  'inputPhase': 0,
  'inputInit': 0,
  'inputSig': 0,
  'requestedInputs': 0,
  'output': 0,
  'haltCalled': false
},{
  'name': 'e',
  'pointer': 0,
  'inputPhase': 0,
  'inputInit': 0,
  'inputSig': 0,
  'requestedInputs': 0,
  'output': 0,
  'haltCalled': false
},];

let haltsCalled = 0;

function runAmp(phase, init, sig, amp) {
  amp.inputPhase = phase;
  amp.inputInit = init;
  amp.inputSig = sig;
  let nextInput = runProgram(amp);
  return nextInput;
}

function runCycle(phase) {
  for (let j = 0; j < amps.length; j++) {
    let previous = j - 1;
    if (previous < 0) {
      previous = 4;
    }
    if (amps[j].pointer === 0) {
      amps[j].inputInit = runAmp(phase[j], amps[previous].output, 0, amps[j]);
    } else {
      amps[j].inputSig = runAmp(phase[j], amps[j].inputInit, amps[previous].output, amps[j]);
    }
  }
}

// for (let i = 0; i < phaseSettings2.length; i++) {
  let phaseOrder = [9,8,7,6,5]; // phaseSettings2[i];
  haltsCalled = 0;
  do (
    runCycle(phaseOrder)
  ); while (haltsCalled !== 5);

  if (maxSignal === 0) {
    maxSignal = amps[4].output;
  } else if (amps[4].output > maxSignal) {
    maxSignal = amps[4].output;
  }
// }

console.log(`Max signal: ${maxSignal}`);


// phase 1 - set each amp to run until it's done, then pass the output to the next input
/*
let inputval1 = 0;
let inputval2 = 0;
let signals = [];

function runAmp(phase, input) {
  inputval1 = phase;
  inputval2 = input; 
  runProgram();
  return signals[signals.length - 1];
}

for (let i = 0; i < phaseSettings.length; i++) {
  let phaseOrder = phaseSettings[i];
  // run program 5 times, each time passing in the new output as the next input
  for (let j = 0; j < amps.length; j++) {
    // for part 1 - inputval2 needs to be reset to 0 for each run through
     if (j === 0) {
      inputval2 = 0;
    } 
    console.log(`running amp ${amps[j]}`);
    inputval2 = runAmp(phaseOrder[j], inputval2);
  }

  if (inputval2 > maxSignal) {
    maxSignal = inputval2;
  }
}

console.log(`Max signal: ${maxSignal}`);
*/
