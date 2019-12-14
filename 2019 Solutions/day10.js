const fs = require('fs');

const data = fs.readFileSync('../2019 Solutions/inputs/day10input.txt').toString();

const input = data.split('\r\n');

function asteroid() {
  this.location = 0,
  this.canSee = 0,
  this.visited = false;
}

let asteroids = [];
let mostSeen = 0;
let mostLocation = [];

//check an asteroid to see how many it can view
function vision(locationX, locationY) {
  const newSpot = new asteroid();
  newSpot.location = [locationX, locationY];
  newSpot.visited = true;

  let visitedSpots = [];
  let matches = [];
  
  const currX = newSpot.location[0];
  const currY = newSpot.location[1];

  // first, check it's sides (x axis) - will only be able to see the first asteroid it sees on each side
  let xInRow = [];
  for (let i = 0; i < input[currY].length; i++) {
    if (input[currY][i] === '#') {
      xInRow.push(i);
      visitedSpots.push([i, currY]);
    }
  }

    let currXIndex = xInRow.indexOf(currX);
    let leftNeighbor = xInRow[currXIndex-1];
    let rightNeighbor = xInRow[currXIndex+1];
    if (leftNeighbor !== undefined) {
      newSpot.canSee++;
      matches.push([leftNeighbor, currY]);
    }
    if (rightNeighbor !== undefined) {
      newSpot.canSee++;
      matches.push([rightNeighbor, currY]);
    }

    // then, check it's y axis - again, will only see the first one it comes into contact with
    let yInRow = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i][currX] === '#') {
      yInRow.push(i);
      visitedSpots.push([currX, i]);
    }
  }

    let currYIndex = yInRow.indexOf(currY);
    let topNeighbor = yInRow[currYIndex-1];
    let bottomNeighbor = yInRow[currYIndex+1];
    if (topNeighbor !== undefined) {
      newSpot.canSee++;
      matches.push([currX, topNeighbor]);
    }
    if (bottomNeighbor !== undefined) {
      newSpot.canSee++;
      matches.push([currX, bottomNeighbor]);
    }

    // now, to check other patterns - 1 over 1 down, 2 over 1 down, 2 over 2 down, etc

    // finally, add the new asteroid to the full list, and share what we found
    asteroids.push(newSpot);
    console.log(`So far: asteroid ${newSpot.location} has found ${newSpot.canSee} asteroids; checked ${visitedSpots} and matched with ${matches}`);
}

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    let curr = input[y][x];
    if (curr === '#') {
      vision(x, y);
    }
  }
}