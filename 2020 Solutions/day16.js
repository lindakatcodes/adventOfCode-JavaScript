import { createRequire } from 'module';
import * as h from '../helpers.js';

const require = createRequire(import.meta.url);
const fs = require('fs');

const data = fs.readFileSync('./2020 Solutions/inputs/day16input.txt').toString();

const parsedData = h.strInput(data);

const firstSpace = parsedData.indexOf('');
const lastSpace = parsedData.lastIndexOf('');

const rules = parsedData.slice(0, firstSpace);
const myTicket = parsedData.slice(firstSpace + 2, lastSpace);
const otherTickets = parsedData.slice(lastSpace + 2);

// get valid ticket ranges
const validRanges = [];
const validRules = new Map();

rules.forEach((rule) => {
  const ruleSplit = rule.split(': ');
  const rangeSplit = ruleSplit[1].split(' or ');
  const rangeEdges = rangeSplit.map((range) => range.split('-'));

  const ruleObj = {
    name: ruleSplit[0],
    orderOnTicket: null,
  };

  rangeEdges.forEach((edge, idx) => {
    const tempHolder = [];

    for (let i = Number(edge[0]); i <= Number(edge[1]); i++) {
      tempHolder.push(Number(i));
    }
    validRanges.push(tempHolder);
    ruleObj[`range${idx + 1}`] = tempHolder;
  });

  validRules.set(ruleSplit[0], ruleObj);
});

// console.log(validRanges);
// console.log(validRules);

// for other tickets, find which values are not valid for any possible range (rule doesn't matter)
const invalidVals = [];
const validTickets = [];

otherTickets.forEach((ticket) => {
  const ticketNums = ticket.split(',').map((val) => Number(val));
  const validTicket = ticketNums.map((val) => {
    let isValid = false;
    validRanges.forEach((range) => {
      if (range.includes(val)) {
        isValid = true;
      }
    });
    if (!isValid) {
      invalidVals.push(val);
      return false;
    }
    return true;
  });
  if (validTicket.includes(false)) {
    return false;
  }
  validTickets.push(ticket);
  return true;
});

// part 1 - get error rate by adding all invalid vals together
const errorRate = invalidVals.reduce((a, b) => a + b);
console.log(errorRate);

// part 2
const rangesJoined = [];
const ruleOrder = [];
// get full ranges to loop over, and the order of the rules to index by later
validRules.forEach((value) => {
  const fullRange = [...value.range1, ...value.range2];
  rangesJoined.push(fullRange);
  ruleOrder.push(value.name);
});

// combine each of the ticket values in each position
const ticketValsByIndex = h.lenArray(validTickets.length).map(spot => []);
validTickets.forEach((ticket) => {
  ticket.split(',').forEach((val, idx) => {
    const num = Number(val);
    ticketValsByIndex[idx].push(num);
  });
});

// for each ticket index, figure out which ranges each value given can be in
const ticketRanges = ticketValsByIndex.map((ticketGroup) => {
  const groupRanges = ticketGroup.map((val) => {
    const possibleRanges = rangesJoined.map((range, idx) => {
      if (range.includes(val)) {
        return idx;
      }
      return null;
    });
    return possibleRanges;
  });
  const shallow = [];
  groupRanges.forEach((range) => shallow.push(...range));
  const rangeCount = h.counts(shallow);
  return rangeCount;
});

// using the ticketRanges, find what possible ranges are valid for every number in the ticket group
const matchedRules = ticketRanges.map((rangeSet) => {
  const possibleCounts = Object.entries(rangeSet).filter((count) => count[1] === validTickets.length);
  return possibleCounts;
});

// loop over the ticket groups recursively - when there's only one rule possible, set it's index; otherwise, clear out any we know it can't be and run again until everything has been set
function findRuleOrder(ruleArr) {
  const afterCheck = ruleArr.map((set, index) => {
    if (set.length === 1) {
      // only one set possible here, so that must be it - mark that index in the rule list as this item's index
      const ruleToGet = ruleOrder[Number(set[0][0])];
      const thisRule = validRules.get(ruleToGet);
      thisRule.orderOnTicket = index;
      validRules.set(ruleToGet, thisRule);
      return [];
    }
    // narrow down choices by eliminating ones already marked with an order
    const stillPossible = set.filter((pair) => {
      const ruleToGet = ruleOrder[Number(pair[0])];
      const thisRule = validRules.get(ruleToGet);
      return thisRule.orderOnTicket === null ? pair : null;
    });
    return stillPossible;
  });
  const stillToCheck = afterCheck.map((pos) => pos.length > 0);
  if (stillToCheck.includes(true)) {
    findRuleOrder(afterCheck);
  }
}

findRuleOrder(matchedRules);

// find the six departure fields - then on my ticket, multiply those 6 numbers together
const departRules = ruleOrder.filter((rule) => rule.includes('departure'));

const departIndexes = departRules.map((rule) => {
  const mappedRule = validRules.get(rule);
  return mappedRule.orderOnTicket;
});

const myTicketSplit = myTicket[0].split(',').map((val) => Number(val));
const departValues = departIndexes.map((idx) => myTicketSplit[idx]);

const product = departValues.reduce((a, b) => a * b);
console.log(product);
