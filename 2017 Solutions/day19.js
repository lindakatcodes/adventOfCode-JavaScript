// Major shoutout to u/iopred - I had zero idea how to actually code this solution, and your answer actually made some sense to me. Thanks for sharing!!

const fs = require('fs');

const data = fs.readFileSync('../2017 Solutions/inputs/day19Input.txt').toString();

let map = data.split('\n').map(x => x.split(''));

let x = map[0].indexOf('|');
let y = 0;
let direction = 2;
let steps = 0;
let order = [];

function changeDir(x, y, direction) {
    let val = map[y][x];
    if (val >= 'A' && val <= 'Z') {
        order.push(val);
    }
    if (val == '+') {
        if (map[y - 1][x] == '|' && direction != 2) {
            return 0;
        }
        if (map[y + 1][x] == '|' && direction != 0) {
            return 2;
        }
        if (map[y][x - 1] == '-' && direction != 1) {
            return 3;
        }
        if (map[y][x + 1] == '-' && direction != 3) {
            return 1;
        }
    }
    return direction;
}

while (true) {
    steps++;
    switch (direction) {
    case 0:
        y--;
        break;
    case 1:
        x++;
        break;
    case 2:
        y++;
        break;
    case 3:
        x--;
        break;
    }
    direction = changeDir(x, y, direction);
    if (map[y][x] == ' ') {
        break;
    }
}

console.log(order.join(''), steps);
