const fs = require('fs');

// Change number on input file before use
const data = fs.readFileSync('../2018 Solutions/inputs/day06input.txt').toString();

// get coords into usable data
const input = data.split('\r\n');
const coords = input.map((pair) => {
    let these = pair.split(', ').map(Number);
    return these;
});

// set up grid
const grid = [];
const letters = 'ABCDEF';

for (let i = 0; i < 10; i++) {
    grid.push(Array.from(Array(10).fill('.')));
}

function mdist(x1, y1, x2, y2) {
    return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

// ok, now place initial coords
for (let k = 0; k < coords.length; k++) {
    let x = coords[k][0];
    let y = coords[k][1];
    grid[y].splice(x, 1, letters[k]);
}

// then, go through whole grid - if there's a dot, get it's coord; check that against the list of coords and see which one is closest - fill with that leter (or if there's a tie, leave as a dot)


// finally, go through grid again and count freq of each letter

console.log(grid);
