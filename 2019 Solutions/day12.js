const data = [
  [12, 0, -15],
  [-8, -5, -10],
  [7, -17, 1],
  [2, -11, -6],
];

const positions = [...data];
const change = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]

function gravity(curr, i) {
  let vel = change[i];

  positions.forEach((moon, ind) => {
    if (ind !== i) {
      for (let g = 0; g < moon.length; g++) {
        if (curr[g] < moon[g]) {
          vel[g] = vel[g] + 1;
        } else if (curr[g] > moon[g]) {
          vel[g] = vel[g] - 1;
        }
      }
    }
  })

  change[i] = vel;
}

function velocity(i) {
  let currPos = positions[i];
  let currVel = change[i];

  for (let a = 0; a < currPos.length; a++) {
    positions[i][a] = currPos[a] + currVel[a];
  }
}

let goalSteps = 1000;

// calculate the gravity and velocity for each step
for (let i = 0; i < goalSteps; i++) {
  // console.log(`Step ${i+1}:`)
  positions.forEach((moon, ind) => {
    gravity(moon, ind);
  })
  positions.forEach((moon, ind) => {
    velocity(ind);
  })
  // console.log(`pos=<${positions[0]}>, vel=<${change[0]}>`);
  // console.log(`pos=<${positions[1]}>, vel=<${change[1]}>`);
  // console.log(`pos=<${positions[2]}>, vel=<${change[2]}>`);
  // console.log(`pos=<${positions[3]}>, vel=<${change[3]}>`);
}

// calculate total energy
function totalEnergy(pos, vel) {
  let potential = Math.abs(pos[0]) + Math.abs(pos[1]) + Math.abs(pos[2]);
  let kinetic = Math.abs(vel[0]) + Math.abs(vel[1]) + Math.abs(vel[2]);
  return potential * kinetic;
}

let sumEnergy = 0;

for (let m = 0; m < positions.length; m++) {
  let mPos = positions[m];
  let mVel = change[m];
  let mTotal = totalEnergy(mPos, mVel);
  // console.log(`moon ${m}'s total energy is ${mTotal}`);
  sumEnergy += mTotal;
}

console.log(`Total energy after ${goalSteps}: ${sumEnergy}`);