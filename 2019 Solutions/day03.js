const fs = require('fs');

// Change number on input file before use
const data = fs.readFileSync('../2019 Solutions/inputs/day03input.txt').toString();

// Need an array of strings?
const input = data.split('\r\n');

let wire1 = input[0].split(',');
let wire2 = input[1].split(','); 

let path1 = new Set();

