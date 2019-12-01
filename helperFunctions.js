const fs = require('fs');

// Change number on input file before use
const data = fs.readFileSync('../2019 Solutions/inputs/day__input.txt').toString();

// Need an array of strings?
const input = data.split('\r\n');

// Or an array of numbers?
const input = data.split('\r\n').map(Number);

// need to make an array of a certain length? 
Array.from(Array(10).keys());