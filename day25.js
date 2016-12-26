//shoutout to u/LieutenantSwr2d2 for their breakdown of what the code's doing - your solution allowed me to get the answer!

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
