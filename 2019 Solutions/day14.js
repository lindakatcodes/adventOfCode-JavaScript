const fs = require('fs');

// Change number on input file before use
const data = fs.readFileSync('../2019 Solutions/inputs/day14input.txt').toString();

// Need an array of strings?
const input = data.split('\r\n');
const recipesPrep = input.map(row => row.split(/,|=>/)); 
const recipes = recipesPrep.map(item => {
  let cleanedItem = item.map(bit => bit.trim());
  return cleanedItem;
});

// console.log (recipes);

let ingredients = {};


// build out list of possible ingredients
for (let i = 0; i < recipes.length; i++) {
  for (let j = 0; j < recipes[i].length; j++) {
    let split = recipes[i][j].split(' ');
    if (!ingredients.hasOwnProperty(split[1])) {
      ingredients[split[1]] = 0;
    }
  }
}

// console.log(ingredients);

function reaction(rec) {
  let breakup = rec[rec.length - 1].split(' ');
  let finalQty = parseInt(breakup[0], 10);
  let finalRes = breakup[1];
  let blocks = rec.slice(0, rec.length - 1);

  blocks.forEach(block => {
    let blockSplit = block.split(' ');
    let blockVal = parseInt(blockSplit[0], 10);
    if (blockSplit[1] === 'ORE') {
      ingredients[blockSplit[1]] += blockVal;
    } else if (ingredients[blockSplit[1]] < blockVal) {
      let bIndex = findRecipe(blockSplit[1]);
      let newVal = reaction(recipes[bIndex]);
      while (newVal < blockVal) {
        newVal = reaction(recipes[bIndex]);
      }
      let left = ingredients[blockSplit[1]] - blockVal;
      ingredients[blockSplit[1]] = left;
    } else {
      let remains = ingredients[blockSplit[1]] - blockVal;
      ingredients[blockSplit[1]] = remains;
    }
  });

  return ingredients[finalRes] += finalQty;
}

function findRecipe(ingred) {
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i][recipes[i].length - 1].includes(ingred)) {
      return i;
    }
  }
}

let fuelIndex = findRecipe('1 FUEL');
reaction(recipes[fuelIndex]);
console.log(ingredients['ORE']);

while (ingredients['ORE'] < 1000000000000) {
  reaction(recipes[fuelIndex]);
  console.log(ingredients['ORE'])
}

console.log(ingredients['FUEL']);