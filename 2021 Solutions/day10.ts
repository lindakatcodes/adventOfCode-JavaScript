import * as h from "../helpers";

const data: string = await h.readData("./2021Inputs/day10input.txt");
const lines: string[] = h.strInput(data);

let Open = "<[{(";
let Close: ">]})";

interface OpenValues {
  [index: string]: number;
  ")": number;
  "]": number;
  "}": number;
  ">": number;
}

const pointValues: OpenValues = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const closedValues: OpenValues = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

const incorrectValues: string[] = [];
const noCorruptedLines: string[] = [...lines];
const leftHanging = new Map();

noCorruptedLines.map((line: string, index: number) => {
  const splitLine: string[] = line.split("");
  const seenOpen: string[] = [];

  for (let i = 0; i < splitLine.length; i++) {
    const curr = splitLine[i];
    let corrupted = false;
    if (Open.includes(curr)) {
      seenOpen.push(curr);
    } else {
      const lastOpen = seenOpen[seenOpen.length - 1];
      switch (curr) {
        case ">":
          if (lastOpen === "<") {
            seenOpen.pop();
          } else {
            incorrectValues.push(curr);
            corrupted = true;
            break;
          }
          break;
        case "]":
          if (lastOpen === "[") {
            seenOpen.pop();
          } else {
            incorrectValues.push(curr);
            corrupted = true;
            break;
          }
          break;
        case "}":
          if (lastOpen === "{") {
            seenOpen.pop();
          } else {
            incorrectValues.push(curr);
            corrupted = true;
            break;
          }
          break;
        case ")":
          if (lastOpen === "(") {
            seenOpen.pop();
          } else {
            incorrectValues.push(curr);
            corrupted = true;
            break;
          }
          break;
      }
    }
    if (corrupted) {
      noCorruptedLines[index] = "0";
      return;
    } else {
      leftHanging.set(index, seenOpen);
    }
  }
});

const errorScore: number = incorrectValues.reduce((acc, val) => {
  const valPoints: number = pointValues[val];
  return (acc += valPoints);
}, 0);

console.log("Part 1: ", errorScore);

const autocompleteValues = noCorruptedLines.map((line, index) => {
  if (line === "0") return;
  let lineTotal: number = 0;
  const cacheToClose = leftHanging.get(index);
  for (let i = cacheToClose.length - 1; i >= 0; i--) {
    const lastOpen = cacheToClose[i];
    switch (lastOpen) {
      case "<":
        lineTotal = lineTotal * 5 + closedValues[">"];
        break;
      case "[":
        lineTotal = lineTotal * 5 + closedValues["]"];
        break;
      case "{":
        lineTotal = lineTotal * 5 + closedValues["}"];
        break;
      case "(":
        lineTotal = lineTotal * 5 + closedValues[")"];
        break;
    }
  }
  return lineTotal;
});

const justIncomplete: number[] = autocompleteValues
  .filter((val) => val !== undefined)
  .map((val) => val as number);

const sortedAutocomplete = [...justIncomplete].sort(
  (a: number, b: number) => a - b
);

const middleIndex = (sortedAutocomplete.length - 1) / 2;
const middleScore = sortedAutocomplete[middleIndex];
console.log("Part 2: ", middleScore);
