import { createRequire } from 'module';
import * as h from '../helpers.js';

const require = createRequire(import.meta.url);
const fs = require('fs');

const data = fs.readFileSync('./2020 Solutions/inputs/day13input.txt').toString();

const parsedData = h.strInput(data);
const mytime = Number(parsedData[0]);
const busdata = parsedData[1].split(',');
const busIds = busdata.filter((val) => val !== 'x').map((id) => Number(id));
// console.log(mytime, busIds);

// part 1
const closeTimes = {};

busIds.forEach((id) => {
  let closestTime = id;
  while (closestTime < mytime) {
    closestTime += id;
  }
  closeTimes[id] = closestTime;
});

const times = Object.values(closeTimes).sort((a, b) => a - b);
const closest = times.find((val) => val > mytime);
const closestId = Object.keys(closeTimes).find((id) => closeTimes[id] === closest);
const waitTime = closest - mytime;
console.log(waitTime * Number(closestId));

// part 2
const timeOffsets = busdata.map((val, index) => (val !== 'x' ? index : null)).filter((val) => val !== null);
// console.log(timeOffsets);
// console.log(busIds);

// find the first point where bus1 and bus2 line up properly
function findMatch(start, item, offset, inc) {
  let firstMatch = 0;
  let matchFound = false;
  let nextA = start;

  while (!matchFound) {
    nextA += inc;
    if ((nextA + offset) % item === 0) {
      matchFound = true;
      firstMatch = nextA;
    }
  }
  // console.log(firstMatch);
  return firstMatch;
}
// then, get the product of 1 & 2. starting from our answer for 1 above, increment each time by the product until we find a match for bus3
function findMatches() {
  const matches = [];

  for (let i = 0; i < busIds.length - 1; i++) {
    let busA;
    let incrementor;
    if (i === 0) {
      busA = busIds[i];
      incrementor = busA;
    } else {
      busA = matches[matches.length - 1];
      incrementor = [...busIds.slice(0, i + 1)].reduce((a, b) => a * b);
    }
    const busB = busIds[i + 1];
    const busBOffset = timeOffsets[i + 1];
    const match1 = findMatch(busA, busB, busBOffset, incrementor);
    matches.push(match1);
  }
  // console.log(matches);
  return matches[matches.length - 1];
}
// repeat
const solution = findMatches();
console.log(solution);
