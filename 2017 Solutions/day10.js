// Shoutout to u/_A4_ - seeing your answer gave me a few things to try to make mine a bit neater; Also thanks to u/SixWinged for helping me find my infinite loop and getting me going again!

let list = Array.from(Array(256).keys());
const input = '130,126,1,11,140,2,255,207,18,254,246,164,29,104,0,224';
let position = 0;
let toMove = 0;
let skip = 0;

let lengths = [...input].map(value => value.codePointAt(0));
lengths.push(17, 31, 73, 47, 23);


function createHash() {
// for each length
    for (let i = 0; i < lengths.length; i++) {
    // grab length number of inputs, starting from start point
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
        // reverse the order of them
        segment.reverse();
        // put them back into array, starting from start point
        // might need to do in 2 sections, depending on where start point is and length
        let tempPos = position;
        for (let j = 0; j < segment.length; j++) {
            if (tempPos > list.length - 1) {
                tempPos = 0;
            }
            list.splice(tempPos, 1, segment[j]);
            tempPos++;
        }
        // current position moves length x skip size
        toMove = lengths[i] + skip;
        position = (position + toMove) % list.length;
        // add one to skip size and repeat
        skip++;
    }
}

// uncomment these to get answer for part 1!
// createHash();
// let multiple = list[0] * list[1];
// console.log(multiple);

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

console.log(hash);

