import * as h from "../helpers";

const data: string = await h.readData("./2021Inputs/day12input.txt");

const map: string[][] = h.strInput(data).map((option) => option.split("-"));

interface Cave {
  name: string;
  size: string;
  visitedCount: number;
  connections: string[];
}

const allCaves: Map<string, Cave> = new Map();

map.forEach((route: string[]) => {
  if (allCaves.has(route[0])) {
    const currPoint = allCaves.get(route[0]) as Cave;
    currPoint.connections.push(route[1]);
    allCaves.set(route[0], currPoint);
  } else {
    const newCave: Cave = {
      name: route[0],
      visitedCount: 0,
      size: route[0] === route[0].toLowerCase() ? "small" : "big",
      connections: [route[1]],
    };
    allCaves.set(route[0], newCave);
  }
  if (allCaves.has(route[1])) {
    const currPoint = allCaves.get(route[1]) as Cave;
    currPoint.connections.push(route[0]);
    allCaves.set(route[1], currPoint);
  } else {
    const newCave: Cave = {
      name: route[1],
      visitedCount: 0,
      size: route[1] === route[1].toLowerCase() ? "small" : "big",
      connections: [route[0]],
    };
    allCaves.set(route[1], newCave);
  }
});

console.log(allCaves);

const startPoint: Cave = allCaves.get("start") as Cave;
const possiblePaths: string[] = [];

let currentPath: string[] = ["start"];
const startQueue: string[] = startPoint.connections;
startPoint.visitedCount++;

function processQueue(queue: string[]) {
  for (const caveName of queue) {
    const nextCave: Cave = allCaves.get(caveName) as Cave;
    const isEnd: boolean = !!(nextCave.name === "end");
    if (isEnd) {
      currentPath.push(caveName);
      possiblePaths.push(currentPath.join(","));
      nextCave.visitedCount++;
      // when I come back - this isn't right, and something different needs to happen here
      currentPath = ["start"];
      break;
    }
    const canVisit: boolean =
      nextCave.size === "big" ||
      (nextCave.size === "small" && nextCave.visitedCount === 0);
    if (canVisit) {
      currentPath.push(caveName);
      nextCave.visitedCount++;
      const nextQueue: string[] = nextCave.connections;
      processQueue(nextQueue);
    }
  }
}

processQueue(startQueue);
console.log(possiblePaths);
