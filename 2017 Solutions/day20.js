// thanks to u/Lrrr_ for the regex to get my initial matches paired down properly!

const fs = require('fs');

const data = fs.readFileSync('../2017 Solutions/inputs/day20Input.txt').toString();

const particles = data.split('\r\n');

function nextPos(x, y, z) {
    let newY = z + y;
    let newX = newY + x;
    return [newX, newY];
}

function getSum(x, y, z) {
    return Math.abs(x) + Math.abs(y) + Math.abs(z);
}

function update(arrP, arrV, arrA) {
    for (let a = 0; a < 3; a++) {
        let update0 = nextPos(arrP[0], arrV[0], arrA[0]);
        let update1 = nextPos(arrP[1], arrV[1], arrA[1]);
        let update2 = nextPos(arrP[2], arrV[2], arrA[2]);

        let newP = [update0[0], update1[0], update2[0]];
        let newV = [update0[1], update1[1], update2[1]];

        return [newP, newV];
    }
}

let closest = '';
let record = [];
let currPos = [];

for (let j = 0; j < 1000; j++) {
    currPos = [];

    for (let i = 0; i < particles.length; i++) {
        let currPart = particles[i].match(/<(.*?)>/g);
        let currP = currPart[0].slice(1, -1).split(',').map(n => parseInt(n, 10));
        let currV = currPart[1].slice(1, -1).split(',').map(n => parseInt(n, 10));
        let currA = currPart[2].slice(1, -1).split(',').map(n => parseInt(n, 10));

        let closeness = getSum(currP[0], currP[1], currP[2]);
        currPos.push(closeness);

        let newVals = update(currP, currV, currA);
        let newPart = `p=<${newVals[0]}>, v=<${newVals[1]}>, a=<${currA}>`;

        particles.splice(i, 1, newPart);
    }

    for (let l = 1; l < particles.length; l++) {
        let prev = particles[l - 1].match(/<(.*?)>/g);
        let prevP = prev[0].slice(1, -1).split(',').map(n => parseInt(n, 10));

        let curr = particles[l].match(/<(.*?)>/g);
        let currP = curr[0].slice(1, -1).split(',').map(n => parseInt(n, 10));

        if (prevP[0] === currP[0] && prevP[1] === currP[1] && prevP[2] === currP[2]) {
            particles[l] += 'r';
            particles[l - 1] += 'r';
        }
    }

    for (let i = 0; i < particles.length; i++) {
        if (particles[i].slice(-1) === 'r') {
            particles.splice(i, 1);
            i--;
        }
    }

    let currClosest = currPos.reduce((a, b) => (a < b ? a : b));

    closest = currPos.indexOf(currClosest);
    record.push(closest);
}

// let sorted = record.sort((a, b) => a - b);
// console.log(`Record: ${sorted}`);
console.log(`Particles left: ${particles.length}`);
