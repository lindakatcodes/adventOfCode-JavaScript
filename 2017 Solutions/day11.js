// const fs = require('fs');

// const data = fs.readFileSync('../2017 Solutions/inputs/day11Input.txt').toString();

let path = ['se', 'sw', 'se', 'sw', 'sw']; // data.split(',');

let start = [2, 2];
let grid = [start];
let coord = start;
let previous = '';

for (let i = 0; i < path.length; i++) {
    let direction = path[i];
    coord = directions(coord, direction, previous);
    grid.push(coord);
    previous = direction;
}

function directions(coords, dir, prev) {
    let x = coords[0];
    let y = coords[1];

    switch (dir) {
    case 'n':
        y += 1;
        break;
    case 'ne':
        if (prev === 'nw') {
            x += 1;
        } else if (prev === 'se') {
            y += 1;
        } else {
            x += 1;
            y += 1;
        }
        break;
    case 'se':
        if (prev === 'sw') {
            x += 1;
        } else if (prev === 'ne') {
            y -= 1;
        } else {
            x += 1;
            y -= 1;
        }
        break;
    case 's':
        y -= 1;
        break;
    case 'sw':
        if (prev === 'se') {
            x -= 1;
        } else if (prev === 'nw') {
            y -= 1;
        } else {
            x -= 1;
            y -= 1;
        }
        break;
    case 'nw':
        if (prev === 'ne') {
            x -= 1;
        } else if (prev === 'sw') {
            y += 1;
        } else {
            x -= 1;
            y += 1;
        }
        break;
    default:
        break;
    }
    return [x, y];
}

let end = grid[grid.length - 1];

let shortest = 0;

let dx = end[0] - start[0];
let dy = end[1] - start[1];

if (dx === dy) {
    shortest = dx;
} else if (Math.sign(dx) === Math.sign(dy)) {
    shortest = Math.abs(dx + dy);
} else {
    shortest = Math.max(Math.abs(dx), Math.abs(dy));
}

console.log(grid);
console.log(shortest);
