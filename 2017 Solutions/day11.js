// Super thanks to u/ramendik and u/acr13!!! Both of your posts helped me fix my code and get the right answer!!

const fs = require('fs');

const data = fs.readFileSync('../2017 Solutions/inputs/day11Input.txt').toString();

let path = data.split(',');

let start = [0, 0];
let grid = [start];
let coord = start;
let highest = 0;

for (let i = 0; i < path.length; i++) {
    let direction = path[i];
    coord = directions(coord, direction);
    let currSteps = Math.abs(coord[0] + coord[1]) / 2;
    if (currSteps > highest) {
        highest = currSteps;
    }
    grid.push(coord);
}

function directions(coords, dir) {
    let x = coords[0];
    let y = coords[1];

    switch (dir) {
    case 'n':
        y += 2;
        break;
    case 'ne':
        x += 1;
        y += 1;
        break;
    case 'se':
        x += 1;
        y -= 1;
        break;
    case 's':
        y -= 2;
        break;
    case 'sw':
        x -= 1;
        y -= 1;
        break;
    case 'nw':
        x -= 1;
        y += 1;
        break;
    default:
        break;
    }
    return [x, y];
}

let end = grid[grid.length - 1];

function findDistance(first, last) {
    let dx = last[0] - first[0];
    let dy = last[1] - first[1];
    let storage = 0;

    if (dx === dy) {
        storage = dx;
    } else if (Math.sign(dx) === Math.sign(dy)) {
        storage = Math.abs(dx + dy) / 2;
    } else {
        storage = Math.max(Math.abs(dx), Math.abs(dy));
    }
    return storage;
}

let shortest = findDistance(start, end);

console.log(`Shortest path: ${shortest}`);

console.log(`Farthest path: ${highest}`);

