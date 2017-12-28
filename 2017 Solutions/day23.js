// Shoutout to u/BOT-brad for part 2 - I still don't entirely get how it works, but you had the breakdwon that I understood the most, and all my other, slightly more verbose attempts weren't completing, so - thanks!

const fs = require('fs');

const data = fs.readFileSync('../2017 Solutions/inputs/day23Input.txt').toString();

const instructions = data.split('\r\n');
let reg = {
    a: 0,
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

// part 2

let b = 93;
let c = 93;
let d = 0;
let f = 0;
let g = 0;
let h = 0;

b = (b * 100) + 100000;
c = b + 17000;

do {
    f = 1;
    d = 2;
    for (d; d * d < b; d++) {
        if (b % d === 0) {
            f = 0;
            break;
        }
    }
    if (f === 0) {
        h++;
    }
    g = b - c;
    b += 17;
} while (g !== 0);

console.log(h);
