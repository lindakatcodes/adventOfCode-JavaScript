const data = [20, 0, 1, 11, 6, 3];

// const data = [0, 3, 6];
// const data = [1, 3, 2];
// const data = [2, 1, 3];
// const data = [ 1,2,3,]
// const data = [ 2,3,1,]
// const data = [ 3,2,1,]
// const data = [ 3,1,2,]

const spokenNums = new Map();
// part 1
// const goalNum = 2020;
// part 2
const goalNum = 30000000;

data.forEach((num, idx) => {
  const newVal = {
    val: num,
    lastTurn: idx + 1,
    prevTurn: idx + 1,
    timesSpoken: 1,
  };
  spokenNums.set(num, newVal);
});

// console.log(spokenNums);
let lastNum = data[data.length - 1];

for (let i = data.length + 1; i <= goalNum; i++) {
  const numData = spokenNums.get(lastNum);
  // console.log(numData);
  if (numData.timesSpoken === 1) {
    // only seen the number once, so increase timesSpoken, update the last time seen, and return 0
    numData.timesSpoken++;
    numData.lastTurn = i;
    spokenNums.set(lastNum, numData);
    lastNum = 0;
    // also check if we've seen this number before - if so, need to update that number's timesSpoken & lastTurn
    const nextNumData = spokenNums.get(lastNum);
    if (nextNumData) {
      nextNumData.timesSpoken++;
      nextNumData.lastTurn = i;
      spokenNums.set(lastNum, nextNumData);
    } else {
      // never seen this num, add it
      const newVal = {
        val: lastNum,
        lastTurn: i,
        prevTurn: i,
        timesSpoken: 1,
      };
      spokenNums.set(lastNum, newVal);
    }
  } else {
    // otherwise, get the difference from this time and last time seen, and return that as the next number
    const diff = numData.lastTurn - numData.prevTurn;
    numData.prevTurn = numData.lastTurn;
    numData.lastTurn = i;
    numData.timesSpoken++;
    spokenNums.set(lastNum, numData);
    lastNum = diff;
    // also check if we've seen this number before - if so, need to update that number's timesSpoken & lastTurn
    const nextNumData = spokenNums.get(lastNum);
    if (nextNumData) {
      nextNumData.timesSpoken++;
      nextNumData.lastTurn = i;
      spokenNums.set(lastNum, nextNumData);
    } else {
      // never seen this num, add it
      const newVal = {
        val: lastNum,
        lastTurn: i,
        prevTurn: i,
        timesSpoken: 1,
      };
      spokenNums.set(lastNum, newVal);
    }
  }
  // console.log(lastNum);
}

console.log(lastNum);
