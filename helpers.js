// Splits the input into an array of strings
export const strInput = (data) => data.split('\r\n');

export const splitOnSpaces = (data) => data.split('\r\n\r\n');

// Splits the input into an array of numbers
export const numInput = (data) => data.split('\r\n').map(Number);

// Creates an empty array of a given length
export function lenArray(num) {
  return Array.from(Array(num).keys());
}

// removes all items from an array
export const clearArr = (arr) => arr.splice(0, arr.length);

// make a count object to count instances of an item
export const counts = (arr) =>
  arr.reduce(function (allItems, item) {
    if (item in allItems) {
      allItems[item]++;
    } else {
      allItems[item] = 1;
    }
    return allItems;
  }, {});
