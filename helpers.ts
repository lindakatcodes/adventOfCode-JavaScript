// Read the input file
export const readData = async function (filePath: string) {
  const input = await fetch(filePath).then((response) => response.text());
  return input;
};

// Splits the input into an array of strings
export const strInput = (data: string): string[] => data.split("\n");

export const splitOnSpaces = (data: string): string[] => data.split("\n\n");

// Splits a single string input into an array of numbers
export const numInput = (data: string): number[] =>
  data.split("\n").map(Number);

// Creates an empty array of a given length
export function lenArray(num: number) {
  return Array.from(Array(num).keys());
}

// removes all items from an array
export const clearArr = (arr: any) => arr.splice(0, arr.length);

// make a count object to count instances of an item
export const counts = (arr: any) =>
  arr.reduce(function (allItems: any, item: any) {
    if (item in allItems) {
      allItems[item]++;
    } else {
      allItems[item] = 1;
    }
    return allItems;
  }, {});

export function mean(array: number[]): number {
  const sum: number = array.reduce((prev, curr) => prev + curr);
  return Math.floor(sum / array.length);
}

export function median(array: number[]): number {
  const sorted: number[] = array.sort((a, b) => a - b);
  if (array.length % 2 === 0) {
    return Math.floor(
      sorted[array.length / 2 - 1] + sorted[array.length / 2] / 2
    );
  } else {
    return Math.floor(sorted[array[array.length - 1 / 2]]);
  }
}

// get the triangular number sequence - the number of dots in a triangular pattern. Like a factorial, but for addition
export function triangleSequence(num: number): number {
  return (num * (num + 1)) / 2;
}
