import * as h from "../helpers";

const data: string = await h.readData("./inputs/day01input.txt");

const measurements: number[] = h.numInput(data);
console.log(measurements);
