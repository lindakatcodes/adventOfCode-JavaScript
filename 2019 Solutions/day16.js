const input = '03036732577212944063491565474664'.split('').map(Number);

const pattern = [0,1,0,-1];

function calcPatterns(len) {
  let phasePatterns = [];
  for (let h = 1; h <= len; h++) {
    let newPattern = [];
    let patternSet = [];

    pattern.forEach(val => {
      for (let j = 0; j < h; j++) {
        patternSet.push(val);
      }
    })

    let firstVal = patternSet.shift();
    newPattern.push(...patternSet);
    patternSet.unshift(firstVal);
    

    let setToAdd = patternSet.join('');
    let diff = Math.round(len / patternSet.length);
    let fullPattern = setToAdd.repeat(diff);
    let fpArr = [];
    for (let i = 0; i < fullPattern.length; i++) {
      if (fullPattern[i] === '-') {
        let next = parseInt('-' + fullPattern[i + 1], 10);
        fpArr.push(next);
        i++;
      } else {
        fpArr.push(parseInt(fullPattern[i]));
      }
    }
    newPattern.push(...fpArr);

    // while (newPattern.length < len) {
    //   newPattern.push(...patternSet);
    // }

    if (newPattern.length !== len) {
      let removeCount = newPattern.length - len;
      newPattern.splice(len + 1, removeCount);
    }

    phasePatterns.push(newPattern);
  }
  return phasePatterns;
}

// console.log(phasePatterns);

function runPhase(signal, patterns) {
  let newSignal = [];
  
  for (let i = 0; i < signal.length; i++) {
    let calcs = [];
    let thisPhasePattern = patterns[i];

    signal.forEach((num, index) => {
      let newval = num * thisPhasePattern[index];
      if (newval.length > 1) {
        newval = parseInt(String(newval).charAt(newval.length - 1), 10);
      }
      calcs.push(newval);
    })

    let combined = calcs.reduce((a, b) => a + b);
    let str = combined.toString();
    let getOnes = str.charAt(str.length - 1);
    let valToPush = Math.abs(parseInt(getOnes, 10));
    newSignal.push(valToPush);
  }
  return newSignal;
}

function allPhases(signal, pattern) {
  let numPhases = 100;
  let newSignal = signal;
  
  for (let a = 0; a < numPhases; a++) {
    newSignal = runPhase(newSignal, pattern);
    // console.log(`Phase ${a} result: ${newSignal}`);
  }
  return newSignal;
}

// part 1
let phase1Patterns = calcPatterns(input.length);
let partOne = allPhases(input, phase1Patterns);
let firstEight = partOne.slice(0, 8).join('');
console.log(`Part 1: ${firstEight}`);


let realSignal = [];
for (let k = 0; k < 10000; k++) {
  realSignal.push(...input);
}

let phase2Patterns = calcPatterns(realSignal.length);

let offset = parseInt(input.slice(0, 7).join(''), 10);
let partTwo = allPhases(realSignal, phase2Patterns);
let message = partTwo.slice(offset, offset + 7).join('');
console.log(`Part 2: ${message}`);