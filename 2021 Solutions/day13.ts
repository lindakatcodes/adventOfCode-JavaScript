import * as h from "../helpers";

const data: string = await h.readData("./2021Inputs/day13input.txt");
const [points, instructions] = data.split("\n\n");
const coords: number[][] = h
  .strInput(points)
  .map((point) => point.split(",").map((val) => +val));
const parsedDirections: string[][] = h
  .strInput(instructions)
  .map((dir) => dir.split("fold along "))
  .map((bit) => bit[1].split("="));

let maxX = 0;
let maxY = 0;

function parseInstructions(coords: number[][], count: number): number[][] {
  let coordCopy: number[][] = [...coords];
  for (let i = 0; i < count; i++) {
    const axis: number = parsedDirections[i][0] === "x" ? 0 : 1;
    const line: number = +parsedDirections[i][1];

    const adjustedCoords = coordCopy.map((coord) => {
      const newCoord = [...coord];
      if (newCoord[axis] > line) {
        const diff = newCoord[axis] - line;
        newCoord[axis] = line - diff;
      }
      return newCoord;
    });

    coordCopy = adjustedCoords;
  }
  return coordCopy;
}

const runInstructions = parseInstructions(coords, 1);
const markedCoords = new Set();
runInstructions.forEach((coord) => markedCoords.add(coord.join(",")));
console.log(`Part1: ${markedCoords.size}`);

const fullInstructions = parseInstructions(coords, parsedDirections.length);
const fullMarkedCoords: Set<string> = new Set();

fullInstructions.forEach((coord) => {
  if (coord[0] > maxX) {
    maxX = coord[0];
  }
  if (coord[1] > maxY) {
    maxY = coord[1];
  }
  fullMarkedCoords.add(coord.join(","));
});

let outputMap: string[][] = h
  .lenArray(maxY + 1)
  .map(() => h.lenArray(maxX + 1).map((pos) => "."));
for (let y = 0; y <= maxY; y++) {
  for (let x = 0; x <= maxX; x++) {
    const marked = fullMarkedCoords.has(`${x},${y}`);
    marked ? (outputMap[y][x] = "#") : (outputMap[y][x] = ".");
  }
}

const builtMap: string[] = outputMap.map((row) => row.join(""));
console.dir(builtMap);
