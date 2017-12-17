require('console.table');

function generate(str) {
    let list = Array.from(Array(256).keys());
    const input = str;
    let position = 0;
    let toMove = 0;
    let skip = 0;

    let lengths = [...input].map(value => value.codePointAt(0));
    lengths.push(17, 31, 73, 47, 23);

    function createHash() {
        for (let i = 0; i < lengths.length; i++) {
            let segment = list.slice(position, (position + lengths[i]));
            if (segment.length !== lengths[i]) {
                let left = lengths[i] - segment.length;
                let pos = 0;
                while (left !== 0) {
                    let temp = list.slice(pos, (pos + 1));
                    segment.push(temp[0]);
                    left--;
                    pos++;
                }
            }
            segment.reverse();
            let tempPos = position;
            for (let j = 0; j < segment.length; j++) {
                if (tempPos > list.length - 1) {
                    tempPos = 0;
                }
                list.splice(tempPos, 1, segment[j]);
                tempPos++;
            }
            toMove = lengths[i] + skip;
            position = (position + toMove) % list.length;
            skip++;
        }
    }

    let rounds = 64;

    while (rounds > 0) {
        createHash();
        rounds--;
    }

    let holder = [];
    let byte = 0;
    let allBytes = [];

    for (let k = 0; k < list.length; k += 16) {
        holder = list.slice(k, k + 16);
        byte = holder.reduce((a, b) => a ^ b);
        allBytes.push(byte);
    }

    let hash = allBytes.map((value) => {
        let t = value.toString(16);
        if (t.length < 2) {
            t = `0${t}`;
        }
        return t;
    }).join('');

    return hash;
}

function convert(test) {
    let testBits = '';
    for (let a = 0; a < test.length; a++) {
        let val = parseInt(test[a], 16).toString(2);
        if (val.length < 4) {
            let len = 4 - val.length;
            let bin = '';
            for (let i = 0; i < len; i++) {
                bin += '0';
            }
            bin += val;
            testBits += bin;
        } else {
            testBits += val;
        }
    }
    return testBits;
}


const key = 'hxtvlmkl';
let grid = [];
let used = 0;

for (let j = 0; j < 128; j++) {
    let rowInput = `${key}-${j}`;
    let rowKey = generate(rowInput);
    let rowOutput = convert(rowKey);
    let row = [];

    for (let k = 0; k < rowOutput.length; k++) {
        let current = parseInt(rowOutput[k], 2);
        if (current === 1) {
            row.push('#');
        } else if (current === 0) {
            row.push('.');
        }
    }
    let count = row.filter(val => val === '#').length;
    grid.push(row);
    used += count;
}

console.log(used);

let groups = 0;

for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
        if (grid[x][y] === '.' || grid[x][y] === 0) {
            continue;
        }

        let toCheck = [[x, y]];

        while (toCheck.length > 0) {
            let [xx, yy] = toCheck.pop();
            if (xx < 0 || yy < 0) {
                continue;
            }
            if (grid[xx][yy] === 0 || grid[xx][yy] === '.') {
                continue;
            }
            grid[xx][yy] = 0;
            if (grid[yy] && grid[xx - 1]) {
                toCheck.push([xx - 1, yy]);
            }
            if (grid[yy] && grid[xx + 1]) {
                toCheck.push([xx + 1, yy]);
            }
            if (grid[yy - 1] && grid[xx]) {
                toCheck.push([xx, yy - 1]);
            }
            if (grid[yy + 1] && grid[xx]) {
                toCheck.push([xx, yy + 1]);
            }
        }
        groups++;
    }
}

console.log(groups);
