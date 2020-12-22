// part 2 still missing  - counts are off somehow. Need to come back and figure a different way to determine which allergens can be possible for each ingredient, then the rest of the code should work

import { createRequire } from 'module';
import * as h from '../helpers.js';

const require = createRequire(import.meta.url);
const fs = require('fs');

const data = fs.readFileSync('./2020 Solutions/inputs/day21input.txt').toString();

const foods = h.strInput(data).map((line) => line.split(/(\((?:[\w\s\,]+)\))/));

const allergens = new Set();
const ingredients = {};

// ingredients will need:
// key of the name (str)
// possibleAllergens (arr)
// knownAllergen (str)
// appearance (num)

foods.forEach((foodList) => {
  // remove extra white space from the ingredient list
  const cleanedList = foodList[0].trim();
  // clean up the allergen list so we can use it
  const listContains = foodList[1]
    .split('(contains ')
    .map((list, index) => {
      if (index !== 0) {
        const words = list.split(',').map((item) => item.trim());
        words.forEach((bit, idx) => {
          if (bit.includes(')')) {
            words[idx] = bit.slice(0, bit.length - 1);
          }
        });
        return words;
      }
      return '';
    })
    .flat()
    .slice(1);

  // add each allergen to the list of allergens
  listContains.forEach((item) => allergens.add(item));

  // then go over each ingredient and set it's object up or update it if we've seen it before
  cleanedList.split(' ').forEach((item) => {
    if (Object.keys(ingredients).includes(item)) {
      // if we've already seen this word:
      const currentIngredient = ingredients[item];
      // increase it's appearance count
      currentIngredient.appearance++;
      listContains.forEach((allergy) => {
        // see if possibleAllergens already contains current allergens
        if (Object.keys(currentIngredient.possibleAllergens).includes(allergy)) {
          // if so, increase count for repeats
          currentIngredient.possibleAllergens[allergy]++;
        } else {
          // otherwise, add to list
          currentIngredient.possibleAllergens[allergy] = 1;
        }
      });
    } else {
      // set up a new object with all the data
      const currentIngredient = {};
      currentIngredient.appearance = 1;
      currentIngredient.knownAllergen = '';
      currentIngredient.likelyAllergen = '';
      currentIngredient.possibleAllergens = {};
      listContains.forEach((allergy) => (currentIngredient.possibleAllergens[allergy] = 1));
      ingredients[item] = currentIngredient;
    }
  });
});

// get counts for how often an allergen shows up
const allergenCount = [];
allergens.forEach((allergy) => {
  const foodsWithAllergen = Object.values(ingredients).filter((item) => Object.keys(item.possibleAllergens).includes(allergy));
  allergenCount.push([allergy, foodsWithAllergen.length]);
});

// sort the counts so the lowest numbers are at the front
const sortedAllergenCount = [...allergenCount].sort((first, second) => first[1] - second[1]);
// console.log(sortedAllergenCount);

// // loop over the sorted allergen counts
// sortedAllergenCount.forEach((allergen) => {
//   // grab the ingredients that containt this allergen
//   const foodsToCheck = Object.entries(ingredients).filter((item) => {
//     const itemAllergies = item[1].possibleAllergens;
//     return Object.keys(itemAllergies).includes(allergen[0]);
//   });
//   // console.log(foodsToCheck);
//   // check the counts for each item - looking for the ingredient that either only has this allergen or has the highest count (and doesn't have another count that's higher)
//   if (foodsToCheck.length === 1) {
//     // only one possibility, so set it
//     const foodObj = ingredients[foodsToCheck[0][0]];
//     foodObj.knownAllergen = allergen[0];
//     foodObj.possibleAllergens = [];
//   } else {
//     // otherwise we need to check all the items
//     const foodAllergenCounts = foodsToCheck.map((item) => {
//       const allergenData = Object.entries(item[1].possibleAllergens);
//       return allergenData;
//     });
//     // console.log(foodAllergenCounts);

//     foodAllergenCounts.forEach((bit, idx) => {
//       // console.log(bit);
//       const allergyIdx = bit.findIndex((item) => item[0] === allergen[0]);
//       const allergyCount = bit[allergyIdx][1];
//       // console.log(allergyCount);
//       const otherHigher = bit.map((word, i) => !!(word[1] > allergyCount && i !== allergyIdx));
//       // console.log(otherHigher);
//       if (!otherHigher.includes(true)) {
//         // this is our ingredient - update it
//         const foodObj = ingredients[foodsToCheck[idx][0]];
//         foodObj.knownAllergen = allergen[0];
//         foodObj.possibleAllergens = [];

//         // also remove the allergen from the other possible lists so we can narrow down further
//         foodsToCheck.splice(idx, 1);
//         foodsToCheck.forEach((item) => {
//           const itemObj = ingredients[item[0]];
//           const allergyArr = Object.keys(itemObj.possibleAllergens);
//           const removeIdx = allergyArr.indexOf(allergen[0]);
//           const cleanedAllergyArr = [...allergyArr.slice(0, removeIdx), ...allergyArr.slice(removeIdx + 1)];
//           const updatedAllergenList = cleanedAllergyArr.map((word) => [word, itemObj.possibleAllergens[word]]);
//           itemObj.possibleAllergens = Object.fromEntries(updatedAllergenList);
//         });
//       }
//     });
//   }
// });

// console.log(ingredients);

// // now go through each allergen and figure out which ingredient causes it
allergens.forEach((allergy) => {
  // filter the ingredient list for any that have it listed as possible
  const foodWithAllergen = Object.entries(ingredients).filter((item) => {
    const itemAllergies = item[1].possibleAllergens;
    return Object.keys(itemAllergies).includes(allergy);
  });

  // sort the possibleAllergen values so the highest counts are at the top
  const sortedFoods = foodWithAllergen.sort((prev, next) => {
    const prevCount = prev[1].possibleAllergens[allergy];
    const nextCount = next[1].possibleAllergens[allergy];
    if (prevCount < nextCount) {
      return 1;
    }
    if (prevCount > nextCount) {
      return -1;
    }
    return 0;
  });
  // whoever has the highest has it
  const likelyFirst = sortedFoods[0];
  // for that ingredient, mark it's knownAllergen as the current allergen
  const updatedObject = likelyFirst[1];
  updatedObject.knownAllergen = allergy;
  updatedObject.possibleAllergens = [];
  ingredients[likelyFirst[0]] = updatedObject;
  // remove the current allergen from all the possibleAllergen lists
  foodWithAllergen.forEach((item) => {
    const thisIngredient = item[1];
    const allergyArr = Object.keys(thisIngredient.possibleAllergens);
    const allergyIdx = allergyArr.indexOf(allergy);
    const cleanedAllergyArr = [...allergyArr.slice(0, allergyIdx), ...allergyArr.slice(allergyIdx + 1)];
    const updatedAllergenList = cleanedAllergyArr.map((word) => [word, thisIngredient.possibleAllergens[word]]);
    thisIngredient.possibleAllergens = Object.fromEntries(updatedAllergenList);
    ingredients[item[0]] = thisIngredient;
  });
});

// part 1 - now that we know which allergen goes to what ingredient, we can get the count of all the ingredients that do not have an allergen
const noAllergens = Object.values(ingredients).filter((item) => !item.knownAllergen);
const noAllergenCount = noAllergens.map((value) => value.appearance).reduce((a, b) => a + b);
console.log(noAllergenCount);

// part 2 - we need a list of dangerous ingredients, sorted by their allergens alphabetically
// so first, filter for the ingredients with allergens
const dangerous = Object.entries(ingredients).filter((item) => item[1].knownAllergen);
// then, sort the list by allergen, alphabetically
const sortedDanger = dangerous.sort((one, two) => {
  const oneAllergy = one[1].knownAllergen;
  const twoAllergy = two[1].knownAllergen;
  if (oneAllergy < twoAllergy) {
    return -1;
  }
  if (oneAllergy > twoAllergy) {
    return 1;
  }
  return 0;
});
// then, make a string with no spaces (just commas) of the ingredient names in order - canonical dangerous ingredient list
const cdil = sortedDanger
  .map((item, idx) => {
    const name = item[0];
    if (idx < sortedDanger.length - 1) {
      return `${name},`;
    }
    return `${name}`;
  })
  .join('');
console.log(cdil);

// correct should be: vmhqr,qxfzc,khpdjv,gnrpml,xrmxxvn,rfmvh,rdfr,jxh
