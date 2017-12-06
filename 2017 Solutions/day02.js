/*
--- Day 2: Corruption Checksum ---

As you walk through the door, a glowing humanoid shape yells in your direction. "You there! Your state appears to be idle. Come help us repair the corruption in this spreadsheet - if we take another millisecond, we'll have to display an hourglass cursor!"

The spreadsheet consists of rows of apparently-random numbers. To make sure the recovery process is on the right track, they need you to calculate the spreadsheet's checksum. For each row, determine the difference between the largest value and the smallest value; the checksum is the sum of all of these differences.

For example, given the following spreadsheet:

5 1 9 5
7 5 3
2 4 6 8
The first row's largest and smallest values are 9 and 1, and their difference is 8.
The second row's largest and smallest values are 7 and 3, and their difference is 4.
The third row's difference is 6.
In this example, the spreadsheet's checksum would be 8 + 4 + 6 = 18.

What is the checksum for the spreadsheet in your puzzle input?

--- Part Two ---

"Great work; looks like we're on the right track after all. Here's a star for your effort." However, the program seems a little worried. Can programs be worried?

"Based on what we're seeing, it looks like all the User wanted is some information about the evenly divisible values in the spreadsheet. Unfortunately, none of us are equipped for that kind of calculation - most of us specialize in bitwise operations."

It sounds like the goal is to find the only two numbers in each row where one evenly divides the other - that is, where the result of the division operation is a whole number. They would like you to find those numbers on each line, divide them, and add up each line's result.

For example, given the following spreadsheet:

5 9 2 8
9 4 7 3
3 8 6 5
In the first row, the only two numbers that evenly divide are 8 and 2; the result of this division is 4.
In the second row, the two numbers are 9 and 3; the result is 3.
In the third row, the result is 2.
In this example, the sum of the results would be 4 + 3 + 2 = 9.

What is the sum of each row's result in your puzzle input?
*/
const input = [
    [3093, 749, 3469, 142, 2049, 3537, 1596, 3035, 2424, 3982, 3290, 125, 249, 131, 118, 3138],
    [141, 677, 2705, 2404, 2887, 2860, 1123, 2714, 117, 1157, 2607, 1800, 153, 130, 1794, 3272],
    [182, 93, 2180, 114, 103, 1017, 95, 580, 2179, 2470, 2487, 2806, 1574, 1325, 1898, 1706],
    [3753, 233, 3961, 3747, 3479, 3597, 1303, 2612, 4043, 1815, 3318, 737, 197, 3943, 239, 254],
    [113, 147, 961, 157, 3514, 3045, 1270, 3528, 1369, 3377, 492, 156, 1410, 3251, 1839, 1249],
    [3948, 3651, 888, 3631, 253, 220, 4266, 1284, 3595, 237, 2138, 3799, 2319, 254, 267, 1182],
    [399, 446, 795, 653, 154, 762, 140, 487, 750, 457, 730, 150, 175, 841, 323, 492],
    [999, 979, 103, 99, 1544, 1404, 100, 1615, 840, 92, 1552, 1665, 1686, 76, 113, 1700],
    [4049, 182, 3583, 1712, 200, 3326, 3944, 715, 213, 1855, 2990, 3621, 2560, 842, 249, 2082],
    [2610, 4749, 2723, 2915, 2189, 3911, 124, 164, 1895, 3095, 3992, 134, 127, 4229, 3453, 4428],
    [105, 692, 101, 150, 193, 755, 84, 185, 622, 851, 706, 251, 86, 408, 774, 831],
    [238, 217, 224, 1409, 1850, 2604, 363, 265, 596, 2933, 2641, 2277, 803, 2557, 1399, 237],
    [304, 247, 192, 4369, 997, 5750, 85, 1248, 4718, 3888, 5228, 5116, 5880, 5348, 6052, 245],
    [238, 373, 228, 395, 86, 59, 289, 87, 437, 384, 233, 79, 470, 403, 441, 352],
    [151, 3473, 1435, 87, 1517, 1480, 140, 2353, 1293, 118, 163, 3321, 2537, 3061, 1532, 3402],
    [127, 375, 330, 257, 220, 295, 145, 335, 304, 165, 151, 141, 289, 256, 195, 272],
];

let toSum = [];

for (let i = 0; i < input.length; i++) {
    input[i].sort((a, b) => a - b);
    toSum.push((input[i][input[i].length - 1]) - input[i][0]);
}

const solution1 = toSum.reduce((sum, next) => sum + next, 0);

console.log(`Part 1 answer: ${solution1}`);

toSum = [];

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        const test1 = input[i][j];
        for (let k = j + 1; k < input[i].length; k++) {
            const test2 = input[i][k];
            if (test2 % test1 === 0) {
                toSum.push(test2 / test1);
            }
        }
    }
}

const solution2 = toSum.reduce((sum, next) => sum + next, 0);

console.log(`Part 2 answer: ${solution2}`);
