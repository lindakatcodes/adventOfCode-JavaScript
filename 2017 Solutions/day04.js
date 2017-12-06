/*
--- Day 4: High-Entropy Passphrases ---

A new system policy has been put in place that requires all accounts to use a passphrase instead of simply a password. A passphrase consists of a series of words (lowercase letters) separated by spaces.

To ensure security, a valid passphrase must contain no duplicate words.

For example:

aa bb cc dd ee is valid.
aa bb cc dd aa is not valid - the word aa appears more than once.
aa bb cc dd aaa is valid - aa and aaa count as different words.
The system's full passphrase list is available as your puzzle input. How many passphrases are valid?

--- Part Two ---

For added security, yet another system policy has been put in place. Now, a valid passphrase must contain no two words that are anagrams of each other - that is, a passphrase is invalid if any word's letters can be rearranged to form any other word in the passphrase.

For example:

abcde fghij is a valid passphrase.
abcde xyz ecdab is not valid - the letters from the third word can be rearranged to form the first word.
a ab abc abd abf abj is a valid passphrase, because all letters need to be used when forming another word.
iiii oiii ooii oooi oooo is valid.
oiii ioii iioi iiio is not valid - any of these words can be rearranged to form any other word.
Under this new system policy, how many passphrases are valid?
*/

const fs = require('fs');

let valid = 0;

const data = fs.readFileSync('../2017 Solutions/inputs/day04Input.txt').toString();

const input = data.split('\r\n');

function part1() {
    for (let i = 0; i < input.length; i++) {
        const currentPass = input[i].split(' ');
        let counter = 0;

        for (let k = 0; k < currentPass.length; k++) {
            const ele = currentPass[k];
            let pos = currentPass.indexOf(ele);
            let num = 0;
            while (pos !== -1) {
                num++;
                pos = currentPass.indexOf(ele, pos + 1);
            }

            if (num > 1) {
                break;
            } else if (num === 1) {
                counter++;
            }
        }

        if (counter === currentPass.length) {
            valid++;
        }
    }
}

function part2() {
    for (let i = 0; i < input.length; i++) {
        const currentPass = input[i].split(' ');
        let counter = 0;

        for (let k = 0; k < currentPass.length; k++) {
            const ele = currentPass[k];
            let num = 0;

            const testing = currentPass.filter(word => word.length === ele.length);
            testing.splice(testing.indexOf(ele), 1);

            for (let j = 0; j < testing.length; j++) {
                const thisWord = testing[j];

                const a = thisWord.split('').sort().join('');
                const b = ele.split('').sort().join('');

                if (a === b) {
                    num++;
                    break;
                }
            }


            if (num > 0) {
                break;
            } else if (num === 0) {
                counter++;
            }
        }

        if (counter === currentPass.length) {
            valid++;
        }
    }
}

part1();
console.log(`${valid} valid inputs for part 1.`);

valid = 0;

part2();
console.log(`${valid} valid inputs for part 2.`);
