const fs = require('fs');

// Change number on input file before use
const data = fs.readFileSync('../2019 Solutions/inputs/day01input.txt').toString();

// Or an array of numbers?
const input = data.split('\r\n').map(Number);

const testInput = [
  14,
  1969,
  100756
];

// mass / 3, round down, -2
function formula(mass) {
  return Math.floor(mass / 3) - 2;
}

// Part 1
const fuelOfMass = input.map((curr) => {
  return formula(curr);
});

const totalFuel = fuelOfMass.reduce((acc, curr) => {
  return acc + curr;
}, 0);

console.log(`Part 1: ${totalFuel}`);

// Part 2

const totalFuelOfMass = input.map((curr) => {
  let value = curr;
  let accumulator = [];

  do {
    value = formula(value);
    if (value > 0) {
      accumulator.push(value);
    }
  } while (value > 0);
  
  return accumulator.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
});

const newTotalFuel = totalFuelOfMass.reduce((acc, curr) => {
  return acc + curr;
}, 0);

console.log(`Part 2: ${newTotalFuel}`);