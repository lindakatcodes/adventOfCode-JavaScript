const fs = require('fs');
const chalk = require('chalk');

const data = fs.readFileSync('../2019 Solutions/inputs/day08input.txt').toString();

const input = data.split('').map(Number);

// image will be 25 px wide (rows) by 6 px tall (cols)
// so each layer is 25x6 - need to know how many of each digit (0,1,2) exist on ea layer
// find layer with the fewest 0s, then find # of 1s x # of 2s
let width = 25;
let height = 6;

let layers = [];
let zeros = 0;
let ones = 0;
let twos = 0;

let lowestZeros = 0;
let multi = 0;

let currRow = [];
let currLayer = [];
let currCol = 1;

// build out the layers
for (let i = 0; i <= input.length; i++) {
  if (currRow.length < width) {
    currRow.push(input[i]);
  } else if (currRow.length === width) {
    if (currCol < height) {
      currLayer.push(currRow);
      currRow = [];
      currRow.push(input[i]);
      currCol++;
    } else if (currCol === height) {
      currLayer.push(currRow);
      layers.push(currLayer);
      currLayer = [];
      currRow = [];
      currCol = 1;
      currRow.push(input[i]);
    }
  }
}

// part 1 - count the values
layers.forEach(arr => {
  for (let i = 0; i < arr.length; i++) {
    let currArr = arr[i];
    for (let c = 0; c < currArr.length; c++) {
      let val = currArr[c];
      if (val === 0) {
        zeros++;
      } else if (val === 1) {
        ones++;
      } else if (val === 2) {
        twos++;
      }
    }
  }
  if (lowestZeros === 0) {
    lowestZeros = zeros;
      multi = ones * twos;
  } else if (zeros < lowestZeros) {
      lowestZeros = zeros;
      multi = ones * twos;
    }
    ones = 0;
    twos = 0;
    zeros = 0;
});

console.log(`Part 1: ones * twos is ${multi}`);

let finalImage = [];
let singleRow = [];

// part 2 - determine which pixels show up
layers.forEach(layer => {
  for (let y = 0; y < layer.length; y++) {
    for (let x = 0; x < layer[y].length; x++) {
      if (finalImage[y]) {
        singleRow = finalImage[y];
        let data = singleRow[x];
        if (data === 2) {
          if (layer[y][x] === 0) {
            singleRow.splice(x, 1, 0);
          } else if (layer[y][x] === 1) {
            singleRow.splice(x, 1, 1);
          }
        }
        } else {
          singleRow = layer[y];
        } 
      }
    finalImage.splice(y, 1, singleRow);
  }
})

// colorize each pixel to read message
finalImage.forEach(row => {
  for (let h = 0; h < row.length; h++) {
    if (row[h] === 0) {
      row[h] = chalk.black(0);
    } else if (row[h] === 1) {
      row[h] = chalk.white.bgWhite(1);
    } else if (row[h] === 2) {
      row[h] = chalk.hidden(2);
    }
  }
  row.join();
  console.log(`${row}`);
})