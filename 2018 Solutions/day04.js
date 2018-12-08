const fs = require('fs');

// Change number on input file before use
const data = fs.readFileSync('../2018 Solutions/inputs/day04input.txt').toString();

// Need an array of strings?
const input = data.split('\r\n');

const cleanedInput = input.map((value) => {
    let stamp = value.substring(1, 17);
    let text = value.substring(19);
    return Array.of(stamp, text);
});

const sortedInput = cleanedInput.sort((a, b) => {
    if (a[0] < b[0]) {
        return -1;
    }
    if (a[0] > b[0]) {
        return 1;
    }
    if (a[0] === b[0]) {
        return 0;
    }
});

function checkforGuard(guardId) {
    let guardFound = false;
    let guardIndex = -1;
    for (let l = 0; l < guards.length; l++) {
        if (guards[l][0] === guardId) {
            guardFound = true;
            guardIndex = l;
        }
    }
    return (guardFound, guardIndex);
}

function fillMinutes(start, end, id) {
    let minArray = guards[id][2];
    for (let k = start; k <= end; k++) {
        if (minArray[k] === undefined) {
            minArray[k] = 1;
        } else {
            minArray[k]++;
        }
    }
}

// trip 1: find every guard # and log it to an object - will have a total sleep time of 0 & an array of minutes, 0 - 59, all set to 0

const guards = [];

for (let i = 0; i < sortedInput.length; i++) {
    let current = sortedInput[i];
    if (current[1].includes('Guard')) {
        let getguard = current[1].slice(7).split(' ');
        let guard = getguard[0];

        let status = checkforGuard(guard);

        if (status < 0) {
            guards.push([guard, 0, Array(60)]);
        }
    }
}


// trip 2: for each sleep / wake round, inc amount of all sleep minutes in their array, then calc the sleep time & add it to their total
let currGuard = 0;
let startTime = 0;
let endTime = 0;

for (let j = 0; j < sortedInput.length; j++) {
    let value = sortedInput[j];

    if (value[1].includes('Guard')) {
        let temp = value[1].slice(7).split(' ');
        currGuard = temp[0];
    }

    if (value[1].includes('falls')) {
        startTime = parseInt(value[0].slice(-2), 10);
    }

    if (value[1].includes('wakes')) {
        endTime = parseInt(value[0].slice(-2), 10) - 1;

        let total = endTime - startTime;
        let guardSpot = checkforGuard(currGuard);
        if (guardSpot >= 0) {
            guards[guardSpot][1] += total;
        }

        fillMinutes(startTime, endTime, guardSpot);
    }
}


// alright, all information needed is logged: now get answers
let sleepiestGuard = 0;
let repeatedMinute = 0;

let totals = [];


for (let i = 0; i < guards.length; i++) {
    totals.push(guards[i][1]);
}

let maxMin = totals.reduce((acc, curr) => Math.max(acc, curr), 0);
let maxIndex = totals.indexOf(maxMin);

sleepiestGuard = guards[maxIndex][0];


repeatedMinute = guards[maxIndex][2].reduce((acc, curr) => Math.max(acc, curr), 0);
let repeatIndex = guards[maxIndex][2].indexOf(repeatedMinute);

console.log(sleepiestGuard, repeatIndex);

console.log(`Answer 1 is ${sleepiestGuard * repeatIndex}`);

let mostMinsGuard = 0;
let mostMinute = 0;
let mostRepeats = 0;

for (let a = 0; a < guards.length; a++) {
    let currGuardMins = guards[a][2];
    let mostRepeated = currGuardMins.reduce((acc, curr) => Math.max(acc, curr), 0);
    if (mostRepeated > mostRepeats) {
        mostRepeats = mostRepeated;
        mostMinute = currGuardMins.indexOf(mostRepeated);
        mostMinsGuard = guards[a][0];
    }
}

console.log(mostMinsGuard, mostMinute, mostRepeats);

console.log(`Answer 2 is ${mostMinsGuard * mostMinute}`);
