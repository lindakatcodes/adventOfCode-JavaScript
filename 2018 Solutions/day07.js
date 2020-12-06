import { createRequire } from 'module';
import * as h from '../helpers.js';

const require = createRequire(import.meta.url);
const fs = require('fs');

const data = fs.readFileSync('./2018 Solutions/inputs/day07input.txt').toString();

const instructions = h.strInput(data);

const steps = new Map();

// initial object setup
instructions.forEach((inst) => {
  const splitInst = inst.split(' ').filter((bit) => bit.length === 1);
  // first, make sure we don't already have this value in our steps - if so, need to just add new whenDone value
  if (steps.has(splitInst[0])) {
    const step = steps.get(splitInst[0]);
    step.whenDone.push(splitInst[1]);
    steps.set(splitInst[0], step);
  } else {
    // otherwise, we need to set up a new object for this step
    const newStep = {
      value: splitInst[0],
      reliesOn: [],
      whenDone: [splitInst[1]],
      completed: false,
    };
    steps.set(splitInst[0], newStep);
  }

  // then work on the second value - create object if it doesn't exist, otherwise update it's reliesOn to be the first value
  if (steps.has(splitInst[1])) {
    const steptwo = steps.get(splitInst[1]);
    steptwo.reliesOn.push(splitInst[0]);
    steps.set(splitInst[1], steptwo);
  } else {
    const newStepTwo = {
      value: splitInst[1],
      reliesOn: [splitInst[0]],
      whenDone: [],
      completed: false,
    };
    steps.set(splitInst[1], newStepTwo);
  }
});
// console.log(steps);

// set the starting value - the one that doesn't rely on anything
const findStart = steps.keys();
const start = [];

for (const key of findStart) {
  const thisStep = steps.get(key);
  if (thisStep.reliesOn.length === 0) {
    start.push(key);
  }
}
// in case start has multiple possibilities, sort them then add to queue
start.sort();

const order = [];
let queue = [...start];
const holds = [];

function readyToStart(stepVals) {
  // console.log(`checking ready state of ${key}`);
  const prereqs = stepVals.reliesOn;
  let completes = true;
  prereqs.forEach((step) => {
    if (!steps.get(step).completed) {
      completes = false;
    }
  });
  // console.log(`${key} is ${completes ? 'ready' : 'not ready'} to start`);
  return completes;
}

function addKey(key) {
  // can simply exit if key already in queue
  if (queue.includes(key)) return;
  // otherwise, find where it needs to go and add it
  const index = queue.findIndex((letter) => letter > key);
  // console.log(`index for ${key} is ${index}`);
  // if index is -1, letter goes last
  if (index === -1) {
    queue.push(key);
  } else if (index === 0) {
    queue.unshift(key);
  } else {
    queue = [...queue.slice(0, index), key, ...queue.slice(index)];
  }
}

// part 1
// starting from the first step:
// run the first step, and set up it's whenDone to be next in line
// when new values get added to the queue, alphabetize them, so they run in alphebetical order
// only run a value when all it's reliesOn needs are done
// keep track of order of the values run
function runSteps() {
  const currKey = queue.shift();
  // only run if order does not already include currKey
  if (!order.includes(currKey)) {
    const currStep = steps.get(currKey);
    // check if the currKey's reliesOn values are all completed
    const ready = readyToStart(currStep);
    if (ready) {
      const nextSteps = currStep.whenDone;
      nextSteps.forEach((step) => {
        addKey(step);
      });
      currStep.completed = true;
      // update steps map with new info
      steps.set(currKey, currStep);
      order.push(currKey);
    } else {
      // if it's not ready, add it to holds
      holds.push(currKey);
    }
  }
  if (queue.length > 0) {
    runSteps();
  } else if (holds.length > 0) {
    queue = holds;
    runSteps();
  }
  // if queue and hold are empty, will just stop running
}

// part 1
// runSteps();
// console.log(order.join(''));

// part 2
// 5 workers
// values take time to run
const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

class Worker {
  constructor(id) {
    this.id = id;
    this.busy = false;
    this.task = '';
    this.workedTime = 0;
    this.taskTime = 0;
  }

  assignTask(name) {
    this.task = name;
    this.busy = true;
    const timeNeeded = alpha.indexOf(name) + 1;
    this.taskTime = timeNeeded;
  }

  processTask(timePassed) {
    this.workedTime += timePassed;
    this.taskTime -= timePassed;
  }

  finishTask(name) {
    this.task = '';
    this.busy = false;
    return name;
  }
}

// const order = [];
// let queue = [...start];
// let holds = [];

const workers = [];
const TIMESTEP = 1;
const numWorkers = 2;
let maxTime = 0;

// populate workers group
for (let i = 1; i <= numWorkers; i++) {
  const worker = new Worker(i);
  workers.push(worker);
}

while (order.length !== steps.size) {
  // see which workers are free, and grab up to that many tasks from the queue
  const freeWorkers = workers.filter((worker) => !worker.busy);
  let getQueueTasks = queue.splice(0, freeWorkers.length);

  // first make sure all the queue tasks selected are ready to start
  const checkTasks = getQueueTasks.map((task) => {
    // make sure the task is ready to start, and not already in order
    if (!order.includes(task)) {
      const currStep = steps.get(task);
      const ready = readyToStart(currStep);
      if (ready) {
        return task;
      }
    }
    holds.push(task);
    return '';
  });

  getQueueTasks = checkTasks.filter((val) => val !== '');

  // assign the queue tasks to the appropriate workers
  getQueueTasks.forEach((task, idx) => {
    freeWorkers[idx].assignTask(task);
  });

  // get the workers currently working on projects, and advance them all one timestep
  const busyWorkers = workers.filter((worker) => worker.busy);
  busyWorkers.forEach((worker) => {
    worker.processTask(TIMESTEP);
    if (worker.taskTime === 0) {
      const finishedTask = worker.finishTask(worker.task);
      const currStep = steps.get(finishedTask);
      const nextSteps = currStep.whenDone;
      nextSteps.forEach((step) => {
        addKey(step);
      });
      currStep.completed = true;
      steps.set(finishedTask, currStep);
      order.push(finishedTask);
    }
  });

  // check queue & holds lengths
  if (queue.length === 0 && holds.length > 0) {
    queue = holds;
    holds.forEach(() => holds.shift());
  }
  maxTime++;
  console.log(maxTime);
  console.log(workers);
  console.log(order);
}

console.log(maxTime);
console.log(workers);
console.log(order);

// 1058 is too big; 1036 is too low
