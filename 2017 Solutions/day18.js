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
let wait0 = false;
let wait1 = false;
let jump0 = 0;
let jump1 = 0;

let counter = 0;

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
    let value1 = set[1];
    let value2;

    if (set[2]) {
        value2 = parseInt(set[2], 10);
        if (isNaN(value2)) {
            let name = set[2];
            if (id === 0) {
                value2 = prog0[name];
            } else if (id === 1) {
                value2 = prog1[name];
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
            console.log(counter);
        }
        break;
    case 'rcv':
        if (id === 0) {
            if (queue0.length <= 0) {
                wait0 = true;
                break;
            }
            let val = queue0.shift();
            let name = set[1];
            prog0[name] = val;
            wait0 = false;
        } else if (id === 1) {
            if (queue1.length <= 0) {
                wait1 = true;
                break;
            }
            let val = queue1.shift();
            let name = set[1];
            prog1[name] = val;
            wait1 = false;
        }
        break;
    case 'set':
        if (id === 0) {
            prog0[value1] = value2;
            jump0 = 0;
        } else if (id === 1) {
            prog1[value1] = value2;
            jump1 = 0;
        }
        break;
    case 'add':
        if (id === 0) {
            prog0[value1] += value2;
            jump0 = 0;
        } else if (id === 1) {
            prog1[value1] += value2;
            jump1 = 0;
        }
        break;
    case 'mul':
        if (id === 0) {
            prog0[value1] *= value2;
            jump0 = 0;
        } else if (id === 1) {
            prog1[value1] *= value2;
            jump1 = 0;
        }
        break;
    case 'mod':
        if (id === 0) {
            prog0[value1] %= value2;
            jump0 = 0;
        } else if (id === 1) {
            prog1[value1] %= value2;
            jump1 = 0;
        }
        break;
    case 'jgz':
        if (!isNaN(parseInt(value1, 10))) {
            if (id === 0) {
                if (parseInt(value1, 10) > 0) {
                    jump0 = value2;
                }
            } else if (id === 1) {
                if (parseInt(value1, 10) > 0) {
                    jump1 = value2;
                }
            }
        }
        if (id === 0) {
            if (prog0[value1] > 0) {
                jump0 = value2;
            }
        } else if (id === 1) {
            if (prog1[value1] > 0) {
                jump1 = value2;
            }
        }
        break;
    }
}
/*
for (let i = 0; i < input.length; i++) {
    let step = input[i].split(' ');
    let name = step[1];

    if (!reg[name]) {
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

console.log(`Frequency: ${frequency}`);
*/

for (let i = 0, j = 0; i < input.length || j < input.length; i++, j++) {
    if (i < input.length) {
        let step0 = input[i].split(' ');
        let name0 = step0[1];

        if (!prog0[name0]) {
            prog0[name0] = 0;
        }

        instruct2(step0, 0);

        if (jump0 !== 0) {
            i += (jump0 - 1);
        }
    }
    if (j < input.length) {
        let step1 = input[j].split(' ');
        let name1 = step1[1];

        if (!prog1[name1]) {
            prog1[name1] = 0;
        }

        instruct2(step1, 1);

        if (jump1 !== 0) {
            j += (jump1 - 1);
        }
    }

    if (wait0 && wait1) {
        i = input.length;
    }
    if (wait0) {
        i--;
    }
    if (wait1) {
        j--;
    }
}

console.log(`Counter: ${counter}`);

