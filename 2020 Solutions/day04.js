import { createRequire } from 'module';
import * as h from '../helpers.js';

const require = createRequire(import.meta.url);
const fs = require('fs');

const data = fs.readFileSync('./2020 Solutions/inputs/day04input.txt').toString();
const parsedData = h.strInput(data);

// split the passports into objects and values
const passports = [];
let currPass = {};
parsedData.forEach((str) => {
  if (str === '') {
    passports.push(currPass);
    currPass = {};
  } else {
    const strsplit = str.split(' ');
    strsplit.forEach((bit) => {
      const pair = bit.split(':');
      currPass[pair[0]] = pair[1];
    });
  }
});
passports.push(currPass);

// console.log(passports);

let valid = 0;
const eyecolors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
// validation rules
// byr (Birth Year) - four digits; at least 1920 and at most 2002.
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
// hgt (Height) - a number followed by either cm or in:
//     If cm, the number must be at least 150 and at most 193.
//     If in, the number must be at least 59 and at most 76.
// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
// pid (Passport ID) - a nine-digit number, including leading zeroes.
// cid (Country ID) - ignored, missing or not.

// part 1
passports.forEach((passport) => {
  const keys = Object.keys(passport);
  if (keys.length === 8) {
    valid++;
  } else {
    const allButCid = keys.includes('cid');
    if (!allButCid && keys.length === 7) {
      valid++;
    }
  }
});

// reset and part 2
valid = 0;
passports.forEach((passport, ind) => {
  const keys = Object.keys(passport);
  if (keys.length >= 7) {
    const birth = passport.byr && parseInt(passport.byr, 10) >= 1920 && parseInt(passport.byr, 10) <= 2002;
    const issue = passport.iyr && parseInt(passport.iyr, 10) >= 2010 && parseInt(passport.iyr, 10) <= 2020;
    const exp = passport.eyr && parseInt(passport.eyr, 10) >= 2020 && parseInt(passport.eyr, 10) <= 2030;
    const passId = passport.pid && passport.pid.length === 9;
    const eye = passport.ecl && eyecolors.includes(passport.ecl);
    let height;
    let hair;
    const hval = passport.hgt;
    if (hval) {
      if (hval.includes('cm')) {
        const hnum = passport.hgt.split('c', 1);
        if (parseInt(hnum, 10) >= 150 && parseInt(hnum, 10) <= 193) {
          height = true;
        }
      } else if (hval.includes('in')) {
        const hnum = passport.hgt.split('i', 1);
        if (parseInt(hnum, 10) >= 59 && parseInt(hnum, 10) <= 76) {
          height = true;
        }
      } else {
        height = false;
      }
    }
    const hcolor = passport.hcl;
    if (hcolor) {
      if (hcolor.length !== 7) {
        hair = false;
        return;
      }
      if (hcolor[0] !== '#') {
        hair = false;
        return;
      }
      const reg = /([a-f0-9])/;
      const hex = hcolor.slice(1);
      if (hex.match(reg)) {
        hair = true;
      } else {
        hair = false;
      }
    }
    const passed = birth && issue && exp && passId && eye && height && hair;
    // console.log(birth, issue, exp, passId, eye, height, hair);
    if (passed) {
      valid++;
      // console.log(`${ind} passed`);
    }
  }
});
console.log(valid);
