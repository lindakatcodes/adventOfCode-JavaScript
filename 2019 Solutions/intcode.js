// relative base
let relBase = 0;

// opcode 1 - get values at position 1&2 right after code, add together, store in position 3
function opcode1 (a, b, c, p, program) {
  let valA = ptest(p[0], a, 'read', program);
  let valB = ptest(p[1], b, 'read', program);
  let valC = ptest(p[2], c, 'write', program);

  program[valC] = valA + valB;
  // console.log(`op1: ${valA} + ${valB} = ${valA + valB}`)
}

// opcode 2 - get values at position 1&2 right after code, multiply, store in position 3
function opcode2 (a, b, c, p, program) {
  let valA = ptest(p[0], a, 'read', program);
  let valB = ptest(p[1], b, 'read', program);
  let valC = ptest(p[2], c, 'write', program);

  program[valC] = valA * valB;
  // console.log(`op2: ${valA} * ${valB} = ${valA * valB}`)
}

// opcode 3 - takes an input and stores in position 1
function opcode3 (iv, s, p, program) {
  let pos = ptest(p[0], s, 'write', program);

  program[pos] = iv;
  // console.log(`op3: putting ${iv} into spot ${pos}, mode ${p[0]}`)
}

// opcode 4 - outputs value at position 1
function opcode4 (s, p, program) {
  let val = ptest(p[0], s, 'read', program);
  // console.log(`op4: outputting ${val} at ${relBase + s}`)
  return val;
}

// opcode 5 - if position 1 != 0, changes i to position 2; otherwise, does nothing
function opcode5 (a, b, inp, p, program) {
  let valA = ptest(p[0], a, 'read', program);
  let valB = ptest(p[1], b, 'read', program);

  if (valA !== 0) {
    inp = valB;
  }
  // console.log(`op5: ${valA} and ${valB}, inst. pointer is now ${inp}`);
  return inp;
}

// opcode 6 - if position 1 == 0, changes i to position 2; otherwise, does nothing
function opcode6 (a, b, inp, p, program) {
  let valA = ptest(p[0], a, 'read', program);
  let valB = ptest(p[1], b, 'read', program);

  if (valA === 0) {
    inp = valB;
  }
  // console.log(`op6: ${valA} and ${valB}, inst. pointer is now ${inp}`);

  return inp;
}

// opcode 7 - if position 1 < position 2, position 3 is set to 1; otherwise, it's set to 0
function opcode7 (a, b, c, p, program) {
  let valA = ptest(p[0], a, 'read', program);
  let valB = ptest(p[1], b, 'read', program);
  let valC = ptest(p[2], c, 'write', program);

  if (valA < valB) {
    program[valC] = 1;
  } else {
    program[valC] = 0;
  }
  // console.log(`op7: comparing if ${valA} is < ${valB}`);
}

// opcode 8 - if position 1 == position 2, position 3 is set to 1; otherwise, it's set to 0
function opcode8 (a, b, c, p, program) {
  let valA = ptest(p[0], a, 'read', program);
  let valB = ptest(p[1], b, 'read', program);
  let valC = ptest(p[2], c, 'write', program);

  if (valA == valB) {
    program[valC] = 1;
  } else {
    program[valC] = 0;
  }
  // console.log(`op8: comparing if ${valA} equals ${valB}`);
}

// opcode 9 - adjust relative base by the value given in position 1
function opcode9 (a, p, program) {
  let valA = ptest(p[0], a, 'read', program);
  relBase += valA;
  // console.log(`op9: new relative base is ${relBase}`);
}

// allows parameter modes - 0 for position mode (value stored at position given); 1 for immediate mode (actual value listed); 2 for relative mode (value stored at position (actual value listed + the relative base))
function ptest(param, checkval, mode, program) {
  let returnVal;
  let baseVal = relBase + checkval;

  if (param == 0 || !param) {
    if (mode === 'read') {
      returnVal = program[checkval];
    } else if (mode === 'write') {
      returnVal = checkval;
    }
  } else if (param == 1) {
    returnVal = checkval;
  } else if (param == 2) {
    if (mode === 'read') {
      returnVal = program[baseVal];
    } else if (mode === 'write') {
      returnVal = baseVal;
    }
  }

  if (returnVal === undefined) {
    if (param == 0 || !param) {
      program[checkval] = 0;
      returnVal = 0;
    } else if (param == 2) {
      program[baseVal] = 0;
      returnVal = 0;
    }
  }

  return returnVal;
}

// opcode 99 - stop program

// run through memory input, following instructions until 99 is hit
function runProgram(program, inputval) {
  let output = [];
  let inputCounter = 0;

  for (let i = 0; i < program.length; i++) {
    if (program[i] === 99) {
      break;
    }
    
    let instruct = program[i].toString();
    let opval = parseInt(instruct.slice(-2), 10);
    let params = instruct.slice(0, -2).split('').reverse();
    

    let ione = program[i+1];
    let itwo = program[i+2];
    let ithree = program[i+3];

    switch (opval) {
      case 01:
        opcode1(ione, itwo, ithree, params, program);
        i += 3;
        break;
      case 02:
        opcode2(ione, itwo, ithree, params, program);
        i += 3;
        break;
      case 03:
        if (typeof inputval === 'number') {
          opcode3(inputval, ione, params, program);
        } else if (typeof inputval === 'object') {
          opcode3(inputval[inputCounter], ione, params, program);
          inputCounter++;
        }
        i++;
        break;
      case 04:
        let res = opcode4(ione, params, program);
        output.push(res);
        i++;
        break;
      case 05:
        let checkt = opcode5(ione, itwo, i, params, program);
        if (i != checkt) {
          i = checkt - 1;
        } else {
          i += 2;
        }
        break;
      case 06:
        let checkf = opcode6(ione, itwo, i, params, program);
        if (i != checkf) {
          i = checkf - 1;
        } else {
          i += 2;
        }
        break;
      case 07:
        opcode7(ione, itwo, ithree, params, program);
        i += 3;
        break;
      case 08:
        opcode8(ione, itwo, ithree, params, program);
        i += 3;
        break;
      case 09: 
        opcode9(ione, params, program);
        i++;
        break;
    }
  }
  return output;
}

exports.runProgram = runProgram;