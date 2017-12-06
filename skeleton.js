const fs = require('fs');

// Change number on input file before use
const data = fs.readFileSync('../2017 Solutions/inputs/day00Input.txt').toString();

// Need an array of strings?
const input = data.split('\r\n');

// Or an array of numbers?
const input = data.split('\r\n').map(Number);