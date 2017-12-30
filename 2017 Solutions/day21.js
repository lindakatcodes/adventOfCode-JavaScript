// Super shoutout to u/Infilament for sharing your solution - yours actually made sense to me and is the only reason I could get this day solved! Thank you!

const fs = require('fs');

const data = fs.readFileSync('../2017 Solutions/inputs/day21Input.txt').toString();

let rules = {};
data.split('\r\n').forEach((d) => {
    let tokens = d.split(' => ');
    rules[tokens[0]] = tokens[1];
});

let grid;

function doProblem(totalReps) {
    grid = ['.#.', '..#', '###'];
    for (let loop = 0; loop < totalReps; loop++) {
        let sub = getSubgrids();
        for (let l = 0; l < sub.length; l++) {
            sub[l] = rule(sub[l]);
        }
        grid = reform(sub);
    }

    return grid;
}

function rule(str) {
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 4; j++) {
            let s = morph(str, j, i);
            if (rules.hasOwnProperty(s)) { return rules[s]; }
        }
    }
}

function morph(str, rotate, flip) {
    let s = str.split('/');
    if (flip) s.reverse();

    for (let r = 0; r < rotate; r++) {
        let n = [];
        for (let i = 0; i < s.length; i++) {
            let news = '';
            for (let j = s.length - 1; j >= 0; j--) { news += s[j][i]; }
            n.push(news);
        }
        s = n;
    }
    return s.join('/');
}

function getSubgrids() {
    let num = grid.length % 2 === 0 ? 2 : 3;
    let strs = [];
    for (let i = 0; i < grid.length; i += num) {
        for (let j = 0; j < grid.length; j += num) {
            let str = '';
            for (let k = 0; k < num; k++) { str += `${grid[i + k].substring(j, j + num)}/`; }
            strs.push(str.substr(0, str.length - 1));
        }
    }
    return strs;
}

function reform(arr) {
    let g = [];
    let num = Math.sqrt(arr.length);
    let strlen = arr[0].match(/\//g).length + 1;
    for (let i = 0; i < arr.length; i += num) {
        for (let j = 0; j < strlen; j++) {
            let str = '';
            for (let k = 0; k < num; k++) { str += arr[i + k].split('/')[j]; }
            g.push(str);
        }
    }
    return g;
}

let final = doProblem(5);
let count = grid.reduce((a, b) => {
    let bit = b.match(/#/g);
    if (bit === null) {
        bit = 0;
    } else {
        bit = bit.length;
    }
    return a + bit;
}, 0);
console.log('number of # is:', count);

doProblem(18);
count = grid.reduce((a, b) => {
    let bit = b.match(/#/g);
    if (bit === null) {
        bit = 0;
    } else {
        bit = bit.length;
    }
    return a + bit;
}, 0);
console.log('number of # is:', count);
