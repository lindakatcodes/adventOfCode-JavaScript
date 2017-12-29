const fs = require('fs');

const data = fs.readFileSync('../2017 Solutions/inputs/day21Input.txt').toString();

const rules = data.split('\r\n').map((rule) => {
    let broken = rule.split('=>');
    return [broken[0].trim(), broken[1].trim()];
});

let program = '.#./..#/###'.split('/');
let size = program.length;
let on = 0;

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

