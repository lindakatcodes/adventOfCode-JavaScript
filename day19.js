//part 1 solved thanks to lots of people posting about the Numberphile video; part 2 thanks to u/BOT-Brad 

/* --- Day 19: An Elephant Named Joseph ---

The Elves contact you over a highly secure emergency channel. Back at the North Pole, the Elves are busy misunderstanding White Elephant parties.

Each Elf brings a present. They all sit in a circle, numbered starting with position 1. Then, starting with the first Elf, they take turns stealing all the presents from the Elf to their left. An Elf with no presents is removed from the circle and does not take turns.

For example, with five Elves (numbered 1 to 5):

  1
5   2
 4 3
 
Elf 1 takes Elf 2's present.
Elf 2 has no presents and is skipped.
Elf 3 takes Elf 4's present.
Elf 4 has no presents and is also skipped.
Elf 5 takes Elf 1's two presents.
Neither Elf 1 nor Elf 2 have any presents, so both are skipped.
Elf 3 takes Elf 5's three presents.
So, with five Elves, the Elf that sits starting in position 3 gets all the presents.

With the number of Elves given in your puzzle input, which Elf gets all the presents?

--- Part Two ---

Realizing the folly of their present-exchange rules, the Elves agree to instead steal presents from the Elf directly across the circle. If two Elves are across the circle, the one on the left (from the perspective of the stealer) is stolen from. The other rules remain unchanged: Elves with no presents are removed from the circle entirely, and the other elves move in slightly to keep the circle evenly spaced.

For example, with five Elves (again numbered 1 to 5):

The Elves sit in a circle; Elf 1 goes first:
  1
5   2
 4 3
 
Elves 3 and 4 are across the circle; Elf 3's present is stolen, being the one to the left. Elf 3 leaves the circle, and the rest of the Elves move in:
  1           1
5   2  -->  5   2
 4 -          4
 
Elf 2 steals from the Elf directly across the circle, Elf 5:
  1         1 
-   2  -->     2
  4         4 
  
Next is Elf 4 who, choosing between Elves 1 and 2, steals from Elf 1:
 -          2  
    2  -->
 4          4
 
Finally, Elf 2 steals from Elf 4:
 2
    -->  2  
 -
So, with five Elves, the Elf that sits starting in position 2 gets all the presents.

With the number of Elves given in your puzzle input, which Elf now gets all the presents? */

var input = 3004953;

//part 1 - thanks to numberphile video on Josephus problem - converts input to binary, removes first number, adds it to the end, then converts back to decimal
var string = input.toString(2);
var arr = string.split('');
var first = arr.shift();
arr.push(first);
var newbin = arr.join('');
var num = parseInt(newbin, 2);
var ans = num.toString(10);
console.log(ans);

//part 2 - writing from BOT-Brad: 
/*Noticed that in the pattern of 1,2,4,10,28,82... where n+1 was equal to 3n-2, the winner would always be elf #1. From this, every additional elf would simply rotate the problem around by 1 elf, unless the winning elf was now equal to the number of elves, then each additional elf would increment the winning elf # by two. */
function largest3n() {
    var a = 2;
    while (a < input) {
        a = a * 3 - 2;
    }
    return (a + 2) / 3;
}

var winner = input - largest3n() + 1;

if (winner >= input) {
    winner = winner * 2 - 9;
}

console.log(winner);

