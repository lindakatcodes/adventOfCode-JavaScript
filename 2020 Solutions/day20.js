import { createRequire } from 'module';
import * as h from '../helpers.js';

const require = createRequire(import.meta.url);
const fs = require('fs');

const data = fs.readFileSync('./2020 Solutions/inputs/day20input.txt').toString();

const dataTiles = h.splitOnSpaces(data);

const tiles = new Map();

dataTiles.forEach((pic) => {
  const tile = {
    matches: 0,
    matchPairs: [],
  };

  const cleanedTile = h.strInput(pic);
  tile.number = parseInt(cleanedTile[0].match(/(\d)+/g), 10);

  const fullPic = [...cleanedTile.slice(1)];
  tile.pic = fullPic;

  // each pic has 4 borders - need to store an original and reversed copy of each
  const borders = [];

  // set original borders first (easiest)
  const top = fullPic[0];
  const bottom = fullPic[fullPic.length - 1];

  const left = fullPic.map((line) => line.split('')[0]).join('');
  const right = fullPic.map((line) => line.split('')[line.length - 1]).join('');

  borders.push(top, bottom, left, right);

  const toprev = top.split('').reverse().join('');
  const bottomrev = bottom.split('').reverse().join('');
  const leftrev = left.split('').reverse().join('');
  const rightrev = right.split('').reverse().join('');

  borders.push(toprev, bottomrev, leftrev, rightrev);

  tile.borders = borders;
  tiles.set(tile.number, tile);
});

// console.log(tiles);

const allBorders = [];

for (const tile of tiles) {
  allBorders.push([tile[0], tile[1].borders]);
}

const edges = [];

for (const tile of tiles) {
  const borders = tile[1].borders;
  const borderPairs = [];
  // console.log(borders);
  const count = borders.map((str) => {
    // console.log(`testing border ${str}`);
    let matchCount = 0;
    allBorders.forEach((set) => {
      if (set[0] !== tile[0]) {
        const theseMatches = set[1].filter((thisstr) => thisstr === str);
        const borderKeys = borderPairs.map((pair) => pair[0]);
        theseMatches.forEach((match) => {
          if (!borderKeys.includes(set[0])) {
            borderPairs.push([set[0], match]);
            matchCount++;
          }
        });
      }
    });
    return matchCount;
  });
  const countTotal = count.reduce((a, b) => a + b);

  const tileObj = tile[1];
  tileObj.matchPairs = borderPairs;
  tileObj.matches = countTotal;
  tiles.set(tile[0], tileObj);

  if (countTotal === 2) {
    edges.push(tile[0]);
  }
}

const edgeProduct = edges.reduce((a, b) => a * b);
console.log(edgeProduct);
// console.log(tiles);

// part 2
// start with a corner, and find out which two edges are matched
// then need to rotate piece so that the two edges that aren't matched are on the outside
// can then remove the border from the image, update the image in the map
// add the current image to the nextRow array, and figure out how to track the two pieces it touches - need to process the one on the right next but don't want to lose the one on the bottom
// keep checking values and adding to the nextRow until we reach the other corner - then we push this row to the fullImage and start with the next new row
// continue until all tiles are processed
// then will need a way to track the monster pattern, and see if we can see any of the pattern in the current image
// if not, rotate the image and try again, continuing to rotate or flip until we find the pattern
// then count the number of # that aren't part of the monster patterns
// bonus: find a way to color and display the image so we get a fun visualization

const fullImage = [];
const nextRow = [];

const startTile = edges[0];
const nextToAdd = [startTile];
const sides = ['top', 'bottom', 'left', 'right', 'topFlip', 'bottomFlip', 'leftFlip', 'rightFlip'];

// while (nextToAdd.length > 0) {
const fullTile = tiles.get(nextToAdd.shift());
const matchedSides = [];
fullTile.matchPairs.forEach((pair) => {
  nextToAdd.push(pair[0]);
  const sideIdx = fullTile.borders.indexOf(pair[1]);
  matchedSides.push(sides[sideIdx]);
});
console.log(matchedSides);

// }
