import * as h from "../helpers";

const data: string = await h.readData("./2021Inputs/day02input.txt");

const course: string[] = h.strInput(data);

let horizontal: number = 0;
let depth: number = 0;

course.forEach((move: string) => {
  const [direction, count] = move.split(" ");
  if (direction === "forward") {
    horizontal += +count;
  } else {
    direction === "down" ? (depth += +count) : (depth -= +count);
  }
});

console.log(`Part 1: ${horizontal * depth}`);

horizontal = 0;
depth = 0;
let aim: number = 0;

course.forEach((move: string) => {
  const [direction, count] = move.split(" ");
  if (direction === "forward") {
    horizontal += +count;
    depth += aim * +count;
  } else {
    direction === "down" ? (aim += +count) : (aim -= +count);
  }
});

console.log(`Part 2: ${horizontal * depth}`);
