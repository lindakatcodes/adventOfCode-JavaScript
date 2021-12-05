import * as h from "../helpers";

const data: string = await h.readData("./2021Inputs/day03input.txt");

const binary: string[] = h.strInput(data);

let gamma: number[] = [];
let epsilon: number[] = [];

interface Position {
  mostOften: number;
  leastOften: number;
  allValues: number[];
}

const positionCounts = h.lenArray(binary[0].length).map((position) => {
  const thisPosition: Position = {
    mostOften: 0,
    leastOften: 0,
    allValues: [],
  };
  return thisPosition;
});

binary.forEach((value: string) => {
  const splitValue: number[] = value
    .split("")
    .map((item: string): number => +item);
  for (let i = 0; i < splitValue.length; i++) {
    positionCounts[i].allValues.push(splitValue[i]);
  }
});

positionCounts.forEach((position: Position) => {
  const currentValuesCount = h.counts(position.allValues);
  if (currentValuesCount[0] > currentValuesCount[1]) {
    position.mostOften = 0;
    position.leastOften = 1;
  } else {
    position.mostOften = 1;
    position.leastOften = 0;
  }

  gamma.push(position.mostOften);
  epsilon.push(position.leastOften);
});

const gammaJoined = parseInt(gamma.join(""), 2);
const epsilonJoined = parseInt(epsilon.join(""), 2);
const power: number = gammaJoined * epsilonJoined;
console.log(`Part 1: power consumption is ${power}`);

let oxygen: string;
let co2: string;

function getValuesAtPosition(values: string[], position: number): string[] {
  const selectedValues: string[] = [];
  values.forEach((value: string) => {
    selectedValues.push(value[position]);
  });
  return selectedValues;
}

function processBinary(
  startingValues: string[],
  countType: string,
  defaultOption: string
): string {
  let currentValues: string[] = startingValues;

  for (let i = 0; i < startingValues[0].length; i++) {
    const valuesToCheck: string[] = getValuesAtPosition(currentValues, i);
    const currentValuesCount = h.counts(valuesToCheck);
    let filteredValues: string[];
    if (countType === "most") {
      if (currentValuesCount[0] > currentValuesCount[1]) {
        filteredValues = currentValues.filter((value) => value[i] === "0");
      } else if (currentValuesCount[0] === currentValuesCount[1]) {
        filteredValues = currentValues.filter(
          (value) => value[i] === defaultOption
        );
      } else {
        filteredValues = currentValues.filter((value) => value[i] === "1");
      }
    } else {
      if (currentValuesCount[0] > currentValuesCount[1]) {
        filteredValues = currentValues.filter((value) => value[i] === "1");
      } else if (currentValuesCount[0] === currentValuesCount[1]) {
        filteredValues = currentValues.filter(
          (value) => value[i] === defaultOption
        );
      } else {
        filteredValues = currentValues.filter((value) => value[i] === "0");
      }
    }
    currentValues = filteredValues;
    if (currentValues.length === 1) {
      break;
    }
  }

  return currentValues[0];
}

oxygen = processBinary(binary, "most", "1");
co2 = processBinary(binary, "least", "0");
const lifeSupport: number = parseInt(oxygen, 2) * parseInt(co2, 2);
console.log(`Part 2: life support is ${lifeSupport}`);
