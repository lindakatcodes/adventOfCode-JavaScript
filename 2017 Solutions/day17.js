const steps = 354;

const times = 50000000;
let buffer = [0];
let current = buffer[0];

for (let i = 1; i <= times; i++) {
    let moveIndex = buffer.indexOf(current) + steps;
    let endIndex = (moveIndex % buffer.length) + 1;
    buffer.splice(endIndex, 0, i);
    current = buffer[endIndex];
}

// let spot = buffer.indexOf(2017);
// console.log(buffer[spot + 1]);
console.log(buffer[1]);
