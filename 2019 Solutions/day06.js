const fs = require('fs');

const data = fs.readFileSync('../2019 Solutions/inputs/day06input.txt').toString();

const input = data.split('\r\n').sort();

// move COM to front of the input, so it'll be the root node
let comindex;
for (let x = 0; x < input.length; x++) {
  let re = /COM\)[\w]{1,3}/;
  if (re.test(input[x])) {
    comindex = x;
    break;
  }
}
let com = input.splice(comindex, 1);
input.unshift(...com);

let seenNodes = [];

// makes each object/planet it's own node
function Node(name) {
  this.name = name;
  this.orbiters = [];
  this.orbits = null;
  this.COMdist = 0;
  this.visited = false;
  this.SANdist = 0;
}

// goes through the input and creates nodes and orbiter arrays for each planet
for (let i = 0; i < input.length; i++) {
  const obj = input[i].slice(0, input[i].indexOf(')'));
  const orbiter = input[i].slice(input[i].indexOf(')') + 1);

  let objIdx = seenNodes.findIndex(planet => planet.name === obj);
  let orbitIdx = seenNodes.findIndex(planet => planet.name === orbiter);
  
  // check the obj first - if it's been seen already, just add orbiter to list, otherwise make new node
  if (objIdx > 0) {
    seenNodes[objIdx].orbiters.push(orbiter);
  } else {
    let newObj = new Node(obj);
    newObj.orbiters.push(orbiter);
    seenNodes.push(newObj);
  }

  // then make sure orbiter is also a node in the seen list, and if it doesn't already have a parent listed, add that
  if (orbitIdx < 0) {
    let newOrbiter = new Node(orbiter);
    newOrbiter.orbits = obj;
    seenNodes.push(newOrbiter);
  } else {
    if (!seenNodes[orbitIdx].orbits) {
      seenNodes[orbitIdx].orbits = obj;
    }
  }
}

let allDist = 0;

function findDistance(name, initIndex) {
  let start = seenNodes.findIndex(planet => planet.name === name);
  if (start === 0) {
    seenNodes[start].COMdist = start;
    return seenNodes[start].COMdist;
  }
  if (seenNodes[start].orbits === 'COM') {
    seenNodes[initIndex].COMdist += 1;
    return seenNodes[start].COMdist;
  } else {
    seenNodes[initIndex].COMdist += 1;
    let next = seenNodes.find(planet => planet.name === seenNodes[start].orbits);
    findDistance(next.name, initIndex);
  }
}

// function to perform breadth first search to calculate distances from COM
function BFS(rootNode) {
  let queue = [];
  queue.push(rootNode);

  while (queue.length > 0) {
    let current = queue[0];
    let currOrbits = current.orbiters;

    for (let p = 0; p < currOrbits.length; p++) {
      let qObj = seenNodes.find(planet => planet.name === currOrbits[p]);
      queue.push(qObj);
    }

    let currIndex = seenNodes.findIndex(planet => planet.name === current.name);
    findDistance(current.name, currIndex);
    allDist += seenNodes[currIndex].COMdist;

    queue.shift();
  }
}

// part 1 - total number of orbits in the map
BFS(seenNodes[0]);

// console.log(seenNodes);
console.log(`Total number of orbits: ${allDist}`);

// for part 2 - routes between YOU and SAN
// everything keeps breaking, only result I ever got was too high



// let YOUI = seenNodes.findIndex(obj => obj.name === 'YOU');
// let SANI = seenNodes.findIndex(obj => obj.name === 'SAN');
// let startTransfer = seenNodes.find(obj => obj.name === seenNodes[SANI].orbits);
// let endTransfer = seenNodes.find(obj => obj.name === seenNodes[YOUI].orbits);
// let routeCounter = 0;
// let route = [];
// let queue = [];
// let found = false;

// function SFS(startNode) {
//   // start at root node (I), mark it visited
//   startNode.visited = true;
//   // while here, increase counter by 1 and add node to the route tracker
//   routeCounter++;
//   route.push(startNode);

//   if (startNode.name === endTransfer.name) {
//     // once we find the node K, console counter and stop checking nodes
//     found = true;
//     console.log(`route to YOU took ${routeCounter} steps`);
//     return; 
//   }

//   let checkOrbs = startNode.orbiters;

//   // does I have other orbiters besides san? if so, start here
//   if (checkOrbs.length >= 1 && !checkOrbs.includes('SAN')) {
//     if (checkOrbs.length === 1) {
//       let newNode = seenNodes.find(obj => obj.name === startNode.orbits);
//       if (!newNode.visited) {
//         queue.push(newNode);
//       }
//       routeCounter--;
//       route.pop();
//     }
//     // add new orbiters to a list, then go to those to see if they connect to YOU
//     checkOrbs.forEach(node => {
//       let nextNode = seenNodes.find(obj => obj.name === node);
//       if (!nextNode.visited) {
//         queue.push(nextNode);
//       }
//     })
//   } else {
//     let newNode = seenNodes.find(obj => obj.name === startNode.orbits);
//     if (!newNode.visited) {
//       queue.push(newNode);
//     }
//     routeCounter--;
//     route.pop();
//   }
//   queue.shift();
//   SFS(queue[0]);
// }

// queue.push(startTransfer);
// SFS(startTransfer);



// // let steps = 0;
// let leastSteps;

// function findDistance2(name, initIndex) {
//   let start = seenNodes.findIndex(planet => planet.name === name);
//   if (seenNodes[start].orbiters.includes('YOU')) {
//     return seenNodes[initIndex].SANdist;
//   } else if (seenNodes[start].orbiters.includes('SAN')) {
//     seenNodes[initIndex].SANdist += 1;
//     return seenNodes[initIndex].SANdist;
//   } else {
//     seenNodes[initIndex].SANdist += 1;
//     seenNodes[start].visited = true;
//     let next = seenNodes.find(planet => planet.name === seenNodes[start].orbits);
//     findDistance2(next.name, initIndex);
//   }
// }

// function BFS2(rootNode) {
//   let queue = [];
//   queue.push(rootNode);

//   while (queue.length > 0) {
//     let current = queue[0];
//     let currOrbits = current.orbiters;
//     if (current.orbits) {
//       currOrbits.push(current.orbits);
//     }

//     for (let p = 0; p < currOrbits.length; p++) {
//       let query = seenNodes.find(planet => planet.name === currOrbits[p]);
//       if (query.name !== 'YOU' && query.name !== 'SAN' && !query.visited) {
//         if (query.orbits && query.orbiters.length > 0) {
//           queue.push(query);
//         }
//       }
//     }

//     let currIndex = seenNodes.findIndex(planet => planet.name === current.name);
//     let results = findDistance2(current.name, currIndex);
//     if (results < leastSteps) {
//       leastSteps = results;
//     }

//     queue.shift();
//   }
// }

// BFS2(startTransfer);
// console.log(`result: ${leastSteps}`);

// function modifiedSearch(startNode) {
//   // mark current node visited, so if it pops into other lists it won't duplicate
//   startNode.visited = true;
//   seenNodes.find(obj => obj.name === startNode.name).visited = true;
//   steps++;

//   // is this node the one I want? mark found santa and check if it's the shortest path so far
//   if (startNode.name === endTransfer.name) {
//     steps--;
//     if (!leastSteps || steps < leastSteps) {
//       leastSteps = steps;
//     }
//     return;
//   }

//   // if not, call search again on the first item in the list to check
//   let toCheck = [];
//   let orbits = startNode.orbiters;
//   if (startNode.orbits) {
//     orbits.push(startNode.orbits);
//   }

//   for (let p = 0; p < orbits.length; p++) {
//     let qObj = seenNodes.find(planet => planet.name === orbits[p]);
//     if (!qObj.visited && qObj.name !== 'YOU' && qObj.name !== 'SAN') {
//       toCheck.push(qObj);
//     }
//   }

//   if (toCheck.length === 0) {
//     steps--;
//   }

//   toCheck.forEach(item => {
//     modifiedSearch(item);
//   })
// }

// modifiedSearch(startTransfer);
// console.log(`steps to santa: ${leastSteps}`);

// let countVisits = seenNodes.filter(ele => ele.visited);
// console.log(`Number of visited nodes: ${countVisits.length}`);