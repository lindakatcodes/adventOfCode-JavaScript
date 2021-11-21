// solution idea curtesy of u/Civury
import * as h from "../helpers";

const data: string = await h.readData("./2018Inputs/day08input.txt");

const licenseTree: number[] = h.numInput(data);

interface Node {
  numChildren: number;
  numMeta: number;
  metadata: number[];
  children: Node[];
  value: number;
}

let pointer = 0;
let allMeta: number[] = [];
let rootNode = processNodes();

function processNodes(): Node {
  let node: Node = {
    numChildren: next(),
    numMeta: next(),
    children: [],
    metadata: [],
    value: 0,
  };

  for (let i = 0; i < node.numChildren; i++) {
    node.children.push(processNodes());
  }
  for (let j = 0; j < node.numMeta; j++) {
    node.metadata.push(next());
  }
  allMeta.push(...node.metadata);
  return node;
}

function next(): number {
  return licenseTree[pointer++];
}

function sum(array: number[]) {
  return array.reduce((sum, value) => sum + value, 0);
}

function setValues(node: Node): number {
  if (!node) return 0;

  if (node.children.length === 0) return sum(node.metadata);

  return sum(node.metadata.map((meta) => setValues(node.children[meta - 1])));
}

console.log(rootNode);
const part1 = allMeta.reduce((acc, curr) => acc + curr, 0);
console.log(`Part 1: ${part1}`);
const part2 = setValues(rootNode);
console.log(`Part 2: ${part2}`);
