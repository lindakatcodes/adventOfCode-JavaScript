const fs = require('fs');

// Change number on input file before use
const data = fs.readFileSync('../2019 Solutions/inputs/day03input.txt').toString();

// Need an array of strings?
const input = data.split('\r\n');

let wire1 = input[0].split(',');
let wire2 = input[1].split(','); 

let path1 = new Set();
let path1c = [];
let crosses = [];

let h = 0; 
let v = 0;
let counter = 0;

for (let i = 0; i < wire1.length; i++) {
  let split = [wire1[i].slice(0, 1), wire1[i].slice(1)];
  let dir = split[0];
  let steps = split[1];

  do {
    switch (dir) {
      case 'U':
        v++;
        steps--;
        break;
      case 'D':
        v--;
        steps--;
        break;
      case 'R':
        h++;
        steps--;
        break;
      case 'L':
        h--;
        steps--;
        break;
      }
      counter++;

    if (!path1.has(`${h},${v}`)) {
      path1.add(`${h},${v}`);  
      path1c.push(counter);
    }
  } while  (steps > 0);
}

let setarr = [...path1];

// console.log(path1);

h = 0; 
v = 0;
counter = 0;

for (let i = 0; i < wire2.length; i++) {
  let split = [wire2[i].slice(0, 1), wire2[i].slice(1)];
  let dir = split[0];
  let steps = split[1];

  do {
    switch (dir) {
      case 'U':
        v++;
        steps--;
        break;
      case 'D':
        v--;
        steps--;
        break;
      case 'R':
        h++;
        steps--;
        break;
      case 'L':
        h--;
        steps--;
        break;
      }
      counter++;
    
    if (path1.has(`${h},${v}`)) {
      let path1pos = setarr.indexOf(`${h},${v}`);
      let path1count = path1c[path1pos];
      let sumsteps = path1count + counter;
      crosses.push(`${h},${v},${sumsteps}`);
    }  
  } while  (steps > 0);
}

// console.log(crosses);

let closest;
let lowest;

crosses.forEach(val => {
  let breakup = val.split(',');
  let valh = breakup[0];
  let valv = breakup[1];
  let valc = breakup[2];

  let distance = Math.abs(valh) + Math.abs(valv);

  if (!closest) {
    closest = distance;
  } else {
    if (distance < closest) {
      closest = distance;
    }
  }

  if (!lowest) {
    lowest = valc;
  } else {
    if (valc < lowest) {
      lowest = valc;
    }
  }
})

console.log(`Part 1: ${closest}`);
console.log(`Part 2: ${lowest}`);