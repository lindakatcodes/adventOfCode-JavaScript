// import * as c from "../chalk_styles.js";
import * as h from "../helpers";

const data: string = await h.readData("./2018Inputs/day08input.txt");

const licenseTree: number[] = h.numInput(data);

console.log({ licenseTree });
