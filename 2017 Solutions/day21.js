const fs = require('fs');

const data = fs.readFileSync('../2017 Solutions/inputs/day21Input.txt').toString();

const rules = data.split('\r\n').map((rule) => {
    let broken = rule.split('=>');
    return [broken[0].trim(), broken[1].trim()];
});

let program = '#..#/..../..../#..#'.split('/');
let size = program.length;
let on = 0;

function splitGroups(grid, num) {
    let newPairs = [];

    for (let i = 0; i < grid.length; i++) {
        let front = grid[i].slice(0, num);
        let back = grid[i].slice(num);
        grid.splice(i, 1, [front, back]);
    }

    return grid;
}

function matchGroup(group, num) {
    let change = '';
    if (num === 2) {
        for (let a = 0; a < 1; a++) {
            let set = rules[a][0];
            if (group === set) {
                change = rules[a][1];
            }
        }
    } else if (num === 3) {
        for (let b = 1; b < rules.length; b++) {
            let set = rules[b][0];
            if (group === set) {
                change = rules[b][1];
            }
        }
    }

    return change;
}

// for each iteration
for (let i = 0; i < 2; i++) {
    // look at program - is the size divisible by 2 or 3?
    if (size % 2 === 0) {
        // run size 2 rules
        // if needed, split group into smaller squares

        // for each square, see if it matches a rule - if yes, change it, if no, switch/rotate it and check again until you get a match and can update it

    } else if (size % 3 === 0) {
        // run size 3 rules
        // if needed, split group into smaller squares

        // for each square, see if it matches a rule - if yes, change it, if no, switch/rotate it and check again until you get a match and can update it

    }
    // return updated squares and mesh them back together
    // update size variable
}

