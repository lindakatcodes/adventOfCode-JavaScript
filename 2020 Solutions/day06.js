import { createRequire } from 'module';
import * as h from '../helpers.js';

const require = createRequire(import.meta.url);
const fs = require('fs');

const data = fs.readFileSync('./2020 Solutions/inputs/day06input.txt').toString();

const parsedData = h.strInput(data);
const groups = [];
let answers = [];
let people = 0;
parsedData.forEach((res) => {
  if (res !== '') {
    answers.push(...res);
    people++;
  } else {
    groups.push({ answers, people });
    answers = [];
    people = 0;
  }
});
groups.push({ answers, people });

let yes = 0;
const responses = [];

// part 1
for (let i = 0; i < groups.length; i++) {
  const group = groups[i].answers;
  const counts = group.reduce((allQs, oneQ) => {
    if (oneQ in allQs) {
      allQs[oneQ]++;
    } else {
      allQs[oneQ] = 1;
    }
    return allQs;
  }, {});
  responses.push(counts);
}
responses.forEach((response) => {
  yes += Object.keys(response).length;
});

console.log(yes);

yes = 0;

// part 2
for (let i = 0; i < groups.length; i++) {
  const peeps = groups[i].people;
  let allcounts = 0;
  const counts = Object.values(responses[i]);
  counts.forEach((count) => {
    if (count === peeps) {
      allcounts++;
    }
  });
  yes += allcounts;
}

console.log(yes);
