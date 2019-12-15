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

let knownLocations = [];

//check an asteroid to see how many it can view
function vision(locationX, locationY) {
  const newSpot = new asteroid();
  newSpot.location = [locationX, locationY];
  newSpot.visited = true;

  let visitedSpots = [];
  let matches = [];
  
  const currX = newSpot.location[0];
  const currY = newSpot.location[1];

  // check x axis, get those matches
  let xpartners = knownLocations.filter(pair => pair[1] === currY);
  // add all of these to the seen array
  xpartners.forEach(pair => visitedSpots.push(pair));

  let currXIndex = getIndex([currX, currY], xpartners);
  let leftNeighbor = xpartners[currXIndex-1];
  let rightNeighbor = xpartners[currXIndex+1];
  if (leftNeighbor !== undefined) {
    newSpot.canSee++;
    matches.push(leftNeighbor);
  }
  if (rightNeighbor !== undefined) {
    newSpot.canSee++;
    matches.push(rightNeighbor);
  }

  // check y axis, get those matches
  let ypartners = knownLocations.filter(pair => pair[0] === currX);
  // add all of these to the seen array
  ypartners.forEach(pair => visitedSpots.push(pair));
  
  let currYIndex = getIndex([currX, currY], ypartners);
  let topNeighbor = ypartners[currYIndex-1];
  let bottomNeighbor = ypartners[currYIndex+1];
  if (topNeighbor !== undefined) {
    newSpot.canSee++;
    matches.push(topNeighbor);
  }
  if (bottomNeighbor !== undefined) {
    newSpot.canSee++;
    matches.push(bottomNeighbor);
  }

  // check diagonals - x+1 y+1 (rd), x-1 y+1 (ld), x+1 y-1 (ru), x-1 y-1 (lu)
  let rd = [1, 1];
  let ld = [-1, 1];
  let ru = [1, -1];
  let lu = [-1, -1];

  let ldResults = getDiags(newSpot.location, ld, visitedSpots);
  if (ldResults.length > 0) {
    matches.push(ldResults[0]);
    newSpot.canSee++;
  }
  let rdResults = getDiags(newSpot.location, rd, visitedSpots);
  if (rdResults.length > 0) {
    matches.push(rdResults[0]);
    newSpot.canSee++;
  }
  let luResults = getDiags(newSpot.location, lu, visitedSpots);
  if (luResults.length > 0) {
    matches.push(luResults[0]);
    newSpot.canSee++;
  }
  let ruResults = getDiags(newSpot.location, ru, visitedSpots);
  if (ruResults.length > 0) {
    matches.push(ruResults[0]);
    newSpot.canSee++;
  }
  

  let remaining = knownLocations.filter(pair => {
    let checkX = pair[0];
    let checkY = pair[1];
    let matchFound = false;
    visitedSpots.forEach(val => {
      if (val[0] === checkX && val[1] === checkY) {
        matchFound = true;
        return;
      }
    })
    if (!matchFound) {
      return pair;
    }
  });


  remaining.forEach(coord => {
    let checkX = coord[0];
    let checkY = coord[1];
    let matchFound = false;
    visitedSpots.forEach(val => {
      if (val[0] === checkX && val[1] === checkY) {
        matchFound = true;
        return;
      }
    })

    if (!matchFound) {
      let newX = coord[0] - newSpot.location[0];
      let newY = coord[1] - newSpot.location[1];

      let canReduce = Math.gcd(Math.abs(newX), Math.abs(newY));
      newX = newX / canReduce;
      newY = newY / canReduce;

      let newPattern = [newX, newY];
      let cResults = getDiags(newSpot.location, newPattern, visitedSpots);
      if (cResults.length > 0) {
        matches.push(cResults[0]);
        newSpot.canSee++;
      }
    }
  })

  let cleanVisited = new Set(visitedSpots);

  // finally, add the new asteroid to the full list, and share what we found
  asteroids.push(newSpot);
  if (newSpot.canSee > mostSeen) {
    mostSeen = newSpot.canSee;
    mostLocation = newSpot.location;
  }
  // console.log(`So far: asteroid ${newSpot.location} has found ${newSpot.canSee} asteroids; checked %o and matched with %o`, cleanVisited, matches);
}

Math.gcd = function() {
  if (arguments.length == 2) {
      if (arguments[1] == 0)
          return arguments[0];
      else
          return Math.gcd(arguments[1], arguments[0] % arguments[1]);
  } else if (arguments.length > 2) {
      var result = Math.gcd(arguments[0], arguments[1]);
      for (var i = 2; i < arguments.length; i++)
          result = Math.gcd(result, arguments[i]);
      return result;
  }
};

function getIndex(pair, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === pair[0] && arr[i][1] === pair[1]) {
      return i;
    }
  }
  return -1;
}

function getDiags(start, pattern, possible) {
  let validSpots = [];
  let checked = [start];
  let valid = true;
  
  while (valid) {
    valid = checkPattern(checked[checked.length - 1], pattern, checked, validSpots, valid);
  }
  
  validSpots.forEach(pair => possible.push(pair));
  return validSpots;
}

function checkPattern(start, pattern, cArr, vArr, good) {
  let maxX = input[0].length - 1;
  let maxY = input.length - 1;

  let nextX = start[0] + pattern[0];
  let nextY = start[1] + pattern[1];
  
  if (nextY < 0 || nextY > maxY || nextX < 0 || nextX > maxX) {
    // no more moves available in this pattern
    good = false;
    return good;
  }
  
  let nextVal = input[nextY][nextX];
  cArr.push([nextX, nextY]);

  if (nextVal === '#') {
    vArr.push([nextX, nextY]);
    good = true;
    return good;
  }
  return good;
}


// loop through the array to find all locations of asteroids
for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    let curr = input[y][x];
    if (curr === '#') {
      knownLocations.push([x, y]);
    }
  }
}

knownLocations.forEach(spot => {
  vision(spot[0], spot[1]);
})

console.log(`${mostLocation} can see ${mostSeen} asteroids`)
