// Shoutout to u/vyper248 - Your solution helped me find my cycle and get the answer without having to wait literal hours/days to go through all of the iterations! :)

const fs = require('fs');

const data = fs.readFileSync('../2017 Solutions/inputs/day16Input.txt').toString();

const steps = data.split(',');

let programs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];
let times = 1000000000;
let counter = 1;
let start = programs.join('');

for (let a = 0; a < times; a++) {
    for (let i = 0; i < steps.length; i++) {
        let breakup = steps[i].split('');
        let action = breakup.shift();
        let details = breakup.join('').split('/');

        if (action[0] === 's') {
            for (let a = 0; a < details[0]; a++) {
                let step = programs.pop();
                programs.unshift(step);
            }
        } else if (action[0] === 'x') {
            let ind1 = details[0];
            let ind2 = details[1];
            let item1 = programs[ind1];
            let item2 = programs[ind2];
            [programs[ind1], programs[ind2]] = [programs[ind2], programs[ind1]];
        } else if (action[0] === 'p') {
            let index1 = programs.indexOf(details[0]);
            let index2 = programs.indexOf(details[1]);
            let part1 = programs[index1];
            let part2 = programs[index2];
            [programs[index1], programs[index2]] = [part2, part1];
        }
    }
    counter++;
    if (programs.join('') === start) {
        a += (Math.floor(times / (a + 1)) - 1) * (a + 1);
    }
}

console.log(programs.join(''));
console.log(counter);
