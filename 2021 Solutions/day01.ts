import * as h from "../helpers";

const data: string = await h.readData("2021Inputs/day01input.txt");

const measurements = h.numInput(data);

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
    const window2 =
      measurements[i + 1] + measurements[i + 2] + measurements[i + 3];
    if (window1 < window2) {
      increaseCount++;
    }
  }
}

console.log(`Part 2: ${increaseCount}`);
