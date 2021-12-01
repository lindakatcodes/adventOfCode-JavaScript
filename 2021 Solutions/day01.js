import * as fs from 'fs';

const data = fs.readFileSync('./inputs/day01input.txt').toString();
const measurements = data.split('\n').map(Number);

let increaseCount = 0;

for (let i = 0; i < measurements.length; i++) {
  if (measurements[i] < measurements[i + 1]) {
    increaseCount++;
  }
}

console.log(`Part 1: ${increaseCount}`);

increaseCount = 0;

for (let i = 0; i < measurements.length; i++) {
  if (i + 3 <= measurements.length) {
    const window1 = measurements[i] + measurements[i + 1] + measurements[i + 2];
    const window2 = measurements[i + 1] + measurements[i + 2] + measurements[i + 3];
    if (window1 < window2) {
      increaseCount++;
    }
  }
}

console.log(`Part 2: ${increaseCount}`);
