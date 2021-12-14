import * as h from "../helpers";

const data: string = await h.readData("./2021Inputs/day14input.txt");
const splitData: string[] = h.strInput(data);
const template: string[] = "NNCB".split("");

const rules = new Map();

splitData.forEach((rule: string) => {
  const splitRule = rule.split(" -> ");
  rules.set(splitRule[0], splitRule[1]);
});

console.log(rules);

const step = 0;

for (let i = 0; i < 10; i++) {}
