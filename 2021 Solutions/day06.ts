import * as h from "../helpers";

const data: string = await h.readData("./2021Inputs/day06input.txt");
const fish: number[] = data.split(",").map(Number);

const days: number = 256;
const RESTART: number = 6;
const NEWFISH: number = 8;

for (let i = 0; i < days; i++) {
  const fishToAge: number = fish.length;
  for (let j = 0; j < fishToAge; j++) {
    if (fish[j] === 0) {
      fish[j] = RESTART;
      fish.push(NEWFISH);
    } else {
      fish[j]--;
    }
  }
}

const totalFish: number = fish.length;
console.log(totalFish);
