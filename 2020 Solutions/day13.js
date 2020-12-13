import { createRequire } from 'module';
import * as h from '../helpers.js';

const require = createRequire(import.meta.url);
const fs = require('fs');

const data = fs.readFileSync('./2020 Solutions/inputs/day13input.txt').toString();

const parsedData = h.strInput(data);
// const mytime = Number(parsedData[0]);
const busdata = parsedData[1].split(',');
const busIds = busdata.filter((val) => val !== 'x').map((id) => Number(id));
// console.log(mytime, busIds);

// part 1
// const closeTimes = {};

// busIds.forEach((id) => {
//   let closestTime = id;
//   while (closestTime < mytime) {
//     closestTime += id;
//   }
//   closeTimes[id] = closestTime;
// });

// const times = Object.values(closeTimes).sort((a, b) => a - b);
// const closest = times.find((val) => val > mytime);
// const closestId = Object.keys(closeTimes).find((id) => closeTimes[id] === closest);
// const waitTime = closest - mytime;
// console.log(waitTime * Number(closestId));

// part 2
const timeOffsets = busdata.map((val, index) => (val !== 'x' ? index : null)).filter((val) => val !== null);
// console.log(timeOffsets);
// console.log(busIds);

let offsetFound = false;
const lastIteration = [];
// const startTime = 1260000;
const startTime = 100000000000000;
const largestVal = [...busIds].sort((a, b) => a - b).pop();
const lvInd = busIds.findIndex((val) => val === largestVal);
// console.log(largestVal);

const divided = Math.floor(startTime / largestVal);
let closestTime = divided * largestVal;
while (closestTime <= startTime) {
  closestTime += largestVal;
}

while (!offsetFound) {
  const offset = timeOffsets[lvInd];
  const firstValToMatch = closestTime - offset;
  if (firstValToMatch % busIds[0] === 0) {
    // potential match, check other values
    lastIteration.push(firstValToMatch);
    for (let j = 1; j < busIds.length; j++) {
      const thisOffset = timeOffsets[j];
      const thisNextVal = firstValToMatch + thisOffset;
      const thisNextBus = busIds[j];
      if (thisNextVal % thisNextBus !== 0) {
        closestTime += largestVal;
        h.clearArr(lastIteration);
        break;
      } else {
        lastIteration.push(thisNextVal);
      }
    }
    // if we have enough values to equal all the buses, we've found the value and can end search
    if (lastIteration.length >= busIds.length) {
      offsetFound = true;
    }
  } else {
    // doesn't match, increase closestTime and try again
    closestTime += largestVal;
    console.log(closestTime);
  }
}
console.log(lastIteration[0]);
console.log(lastIteration);

// while (!offsetFound) {
//   for (let i = busIds.length - 1; i > -1; i--) {
//     const offset = timeOffsets[i];
//     const nextVal = closestTime + offset;
//     const nextBusVal = busIds[i];
//     if (nextVal % nextBusVal !== 0) {
//       startTime = closestTime;
//       h.clearArr(lastIteration);
//       closestTime += firstVal;
//       lastIteration.push(closestTime);
//       break;
//     } else {
//       for (let j = 1; j < busIds.length; j++) {
//         const thisOffset = timeOffsets[j];
//         const thisNextVal = closestTime + thisOffset;
//         const thisNextBus = busIds[j];
//         if (thisNextVal % thisNextBus !== 0) {
//           startTime = closestTime;
//           h.clearArr(lastIteration);
//           closestTime += firstVal;
//           lastIteration.push(closestTime);
//           break;
//         } else {
//           lastIteration.push(thisNextVal);
//         }
//       }
//       console.log(lastIteration);
//       break;
//     }
//   }

//   if (lastIteration.length >= busIds.length) {
//     offsetFound = true;
//   }
// }
// console.log(lastIteration[0]);
