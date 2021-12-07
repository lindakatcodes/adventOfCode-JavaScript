import * as h from "../helpers";

const data: string = await h.readData("./2021Inputs/day07input.txt");
const crabShipPositions: number[] = data.split(",").map((val) => +val);
interface PivotShip {
  fuelUsed: number;
  position: number;
}
// set it to a nice long length to start
let leastFuel: PivotShip = {
  fuelUsed: 100000000,
  position: 0,
};

function calculateBestDistance(ships: number[], multiplier: boolean) {
  for (let i = 0; i < ships.length; i++) {
    const currentShip: number = ships[i];
    console.log(currentShip);
    let fuelToMatch: number = 0;

    ships.forEach((crab: number) => {
      let shipDistance = Math.abs(crab - currentShip);
      if (multiplier) {
        const range = [...Array(shipDistance).keys()];
        const extraFuel: number =
          range.length > 0 ? range.reduce((a, b) => a + b) : 0;
        console.log(shipDistance, extraFuel);
        fuelToMatch += shipDistance + extraFuel;
      } else {
        fuelToMatch += shipDistance;
      }
    });

    if (fuelToMatch < leastFuel.fuelUsed) {
      leastFuel = {
        fuelUsed: fuelToMatch,
        position: currentShip,
      };
    }
  }
}

// Part 1
calculateBestDistance(crabShipPositions, false);
console.log(leastFuel);

// Part 2
leastFuel = {
  fuelUsed: 100000000,
  position: 0,
};
calculateBestDistance(crabShipPositions, true);
console.log(leastFuel);
