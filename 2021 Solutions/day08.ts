import * as h from "../helpers";

const data: string = await h.readData("./2021Inputs/day08input.txt");
const allData: string[] = h.strInput(data);

interface Positions {
  [index: number]: string[];
  1: string[];
  2: string[];
  3: string[];
  4: string[];
  5: string[];
  6: string[];
  7: string[];
}

const segments: Map<number, number[]> = new Map();
segments.set(0, [1, 2, 3, 5, 6, 7]);
segments.set(1, [3, 6]);
segments.set(2, [1, 3, 4, 5, 7]);
segments.set(3, [1, 3, 4, 6, 7]);
segments.set(4, [2, 3, 4, 6]);
segments.set(5, [1, 2, 4, 6, 7]);
segments.set(6, [1, 2, 4, 5, 6, 7]);
segments.set(7, [1, 3, 6]);
segments.set(8, [1, 2, 3, 4, 5, 6, 7]);
segments.set(9, [1, 2, 3, 4, 6, 7]);

const numberLengths: Map<number, number> = new Map();
numberLengths.set(0, 6);
numberLengths.set(1, 2);
numberLengths.set(2, 5);
numberLengths.set(3, 5);
numberLengths.set(4, 4);
numberLengths.set(5, 5);
numberLengths.set(6, 6);
numberLengths.set(7, 3);
numberLengths.set(8, 7);
numberLengths.set(9, 6);

let uniqueCount: number = 0;

allData.forEach((entry: string) => {
  const [patterns, output] = entry.split(" | ").map((entry) => entry.trim());
  const uniqueLengths = [
    numberLengths.get(1),
    numberLengths.get(4),
    numberLengths.get(7),
    numberLengths.get(8),
  ];
  output.split(" ").forEach((digit: string) => {
    if (uniqueLengths.includes(digit.length)) {
      uniqueCount++;
    }
  });
});

console.log(`Part 1: unique values ${uniqueCount}`);

const outputEntries: string[] = [];

allData.forEach((entry: string) => {
  const [patterns, output] = entry.split(" | ").map((entry) => entry.trim());
  const allPatterns: string[] = patterns.split(" ");
  const outputValues: string[] = output.split(" ");

  const entryPositions: Positions = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
  };

  // first, figure out which values in the unique patterns map to which positions, and get those placed
  const uniqueLengths = [
    numberLengths.get(1) as number,
    numberLengths.get(4) as number,
    numberLengths.get(7) as number,
    numberLengths.get(8) as number,
  ];

  const uniquePatterns = allPatterns
    .map((pattern: string) => {
      return uniqueLengths.includes(pattern.length) ? pattern : null;
    })
    .filter((vals) => vals !== null) as unknown as string[];
  uniquePatterns.sort((a, b) => a.length - b.length);

  uniquePatterns.forEach((pattern: string) => {
    if (pattern.length === 2) {
      entryPositions[3].push(pattern[0], pattern[1]);
      entryPositions[6].push(pattern[0], pattern[1]);
    } else if (pattern.length === 3) {
      const knownLetters = entryPositions[3];
      const letterLeft = pattern
        .split("")
        .find((letter) => !knownLetters.includes(letter)) as string;
      entryPositions[1].push(letterLeft);
    } else if (pattern.length === 4) {
      const knownLetters = entryPositions[3];
      const lettersLeft = pattern
        .split("")
        .map((letter) => {
          return knownLetters.includes(letter) ? null : letter;
        })
        .filter((val) => val !== null) as string[];
      entryPositions[2].push(lettersLeft[0], lettersLeft[1]);
      entryPositions[4].push(lettersLeft[0], lettersLeft[1]);
    } else {
      const knownLetters = [
        ...entryPositions[3],
        ...entryPositions[1],
        ...entryPositions[2],
      ];
      const lettersLeft = pattern
        .split("")
        .map((letter) => {
          return knownLetters.includes(letter) ? null : letter;
        })
        .filter((val) => val !== null) as string[];
      entryPositions[5].push(lettersLeft[0], lettersLeft[1]);
      entryPositions[7].push(lettersLeft[0], lettersLeft[1]);
    }
  });

  // then we can go through the 5 length patterns to set the values we know
  const fiveLengthPatterns = allPatterns.filter(
    (pattern) => pattern.length === 5
  ) as string[];
  const valsKnownFrom5: Map<number, string> = new Map();

  // if 5number has 2 & 4 - must be 5 and can set exact values
  // if 5number has 3 & 6 - must be 3 and can set exact values
  // if 5number has 5 & 7 - must be 2 and can set exact values
  fiveLengthPatterns.forEach((pattern: string) => {
    // need to find which positions it contains
    const splitPattern = pattern.split("");
    const potentialPositions = splitPattern.map((letter) => {
      const entryVals = Object.keys(entryPositions).filter((entry) =>
        entryPositions[+entry].includes(letter)
      );
      return entryVals;
    });
    // then need to look for the matched pair
    let matchedPair: number[] = [];
    potentialPositions.forEach((posArr, index) => {
      const duplicateFound = potentialPositions.find(
        (pair, ind) => index !== ind && pair[0] === posArr[0]
      );
      if (duplicateFound) {
        matchedPair = [+posArr[0], +posArr[1]];
      }
    });
    // now that we know which pair we've found, save the letters & positions we can now decipher to adjust after the loop (so we don't mess up the matching for future strings until we're ready)
    const knownLetters = [
      ...entryPositions[1],
      ...entryPositions[matchedPair[0]],
    ];
    const lettersLeft = splitPattern.filter(
      (val) => !knownLetters.includes(val)
    );
    lettersLeft.map((letter, index) => {
      // need to know: position in pattern, position in potentialPositions, and segment numbers
      const letterIndex = splitPattern.findIndex((val) => val === letter);
      const positions = potentialPositions[letterIndex];

      if (matchedPair.includes(2)) {
        // this is 5, which has positions 6 & 7
        if (positions.includes("7")) {
          // we can set 7 to the current letter and remove that letter from 5
          valsKnownFrom5.set(7, letter);
          const letterToRemove = entryPositions[7].find(
            (val) => val !== letter
          ) as string;
          valsKnownFrom5.set(5, letterToRemove);
        }
        if (positions.includes("6")) {
          // we can set 6 to current letter and remove it from 3
          valsKnownFrom5.set(6, letter);
          const letterToRemove = entryPositions[6].find(
            (val) => val !== letter
          ) as string;
          valsKnownFrom5.set(3, letterToRemove);
        }
      }
      if (matchedPair.includes(3)) {
        // this is 3, which has positions 4 & 7
        if (positions.includes("4")) {
          // we can set 4 to current letter and remove it from 2
          valsKnownFrom5.set(4, letter);
          const letterToRemove = entryPositions[4].find(
            (val) => val !== letter
          ) as string;
          valsKnownFrom5.set(2, letterToRemove);
        }
        if (positions.includes("7")) {
          // we can set 7 to current letter and remove it from 5
          valsKnownFrom5.set(7, letter);
          const letterToRemove = entryPositions[7].find(
            (val) => val !== letter
          ) as string;
          valsKnownFrom5.set(5, letterToRemove);
        }
      }
      if (matchedPair.includes(5)) {
        // this is 2, which has positions 3 & 4
        if (positions.includes("4")) {
          // we can set 4 to current letter and remove it from 2
          valsKnownFrom5.set(4, letter);
          const letterToRemove = entryPositions[4].find(
            (val) => val !== letter
          ) as string;
          valsKnownFrom5.set(2, letterToRemove);
        }
        if (positions.includes("3")) {
          // we can set 3 to current letter and remove it from 6
          valsKnownFrom5.set(3, letter);
          const letterToRemove = entryPositions[3].find(
            (val) => val !== letter
          ) as string;
          valsKnownFrom5.set(6, letterToRemove);
        }
      }
    });
  });
  // now go through and update the values we have new info on
  valsKnownFrom5.forEach((letter, position) => {
    // get the current entry position and it's partner
    entryPositions[position] = [letter];
  });

  // finally we can go over the output values and figure out what numbers they represent, and return those
  // outputValues is a string array, so will need to convert to numbers before we return it
  const patternValue: number[] = [];
  outputValues.forEach((pattern: string) => {
    // split the pattern into single letters
    // get position of each letter
    // find the segment that contains all those positions
    const splitPattern: string[] = pattern.split("");
    const patternPositions = splitPattern.map((letter) => {
      const entryIndex = Object.values(entryPositions).findIndex(
        (val) => val[0] === letter
      );
      // return index + 1 since the values won't be 0 indexed
      return entryIndex + 1;
    });
    let matchingSegment: number = -1;
    // check the length of the pattern and find the numbers w/ that length
    const potentials: number[] = [];
    numberLengths.forEach((value, key) => {
      if (value === pattern.length) {
        potentials.push(key);
      }
    });
    potentials.forEach((potential) => {
      const segment = segments.get(potential) as number[];
      const matches = segment.map((position) =>
        patternPositions.includes(position) ? true : false
      );
      if (!matches.includes(false)) {
        // all values match, this is it!
        matchingSegment = potential;
        return;
      }
    });
    patternValue.push(matchingSegment);
  });
  outputEntries.push(patternValue.join(""));
});

const outputAsNumbers: number[] = outputEntries.map((val) => +val);
const outputTotal: number = outputAsNumbers.reduce((prev, curr) => prev + curr);
console.log(`Part 2: total of all outputs ${outputTotal}`);
