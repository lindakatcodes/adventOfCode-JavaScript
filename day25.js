//shoutout to u/LieutenantSwr2d2 for their breakdown of what the code's doing - your solution allowed me to get the answer!

/* --- Day 25: Clock Signal ---

You open the door and find yourself on the roof. The city sprawls away from you for miles and miles.

There's not much time now - it's already Christmas, but you're nowhere near the North Pole, much too far to deliver these stars to the sleigh in time.

However, maybe the huge antenna up here can offer a solution. After all, the sleigh doesn't need the stars, exactly; it needs the timing data they provide, and you happen to have a massive signal generator right here.

You connect the stars you have to your prototype computer, connect that to the antenna, and begin the transmission.

Nothing happens.

You call the service number printed on the side of the antenna and quickly explain the situation. "I'm not sure what kind of equipment you have connected over there," he says, "but you need a clock signal." You try to explain that this is a signal for a clock.

"No, no, a clock signal - timing information so the antenna computer knows how to read the data you're sending it. An endless, alternating pattern of 0, 1, 0, 1, 0, 1, 0, 1, 0, 1...." He trails off.

You ask if the antenna can handle a clock signal at the frequency you would need to use for the data from the stars. "There's no way it can! The only antenna we've installed capable of that is on top of a top-secret Easter Bunny installation, and you're definitely not-" You hang up the phone.

You've extracted the antenna's clock signal generation assembunny code (your puzzle input); it looks mostly compatible with code you worked on just recently.

This antenna code, being a signal generator, uses one extra instruction:

out x transmits x (either an integer or the value of a register) as the next value for the clock signal.
The code takes a value (via register a) that describes the signal to generate, but you're not sure how it's used. You'll have to find the input to produce the right signal through experimentation.

What is the lowest positive integer that can be used to initialize register a and cause the code to output a clock signal of 0, 1, 0, 1... repeating forever?

--- Part Two ---

The antenna is ready. Now, all you need is the fifty stars required to generate the signal for the sleigh, but you don't have enough.

You look toward the sky in desperation... suddenly noticing that a lone star has been installed at the top of the antenna! Only 49 more to go. */

//puzzle input 
var input = ['cpy a d', 'cpy 11 c', 'cpy 231 b', 'inc d', 'dec b', 'jnz b -2', 'dec c', 'jnz c -5', 'cpy d a', 'jnz 0 0','cpy a b', 'cpy 0 a', 'cpy 2 c', 'jnz b 2', 'jnz 1 6', 'dec b', 'dec c', 'jnz c -4', 'inc a', 'jnz 1 -7', 'cpy 2 b', 'jnz c 2', 'jnz 1 4', 'dec b', 'dec c', 'jnz 1 -4', 'jnz 0 0', 'out b', 'jnz a -19', 'jnz 1 -21'];

//registers
var a = 0;
var b = 0;
var c = 0;
var d = 0;

//target is the b value * c value from beginning of input
var target = 2541;
var n = 1;
while (n < target) {
    if (n % 2 == 0) {
        n = n * 2 + 1;
    } else {
        n *= 2;
    }
    console.log(n - target); //first positive number is answer
}
