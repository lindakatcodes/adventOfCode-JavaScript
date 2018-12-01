const fs = require('fs');

// Change number on input file before use
const data = fs.readFileSync('../2018 Solutions/inputs/day01Input.txt').toString();

// Or an array of numbers?
const input = data.split('\r\n').map(Number);

let freq = 0;
const seenFreq = new Set();
let repeat = false;

function processList() {
    for (let i = 0; i < input.length; i++) {
        let val = input[i];
        let newVal = freq += val;
        freq = newVal;

        if (seenFreq.has(newVal)) {
            console.log(`First repeated value is ${newVal}`);
            repeat = true;
            return;
        }
        seenFreq.add(newVal);
    }
}

processList();
console.log(`First round answer: ${freq}`);

while (!repeat) {
    processList();
}
