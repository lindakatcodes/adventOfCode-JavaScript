const fs = require('fs');

const data = fs.readFileSync('../2017 Solutions/inputs/day23Input.txt').toString();

const instructions = data.split('\r\n');
let reg = {
    a: 1,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
};

let mulCount = 0;
let jump = 0;

function instruct(set) {
    let move = set[0];
    let value1 = set[1];
    let value2 = parseInt(set[2], 10);

    if (!isNaN(parseInt(value1, 10))) {
        value1 = parseInt(value1, 10);
    }
    if (isNaN(value2)) {
        let name = set[2];
        value2 = reg[name];
    }

    switch (move) {
    case 'set':
        reg[value1] = value2;
        jump = 0;
        break;
    case 'sub':
        reg[value1] -= value2;
        jump = 0;
        break;
    case 'mul':
        reg[value1] *= value2;
        jump = 0;
        mulCount++;
        break;
    case 'jnz':
        if (reg[value1] === 0) {
            break;
        } else if (value1 === 0) {
            break;
        }
        jump = value2;
        break;
    }
}

for (let i = 0; i < instructions.length; i++) {
    let step = instructions[i].split(' ');
    instruct(step);
    if (jump !== 0) {
        i += jump - 1;
    }
}

console.log(mulCount);
console.log(`H is ${reg.h}`);
