// Shoutout to u/aiankile for helping me find where my code was slowing down and get things moving at a reasonable speed!!! Couldn't have done this one without you!

const fs = require('fs');

const data = fs.readFileSync('../2017 Solutions/inputs/day24Input.txt').toString();

const input = data.split('\r\n');

let starters = input.filter(piece => piece.match(/^0\/|\/0$/));
let bridges = [];
let maxLen = 0;
let longest = 0;

function getMatches(starter, connection, arr) {
    // find all the pieces that can connect with the connector
    let matches = [];

    for (let i = 0; i < input.length; i++) {
        let curr = input[i].split('/').map(x => parseInt(x, 10));

        // if the curr point is the startpoint or already in the current tempStore, skip it
        if (input[i] === starter || arr.includes(input[i])) {
            continue;
        }

        if (connection === curr[0] || connection === curr[1]) {
            matches.push(curr.join('/'));
        }
    }
    arr.push(starter);
    return matches;
}

function build(start, connect, tempArr) {
    let pushed = false;
    // get starting point
    let startPoint = start.split('/').map(x => parseInt(x, 10));
    // get it's connector, save that
    let connector = startPoint[0] === connect ? startPoint[1] : startPoint[0];
    // set a build temp array, so getMatches can access it
    let buildArr = tempArr;
    let toCheck = getMatches(startPoint.join('/'), connector, buildArr);

    for (let j = 0; j < toCheck.length; j++) {
        let newArr = buildArr.slice();
        if (pushed) {
            newArr.pop();
        }
        build(toCheck[j], connector, newArr);
    }

    let total = getTotal(buildArr);
    if (total > maxLen) {
        maxLen = total;
    }

    if (buildArr.length >= longest) {
        longest = buildArr.length;
        bridges.push(buildArr);
    }
    pushed = true;
}

function getTotal(bridge) {
    let nums = bridge
        .map(num => num.split('/'))
        .reduce((a, b) => a.concat(b))
        .map(num => parseInt(num, 10));
    return nums.reduce(((a, b) => a + b), 0);
}

// for each starter
for (let a = 0; a < starters.length; a++) {
    // make a temp array, to store each bridge as I build it
    let tempStore = [];
    build(starters[a], 0, tempStore);
}

console.log(maxLen);

let longBTotal = 0;

for (let i = 0; i < bridges.length; i++) {
    let testing = bridges[i];
    if (testing.length === longest) {
        let testTotal = getTotal(testing);
        if (testTotal > longBTotal) {
            longBTotal = testTotal;
        }
    }
}

console.log(`Longest total: ${longBTotal}`);
