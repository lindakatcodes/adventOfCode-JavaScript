const fs = require('fs');

const data = fs.readFileSync('../2017 Solutions/inputs/day18Input.txt').toString();

const input = data.split('\r\n');
let frequency = 0;
let reg = {};
let jump = 0;
let prog0 = { p: 0 };
let queue0 = [];
let prog1 = { p: 1 };
let queue1 = [];
let counter = 0;
let wait0 = false;
let wait1 = false;

function instruct(set) {
    let move = set[0];
    let value1 = set[1];
    let value2;

    if (set[2]) {
        value2 = parseInt(set[2], 10);
        if (isNaN(value2)) {
            let name = set[2];
            value2 = reg[name];
        }
    }

    switch (move) {
    case 'snd':
        frequency = reg[value1];
        jump = 0;
        break;
    case 'set':
        reg[value1] = value2;
        jump = 0;
        break;
    case 'add':
        reg[value1] += value2;
        jump = 0;
        break;
    case 'mul':
        reg[value1] *= value2;
        jump = 0;
        break;
    case 'mod':
        reg[value1] %= value2;
        jump = 0;
        break;
    case 'rcv':
        if (reg[value1] !== 0) {
            jump = 0;
            return frequency;
        }
        jump = 0;
        break;
    case 'jgz':
        if (reg[value1] > 0) {
            jump = value2;
        }
        break;
    }
}

function instruct2(set, id) {
    let move = set[0];
    let value1;

    if (set[1]) {
        value1 = parseInt(set[1], 10);
        if (isNaN(value1)) {
            let name = set[1];
            if (id === 0) {
                value1 = prog0[name];
            } else if (id === 1) {
                value1 = prog1[name];
            }
        }
    }

    switch (move) {
    case 'snd':
        if (id === 0) {
            queue1.push(value1);
        } else if (id === 1) {
            queue0.push(value1);
            counter++;
        }
        break;
    case 'rcv':
        if (id === 0) {
            if (queue0.length <= 0) {
                id = 1;
                wait0 = true;
                break;
            }
            let val = queue0.shift();
            let name = set[1];
            prog0[name] = val;
        } else if (id === 1) {
            if (queue1.length <= 0) {
                id = 0;
                wait1 = true;
                break;
            }
            let val = queue1.shift();
            let name = set[1];
            prog1[name] = val;
        }
        break;
    }
}

for (let i = 0; i < input.length; i++) {
    let step = input[i].split(' ');
    let name = step[1];

    if (!reg.hasOwnProperty(name)) {
        reg[name] = 0;
    }

    instruct(step);
    if (step[0] === 'rcv' && reg[name] > 0) {
        i = input.length;
    }
    if (jump !== 0) {
        i += jump - 1;
    }
}

console.log(frequency);

let id = 0;

for (let i = 0; i < input.length; i++) {
    let step = input[i].split(' ');
    let name = step[1];

    if (step[0] === 'rcv' || step[0] === 'snd') {
        instruct2(step, id);
        continue;
    }

    if (id === 0) {
        if (!prog0[name].hasOwnProperty(name)) {
            prog0[name] = 0;
        }
    } else if (id === 1) {
        if (!prog1[name].hasOwnProperty(name)) {
            prog1[name] = 0;
        }
    }

    instruct(step);
    if (jump !== 0) {
        i += jump - 1;
    }
}

console.log(`Counter: ${counter}`);
