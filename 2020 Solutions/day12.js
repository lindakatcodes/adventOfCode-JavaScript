import { createRequire } from 'module';
import * as h from '../helpers.js';

const require = createRequire(import.meta.url);
const fs = require('fs');

const data = fs.readFileSync('./2020 Solutions/inputs/day12input.txt').toString();

const directions = h.strInput(data).map((bit) => [bit.slice(0, 1), Number(bit.slice(1))]);

let facing = 'E';
const location = {
  ns: 0,
  ew: 0,
};

function changeFace(dir, amt, face) {
  const optionsR = ['E', 'S', 'W', 'N'];
  const optionsL = ['E', 'N', 'W', 'S'];
  let currInd;
  let loop;
  let newFace;
  if (dir === 'L') {
    currInd = optionsL.findIndex((val) => val === face);
    switch (amt) {
      case 90:
        loop = (currInd + 1) % 4;
        newFace = optionsL[loop];
        break;
      case 180:
        loop = (currInd + 2) % 4;
        newFace = optionsL[loop];
        break;
      case 270:
        loop = (currInd + 3) % 4;
        newFace = optionsL[loop];
        break;
      case 360:
        newFace = optionsL[currInd];
        break;
      default:
        break;
    }
  } else {
    currInd = optionsR.findIndex((val) => val === face);
    switch (amt) {
      case 90:
        loop = (currInd + 1) % 4;
        newFace = optionsR[loop];
        break;
      case 180:
        loop = (currInd + 2) % 4;
        newFace = optionsR[loop];
        break;
      case 270:
        loop = (currInd + 3) % 4;
        newFace = optionsR[loop];
        break;
      case 360:
        newFace = optionsR[currInd];
        break;
      default:
        break;
    }
  }
  return newFace;
}

// part 1
for (let i = 0; i < directions.length; i++) {
  const inst = directions[i][0];
  const amt = directions[i][1];
  switch (inst) {
    case 'N':
      location.ns += amt;
      break;
    case 'S':
      location.ns -= amt;
      break;
    case 'E':
      location.ew += amt;
      break;
    case 'W':
      location.ew -= amt;
      break;
    case 'L':
      facing = changeFace(inst, amt, facing);
      break;
    case 'R':
      facing = changeFace(inst, amt, facing);
      break;
    case 'F':
      if (facing === 'N') {
        location.ns += amt;
      } else if (facing === 'S') {
        location.ns -= amt;
      } else if (facing === 'E') {
        location.ew += amt;
      } else {
        location.ew -= amt;
      }
      break;
    default:
      break;
  }
}

console.log(location);
const destinationDist = Math.abs(location.ns) + Math.abs(location.ew);
console.log(destinationDist);

// part 2
const waypoint = {
  ns: 1,
  ew: 10,
};

const ship = {
  ns: 0,
  ew: 0,
};

function updateFacing(dir, val) {
  const neutral = Math.abs(val);
  switch (dir) {
    case 'N':
      waypoint.ns = neutral;
      break;
    case 'S':
      waypoint.ns = 0 - neutral;
      break;
    case 'E':
      waypoint.ew = neutral;
      break;
    case 'W':
      waypoint.ew = 0 - neutral;
      break;
    default:
      break;
  }
}

for (let i = 0; i < directions.length; i++) {
  const inst = directions[i][0];
  const amt = directions[i][1];
  const currNsFace = waypoint.ns > 0 ? 'N' : 'S';
  const currEwFace = waypoint.ew > 0 ? 'E' : 'W';
  let newNsFace;
  let newEwFace;
  const currNsVal = waypoint.ns;
  const currEwVal = waypoint.ew;
  switch (inst) {
    case 'N':
      waypoint.ns += amt;
      break;
    case 'S':
      waypoint.ns -= amt;
      break;
    case 'E':
      waypoint.ew += amt;
      break;
    case 'W':
      waypoint.ew -= amt;
      break;
    case 'L':
      newNsFace = changeFace(inst, amt, currNsFace);
      newEwFace = changeFace(inst, amt, currEwFace);
      updateFacing(newNsFace, currNsVal);
      updateFacing(newEwFace, currEwVal);
      break;
    case 'R':
      newNsFace = changeFace(inst, amt, currNsFace);
      newEwFace = changeFace(inst, amt, currEwFace);
      updateFacing(newNsFace, currNsVal);
      updateFacing(newEwFace, currEwVal);
      break;
    case 'F':
      ship.ns += amt * waypoint.ns;
      ship.ew += amt * waypoint.ew;
      break;
    default:
      break;
  }
}

console.log(waypoint);
console.log(ship);

const newDistance = Math.abs(ship.ns) + Math.abs(ship.ew);
console.log(newDistance);
