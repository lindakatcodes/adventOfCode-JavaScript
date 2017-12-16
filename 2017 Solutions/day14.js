

function createHash(input, position, toMove, skip) {
    let lengths = [...input].map(value => value.codePointAt(0));
    lengths.push(17, 31, 73, 47, 23);

    let row = Array.from(Array(128).keys());

    for (let i = 0; i < lengths.length; i++) {
        let segment = row.slice(position, (position + lengths[i]));
        if (segment.length !== lengths[i]) {
            let left = lengths[i] - segment.length;
            let pos = 0;
            while (left !== 0) {
                let temp = row.slice(pos, (pos + 1));
                segment.push(temp[0]);
                left--;
                pos++;
            }
        }
        segment.reverse();
        let tempPos = position;
        for (let j = 0; j < segment.length; j++) {
            if (tempPos > row.length - 1) {
                tempPos = 0;
            }
            row.splice(tempPos, 1, segment[j]);
            tempPos++;
        }
        toMove = lengths[i] + skip;
        position = (position + toMove) % row.length;
        skip++;
    }

    return [input, position, toMove, skip, row];
}

function generate(str) {
    let position = 0;
    let toMove = 0;
    let skip = 0;
    let rounds = 64;
    let input = str;

    while (rounds > 0) {
        createHash(input, position, toMove, skip);
        rounds--;
    }

    let holder = [];
    let byte = 0;
    let allBytes = [];

    for (let k = 0; k < row.length; k += 16) {
        holder = row.slice(k, k + 16);
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

const key = 'flqrgnkx';
let grid = [];

for (let i = 0; i < 128; i++) {
    let input = `${key}-${i}`;
    let row = generate(input);
    let output = [];

    // take hash, convert to binary, cycle through binary to mark grid w/ # or .

    let binStr = row.map(bit => bit.toString(2));

    for (let j = 0; j < binStr.length; j++) {
        let segment = binStr[j];
        let opcl = '';
        if (segment === 1) {
            opcl = '#';
        } else {
            opcl = '.';
        }
        output.push(opcl);
    }
    grid.push(output);
}

console.log(grid);
