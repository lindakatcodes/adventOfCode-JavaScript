import * as h from "../helpers";

const data: string = await h.readData("./2021Inputs/day12input.txt");

const map: string[][] = h.strInput(data).map((option) => option.split("-"));

interface Path {
  name: string;
  visitedCount: number;
  size: string;
  connections: string[];
  visitedConnections: string[];
  currentPath: string[];
  foundEnd: boolean;
}

const allPoints: Map<string, Path> = new Map();

map.forEach((route: string[]) => {
  if (allPoints.has(route[0])) {
    const currPoint = allPoints.get(route[0]) as Path;
    currPoint.connections.push(route[1]);
    allPoints.set(route[0], currPoint);
  } else {
    const newPoint: Path = {
      name: route[0],
      visitedCount: 0,
      size: route[0] === route[0].toLowerCase() ? "small" : "big",
      connections: [route[1]],
      visitedConnections: [],
      currentPath: [route[0]],
      foundEnd: false,
    };
    allPoints.set(route[0], newPoint);
  }
  if (allPoints.has(route[1])) {
    const currPoint = allPoints.get(route[1]) as Path;
    currPoint.connections.push(route[0]);
    allPoints.set(route[1], currPoint);
  } else {
    const newPoint: Path = {
      name: route[1],
      visitedCount: 0,
      size: route[1] === route[1].toLowerCase() ? "small" : "big",
      connections: [route[0]],
      visitedConnections: [],
      currentPath: [route[1]],
      foundEnd: false,
    };
    allPoints.set(route[1], newPoint);
  }
});

console.log(allPoints);

// always start with start
// add start's routes to an array of values to check
// on each visit to a cave, increase it's visit count - small caves can only have 1 visit
// trying to find 'end' - so need to build up paths that go from start to end, and check all the potential options
const startPoint: Path = allPoints.get("start") as Path;
let allPaths: number = 0;
const possible: string[][] = [];

function processNode(node: Path): Path {
  // can short circuit if this is the 'end' node
  if (node.name === "end") {
    return node;
  }
  // mark this node as visited
  node.visitedCount++;
  // find next connection - first connection if visited is empty, otherwise next value that has not been visited
  const nextConnection = node.connections.find(
    (name: string) => !node.visitedConnections.includes(name)
  );
  if (nextConnection) {
    const nextNode: Path = allPoints.get(nextConnection) as Path;
    if (nextNode.size === "big") {
      // visited count doesn't matter, go here
      node.visitedConnections.push(nextConnection);
      node.currentPath.push(nextConnection);
      processNode(nextNode);
    } else {
      if (nextNode.name === "end") {
        node.foundEnd = true;
        node.currentPath.push(nextConnection);
        return node;
      }
      // this is a small node, so need to make sure it hasn't been visited already
      if (nextNode.visitedCount !== 0) {
        // already been visited before, add it to visitedConns so it's not seen again and return
        node.visitedConnections.push(nextConnection);
      } else {
        // safe to go here, proceed
        node.visitedConnections.push(nextConnection);
        node.currentPath.push(nextConnection);
        processNode(nextNode);
      }
    }
  }
  if (
    node.visitedConnections.length !== node.connections.length &&
    !node.foundEnd
  ) {
    processNode(node);
  }
  return node;
}

function findPaths(node: Path) {
  while (
    node.visitedConnections.length !== node.connections.length &&
    !node.foundEnd
  ) {
    const findNextPath: Path = processNode(node);
    if (findNextPath.currentPath.includes("end")) {
      node.foundEnd = true;
      possible.push(node.currentPath);
      allPaths++;
      node.currentPath = [node.name];
    }
  }
}

findPaths(startPoint);
console.log(allPaths);
console.log(possible);
