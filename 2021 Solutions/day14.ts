import * as h from "../helpers";

const data: string = await h.readData("./2021Inputs/day14input.txt");
const splitData: string[] = h.strInput(data);
const initialTemplate: string[] = "SHHNCOPHONHFBVNKCFFC".split("");
let template: string[] = [...initialTemplate];

const rules = new Map();

splitData.forEach((rule: string) => {
  const splitRule = rule.split(" -> ").map((bit) => bit.trim());
  rules.set(splitRule[0], splitRule[1]);
});

const letterCount = h.counts(initialTemplate);

const steps = 10;

function runStep(): string[] {
  const newTemplate = [];
  for (let i = 0; i < template.length; i += 1) {
    if (i + 1 < template.length) {
      const pairToMatch = `${template[i]}${template[i + 1]}`;
      const newLetter: string = rules.get(pairToMatch);
      letterCount[newLetter]
        ? letterCount[newLetter]++
        : (letterCount[newLetter] = 1);
      i === 0
        ? newTemplate.push(template[i], newLetter, template[i + 1])
        : newTemplate.push(newLetter, template[i + 1]);
    }
  }
  // console.log(newTemplate.length, letterCount);
  return newTemplate;
}

for (let i = 0; i < steps; i++) {
  const stepTemplate = runStep();
  template = stepTemplate;
}

const sortedValues = Object.values(letterCount).sort(
  (a, b) => (a as number) - (b as number)
);
const mostKey: string =
  Object.keys(letterCount).find(
    (key: string) => letterCount[key] === sortedValues[sortedValues.length - 1]
  ) || "";
const leastKey: string =
  Object.keys(letterCount).find(
    (key: string) => letterCount[key] === sortedValues[0]
  ) || "";
const minus = letterCount[mostKey] - letterCount[leastKey];
console.log(minus);
