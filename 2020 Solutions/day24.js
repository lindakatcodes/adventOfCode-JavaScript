import { createRequire } from 'module';
import * as h from '../helpers.js';

const require = createRequire(import.meta.url);
const fs = require('fs');

const data = fs.readFileSync('./2020 Solutions/inputs/day24input.txt').toString();

const list = h.strInput(data).map((line) => {
  const lineSplit = [];
  for (let i = 0; i < line.length; i++) {
    if (line[i] === 's' || line[i] === 'n') {
      const bit = `${line[i]}${line[i + 1]}`;
      lineSplit.push(bit);
      i++;
    } else {
      lineSplit.push(line[i]);
    }
  }
  return lineSplit;
});

const tileList = new Map();

const referenceTile = {
  location: [0, 0, 0],
  color: 'white',
};
tileList.set('+0+0+0', referenceTile);

const coords = {
  e: [+1, +0, -1],
  se: [0, +1, -1],
  sw: [-1, +1, +0],
  w: [-1, +0, +1],
  nw: [0, -1, +1],
  ne: [+1, -1, +0],
};

function calcLoc(currL, newL) {
  const updated = currL.map((val, idx) => val + newL[idx]);
  return updated;
}

function setColor(obj) {
  return obj.color === 'white' ? (obj.color = 'black') : (obj.color = 'white');
}

function setName(loc) {
  return loc
    .map((val) => {
      if (val >= 0) {
        return `+${val}`;
      }
      return val;
    })
    .join('');
}

function findTile(path) {
  const startTile = tileList.get('+0+0+0');
  let currLoc = startTile.location;

  path.forEach((dir) => {
    const newLoc = calcLoc(currLoc, coords[dir]);
    currLoc = newLoc;
  });
  return currLoc;
}

for (let i = 0; i < list.length; i++) {
  const newTile = findTile(list[i]);
  // console.log(newTile);
  const tileName = setName(newTile);
  const tileKnown = tileList.has(tileName);
  if (tileKnown) {
    const getTile = tileList.get(tileName);
    setColor(getTile);
    tileList.set(tileName, getTile);
  } else {
    const tile = {
      location: newTile,
      color: 'black',
    };
    tileList.set(tileName, tile);
  }
}

// console.log(tileList);

const allTileValues = tileList.values();
let blackCounter = 0;

for (const tile of allTileValues) {
  const color = tile.color;
  if (color === 'black') {
    blackCounter++;
  }
}

// part 1 answer
// console.log(blackCounter);

// part 2
function flipTiles(tile, tileMap) {
  const locToCheck = tile.location;
  let neighborBlack = 0;
  for (const loc of Object.values(coords)) {
    const newLoc = calcLoc(locToCheck, loc);
    const newLocName = setName(newLoc);
    const locKnown = tileMap.has(newLocName);
    if (locKnown) {
      const locData = tileMap.get(newLocName);
      if (locData.color === 'black') {
        neighborBlack++;
      }
    }
  }
  // if tile is black and has 0 or >2 black neighbors, flip to white
  if (tile.color === 'black') {
    if (neighborBlack === 0 || neighborBlack > 2) {
      return true;
    }
  } else {
    // if tile is white nad has 2 black neighbors, flip to black
    // eslint-disable-next-line no-lonely-if
    if (neighborBlack === 2) {
      return true;
    }
  }
  return false;
}

// console.log(tileList);

let minX = 0;
let maxX = 0;
let minY = 0;
let maxY = 0;
let minZ = 0;
let maxZ = 0;

// x z y
for (const tile of tileList.values()) {
  minX = Math.min(minX, tile.location[0]);
  maxX = Math.max(maxX, tile.location[0]);
  minY = Math.min(minY, tile.location[2]);
  maxY = Math.max(maxY, tile.location[2]);
  minZ = Math.min(minZ, tile.location[1]);
  maxZ = Math.max(maxZ, tile.location[1]);
}

// console.log(minX, maxX, minY, maxY, minZ, maxZ);

for (let i = 0; i < 100; i++) {
  console.log(`running day ${i}`);
  // const tileListCopy = new Map();

  // for (const tile of tileList.entries()) {
  //   tileListCopy.set(tile[0], tile[1]);
  // }

  const toFlip = [];

  for (let x = minX - 1; x <= maxX + 1; x++) {
    for (let z = minZ - 1; z <= maxZ + 1; z++) {
      for (let y = minY - 1; y <= maxY + 1; y++) {
        const locName = setName([x, z, y]);
        if (tileList.has(locName)) {
          const currTile = tileList.get(locName);
          const shouldFlip = flipTiles(currTile, tileList);
          if (shouldFlip) {
            toFlip.push([locName, currTile]);
          }
        } else {
          const newTile = {
            location: [x, z, y],
            color: 'white',
          };
          tileList.set(locName, newTile);
          const shouldFlip = flipTiles(newTile, tileList);
          if (shouldFlip) {
            toFlip.push([locName, newTile]);
          }
        }
      }
    }
  }

  toFlip.forEach((tile) => {
    const tileToFlip = tileList.get(tile[0]);
    if (tileToFlip.color === 'black') {
      tileToFlip.color = 'white';
    } else {
      tileToFlip.color = 'black';
    }
    tileList.set(tile[0], tileToFlip);
  });

  // blackCounter = 0;

  for (const tile of tileList.values()) {
    // const color = tile.color;
    // if (color === 'black') {
    //   blackCounter++;
    // }
    minX = Math.min(minX, tile.location[0]);
    maxX = Math.max(maxX, tile.location[0]);
    minY = Math.min(minY, tile.location[2]);
    maxY = Math.max(maxY, tile.location[2]);
    minZ = Math.min(minZ, tile.location[1]);
    maxZ = Math.max(maxZ, tile.location[1]);
  }

  // console.log(blackCounter);

  // for (const tile of tileListCopy.entries()) {
  //   tileList.set(tile[0], tile[1]);
  // }
}

// console.log(tileList);

blackCounter = 0;

for (const tile of tileList.values()) {
  const color = tile.color;
  if (color === 'black') {
    blackCounter++;
  }
}

console.log(blackCounter);
