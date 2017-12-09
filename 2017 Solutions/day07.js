const fs = require('fs');

const data = fs.readFileSync('../2017 Solutions/inputs/day07Input.txt').toString();

const input = data.split('\r\n');

// filter out all those holding nothing
// store names of those holding + names being held
// go through names being held - if a bottom name is being held, remove it
// last one left's the bottom

let holders = input.filter(name => name.includes('->'));

let possibles = [];
let beingHeld = [];
let bottom = [];

for (let i = 0; i < holders.length; i++) {
    let end = holders[i].indexOf(' ');
    possibles.push(holders[i].slice(0, end));
    let start = holders[i].indexOf('>');
    beingHeld.push(holders[i].slice(start + 2));
}

let Held = beingHeld.toString().split(',');

for (let z = 0; z < Held.length; z++) {
    Held.splice(z, 1, Held[z].trim());
}

for (let k = 0; k < possibles.length; k++) {
    if (!Held.includes(possibles[k])) {
        bottom.push(possibles[k]);
    }
}

console.log(bottom);


for (let i = 0; i < input.length; i++) {
    let endName = input[i].indexOf(' ');
    let name = input[i].slice(0, endName);

    if (Held.includes(name)) {
        let startW = input[i].indexOf('(');
        let endW = input[i].indexOf(')');
        let weight = parseInt(input[i].slice(startW + 1, endW), 10);
        let ind = Held.indexOf(name);
        let combined = [name, weight];
        Held.splice(ind, 1, combined);
    }
}

// console.log(Held);

function weightLookup(name) {
    let result = 0;

    Held.forEach((item) => {
        if (item[0] === name) {
            result = item;
        }
    });

    return result;
}

function getW(names) {
    let wArr = [];
    names.forEach((name) => {
        wArr.push(weightLookup(name));
    });
    return wArr;
}


function buildTowers(names, tower) {
    names.forEach((name) => {
        let nInd = 0;

        for (let i = 0; i < Held.length; i++) {
            if (Held[i][0] === name) {
                nInd = i;
                break;
            }
        }

        let weight = Held[nInd][1];
        tower.push(name, weight);

        if (possibles.indexOf(name) !== -1) {
            let index = possibles.indexOf(name);
            let nextGroup = beingHeld[index].split(', ');
            buildTowers(nextGroup, tower);
        }
    });
}


function countValues(array) {
    let total = 0;
    let addtoSet = [];
    for (let i = 0; i < array.length; i++) {
        if (typeof array[i] === 'string') {
            if (possibles.indexOf(array[i]) === -1) {
                addtoSet.push('end');
            } else {
                let ind = possibles.indexOf(array[i]);
                let kids = beingHeld[ind].split(', ').length;
                addtoSet.push(`possible - ${kids} children`);
            }
        }
        if (typeof array[i] === 'number') {
            total += array[i];
            addtoSet.push(array[i]);
        }
    }
    return [total, addtoSet];
}

// only for testing to try and find the wrong weight
let bIndex = possibles.indexOf(bottom[0]);
let bHolding = beingHeld[bIndex].split(', ');
let toCount = getW(bHolding);
let totals = [];
let totalSet = [];

for (let i = 0; i < toCount.length; i++) {
    let nextStep = toCount[i][0];
    if (possibles.indexOf(nextStep) !== -1) {
        let index = possibles.indexOf(nextStep);
        let nextGroup = beingHeld[index].split(', ');
        buildTowers(nextGroup, toCount[i]);
    }

    let values = countValues(toCount[i]);
    totals.push(values[0]);
    totalSet.push(values[1]);
}


console.log(totals);
console.log(totalSet[0].toString());
