
function blueprint(letter, val) {
    let write = 0;
    let pos = '';
    let next = '';

    switch (letter) {
    case 'a':
        if (val === 0) {
            write = 1;
            pos = 'r';
            next = 'b';
        } else if (val === 1) {
            write = 0;
            pos = 'l';
            next = 'c';
        }
        break;
    case 'b':
        if (val === 0) {
            write = 1;
            pos = 'l';
            next = 'a';
        } else if (val === 1) {
            write = 1;
            pos = 'l';
            next = 'd';
        }
        break;
    case 'c':
        if (val === 0) {
            write = 1;
            pos = 'r';
            next = 'd';
        } else if (val === 1) {
            write = 0;
            pos = 'r';
            next = 'c';
        }
        break;
    case 'd':
        if (val === 0) {
            write = 0;
            pos = 'l';
            next = 'b';
        } else if (val === 1) {
            write = 0;
            pos = 'r';
            next = 'e';
        }
        break;
    case 'e':
        if (val === 0) {
            write = 1;
            pos = 'r';
            next = 'c';
        } else if (val === 1) {
            write = 1;
            pos = 'l';
            next = 'f';
        }
        break;
    case 'f':
        if (val === 0) {
            write = 1;
            pos = 'l';
            next = 'e';
        } else if (val === 1) {
            write = 1;
            pos = 'r';
            next = 'a';
        }
        break;
    }

    return [write, pos, next];
}

let tape = Array(10000000).fill(0);
let steps = 12172063;

let state = 'a';
let current = Math.floor(tape.length / 2);
let value = tape[current];

for (let i = 0; i < steps; i++) {
    let move = blueprint(state, value);
    tape[current] = move[0];
    if (move[1] === 'r') {
        current += 1;
    } else if (move[1] === 'l') {
        current -= 1;
    }
    state = move[2];
    value = tape[current];
}

let checksum = tape.reduce((a, b) => a + b);
console.log(checksum);
