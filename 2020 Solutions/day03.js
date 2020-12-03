import { createRequire } from 'module';
import * as h from '../helpers.js';

const require = createRequire(import.meta.url);
const fs = require('fs');

const data = fs.readFileSync('./2020 Solutions/inputs/day03input.txt').toString();

const parsedData = h.strInput(data);

const bottom = parsedData.length - 1;

// calculate how long we need the rows to be
function buildMap(right) {
  const maxLen = bottom * right;
  const treemap = parsedData.map((row) => {
    const broken = row.split('');
    while (broken.length < maxLen) {
      broken.push(...broken);
    }
    return broken;
  });
  return treemap;
}

function findTrees(right, down) {
  let currentX = 0;
  let trees = 0;
  const fullMap = buildMap(right);
  for (let i = 0; i <= bottom; i++) {
    const nextX = currentX + right;
    const nextY = i + down;
    if (nextY > bottom) {
      break;
    }
    const spot = fullMap[nextY][nextX];
    if (spot === '#') {
      trees++;
    }
    currentX = nextX;
    i = nextY - 1;
  }
  return trees;
}

// slopes to check
// Right 1, down 1.
// Right 3, down 1.
// Right 5, down 1.
// Right 7, down 1.
// Right 1, down 2.

const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];
const allTrees = [];

slopes.forEach((slope) => {
  const slopeTrees = findTrees(slope[0], slope[1]);
  allTrees.push(slopeTrees);
});

const multiply = (prev, curr) => prev * curr;
const total = allTrees.reduce(multiply);

console.log(allTrees);
console.log(total);
