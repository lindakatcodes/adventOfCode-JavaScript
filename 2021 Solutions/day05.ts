import * as h from "../helpers";

const data: string = await h.readData("./2021Inputs/day05input.txt");
const lineSegs: string[] = h.strInput(data);

interface Point {
  point: number[];
  count: number;
}

interface Coords {
  [index: string]: Point;
}

const coordinates: Coords = {};

lineSegs.forEach((segment: string) => {
  // split segment and turn into numbers to loop over
  const [point1, point2] = segment.split(" -> ").map((seg: string) => {
    return seg.split(",").map((val) => +val);
  });
  // tally points where the x or y matches first
  if (point1[0] === point2[0] || point1[1] === point2[1]) {
    if (point1[0] === point2[0]) {
      // if x is the same, need the y's
      const y1: number = point1[1];
      const y2: number = point2[1];
      const x: number = point1[0];
      if (y1 < y2) {
        for (let i = y1; i <= y2; i++) {
          checkKeyCount(x, i);
        }
      } else {
        for (let i = y2; i <= y1; i++) {
          checkKeyCount(x, i);
        }
      }
    } else {
      // y is the same, need the x's
      const x1: number = point1[0];
      const x2: number = point2[0];
      const y: number = point1[1];
      if (x1 < x2) {
        for (let i = x1; i <= x2; i++) {
          checkKeyCount(i, y);
        }
      } else {
        for (let i = x2; i <= x1; i++) {
          checkKeyCount(i, y);
        }
      }
    }
  } else {
    // then tally the diagonals
    const x1: number = point1[0];
    const x2: number = point2[0];
    const y1: number = point1[1];
    const y2: number = point2[1];
    let currPoint: number[] = [x1, y1];
    const diffBetweenX: number = Math.abs(x1 - x2);
    for (let i = 0; i <= diffBetweenX; i++) {
      let currX: number = x1 < x2 ? x1 + i : x1 - i;
      let currY: number = y1 < y2 ? y1 + i : y1 - i;
      checkKeyCount(currX, currY);
    }
  }
});

function checkKeyCount(x: number, y: number): void {
  const key: string = `${x},${y}`;
  if (coordinates[key]) {
    coordinates[key].count++;
  } else {
    coordinates[key] = {
      point: [x, y],
      count: 1,
    };
  }
}

let multiCrossedPoints: number = 0;

for (const point in coordinates) {
  const pointCount = coordinates[point];
  pointCount.count > 1 ? (multiCrossedPoints += 1) : (multiCrossedPoints += 0);
}
// to run part 1, comment out lines 54 - 66 (the else segment that checks the diagonals)
console.log(`Multi-crossed points count is ${multiCrossedPoints}`);
