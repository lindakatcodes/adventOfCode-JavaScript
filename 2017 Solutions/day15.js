let genA = 699;
let aFactor = 16807;

let genB = 124;
let bFactor = 48271;

let judge = 0;
let times = 5000000;

function nextValue(prev, factor) {
    return (prev * factor) % 2147483647;
}

for (let i = 0; i < times; i++) {
    let aNext = nextValue(genA, aFactor);
    while (aNext % 4 !== 0) {
        aNext = nextValue(aNext, aFactor);
    }
    genA = aNext;

    let bNext = nextValue(genB, bFactor);
    while (bNext % 8 !== 0) {
        bNext = nextValue(bNext, bFactor);
    }
    genB = bNext;

    let sixteenA = aNext.toString(2).slice(-16);
    let sixteenB = bNext.toString(2).slice(-16);
    if (sixteenA === sixteenB) {
        judge++;
    }
}

console.log(`Judge's score: ${judge}`);
