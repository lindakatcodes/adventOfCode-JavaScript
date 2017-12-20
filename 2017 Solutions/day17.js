// No special shoutout for this one - just general talk about how to get around the buffer manipulation

// part 1
const steps = 354;

let times = 2017;
let buffer = [0];
let current = buffer[0];

for (let i = 1; i <= times; i++) {
    let moveIndex = buffer.indexOf(current) + steps;
    let endIndex = (moveIndex % buffer.length) + 1;
    buffer.splice(endIndex, 0, i);
    current = buffer[endIndex];
}

let spot = buffer.indexOf(2017);
console.log(buffer[spot + 1]);

// part 2
times = 50000000;
buffer = 1;
current = 1;
let oneSpot = [];

for (let i = 1; i <= times; i++) {
    let moveIndex = current + steps;
    current = (moveIndex % buffer) + 1;
    buffer++;

    if (current === 1) {
        oneSpot.push(buffer - 1);
    }
}

console.log(oneSpot[oneSpot.length - 1]);
