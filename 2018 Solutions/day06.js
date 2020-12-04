import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const fs = require('fs');

const data = fs.readFileSync('./2018 Solutions/inputs/day06input.txt').toString();

const input = data.split('\r\n');
// need a max point to know how far in each direction we need to go
let maxX = 0;
let minX;
let maxY = 0;
let minY;
// parse the coords into arrays, and check for max/min values
const coordVals = input.map((pair) => {
  const these = pair.split(', ').map((val) => parseInt(val, 10));
  if (these[0] > maxX) {
    maxX = these[0];
  }
  if (these[1] > maxY) {
    maxY = these[1];
  }
  return these;
});

const xSorted = coordVals.sort((pair0, pair1) => pair0[0] - pair1[0]);
minX = xSorted[0][0];
// console.log(xSorted);
const ySorted = coordVals.sort((pair0, pair1) => pair0[1] - pair1[1]);
// console.log(ySorted);
minY = ySorted[0][1];

// console.log(`edges: ${minX}, ${maxX}, ${minY}, ${maxY}`);

const coords = new Map();
coordVals.forEach((coord) => {
  const fullObj = {
    coord,
    area: 0,
    edge: false,
  };
  // check if this val is closest to the edge, so we know if it's infinite
  if (coord[0] === minX || coord[0] === maxX || coord[1] === minY || coord[1] === maxY) {
    fullObj.edge = true;
  }
  coords.set(coord, fullObj);
});
// console.log(coords);

// find manhattan distance for two points
function mdist(x1, x2, y1, y2) {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

// test if a coord is an edge of the grid
function onEdge(point) {
  if (point[0] === 0 || point[0] === maxX + 1 || point[1] === 0 || point[1] === maxY + 1) {
    return true;
  }
  return false;
}

function findClosest(valCoord) {
  let closestDist = maxX * maxY;
  let closestPair = [];
  coordVals.forEach((pair) => {
    const dist = mdist(valCoord[0], pair[0], valCoord[1], pair[1]);
    // console.log(`dist from ${valCoord} to ${pair} is ${dist}`);
    if (dist < closestDist) {
      closestDist = dist;
      closestPair = [pair];
    } else if (dist === closestDist) {
      closestPair.push(pair);
    }
  });
  return closestPair;
}

function calcDistances(point) {
  const dists = [];
  coordVals.forEach((coord) => {
    const dist = mdist(coord[0], point[0], coord[1], point[1]);
    dists.push(dist);
  });
  // console.log(`dists for ${point}: ${dists}`);
  return dists.reduce((prev, curr) => prev + curr);
}

let regionSize = 0;
// loop over every value for the rows and cols
for (let y = 0; y <= maxY + 1; y++) {
  for (let x = 0; x <= maxX + 1; x++) {
    // find out which value is the closest at this spot
    const spot = [x, y];
    // console.log(`spot: ${spot}`);
    // part 1
    const closestCoord = findClosest(spot);
    // console.log(closestCoord);
    if (closestCoord.length === 1) {
      const closest = coords.get(closestCoord[0]);
      // console.log(closest);
      closest.area += 1;
      if (onEdge(spot)) {
        closest.edge = true;
      }
      coords.set(closestCoord[0], closest);
    }

    // part 2
    const maxDist = 10000;
    const thisDist = calcDistances(spot);
    if (thisDist < maxDist) {
      regionSize++;
    }
  }
}
console.log(coords);

// find the largest area that's not an edge
let part1 = 0;
coords.forEach((value) => {
  if (!value.edge && value.area > part1) {
    part1 = value.area;
  }
});
console.log(part1);

console.log(regionSize);
