const fs = require('fs');

const data = fs.readFileSync('../2017 Solutions/inputs/day16Input.txt').toString();

const steps = data.split(',');

let programs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];

for (let i = 0; i < steps.length; i++) {
    let action = steps[i].split('/');

    if (action[0] === 's') {
        for (let a = 0; a < action[1]; a++) {
            let step = programs.pop();
            programs.unshift(step);
        }
    } else if (action[0] === 'x') {
        let section = programs.slice(action[1], action[3] + 1);
        let end = section.pop();
        section.unshift(end);
        if (section.length > 2) {
            let begin = section.splice(1, 1);
            section.push(begin[0]);
        }
        programs.splice(action[1], section.length + 1, ...section);
    } else if (action[0] === 'p') {
        let index1 = programs.indexOf(action[1]);
        let index2 = programs.indexOf(action[3]);
        let segment = programs.slice(index1, index2 + 1);
        let last = segment.pop();
        segment.unshift(last);
        if (segment.length > 2) {
            let first = segment.splice(1, 1);
            segment.push(first[0]);
        }
        programs.splice(index1, index2 + 1, ...segment);
    }
}

console.log(programs);
