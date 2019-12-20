const fs = require('fs');

// Change number on input file before use
const data = fs.readFileSync('../2019 Solutions/inputs/day14input.txt').toString();

// Need an array of strings?
const input = data.split('\r\n');
const ingredients = input.map(row => row.split(/,|=>/));

// console.log(ingredients);

// find the recipe for fuel
let fuelIndex = 0;
for (let i = 0; i < ingredients.length; i++) {
  for (let j = 0; j < ingredients[i].length; j++) {
    if (ingredients[i][j].includes('1 FUEL')) {
      fuelIndex = i;
    }
  }
}

