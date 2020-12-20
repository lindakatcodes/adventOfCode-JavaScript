// Today's solution is all due to Maxim in the Party Corgi Discord - another day I just could NOT get to work. This is basically exactly his solution with just the initial data pull changed, and my own comments added to help explain why it works to myself. You can find his solution here: https://github.com/Maximization/adventofcode2020/blob/main/day19/index.js

import { createRequire } from 'module';
import * as h from '../helpers.js';

const require = createRequire(import.meta.url);
const fs = require('fs');

const data = fs.readFileSync('./2020 Solutions/inputs/day19input.txt').toString();

const [unparsedRules, unparsedMessages] = data.split('\r\n\r\n');

const parsedRules = unparsedRules.split('\r\n').map((rule) => rule.split(': '));
const messages = unparsedMessages.split('\r\n');

function evaluateRules(parsedRules) {
  const rules = {};
  const rulesToEvaluate = [...parsedRules];

  while (rulesToEvaluate.length) {
    for (const [index, [ruleId, ruleSpec]] of rulesToEvaluate.entries()) {
      // gets every ruleId mentioned in the spec - each pass through will remove a number if it's already been replaced with a letter
      const subRuleIds = ruleSpec.match(/(\d)+/g);

      if (!subRuleIds) {
        // if rule doesn't have any numbers, we strip out any extra quotes and spaces, add to the rule object, and remove from array to check
        rules[ruleId] = ruleSpec.replaceAll('"', '').replaceAll(' ', '');
        rulesToEvaluate.splice(index, 1);
      } else {
        for (const subRuleId of subRuleIds) {
          // check if we've added this rule to the rule object yet
          const subRuleSpec = rules[subRuleId];
          // if so, we can substitute it
          if (subRuleSpec) {
            // if pipe, replacement is the value in (); otherwise the straight value
            const replacement = subRuleSpec.includes('|') ? `(${subRuleSpec})` : subRuleSpec;
            // find the location of the current spec in the array to evaluate, and replace the current ruleId with the new replacement
            rulesToEvaluate[index][1] = ruleSpec.replace(new RegExp(`\\b${subRuleId}\\b`), replacement);
          }
        }
      }
    }
  }

  return rules;
}

/* Part 1 */
(() => {
  // figure out the possible values for each rule - effectively gives a regex to check against
  const rules = evaluateRules(parsedRules);
  const matchedMessages = messages.filter((message) => new RegExp(`^${rules[0]}$`).test(message));
  console.log('Answer part 1:', matchedMessages.length);
})();

/* Part 2 */
(() => {
  const rules = evaluateRules(parsedRules);

  // since the two new rules use recursion on themselves, this could go on infinitely. So we run it once, update the rules, and run it again, and keep doing that until the two numbers match (any runs after that won't change the result we get)
  let noOfMatchedMessages;
  let newNoOfMatchedMessages;
  do {
    noOfMatchedMessages = messages.filter((message) => new RegExp(`^${rules[0]}$`).test(message)).length;

    rules[8] = `(${rules[42]})|(${rules[42]})(${rules[8]})`;
    rules[11] = `(${rules[42]})(${rules[31]})|(${rules[42]})(${rules[11]})(${rules[31]})`;
    rules[0] = `(${rules[8]})(${rules[11]})`;

    newNoOfMatchedMessages = messages.filter((message) => new RegExp(`^${rules[0]}$`).test(message)).length;
  } while (noOfMatchedMessages !== newNoOfMatchedMessages);

  console.log('Answer part 2:', noOfMatchedMessages);
})();
