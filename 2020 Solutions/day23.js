/* eslint-disable max-classes-per-file */
import * as h from '../helpers.js';

// test input
// const cupLabels = '389125467';
// actual input
const cupLabels = '476138259';

const cupCircle = cupLabels.split('').map((val) => Number(val));

// part 1
const moves = 100;
const lowest = cupCircle.reduce((a, b) => Math.min(a, b));
const highest = cupCircle.reduce((a, b) => Math.max(a, b));

let currentCup = cupCircle[0];
const currentCircle = cupCircle;

function findDestCup(cup, notFree) {
  let tryNext = cup - 1 < lowest ? highest : cup - 1;
  let idealNext = 0;
  while (notFree.includes(tryNext)) {
    tryNext = tryNext - 1 < lowest ? highest : tryNext - 1;
  }
  idealNext = tryNext;
  return idealNext;
}

function playRound(cupArr) {
  // copy three cups to right of currentCup (% as needed), and make copy of what's left
  const currentCupIdx = cupArr.indexOf(currentCup);
  const pickedUp = [...cupArr.slice(currentCupIdx + 1, currentCupIdx + 4)];
  if (pickedUp.length < 3) {
    const stillNeeded = 3 - pickedUp.length;
    pickedUp.push(...cupArr.slice(0, stillNeeded));
  }
  // console.log(`picked up cups ${pickedUp}`);
  const cupsLeft = [...cupArr.filter((cup) => !pickedUp.includes(cup))];
  // console.log(cupsLeft);
  // find the cup that's 1 less than the currentCup (% between lowest value and highest value as needed) - cannot be in picked up cups
  const destCup = findDestCup(currentCup, pickedUp);
  const destCupIdx = cupsLeft.indexOf(destCup);
  // console.log(`dest cup is ${destCup}`);
  // once destination found, picked up cups get inserted after destination cup
  const newcupArr = [...cupsLeft.slice(0, destCupIdx + 1), ...pickedUp, ...cupsLeft.slice(destCupIdx + 1)];
  // console.log(newcupArr);
  // new currentCup becomes whatever cup is after the current cup in the new list
  const updatedCurrentCupIdx = newcupArr.indexOf(currentCup);
  currentCup = newcupArr[(updatedCurrentCupIdx + 1) % newcupArr.length];
  return newcupArr;
}

// part 1
// for (let i = 1; i <= moves; i++) {
//   const round = playRound(currentCircle);
//   currentCircle = round;
// }

// const oneIdx = currentCircle.indexOf(1);
// const finalOrder = [...currentCircle.slice(oneIdx + 1), ...currentCircle.slice(0, oneIdx)].join('');
// console.log(finalOrder);

// part 2
// for part 2 - making a linked list to store the order of the labels
class CupNode {
  constructor(label) {
    this.label = label;
    this.next = null;
  }
}

class LinkedList {
  constructor(head = null) {
    this.head = head;
  }
}

const movesTen = 10000000;
// const movesTen = 10;
const cupMap = new Map();
const fullList = new LinkedList();

// part 2 - need to increase size of cupCircle to 1 million, numbers starting after the highest number in the labels provided
for (let i = 0; i < 1000000; i++) {
  const newNode = new CupNode();
  if (i < cupCircle.length) {
    newNode.label = cupCircle[i];
    if (i === 0) {
      fullList.head = newNode;
    }
    newNode.next = cupCircle[i + 1] || highest + 1;
  } else {
    newNode.label = i + 1;
    newNode.next = i + 2;
  }
  if (i === 1000000 - 1) {
    newNode.next = cupCircle[0];
  }
  // console.log(newNode);
  cupMap.set(newNode.label, newNode);
}

let startLabel = fullList.head.label;

function findDestCup2(cup, notFree) {
  let tryNext = cup - 1 < lowest ? 1000000 : cup - 1;
  let idealNext = 0;
  while (notFree.includes(tryNext)) {
    tryNext = tryNext - 1 < lowest ? 1000000 : tryNext - 1;
  }
  idealNext = tryNext;
  return idealNext;
}

function playRound2() {
  // copy three cups to right of currentCup (% as needed)
  const thisCup = cupMap.get(startLabel);
  let nextCup = thisCup.next;
  const pickedUp = [];
  for (let i = 0; i < 3; i++) {
    const next = cupMap.get(nextCup);
    pickedUp.push(next.label);
    nextCup = next.next;
  }
  // console.log(pickedUp);
  // find the cup that's 1 less than the thisCup (% between lowest value and highest value as needed) - cannot be in picked up cups
  const destCup = findDestCup2(thisCup.label, pickedUp);
  // console.log(`dest cup is ${destCup}`);
  // once destination found, insert 3 picked up cups after dest cup and update pointers
  // get dest cup, store it's current next pointer, and change next to be the first picked up
  const destCupLabel = cupMap.get(destCup);
  const prevDestLink = destCupLabel.next;
  destCupLabel.next = pickedUp[0];
  // then grab the last picked up, store it's pointer, and change the pointer to be the dest cup's previous pointer
  const lastPickedCup = cupMap.get(pickedUp[pickedUp.length - 1]);
  const lastPickLink = lastPickedCup.next;
  lastPickedCup.next = prevDestLink;
  // last picked cup's prev point then goes to start pointer
  const prevStartCup = cupMap.get(startLabel);
  prevStartCup.next = lastPickLink;
  startLabel = lastPickLink;
  // console.log(cupMap);
}

for (let i = 0; i < movesTen; i++) {
  // console.log(`round ${i + 1}`);
  playRound2();
}

// part 2=
const afterOne1 = cupMap.get(1).next;
const afterOne2 = cupMap.get(afterOne1).next;
const twoAfterProduct = afterOne1 * afterOne2;
console.log(afterOne1, afterOne2);
console.log(twoAfterProduct);
