// Thanks to u/Globinette for the help on my reddit post that gave me the guidance I needed for part 2!!

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
    for (let i = 0; i < array.length; i++) {
        if (typeof array[i] === 'number') {
            total += array[i];
        }
    }
    return total;
}

let bIndex = possibles.indexOf(bottom[0]);
let bHolding = beingHeld[bIndex].split(', ');
let toCount = getW(bHolding);
let totals = [];

for (let i = 0; i < toCount.length; i++) {
    let nextStep = toCount[i][0];
    if (possibles.indexOf(nextStep) !== -1) {
        let index = possibles.indexOf(nextStep);
        let nextGroup = beingHeld[index].split(', ');
        buildTowers(nextGroup, toCount[i]);
    }

    let values = countValues(toCount[i]);
    totals.push(`base: ${nextStep} - ${values}`);
}

console.log(totals);


let nIndex = possibles.indexOf(toCount[0][0]);
let nHolding = beingHeld[nIndex].split(', ');
let nCount = getW(nHolding);
let nTotal = [];

for (let i = 0; i < nCount.length; i++) {
    let nextStep = nCount[i][0];
    if (possibles.indexOf(nextStep) !== -1) {
        let index = possibles.indexOf(nextStep);
        let nextGroup = beingHeld[index].split(', ');
        buildTowers(nextGroup, nCount[i]);
    }

    let values = countValues(nCount[i]);
    nTotal.push(`base: ${nextStep} - ${values}`);
}

console.log(nTotal);


let nIndex2 = possibles.indexOf(nCount[3][0]);
let nHolding2 = beingHeld[nIndex2].split(', ');
let nCount2 = getW(nHolding2);
let nTotal2 = [];

for (let i = 0; i < nCount2.length; i++) {
    let nextStep = nCount2[i][0];
    if (possibles.indexOf(nextStep) !== -1) {
        let index = possibles.indexOf(nextStep);
        let nextGroup = beingHeld[index].split(', ');
        buildTowers(nextGroup, nCount2[i]);
    }

    let values = countValues(nCount2[i]);
    nTotal2.push(`base: ${nextStep} - ${values}`);
}

console.log(nTotal2);

let nIndex3 = possibles.indexOf(nCount2[3][0]);
let nHolding3 = beingHeld[nIndex3].split(', ');
let nCount3 = getW(nHolding3);
let nTotal3 = [];

for (let i = 0; i < nCount3.length; i++) {
    let nextStep = nCount3[i][0];
    if (possibles.indexOf(nextStep) !== -1) {
        let index = possibles.indexOf(nextStep);
        let nextGroup = beingHeld[index].split(', ');
        buildTowers(nextGroup, nCount3[i]);
    }

    let values = countValues(nCount3[i]);
    nTotal3.push(`base: ${nextStep} - ${values}`);
}

console.log(nTotal3);
