// Thanks to Ben Myers in the Party Corgi group for sharing his explaination & code for this! I could NOT get my brain to work on this one correctly, and his way made a lot of sense, so I basically used the same code, just re-written with extra notes so I understand it fully. You can see his breakdown here: https://github.com/BenDMyers/Advent_Of_Code_2020/tree/master/17

import { createRequire } from 'module';
import * as h from '../helpers.js';

const require = createRequire(import.meta.url);
const fs = require('fs');

const data = fs.readFileSync('./2020 Solutions/inputs/day17input.txt').toString();

const startGrid = h.strInput(data).map((row) => row.split(''));

let activeGrid = {};

// part 1 - 3 dimensional
for (let x = 0; x < startGrid.length; x++) {
  for (let y = 0; y < startGrid[x].length; y++) {
    if (startGrid[x][y] === '#') {
      // active cell, we need to store it
      activeGrid[`(${x}, ${y}, 0)`] = { x, y, z: 0 };
    }
  }
}
// console.log(activeGrid);

// see which neighboring cells are currently active
function getActiveCells(cellX, cellY, cellZ) {
  let activeCells = 0;
  // for each value that's -1 or plus 1 of current space - neighbors
  for (let x = cellX - 1; x <= cellX + 1; x++) {
    for (let y = cellY - 1; y <= cellY + 1; y++) {
      for (let z = cellZ - 1; z <= cellZ + 1; z++) {
        // because our loops will go through our origin point, make sure we ignore that when we hit it
        const original = x === cellX && y === cellY && z === cellZ;
        // if this spot already exists in our active cells and isn't the origin point, add it to activeCells
        if (activeGrid[`(${x}, ${y}, ${z})`] && !original) {
          activeCells++;
        }
      }
    }
  }
  return activeCells;
}

for (let i = 0; i < 6; i++) {
  const activeCells = Object.values(activeGrid);
  const newActiveGrid = {};

  // see what the min and max values are for our currently active cells, to determine which values we need to check
  let minX = activeCells[0].x;
  let maxX = activeCells[0].x;
  let minY = activeCells[0].y;
  let maxY = activeCells[0].y;
  let minZ = activeCells[0].z;
  let maxZ = activeCells[0].z;

  for (const cell of activeCells) {
    minX = Math.min(minX, cell.x);
    maxX = Math.max(maxX, cell.x);
    minY = Math.min(minY, cell.y);
    maxY = Math.max(maxY, cell.y);
    minZ = Math.min(minZ, cell.z);
    maxZ = Math.max(maxZ, cell.z);
  }

  // then check through the new range and see what we need to update
  for (let x = minX - 1; x <= maxX + 1; x++) {
    for (let y = minY - 1; y <= maxY + 1; y++) {
      for (let z = minZ - 1; z <= maxZ + 1; z++) {
        const newActiveCells = getActiveCells(x, y, z);
        // console.log(`cell (${x}, ${y}, ${z}) has ${newActiveCells} neighbors`);
        // if cell is already in the grid, it only stays active if there's 2 or 3 newActiveCells
        if (activeGrid[`(${x}, ${y}, ${z})`]) {
          if (newActiveCells === 2 || newActiveCells === 3) {
            newActiveGrid[`(${x}, ${y}, ${z})`] = { x, y, z };
          }
        } else {
          // cell was previously inactive, so needs to have exactly 3 newActiveCells to turn active
          if (newActiveCells === 3) {
            newActiveGrid[`(${x}, ${y}, ${z})`] = { x, y, z };
          }
        }
      }
    }
  }
  // then we update the original grid to be our new grid
  activeGrid = newActiveGrid;
  // console.log(activeGrid);
}

console.log(Object.values(activeGrid).length);

// part 2 - 4 dimensional
activeGrid = {};

for (let x = 0; x < startGrid.length; x++) {
  for (let y = 0; y < startGrid[x].length; y++) {
    if (startGrid[x][y] === '#') {
      // active cell, we need to store it
      activeGrid[`(${x}, ${y}, 0, 0)`] = { x, y, z: 0, w: 0 };
    }
  }
}

// see which neighboring cells are currently active
function getActiveCells2(cellX, cellY, cellZ, cellW) {
  let activeCells = 0;
  // for each value that's -1 or plus 1 of current space - neighbors
  for (let x = cellX - 1; x <= cellX + 1; x++) {
    for (let y = cellY - 1; y <= cellY + 1; y++) {
      for (let z = cellZ - 1; z <= cellZ + 1; z++) {
        for (let w = cellW - 1; w <= cellW + 1; w++) {
          // because our loops will go through our origin point, make sure we ignore that when we hit it
          const original = x === cellX && y === cellY && z === cellZ && w === cellW;
          // if this spot already exists in our active cells and isn't the origin point, add it to activeCells
          if (activeGrid[`(${x}, ${y}, ${z}, ${w})`] && !original) {
            activeCells++;
          }
        }
      }
    }
  }
  return activeCells;
}

for (let i = 0; i < 6; i++) {
  const activeCells = Object.values(activeGrid);
  const newActiveGrid = {};

  // see what the min and max values are for our currently active cells, to determine which values we need to check
  let minX = activeCells[0].x;
  let maxX = activeCells[0].x;
  let minY = activeCells[0].y;
  let maxY = activeCells[0].y;
  let minZ = activeCells[0].z;
  let maxZ = activeCells[0].z;
  let minW = activeCells[0].w;
  let maxW = activeCells[0].w;

  for (const cell of activeCells) {
    minX = Math.min(minX, cell.x);
    maxX = Math.max(maxX, cell.x);
    minY = Math.min(minY, cell.y);
    maxY = Math.max(maxY, cell.y);
    minZ = Math.min(minZ, cell.z);
    maxZ = Math.max(maxZ, cell.z);
    minW = Math.min(minW, cell.w);
    maxW = Math.max(maxW, cell.w);
  }

  // then check through the new range and see what we need to update
  for (let x = minX - 1; x <= maxX + 1; x++) {
    for (let y = minY - 1; y <= maxY + 1; y++) {
      for (let z = minZ - 1; z <= maxZ + 1; z++) {
        for (let w = minW - 1; w <= maxW + 1; w++) {
          const newActiveCells = getActiveCells2(x, y, z, w);
          // console.log(`cell (${x}, ${y}, ${z}) has ${newActiveCells} neighbors`);
          // if cell is already in the grid, it only stays active if there's 2 or 3 newActiveCells
          if (activeGrid[`(${x}, ${y}, ${z}, ${w})`]) {
            if (newActiveCells === 2 || newActiveCells === 3) {
              newActiveGrid[`(${x}, ${y}, ${z}, ${w})`] = { x, y, z, w };
            }
          } else {
            // cell was previously inactive, so needs to have exactly 3 newActiveCells to turn active
            if (newActiveCells === 3) {
              newActiveGrid[`(${x}, ${y}, ${z}, ${w})`] = { x, y, z, w };
            }
          }
        }
      }
    }
  }
  // then we update the original grid to be our new grid
  activeGrid = newActiveGrid;
}

console.log(Object.values(activeGrid).length);
