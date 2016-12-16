
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


/* this seems like it'd work (through debugging it does what it should) but was taking way too long
while (capsule === false) {
    var first = time + 1;
    if (first >= disc1.length) {
        first = first % disc1.length;
    }
    if (disc1[first] !== 0) {
        time++;
        continue;
    }
    var second = time + 2;
     if (second >= disc2.length) {
        second = second % disc2.length;
    }
    if (disc2[second] !== 0) {
        time++;
        continue;
    }
    var third = time + 3;
     if (third >= disc3.length) {
        third = third % disc3.length;
    }
    if (disc3[third] !== 0) {
        time++;
        continue;
    }
    var fourth = time + 4;
     if (fourth >= disc4.length) {
        fourth = fourth % disc4.length;
    }
    if (disc4[fourth] !== 0) {
        time++;
        continue;
    }
    var fifth = time + 5;
     if (fifth >= disc5.length) {
        fifth = fifth % disc5.length;
    }
    if (disc5[fifth] !== 0) {
        time++;
        continue;
    }
    var sixth = time + 6;
     if (sixth >= disc6.length) {
        sixth = sixth % disc6.length;
    }
    if (disc6[sixth] !== 0) {
        time++;
        continue;
    }

    if (capsule === true) {
        console.log("It's through! Button was pressed at time " + time);
    } 
}
*/
