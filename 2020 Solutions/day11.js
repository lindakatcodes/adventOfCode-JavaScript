import { createRequire } from 'module';
import * as h from '../helpers.js';

const require = createRequire(import.meta.url);
const fs = require('fs');

const data = fs.readFileSync('./2020 Solutions/inputs/day11input.txt').toString();

const layout = h.strInput(data);
// console.log(layout);
const history = [[...layout]];
const threshold = 5;

function getNextSeat(arr, spot, dir) {
  let startX;
  let startY;
  let endX;
  let endY;
  let seatFound = false;
  switch (dir) {
    case 'up':
      startX = spot.x - 1;
      while (startX >= 0 && !seatFound) {
        const nextSpot = arr[startX][spot.y];
        if (nextSpot !== '.') {
          seatFound = true;
          endX = startX;
          endY = spot.y;
        } else {
          startX--;
        }
      }
      break;
    case 'down':
      startX = spot.x + 1;
      while (startX < arr.length && !seatFound) {
        const nextSpot = arr[startX][spot.y];
        if (nextSpot !== '.') {
          seatFound = true;
          endX = startX;
          endY = spot.y;
        } else {
          startX++;
        }
      }
      break;
    case 'left':
      startY = spot.y - 1;
      while (startY >= 0 && !seatFound) {
        const nextSpot = arr[spot.x][startY];
        if (nextSpot !== '.') {
          seatFound = true;
          endY = startY;
          endX = spot.x;
        } else {
          startY--;
        }
      }
      break;
    case 'right':
      startY = spot.y + 1;
      while (startY < arr[0].length && !seatFound) {
        const nextSpot = arr[spot.x][startY];
        if (nextSpot !== '.') {
          seatFound = true;
          endY = startY;
          endX = spot.x;
        } else {
          startY++;
        }
      }
      break;
    case 'ne':
      startX = spot.x - 1;
      startY = spot.y + 1;
      while (startX >= 0 && startY < arr[0].length && !seatFound) {
        const nextSpot = arr[startX][startY];
        if (nextSpot !== '.') {
          seatFound = true;
          endX = startX;
          endY = startY;
        } else {
          startX--;
          startY++;
        }
      }
      break;
    case 'nw':
      startX = spot.x - 1;
      startY = spot.y - 1;
      while (startX >= 0 && startY >= 0 && !seatFound) {
        const nextSpot = arr[startX][startY];
        if (nextSpot !== '.') {
          seatFound = true;
          endX = startX;
          endY = startY;
        } else {
          startX--;
          startY--;
        }
      }
      break;
    case 'se':
      startX = spot.x + 1;
      startY = spot.y + 1;
      while (startX < arr.length && startY < arr[0].length && !seatFound) {
        const nextSpot = arr[startX][startY];
        if (nextSpot !== '.') {
          seatFound = true;
          endX = startX;
          endY = startY;
        } else {
          startX++;
          startY++;
        }
      }
      break;
    case 'sw':
      startX = spot.x + 1;
      startY = spot.y - 1;
      while (startX < arr.length && startY >= 0 && !seatFound) {
        const nextSpot = arr[startX][startY];
        if (nextSpot !== '.') {
          seatFound = true;
          endX = startX;
          endY = startY;
        } else {
          startX++;
          startY--;
        }
      }
      break;
    default:
      break;
  }
  if (seatFound) {
    return arr[endX][endY];
  }
  return '.';
}

function checkSeat(settings, spot) {
  const allspots = {
    up: '0',
    down: '0',
    left: '0',
    right: '0',
    ne: '0',
    se: '0',
    sw: '0',
    nw: '0',
  };

  // part 1 - adjacent spots
  // if (spot.x - 1 >= 0) {
  //   allspots.up = settings[spot.x - 1][spot.y];
  //   if (spot.y - 1 >= 0) {
  //     allspots.nw = settings[spot.x - 1][spot.y - 1];
  //   }
  //   if (spot.y + 1 < settings[0].length) {
  //     allspots.ne = settings[spot.x - 1][spot.y + 1];
  //   }
  // }
  // if (spot.x + 1 < settings.length) {
  //   allspots.down = settings[spot.x + 1][spot.y];
  //   if (spot.y - 1 >= 0) {
  //     allspots.sw = settings[spot.x + 1][spot.y - 1];
  //   }
  //   if (spot.y + 1 < settings[0].length) {
  //     allspots.se = settings[spot.x + 1][spot.y + 1];
  //   }
  // }
  // if (spot.y - 1 >= 0) {
  //   allspots.left = settings[spot.x][spot.y - 1];
  // }
  // if (spot.y + 1 < settings[0].length) {
  //   allspots.right = settings[spot.x][spot.y + 1];
  // }

  // part 2 - first visible seat
  const dirs = ['up', 'down', 'left', 'right', 'ne', 'nw', 'se', 'sw', 'se'];
  dirs.forEach((direction) => {
    const closestSeat = getNextSeat(settings, spot, direction);
    allspots[direction] = closestSeat;
  });

  let seatcount = 0;
  Object.values(allspots).forEach((val) => (val === '#' ? seatcount++ : null));
  return seatcount;
}

// If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
// If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
// Otherwise, the seat's state does not change.
function musicalChairs() {
  const prevLayout = history[history.length - 1];
  const roundLayout = [...prevLayout].map((row) => row.split(''));
  for (let i = 0; i < roundLayout.length; i++) {
    // i = x, j = y
    for (let j = 0; j < roundLayout[i].length; j++) {
      const currSeat = {
        x: i,
        y: j,
        val: roundLayout[i][j],
      };
      if (currSeat.val === 'L') {
        const nearbyCounts = checkSeat(prevLayout, currSeat);
        if (nearbyCounts === 0) {
          roundLayout[i].splice(j, 1, '#');
        }
      } else if (currSeat.val === '#') {
        const nearbyCounts = checkSeat(prevLayout, currSeat);
        if (nearbyCounts >= threshold) {
          roundLayout[i].splice(j, 1, 'L');
        }
      }
    }
  }
  return roundLayout;
}

function checkForDuple(previous, current) {
  if (previous.length > 0) {
    const matches = previous.filter((row, ind) => row === current[ind]);
    if (matches.length === previous.length) {
      return true;
    }
  }
  return false;
}

let rounds = 0;
let duplicate = false;

while (!duplicate) {
  const newRound = musicalChairs().map((row) => row.join(''));
  // console.log(`round ${rounds}`);
  // console.table(newRound);
  const checkRound = checkForDuple(history[history.length - 1], newRound);
  if (!checkRound) {
    history.push(newRound);
    rounds++;
  } else {
    duplicate = true;
  }
}

console.log(`${rounds} rounds to stable`);

const occupied = history[history.length - 1].map((row) => {
  const rowArr = row.split('');
  const count = rowArr.filter((val) => val === '#').length;
  return count;
});

const part1 = occupied.reduce((prev, curr) => prev + curr);
console.log(part1);
