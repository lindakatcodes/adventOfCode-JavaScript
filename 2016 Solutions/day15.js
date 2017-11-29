/*SO PLEASED I figured this one out on my own! I know it's simple to lots, but it started out tough for me (and my first solution took
way too long) so I'm really proud of myself for this one. lol */

/*--- Day 15: Timing is Everything ---

The halls open into an interior plaza containing a large kinetic sculpture. The sculpture is in a sealed enclosure and seems to involve a set of identical spherical capsules that are carried to the top and allowed to bounce through the maze of spinning pieces.

Part of the sculpture is even interactive! When a button is pressed, a capsule is dropped and tries to fall through slots in a set of rotating discs to finally go through a little hole at the bottom and come out of the sculpture. If any of the slots aren't aligned with the capsule as it passes, the capsule bounces off the disc and soars away. You feel compelled to get one of those capsules.

The discs pause their motion each second and come in different sizes; they seem to each have a fixed number of positions at which they stop. You decide to call the position with the slot 0, and count up for each position it reaches next.

Furthermore, the discs are spaced out so that after you push the button, one second elapses before the first disc is reached, and one second elapses as the capsule passes from one disc to the one below it. So, if you push the button at time=100, then the capsule reaches the top disc at time=101, the second disc at time=102, the third disc at time=103, and so on.

The button will only drop a capsule at an integer time - no fractional seconds allowed.

For example, at time=0, suppose you see the following arrangement:

Disc #1 has 5 positions; at time=0, it is at position 4.
Disc #2 has 2 positions; at time=0, it is at position 1.
If you press the button exactly at time=0, the capsule would start to fall; it would reach the first disc at time=1. Since the first disc was at position 4 at time=0, by time=1 it has ticked one position forward. As a five-position disc, the next position is 0, and the capsule falls through the slot.

Then, at time=2, the capsule reaches the second disc. The second disc has ticked forward two positions at this point: it started at position 1, then continued to position 0, and finally ended up at position 1 again. Because there's only a slot at position 0, the capsule bounces away.

If, however, you wait until time=5 to push the button, then when the capsule reaches each disc, the first disc will have ticked forward 5+1 = 6 times (to position 0), and the second disc will have ticked forward 5+2 = 7 times (also to position 0). In this case, the capsule would fall through the discs and come out of the machine.

However, your situation has more than two discs; you've noted their positions in your puzzle input. What is the first time you can press the button to get a capsule?

--- Part Two ---

After getting the first capsule (it contained a star! what great fortune!), the machine detects your success and begins to rearrange itself.

When it's done, the discs are back in their original configuration as if it were time=0 again, but a new disc with 11 positions and starting at position 0 has appeared exactly one second below the previously-bottom disc.

With this new disc, and counting again starting from time=0 with the configuration in your puzzle input, what is the first time you can press the button to get another capsule? */


//puzzle input - part 1 had 6 discs, part 2 added disc 7
    'Disc #1 has 17 positions; at time=0, it is at position 5.'
    'Disc #2 has 19 positions; at time=0, it is at position 8.'
    'Disc #3 has 7 positions; at time=0, it is at position 1.'
    'Disc #4 has 13 positions; at time=0, it is at position 7.'
    'Disc #5 has 5 positions; at time=0, it is at position 1.'
    'Disc #6 has 3 positions; at time=0, it is at position 0.' 
    'Disc #7 has 11 positions; at time=0, it is at position 0.'

//time initialized to 0
var time = 0;

//array to hold all arrays starting from time 0 - remove bottom array to perform part 1
var discs = [
    [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 0, 1, 2, 3, 4],
    [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 0, 1, 2, 3, 4, 5, 6, 7],
    [1, 2, 3, 4, 5, 6, 0],
    [7, 8, 9, 10, 11, 12, 0, 1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 0],
    [0, 1, 2],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
];

//array to hold all times where position is 0 - again remove bottom array for part 1 to work
var all = [
    [],
    [],
    [],
    [],
    [],
    [],
    []
];

//for each array/disc, find all the times where it hits 0 - while incrementing each array for the time the capsule would actually hit it! (important)
for (var a = 0; a < 7; a++) {
    var arr = discs[a];
    var inc = a + 1;
    for (var i = 0; i < 10000000; i++) { //super large to find part 2
        var num = (i + inc) % arr.length;
        if (arr[num] === 0) {
            all[a].push(i);
        }
    }
}    

//flatten all arrays into a single array
var flat = all.reduce(function (a, b) {
    return a.concat(b);
}, []);

//sort that array so all the matches are next to each other
flat.sort(function (a, b) {
    if (a < b) {
        return -1;
    } else {
        return 1;
    }
});

//find the place where there's 6 (or 7) matches in a row, share that number, and break (remove last comparison to run part 1)
for (var b = 0; b < flat.length; b++) {
    if (flat[b] === flat[b + 1]  && flat[b] === flat[b + 2] && flat[b] === flat[b + 3] && flat[b] === flat[b + 4] && flat[b] === flat[b + 5] && flat[b] === flat[b+6]) {
        console.log("Found it! first time is " + flat[b]);
        break;
    }
}

