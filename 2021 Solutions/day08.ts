import * as h from "../helpers";

const data: string = await h.readData("./2021Inputs/day08input.txt");
const allData: string[] = h.strInput(data);

class Positions {
  0: [];
  1: [];
  2: [];
  3: [];
  4: [];
  5: [];
  6: [];
  7: [];
  8: [];
  9: [];
}

const numberLengths = new Map();
numberLengths.set(0, 6);
numberLengths.set(1, 2);
numberLengths.set(2, 5);
numberLengths.set(3, 5);
numberLengths.set(4, 4);
numberLengths.set(5, 5);
numberLengths.set(6, 6);
numberLengths.set(7, 3);
numberLengths.set(8, 7);
numberLengths.set(9, 6);

let uniqueCount: number = 0;

allData.forEach((entry: string) => {
  const [patterns, output] = entry.split(" | ").map((entry) => entry.trim());
  const uniqueLengths = [
    numberLengths.get(1),
    numberLengths.get(4),
    numberLengths.get(7),
    numberLengths.get(8),
  ];
  output.split(" ").forEach((digit: string) => {
    if (uniqueLengths.includes(digit.length)) {
      uniqueCount++;
    }
  });
});

console.log(uniqueCount);

// go through the 4 unique numbers and set those values into the potential positions
// get the 5's
// plot the locations contained in the 1st string
// then check the lengths of those position arrays - if there's 2 values in the position and we have both those positions, we can start to fill out the value positions
// continue to process the 5's, then the 6's, until we can solve all the positions
// if a value is processed but doesn't set an actual position or eliminate some choices, put it back in the array to be checked and process it again later

allData.forEach((entry: string) => {
  const [patterns, output] = entry.split(" | ").map((entry) => entry.trim());
  const allPatterns: string[] = patterns.split(" ");
  const outputValues: string[] = output.split(" ");
  const uniqueLengths = [
    numberLengths.get(1),
    numberLengths.get(4),
    numberLengths.get(7),
    numberLengths.get(8),
  ];

  const entryPositions = new Positions();
  const uniquePatterns = allPatterns
    .map((pattern: string) => {
      if (uniqueLengths.includes(pattern.length)) return pattern;
    })
    .filter((vals) => vals !== undefined)
    .sort((a, b) => a.length - b.length);

  uniquePatterns.forEach((pattern: string) => {});
});
