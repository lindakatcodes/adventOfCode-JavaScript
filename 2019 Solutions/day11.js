const chalk = require('chalk');

// Memory - initial puzzle input, a list of integers
const input = [3,8,1005,8,358,1106,0,11,0,0,0,104,1,104,0,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,1,10,4,10,101,0,8,29,1,1104,7,10,3,8,102,-1,8,10,1001,10,1,10,4,10,108,0,8,10,4,10,1002,8,1,54,1,103,17,10,1,7,3,10,2,8,9,10,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,1,10,4,10,102,1,8,89,1,1009,16,10,1006,0,86,1006,0,89,1006,0,35,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,0,10,4,10,102,1,8,124,1,105,8,10,1,2,0,10,1,1106,5,10,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,0,10,4,10,1001,8,0,158,1,102,2,10,1,109,17,10,1,109,6,10,1,1003,1,10,3,8,1002,8,-1,10,101,1,10,10,4,10,108,1,8,10,4,10,1001,8,0,195,1006,0,49,1,101,5,10,1006,0,5,1,108,6,10,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,0,10,4,10,102,1,8,232,2,1102,9,10,1,1108,9,10,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,1,10,4,10,1002,8,1,262,1006,0,47,3,8,1002,8,-1,10,101,1,10,10,4,10,108,0,8,10,4,10,101,0,8,286,1006,0,79,2,1003,2,10,2,107,0,10,1006,0,89,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,1,10,4,10,101,0,8,323,1006,0,51,2,5,1,10,1,6,15,10,2,1102,3,10,101,1,9,9,1007,9,905,10,1005,10,15,99,109,680,104,0,104,1,21101,838211572492,0,1,21101,0,375,0,1106,0,479,21102,1,48063328668,1,21102,386,1,0,1106,0,479,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21102,1,21679533248,1,21101,0,433,0,1105,1,479,21102,235190455527,1,1,21102,444,1,0,1106,0,479,3,10,104,0,104,0,3,10,104,0,104,0,21101,0,837901247244,1,21102,1,467,0,1106,0,479,21101,0,709488169828,1,21102,1,478,0,1105,1,479,99,109,2,22102,1,-1,1,21102,1,40,2,21101,0,510,3,21102,1,500,0,1105,1,543,109,-2,2106,0,0,0,1,0,0,1,109,2,3,10,204,-1,1001,505,506,521,4,0,1001,505,1,505,108,4,505,10,1006,10,537,1102,1,0,505,109,-2,2106,0,0,0,109,4,2101,0,-1,542,1207,-3,0,10,1006,10,560,21101,0,0,-3,21201,-3,0,1,21202,-2,1,2,21102,1,1,3,21102,1,579,0,1105,1,584,109,-4,2106,0,0,109,5,1207,-3,1,10,1006,10,607,2207,-4,-2,10,1006,10,607,21202,-4,1,-4,1106,0,675,21202,-4,1,1,21201,-3,-1,2,21202,-2,2,3,21101,0,626,0,1106,0,584,22101,0,1,-4,21102,1,1,-1,2207,-4,-2,10,1006,10,645,21102,1,0,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,667,22101,0,-1,1,21102,1,667,0,105,1,542,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2105,1,0];

// copy of initial input, so we can reset properly
let inputCopy = [...input];

// relative base
let relBase = 0;

// opcode 1 - get values at position 1&2 right after code, add together, store in position 3
function opcode1 (a, b, c, p) {
  let valA = ptest(p[0], a, 'read');
  let valB = ptest(p[1], b, 'read');
  let valC = ptest(p[2], c, 'write');

  inputCopy[valC] = valA + valB;
  // console.log(`op1: ${valA} + ${valB} = ${valA + valB}`)
}

// opcode 2 - get values at position 1&2 right after code, multiply, store in position 3
function opcode2 (a, b, c, p) {
  let valA = ptest(p[0], a, 'read');
  let valB = ptest(p[1], b, 'read');
  let valC = ptest(p[2], c, 'write');

  inputCopy[valC] = valA * valB;
  // console.log(`op2: ${valA} * ${valB} = ${valA * valB}`)
}


// opcode 3 - takes an input and stores in position 1
function opcode3 (iv, s, p) {
  let pos = ptest(p[0], s, 'write');

  inputCopy[pos] = iv;
  // console.log(`op3: putting ${iv} into spot ${pos}, mode ${p[0]}`)
}

// opcode 4 - outputs value at position 1
function opcode4 (s, p) {
  let val = ptest(p[0], s, 'read');
  // console.log(`op4: outputting ${val} at ${relBase + s}`)
  return val;
}

// opcode 5 - if position 1 != 0, changes i to position 2; otherwise, does nothing
function opcode5 (a, b, inp, p) {
  let valA = ptest(p[0], a, 'read');
  let valB = ptest(p[1], b, 'read');

  if (valA !== 0) {
    inp = valB;
  }
  // console.log(`op5: ${valA} and ${valB}, inst. pointer is now ${inp}`);
  return inp;
}

// opcode 6 - if position 1 == 0, changes i to position 2; otherwise, does nothing
function opcode6 (a, b, inp, p) {
  let valA = ptest(p[0], a, 'read');
  let valB = ptest(p[1], b, 'read');

  if (valA === 0) {
    inp = valB;
  }
  // console.log(`op6: ${valA} and ${valB}, inst. pointer is now ${inp}`);

  return inp;
}

// opcode 7 - if position 1 < position 2, position 3 is set to 1; otherwise, it's set to 0
function opcode7 (a, b, c, p) {
  let valA = ptest(p[0], a, 'read');
  let valB = ptest(p[1], b, 'read');
  let valC = ptest(p[2], c, 'write');

  if (valA < valB) {
    inputCopy[valC] = 1;
  } else {
    inputCopy[valC] = 0;
  }
  // console.log(`op7: comparing if ${valA} is < ${valB}`);
}

// opcode 8 - if position 1 == position 2, position 3 is set to 1; otherwise, it's set to 0
function opcode8 (a, b, c, p) {
  let valA = ptest(p[0], a, 'read');
  let valB = ptest(p[1], b, 'read');
  let valC = ptest(p[2], c, 'write');

  if (valA == valB) {
    inputCopy[valC] = 1;
  } else {
    inputCopy[valC] = 0;
  }
  // console.log(`op8: comparing if ${valA} equals ${valB}`);
}

// opcode 9 - adjust relative base by the value given in position 1
function opcode9 (a, p) {
  let valA = ptest(p[0], a, 'read');
  relBase += valA;
  // console.log(`op9: new relative base is ${relBase}`);
}

// allows parameter modes - 0 for position mode (value stored at position given); 1 for immediate mode (actual value listed); 2 for relative mode (value stored at position (actual value listed + the relative base))
function ptest(param, checkval, mode) {
  let returnVal;
  let baseVal = relBase + checkval;

  if (param == 0 || !param) {
    if (mode === 'read') {
      returnVal = inputCopy[checkval];
    } else if (mode === 'write') {
      returnVal = checkval;
    }
  } else if (param == 1) {
    returnVal = checkval;
  } else if (param == 2) {
    if (mode === 'read') {
      returnVal = inputCopy[baseVal];
    } else if (mode === 'write') {
      returnVal = baseVal;
    }
  }

  if (returnVal === undefined) {
    if (param == 0 || !param) {
      inputCopy[checkval] = 0;
      returnVal = 0;
    } else if (param == 2) {
      inputCopy[baseVal] = 0;
      returnVal = 0;
    }
  }

  return returnVal;
}

// opcode 99 - stop program

// run through memory input, following instructions until 99 is hit
function runProgram() {
  for (let i = lastPos; i < inputCopy.length; i++) {
    if (inputCopy[i] === 99) {
      halted = true;
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
        if (inst.length === 0) {
          inst.push(res);
          i++;
        } else if (inst.length === 1) {
          inst.push(res);
          lastPos = i+2;
          return inst;
        }
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

class Panel {
  constructor() {
    this.color = '',
      this.timesPainted = 0,
      this.location = 0,
      this.seenBefore = false
  }
}

let shipside = [];
let robotDir = 'u';
let halted = false;
let initPaints = 0;
let inputval = 0;
let lastPos = 0;
let inst = [];

let maxX = 1;
let maxY = 1;

// black - 0, white - 1
// directions - 0 is left, 1 is right


// start robot facing up, on black
let start = new Panel ();
  start.color = 'white';
  start.location = [0,0];

function paintShip(place) {
  if (place.color === 'black') {
    inputval = 0;
  } else if (place.color === 'white') {
    inputval = 1;
  }

  let output = runProgram();
  if (halted) {
    return;
  }
  // paint current panel the color outputted
  if (output[0] === 0) {
    place.color = 'black'
  } else if (output[0] === 1) {
    place.color = 'white'
  }

  
  if (place.seenBefore) {
    place.timesPainted++;
  } else {
    place.timesPainted++;
    initPaints++;
    place.seenBefore = true;
  }
  
  let newDir = 0;
  // determine direction to turn and go that way
  if (output[1] === 0) {
    newDir = changeDirection('l', place.location)
  } else if (output[1] === 1) {
    newDir = changeDirection('r', place.location)
  }

  let exists = shipside.findIndex(spot => spot.location[0] === newDir[0] && spot.location[1] === newDir[1]);

  let newSpot;
  if (exists < 0) {
    newSpot = new Panel ();
      newSpot.color = 'black';
      newSpot.location = newDir;
    shipside.push(newSpot);
  } else {
    newSpot = shipside[exists];
  }

  if (maxX < newDir[0]) {
    maxX = newDir[0];
  }
  if (maxY < newDir[1]) {
    maxY = newDir[1];
  }

  inst = [];

  return newSpot;
}

function changeDirection(dir, loc) {
  let newLoc = 0;

  switch (robotDir) {
    case 'u':
      if (dir === 'l') {
        robotDir = 'l';
        newLoc = [loc[0] - 1, loc[1]];
      } else if (dir === 'r') {
        robotDir = 'r';
        newLoc = [loc[0] + 1, loc[1]];
      }
      break;
    case 'd':
      if (dir === 'l') {
        robotDir = 'r';
        newLoc = [loc[0] + 1, loc[1]];
      } else if (dir === 'r') {
        robotDir = 'l';
        newLoc = [loc[0] - 1, loc[1]];
      }
      break;
    case 'l':
      if (dir === 'l') {
        robotDir = 'd';
        newLoc = [loc[0], loc[1] + 1];
      } else if (dir === 'r') {
        robotDir = 'u';
        newLoc = [loc[0], loc[1] - 1];
      }
      break;
    case 'r':
      if (dir === 'l') {
        robotDir = 'u';
        newLoc = [loc[0], loc[1] - 1];
      } else if (dir === 'r') {
        robotDir = 'd';
        newLoc = [loc[0], loc[1] + 1];
      }
      break;
  }
  return newLoc;
}


shipside.push(start);

function progress(p) {
  let currSpot = paintShip(p);
  if (halted) {
    return;
  } else {
    progress(currSpot);
  }
}

progress(start);

// part 1
console.log(initPaints);

// map final colors to reveal identifier
let display = [];

for (let y = 0; y <= maxY; y++) {
  let row = [];
  for (let x = 0; x <= maxX; x++) {
    row.push('.');
  }
  display.push(row);
}

shipside.forEach(panel => {
  let loc = panel.location;
  if (panel.color === 'black') {
    display[loc[1]][loc[0]] = chalk.black('.');
  } else {
    display[loc[1]][loc[0]] = chalk.white.bgWhite('#');
  }
})

// part 2
display.forEach(row => {
  for (let h = 0; h < row.length; h++) {
    if (row[h] === 0) {
      row[h] = chalk.black(0);
    } else if (row[h] === 1) {
      row[h] = chalk.white.bgWhite(1);
    }
  }
  row.join(',');
  console.log(`${row}`);
})
