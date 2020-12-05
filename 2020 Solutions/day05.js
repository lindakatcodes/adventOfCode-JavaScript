import { createRequire } from 'module';
import * as h from '../helpers.js';

const require = createRequire(import.meta.url);
const fs = require('fs');

const data = fs.readFileSync('./2020 Solutions/inputs/day05input.txt').toString();

// rows are 0-127 - first seven chars F/B
// columns are 0-7 - last three chars L/R
// multiply the row by 8, then add the column

const tickets = h.strInput(data);
const details = [];
let highest = 0;

function search(str, min, max) {
  const splitstr = str.split('');
  let minval = min;
  let maxval = max;

  for (let i = 0; i < splitstr.length; i++) {
    const dir = splitstr[i];
    const mid = Math.ceil((maxval - minval) / 2 + minval);
    // console.log(`mid between ${minval} and ${maxval} is ${mid}`);
    switch (dir) {
      case 'F':
      case 'L':
        if (splitstr.length - 1 === i) {
          return minval;
        }
        maxval = mid - 1;
        break;
      case 'B':
      case 'R':
        if (splitstr.length - 1 === i) {
          return maxval;
        }
        minval = mid;
        break;
      default:
        break;
    }
  }
}

// part 1 - get the ids for each ticket - check with highest val
for (let i = 0; i < tickets.length; i++) {
  const ticket = [tickets[i].slice(0, 7), tickets[i].slice(7)];
  const row = search(ticket[0], 0, 127);
  const col = search(ticket[1], 0, 7);
  const id = row * 8 + col;
  details.push(id);
  if (id > highest) {
    highest = id;
  }
}

console.log(highest);
// part 2 - sort the ids
const sortedIds = details.sort((prev, curr) => {
  if (prev < curr) {
    return -1;
  }
  if (prev > curr) {
    return 1;
  }
  return 0;
});

// then filter them to find the values missing their neighbors
const seatedges = sortedIds.filter((id, index) => {
  const prev = sortedIds[index - 1];
  const next = sortedIds[index + 1];
  if (id - 1 !== prev || id + 1 !== next) {
    // remove the first and last seat
    if (id !== sortedIds[0] && id !== sortedIds[sortedIds.length - 1]) {
      return id;
    }
  }
});

console.log(seatedges);
