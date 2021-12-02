import * as h from "../helpers";

const data: string = await h.readData("./2021Inputs/day02input.txt");

const course: string[] = h.strInput(data);
console.log(course);

let horizontal: number = 0;
let depth: number = 0;

course.forEach((move: string) => {
  const [direction, count] = move.split(" ");
  if (direction === "forward") {
    horizontal += parseInt(count, 10);
  } else {
    direction === "down"
      ? (depth += parseInt(count, 10))
      : (depth -= parseInt(count, 10));
  }
});

console.log(`Part 1: ${horizontal * depth}`);

horizontal = 0;
depth = 0;
let aim: number = 0;

course.forEach((move: string) => {
  const [direction, count] = move.split(" ");
  if (direction === "forward") {
    horizontal += parseInt(count, 10);
    depth += aim * parseInt(count, 10);
  } else {
    direction === "down"
      ? (aim += parseInt(count, 10))
      : (aim -= parseInt(count, 10));
  }
});

console.log(horizontal, depth);
console.log(`Part 2: ${horizontal * depth}`);
