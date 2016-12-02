//Code ideas borrowed/initiated from reddit users u/LieutenantSwr2d2 and u/tuxitop; 
//thanks for debugging assistance u/bbatsell, u/msully4321, & u/mrbkap!

/*--- Day 1: No Time for a Taxicab ---

Santa's sleigh uses a very high-precision clock to guide its movements, and the clock's oscillator is regulated by stars. Unfortunately, the stars have been stolen... by the Easter Bunny. To save Christmas, Santa needs you to retrieve all fifty stars by December 25th.
Collect stars by solving puzzles. Two puzzles will be made available on each day in the advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

You're airdropped near Easter Bunny Headquarters in a city somewhere. "Near", unfortunately, is as close as you can get - the instructions on the Easter Bunny Recruiting Document the Elves intercepted start here, and nobody had time to work them out further.
The Document indicates that you should start at the given coordinates (where you just landed) and face North. Then, follow the provided sequence: either turn left (L) or right (R) 90 degrees, then walk forward the given number of blocks, ending at a new intersection.

There's no time to follow such ridiculous instructions on foot, though, so you take a moment and work out the destination. Given that you can only walk on the street grid of the city, how far is the shortest path to the destination?

For example:
Following R2, L3 leaves you 2 blocks East and 3 blocks North, or 5 blocks away.
R2, R2, R2 leaves you 2 blocks due South of your starting position, which is 2 blocks away.
R5, L5, R5, R3 leaves you 12 blocks away.
How many blocks away is Easter Bunny HQ?

--- Part Two ---

Then, you notice the instructions continue on the back of the Recruiting Document. Easter Bunny HQ is actually at the first location you visit twice.

For example, if your instructions are R8, R4, R4, R8, the first location you visit twice is 4 blocks away, due East.

How many blocks away is the first location you visit twice?
*/

var moves = ['R2', 'L1', 'R2', 'R1', 'R1', 'L3', 'R3', 'L5', 'L5', 'L2', 'L1', 'R4', 'R1', 'R3', 'L5', 'L5', 'R3', 'L4', 'L4', 'R5', 'R4', 'R3', 'L1', 'L2', 'R5', 'R4', 'L2', 'R1', 'R4', 'R4', 'L2', 'L1', 'L1', 'R190', 'R3', 'L4', 'R52', 'R5', 'R3', 'L5', 'R3', 'R2', 'R1', 'L5', 'L5', 'L4', 'R2', 'L3', 'R3', 'L1', 'L3', 'R5', 'L3', 'L4', 'R3', 'R77', 'R3', 'L2', 'R189', 'R4', 'R2', 'L2', 'R2', 'L1', 'R5', 'R4', 'R4', 'R2', 'L2', 'L2', 'L5', 'L1', 'R1', 'R2', 'L3', 'L4', 'L5', 'R1', 'L1', 'L2', 'L2', 'R2', 'L3', 'R3', 'L4', 'L1', 'L5', 'L4', 'L4', 'R3', 'R5', 'L2', 'R4', 'R5', 'R3', 'L2', 'L2', 'L4', 'L2', 'R2', 'L5', 'L4', 'R3', 'R1', 'L2', 'R2', 'R4', 'L1', 'L4', 'L4', 'L2', 'R2', 'L4', 'L1', 'L1', 'R4', 'L1', 'L3', 'L2', 'L2', 'L5', 'R5', 'R2', 'R5', 'L1', 'L5', 'R2', 'R4', 'R4', 'L2', 'R5', 'L5', 'R5', 'R5', 'L4', 'R2', 'R1', 'R1', 'R3', 'L3', 'L3', 'L4', 'L3', 'L2', 'L2', 'L2', 'R2', 'L1', 'L3', 'R2', 'R5', 'R5', 'L4', 'R3', 'L3', 'L4', 'R2', 'L5', 'R5']; 

var x = 0, y = 0;
var direction = 0; //0 north, 1 east, 2 south, 3 west
var position = [x, y];
var spots = [];
var twice;
var foundTwice = false;

moves.forEach(function (instruction) {
    direction = (direction + (instruction[0] === 'R' ? 1 : -1) + 4) % 4;
    var n = parseInt(instruction.slice(1));
    switch (direction) {
        case 0:
            if (foundTwice === false) {
                for (var i = 0; i < n; i++) {
                    position = [x, y + i];
                    if (spots.indexOf(position.toString()) === -1) {
                        spots.push(position.toString());
                    } else {
                        foundTwice = true;
                        twice = position;
                    }
                }
            }
            y += n;
            break;
        case 1:
            if (foundTwice === false) {
                for (var i = 0; i < n; i++) {
                    position = [x + i, y];
                    if (spots.indexOf(position.toString()) === -1) {
                        spots.push(position.toString());
                    } else {
                        foundTwice = true;
                        twice = position;
                    }
                }
            }
            x += n;
            break;
        case 2:
            if (foundTwice === false) {
                for (var i = 0; i < n; i++) {
                    position = [x, y - i];
                    if (spots.indexOf(position.toString()) === -1) {
                        spots.push(position.toString());
                    } else {
                        foundTwice = true;
                        twice = position;
                    }
                }
            }
            y -= n;
            break;
        case 3:
            if (foundTwice === false) {
                for (var i = 0; i < n; i++) {
                    position = [x - i, y];
                    if (spots.indexOf(position.toString()) === -1) {
                        spots.push(position.toString());
                    } else {
                        foundTwice = true;
                        twice = position;
                    }
                }
            }
            x -= n;
            break;
    }
})


console.log(Math.abs(x) + Math.abs(y));
console.log(twice);
console.log(Math.abs(twice[0] + Math.abs(twice[1])));
