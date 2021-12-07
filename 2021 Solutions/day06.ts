import * as h from "../helpers";

const data: string = await h.readData("./2021Inputs/day06input.txt");
const fish: number[] = data.split(",").map(Number);

const days: number = 256;
const RESTART: number = 6;
const NEWFISH: number = 8;

let fishAtAges: number[] = h.lenArray(9).map((pos) => {
  return fish.filter((age) => age === pos).length || 0;
});

console.log(fishAtAges);

for (let i = 0; i < days; i++) {
  const prevDay: number[] = fishAtAges;
  const fishZero: number = prevDay.slice(0, 1)[0];
  const newDay: number[] = prevDay.slice(1);
  newDay[RESTART] += fishZero;
  newDay.push(fishZero);
  fishAtAges = newDay;
}
console.log(fishAtAges);

const totalFish: number = fishAtAges.reduce((prev, curr) => prev + curr);
console.log(totalFish);
