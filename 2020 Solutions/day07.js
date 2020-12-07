import { createRequire } from 'module';
import * as h from '../helpers.js';

const require = createRequire(import.meta.url);
const fs = require('fs');

const data = fs.readFileSync('./2020 Solutions/inputs/day07input.txt').toString();

const parsedData = h.strInput(data).map((line) => line.split(' contain '));

const searchingFor = 'shiny gold';
let numBags = 0;
const allBags = [];
const canHold = [];
const checkedBags = [];
const toCheck = [];
let checking = true;
const bagRegex = /bag|s\b/;

parsedData.forEach((guide) => {
  const bagType = guide[0].split(' bags', 1).join('');
  const bagHolds = guide[1];
  const bagData = {
    type: bagType,
    holds: bagHolds,
  };

  allBags.push(bagData);
});

// initially assign all bags to toCheck
toCheck.push(...allBags);

// part 1 - find any bags that can contain a shiny gold bag
function checkBagList(bagArr) {
  let newResults = false;

  bagArr.forEach((bag, index) => {
    // console.log(bag);
    const bagHolds = allBags.find((item) => item.type === bag.type);
    // console.log(bagHolds);
    const parent = canHold.filter((item) => bagHolds.holds.includes(item));

    // if bag contains search key, or parent contains items (bags that can hold bags already confirmed to be viable), add to canHold, increase count, and mark new results found
    if (bagHolds.holds.includes(searchingFor) || parent.length > 0) {
      canHold.push(bag.type);
      numBags++;
      newResults = true;
      // remove item from bagArr, so we don't check it again on next round
      checkedBags.push(bagArr.splice(index, 1));
    }
  });
  return newResults;
}

// part 1 recursion
while (checking) {
  const results = checkBagList(toCheck);
  if (results) {
    // got new results, check the list again
    checkBagList(toCheck);
  } else {
    // no new results, so all items have been checked
    checking = false;
  }
}

console.log(`Bags that can contain ${searchingFor}: ${numBags}`);

function findBagDepth(term) {
  let bagCount = 0;

  const bagItem = allBags.find((item) => item.type === term);
  // if no other bags in holds, return 0
  if (bagItem.holds.includes('no other bags')) {
    return 0;
  }
  const bagHolds = bagItem.holds.split(bagRegex);

  bagHolds.forEach((item) => {
    if (item !== '' && item !== '.') {
      const split = item.split(/(\d)/);
      const num = parseInt(split[1], 10);
      bagCount += num;
      const bagType = split[2].trim();
      const moreBags = findBagDepth(bagType);
      if (moreBags > 0) {
        bagCount += num * moreBags;
      }
    }
  });

  return bagCount;
}

const totalBags = findBagDepth(searchingFor);
console.log(totalBags);
