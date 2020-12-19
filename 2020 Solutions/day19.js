import { createRequire } from 'module';
import * as h from '../helpers.js';

const require = createRequire(import.meta.url);
const fs = require('fs');

const data = fs.readFileSync('./2020 Solutions/inputs/day19input.txt').toString();

const parsedData = h.strInput(data);

const rules = new Map();
const messages = [];
const knownRules = [];

parsedData.forEach((line) => {
  if (line.includes(':')) {
    const split = line.split(': ');
    const ruleNum = split[0];
    const rule = split[1];
    const ruleObj = {
      name: ruleNum,
      values: '',
    };
    if (rule.includes('"')) {
      ruleObj.subRule = rule.slice(1, 2);
      ruleObj.values = ruleObj.subRule;
      knownRules.push(ruleNum);
    } else if (rule.includes('|')) {
      const ruleBits = rule.split(' | ');
      ruleObj.subRule = [ruleBits[0].split(' '), ruleBits[1].split(' ')];
    } else {
      ruleObj.subRule = rule.split(' ');
    }

    rules.set(ruleNum, ruleObj);
  } else if (line !== '') {
    messages.push(line);
  }
});

// console.log(rules);

function iterations(strArr) {
  // console.log(strArr);
  // use mixed to see if types of values don't match - rest of code won't work if they don't
  const mixed = strArr.map((val) => typeof val);
  if (!mixed.includes('string')) {
    // TODO: handle case for 0, where strings and arrays are mixed
  }
  // see if we have nested arrays (piped value mixes)
  const isOr = strArr.every((val) => val.every((bit) => Array.isArray(bit)));
  const pairs = strArr.map((pair) => {
    if (!isOr) {
      // likely a direct call, can just join the two letters
      return pair.join('');
    }
    // otherwise we've got an or option, so need to generate our options
    const options = strArr.map((pairArr) => {
      const iters = [];
      for (let i = 0; i < pairArr.length; i++) {
        const optionStr = `${pairArr[i][i]}`;
        const otherSetIdx = i === 0 ? 1 : 0;
        pairArr[otherSetIdx].forEach((otherPair) => {
          const fullOption = `${optionStr}${otherPair}`;
          iters.push(fullOption);
        });
      }
      return iters;
    });
    return options;
  });
  // flatten all options into a single array
  return pairs.flat(2);
}

// part 1 - determine which messages completely match rule 0
// since we already know the 2 values that hold a and b, start counter at 2
let valuesDecided = 2;

while (valuesDecided !== rules.size) {
  for (const [key, value] of rules.entries()) {
    // skip over the rules we already have values for
    if (knownRules.includes(key)) break;
    const rulestoFollow = value.subRule;
    const isOr = Array.isArray(rulestoFollow[0]);
    let subStrings = [];
    let isComplete = false;
    if (!isOr) {
      // do we already know the value it needs? if so, set it
      subStrings = rulestoFollow.map((rule) => {
        const isKnown = knownRules.includes(rule);
        if (isKnown) {
          const knownRule = rules.get(rule).values;
          return knownRule;
        }
        return false;
      });
      isComplete = !subStrings.includes(false);
    } else {
      subStrings = rulestoFollow.map((pair) => {
        const pairStrings = pair.map((rule) => {
          const isKnown = knownRules.includes(rule);
          if (isKnown) {
            const knownRule = rules.get(rule).values;
            return knownRule;
          }
          return false;
        });
        isComplete = ![...pairStrings].includes(false);
        return pairStrings;
      });
    }
    // console.log(subStrings);
    if (isComplete) {
      value.values = iterations(subStrings);
      rules.set(key, value);
      valuesDecided++;
      knownRules.push(key);
    }
  }
} // end of while

console.log(rules);
// console.log(valuesDecided);
