const fs = require('fs');

const data = fs.readFileSync('../2017 Solutions/inputs/day08Input.txt').toString();

const input = data.split('\r\n');

let instruct = [];
let registers = [];
let unique = [];
let overallHighest = 0;

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

    if (eval(condition)) {
        let regtoChange = unique.indexOf(instruct[j][0]);
        let amttoChange = parseInt(instruct[j][2], 10);

        if (instruct[j][1] === 'inc') {
            registers[regtoChange].value += amttoChange;
        } else if (instruct[j][1] === 'dec') {
            registers[regtoChange].value -= amttoChange;
        }

        if (registers[regtoChange].value > overallHighest) {
            overallHighest = registers[regtoChange].value;
        }
    }
}

let largest = 0;

for (let i = 0; i < registers.length; i++) {
    if (registers[i].value > largest) {
        largest = registers[i].value;
    }
}

console.log(`largest at end: ${largest}; largest seen: ${overallHighest}`);
