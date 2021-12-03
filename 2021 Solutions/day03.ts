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
  // console.log(currentValuesCount);
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

// console.log(positionCounts);

const gammaJoined = parseInt(gamma.join(""), 2);
const epsilonJoined = parseInt(epsilon.join(""), 2);
const power: number = gammaJoined * epsilonJoined;
console.log(power);
