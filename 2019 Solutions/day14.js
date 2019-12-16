const fs = require('fs');

// Change number on input file before use
const data = fs.readFileSync('../2019 Solutions/inputs/day14input.txt').toString();

// Need an array of strings?
const input = data.split('\r\n');
const ingredients = input.map(row => row.split(/,|=>/));

let oreQty = 0;

