// Memory - initial puzzle input, a list of integers
const input = [1102,34463338,34463338,63,1007,63,34463338,63,1005,63,53,1101,0,3,1000,109,988,209,12,9,1000,209,6,209,3,203,0,1008,1000,1,63,1005,63,65,1008,1000,2,63,1005,63,904,1008,1000,0,63,1005,63,58,4,25,104,0,99,4,0,104,0,99,4,17,104,0,99,0,0,1101,0,608,1029,1102,1,29,1006,1101,39,0,1016,1101,1,0,1021,1101,37,0,1008,1101,0,25,1003,1102,32,1,1002,1101,0,35,1007,1102,1,28,1009,1101,0,31,1012,1101,22,0,1010,1101,319,0,1026,1102,1,23,1019,1102,423,1,1024,1101,27,0,1017,1101,0,36,1005,1101,0,0,1020,1101,681,0,1022,1102,1,30,1015,1101,0,24,1004,1102,312,1,1027,1102,1,21,1000,1102,1,34,1018,1101,0,678,1023,1101,0,38,1011,1102,1,418,1025,1102,1,20,1014,1101,33,0,1001,1101,0,26,1013,1102,1,613,1028,109,3,1202,5,1,63,1008,63,36,63,1005,63,205,1001,64,1,64,1105,1,207,4,187,1002,64,2,64,109,11,21108,40,40,0,1005,1014,229,4,213,1001,64,1,64,1105,1,229,1002,64,2,64,109,-19,1202,6,1,63,1008,63,33,63,1005,63,255,4,235,1001,64,1,64,1105,1,255,1002,64,2,64,109,3,1201,8,0,63,1008,63,29,63,1005,63,277,4,261,1106,0,281,1001,64,1,64,1002,64,2,64,109,10,21107,41,42,3,1005,1011,299,4,287,1106,0,303,1001,64,1,64,1002,64,2,64,109,19,2106,0,0,1001,64,1,64,1105,1,321,4,309,1002,64,2,64,109,-15,21107,42,41,-2,1005,1010,341,1001,64,1,64,1106,0,343,4,327,1002,64,2,64,109,6,2101,0,-9,63,1008,63,30,63,1005,63,363,1106,0,369,4,349,1001,64,1,64,1002,64,2,64,109,-11,1208,-5,29,63,1005,63,389,1001,64,1,64,1106,0,391,4,375,1002,64,2,64,109,15,1206,-2,409,4,397,1001,64,1,64,1105,1,409,1002,64,2,64,109,-3,2105,1,5,4,415,1105,1,427,1001,64,1,64,1002,64,2,64,109,-18,21101,43,0,10,1008,1011,42,63,1005,63,447,1106,0,453,4,433,1001,64,1,64,1002,64,2,64,109,19,1205,1,467,4,459,1105,1,471,1001,64,1,64,1002,64,2,64,109,-5,2107,34,-8,63,1005,63,489,4,477,1106,0,493,1001,64,1,64,1002,64,2,64,109,-11,2102,1,-1,63,1008,63,28,63,1005,63,517,1001,64,1,64,1105,1,519,4,499,1002,64,2,64,109,8,2108,37,-5,63,1005,63,539,1001,64,1,64,1106,0,541,4,525,1002,64,2,64,109,17,1206,-8,557,1001,64,1,64,1105,1,559,4,547,1002,64,2,64,109,-11,1205,2,571,1105,1,577,4,565,1001,64,1,64,1002,64,2,64,109,-14,1207,0,25,63,1005,63,599,4,583,1001,64,1,64,1105,1,599,1002,64,2,64,109,32,2106,0,-8,4,605,1105,1,617,1001,64,1,64,1002,64,2,64,109,-27,2102,1,-5,63,1008,63,24,63,1005,63,639,4,623,1105,1,643,1001,64,1,64,1002,64,2,64,109,-16,2101,0,10,63,1008,63,25,63,1005,63,669,4,649,1001,64,1,64,1105,1,669,1002,64,2,64,109,22,2105,1,8,1106,0,687,4,675,1001,64,1,64,1002,64,2,64,109,-21,1208,8,32,63,1005,63,705,4,693,1105,1,709,1001,64,1,64,1002,64,2,64,109,19,1207,-5,36,63,1005,63,729,1001,64,1,64,1105,1,731,4,715,1002,64,2,64,109,9,21101,44,0,-5,1008,1017,44,63,1005,63,753,4,737,1105,1,757,1001,64,1,64,1002,64,2,64,109,-12,21108,45,46,5,1005,1015,773,1105,1,779,4,763,1001,64,1,64,1002,64,2,64,109,-8,2108,25,1,63,1005,63,801,4,785,1001,64,1,64,1105,1,801,1002,64,2,64,109,-12,2107,22,10,63,1005,63,817,1106,0,823,4,807,1001,64,1,64,1002,64,2,64,109,23,1201,-8,0,63,1008,63,38,63,1005,63,847,1001,64,1,64,1106,0,849,4,829,1002,64,2,64,109,-3,21102,46,1,4,1008,1014,46,63,1005,63,871,4,855,1106,0,875,1001,64,1,64,1002,64,2,64,109,5,21102,47,1,2,1008,1017,46,63,1005,63,899,1001,64,1,64,1105,1,901,4,881,4,64,99,21101,0,27,1,21101,0,915,0,1105,1,922,21201,1,42136,1,204,1,99,109,3,1207,-2,3,63,1005,63,964,21201,-2,-1,1,21101,0,942,0,1106,0,922,21202,1,1,-1,21201,-2,-3,1,21101,0,957,0,1105,1,922,22201,1,-1,-2,1106,0,968,22101,0,-2,-2,109,-3,2105,1,0];

// copy of initial input, so we can reset properly
let inputCopy = [...input];

// relative base
let relBase = 0;

// opcode 1 - get values at position 1&2 right after code, add together, store in position 3
function opcode1 (a, b, c, p) {
  let valA = ptest(p[0], a);
  let valB = ptest(p[1], b);
  inputCopy[c] = valA + valB;
  console.log(`op1: ${valA} + ${valB} = ${valA + valB}`)
}

// opcode 2 - get values at position 1&2 right after code, multiply, store in position 3
function opcode2 (a, b, c, p) {
  let valA = ptest(p[0], a);
  let valB = ptest(p[1], b);
  inputCopy[c] = valA * valB;
  console.log(`op2: ${valA} * ${valB} = ${valA * valB}`)
}


// opcode 3 - takes an input and stores in position 1
function opcode3 (iv, s, p) {
  let pos = ptest(p[0], s);
  inputCopy[pos] = iv;
  console.log(`op3: putting ${iv} into spot ${pos}`)
}

// opcode 4 - outputs value at position 1
function opcode4 (s, p) {
  let val = ptest(p[0], s);
  console.log(`op4: outputting ${val}`)
  return val;
}

// opcode 5 - if position 1 != 0, changes i to position 2; otherwise, does nothing
function opcode5 (a, b, inp, p) {
  let valA = ptest(p[0], a);
  let valB = ptest(p[1], b);

  if (valA !== 0) {
    inp = valB;
  }
  console.log(`op5: ${valA} and ${valB}, inst. pointer is now ${inp}`);
  return inp;
}

// opcode 6 - if position 1 == 0, changes i to position 2; otherwise, does nothing
function opcode6 (a, b, inp, p) {
  let valA = ptest(p[0], a);
  let valB = ptest(p[1], b);

  if (valA === 0) {
    inp = valB;
  }
  console.log(`op6: ${valA} and ${valB}, inst. pointer is now ${inp}`);

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
  console.log(`op7: comparing if ${valA} is < ${valB}`);
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
  console.log(`op8: comparing if ${valA} equals ${valB}`);
}

function opcode9 (a, p) {
  let valA = ptest(p[0], a);
  relBase += valA;
  console.log(`op9: new relative base is ${relBase}`);
}

// allows parameter modes - 0 for position mode (value stored at position given); 1 for immediate mode (actual value listed); 2 for relative mode (value stored at position (actual value listed + the relative base))
function ptest(param, checkval) {
  let returnVal;

  if (param == 0 || !param) {
    returnVal = inputCopy[checkval];
  } else if (param == 1) {
    returnVal = checkval;
  } else if (param == 2) {
    let baseVal = relBase + checkval;
    returnVal = inputCopy[baseVal];
  }

  if (returnVal === undefined) {
    returnVal = 0;
  }

  return returnVal;
}

// opcode 99 - stop program

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
        opcode3(inputval, ione, params);
        i++;
        break;
      case 04:
        let res = opcode4(ione, params);
        console.log(res);
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
      case 09: 
        opcode9(ione, params);
        i++;
        break;
    }
  }
}


let inputval = 1;
runProgram();