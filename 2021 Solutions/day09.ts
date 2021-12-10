import * as h from "../helpers";

const data: string = await h.readData("./2021Inputs/day09input.txt");

const heightMap: number[][] = h.strInput(data).map((row: string) => {
  const splitRow: number[] = row.split("").map((val) => +val);
  return splitRow;
});
// console.log(heightMap);

const lows: number[] = [];

for (let r = 0; r < heightMap.length; r++) {
  for (let n = 0; n < heightMap[r].length; n++) {
    const adjNums = [];
    const curr = heightMap[r][n];
    // adjNums.push(heightMap[r][n]);
    if (r - 1 >= 0) adjNums.push(heightMap[r - 1][n]);
    if (r + 1 < heightMap.length) adjNums.push(heightMap[r + 1][n]);
    if (n - 1 >= 0) adjNums.push(heightMap[r][n - 1]);
    if (n + 1 < heightMap[r].length) adjNums.push(heightMap[r][n + 1]);
    // console.log(adjNums);
    const lower = adjNums.map((val) => (val > curr ? true : false));
    if (!lower.includes(false)) {
      lows.push(curr);
    }
  }
}

console.log(lows);
const riskLevels: number[] = lows.map((val) => val + 1);
console.log(riskLevels);
const riskSum: number = riskLevels.reduce((a, b) => a + b);

console.log(riskSum);
