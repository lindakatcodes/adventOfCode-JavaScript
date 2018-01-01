const fs = require('fs');

const data = fs.readFileSync('../2017 Solutions/inputs/day24Input.txt').toString();

const input = data.split('\r\n');

let starters = input.filter(piece => piece.match(/^0\/|\/0$/));
let bridges = [];

function build(point, arr) {
    let star = point.split('/');
    let end = true;
    let matches = [];

    for (let i = 0; i < input.length; i++) {
        let curr = input[i].split('/');

        if (input[i] === point || arr.includes(input[i])) {
            continue;
        }

        if (star[1] === curr[0] || star[1] === curr[1]) {
            matches.push(curr);
            end = false;
        }
    }

    if (matches.length > 0) {
        matches.forEach((pt) => {
            let last = arr[arr.length - 1].split('/')[1];
            if (!arr.includes(pt.join('/'))) {
                if (pt[0] === last || pt[1] === last) {
                    arr.push(pt.join('/'));
                    build(pt.join('/'), arr);
                }
                let newArr = arr.slice(0);
                newArr.pop();
                newArr.push(pt.join('/'));
                build(pt.join('/'), newArr);
            }
        });
    }

    if (end) {
        if (!bridges.includes(arr)) {
            bridges.push(arr);
        }
        matches = [];
    } else {
        build(arr[arr.length - 1], arr);
    }
}

function testAll() {
    for (let a = 0; a < starters.length; a++) {
        let startPoint = starters[a];
        let nextNum = startPoint.split('/')[1];
        let seconds = input.filter(piece => piece.match(nextNum));
        seconds.splice(seconds.indexOf(startPoint), 1);
        let progress = [startPoint];
        for (let j = 0; j < seconds.length; j++) {
            let next = seconds[j];
            progress.push(next);
            build(next, progress);
            progress = [startPoint];
        }
    }
}

testAll();

let maxLen = 0;

for (let i = 0; i < bridges.length; i++) {
    let current = bridges[i]
        .map(num => num.split('/'))
        .reduce((a, b) => a.concat(b))
        .map(num => parseInt(num, 10));
    let total = current.reduce(((a, b) => a + b), 0);
    if (total > maxLen) {
        maxLen = total;
    }
}

console.log(maxLen);
