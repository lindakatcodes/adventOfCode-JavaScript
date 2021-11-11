// Read the input file
export const readData = async function (filePath: string) {
  const input = await fetch(filePath).then((response) => response.text());
  return input;
};

// Splits the input into an array of strings
export const strInput = (data: any) => data.split("\r\n");

export const splitOnSpaces = (data: any) => data.split("\r\n\r\n");

// Splits a single string input into an array of numbers
export const numInput = (data: string): number[] => data.split(" ").map(Number);

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
