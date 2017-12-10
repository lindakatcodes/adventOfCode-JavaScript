const fs = require('fs');

// Change number on input file before use
const data = fs.readFileSync('../2017 Solutions/inputs/day08Input.txt').toString();

// Need an array of strings?
const input = data.split('\r\n');

let instruct = [];
let registers = [];
let unique = [];

for (let i = 0; i < input.length; i++) {
    instruct.push(input[i].split(' '));
    if (!unique.includes(instruct[i][0])) {
        unique.push(instruct[i][0]);
        registers.push({
            name: instruct[i][0],
            value: 0,
        });
    }
}

for (let j = 0; j < instruct.length; j++) {
    let reg = unique.indexOf(instruct[j][4]);
    let condition = `${registers[reg].value} ${instruct[j][5]} ${instruct[j][6]}`;

    if (condition.valueOf()) {
        console.log('true');
    }
}

