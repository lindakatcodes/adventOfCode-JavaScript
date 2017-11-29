//another day done thanks to u/douglowder!

/* --- Day 20: Firewall Rules ---

You'd like to set up a small hidden computer here so you can use it to get back into the network later. However, the corporate firewall only allows communication with certain external IP addresses.

You've retrieved the list of blocked IPs from the firewall, but the list seems to be messy and poorly maintained, and it's not clear which IPs are allowed. Also, rather than being written in dot-decimal notation, they are written as plain 32-bit integers, which can have any value from 0 through 4294967295, inclusive.

For example, suppose only the values 0 through 9 were valid, and that you retrieved the following blacklist:

5-8
0-2
4-7

The blacklist specifies ranges of IPs (inclusive of both the start and end value) that are not allowed. Then, the only IPs that this firewall allows are 3 and 9, since those are the only numbers not in any range.

Given the list of blocked IPs you retrieved from the firewall (your puzzle input), what is the lowest-valued IP that is not blocked?

--- Part Two ---

How many IPs are allowed by the blacklist? */

var fs = require('fs');
var file = fs.readFileSync('\day20input.txt', 'utf8');
var input = file.split('\r\n');

//function to use for sort
var compare = function (int1, int2) {
    return (int1[0] < int2[0] ? -1 : 1);
};

//merges intervals that overlap
var mergeInts = function (intervals) {
    if (intervals.length <= 1) { //if it's not longer than 1 item, just return it
        return intervals;
    }
    intervals.sort(compare); //sort so everything's in order
    var result = [];
    var first = intervals[0];
    var start = first[0];
    var end = first[1];
    var i = 1;
    while ( i < intervals.length) {
        var current = intervals[i];
        if (current[0] <= end) { //if the start of the second interval is <= end of the first, change end to max of the two intervals
            end = Math.max(current[1], end);
        } else { //otherwise add current interval to results and adjust start/end to current interval
            result.push([start, end]);
            start = current[0];
            end = current[1];
        }
        i++;
    }
    result.push([start, end]); //add last interval set to results and return the whole new array
    return result;
};

//create intervals array, split each input interval, and push that set to intervals - then merge
var intervals = [];
for (var i = 0; i < input.length; i++) {
    var pieces = input[i].split('-');
    intervals.push([parseInt(pieces[0]), parseInt(pieces[1])]);
}
var merged = mergeInts(intervals);

//finding first allowed IP
for (var k = 0; k < merged.length - 1; k++) {
    if (merged[k][1] + 1 < merged[k + 1][0]) { //if next number after end of merged pair you're checking is less than the first of the next merged interval, it's not included and will be the first allowed (since list is sorted)
        console.log(merged[k][1] + 1);
        break;
    }
};

//part 2 - number of total allowed IPs
var allowed = 0;
if (merged[0][0] > 0) { //covers 0 if it's not in your puzzle input
    allowed += merged[0][0];
}
for (var a = 0; a < merged.length - 1; a++) { 
    allowed += merged[a + 1][0] - merged[a][1] - 1; //counts numbers between start of next interval and end of current interval (including end of current interval)
}
if (merged[merged.length - 1][1] < 4294967295) { //if the end of the last merged interval is less than required length, adds in any numbers from end of last interval to max value
    allowed += 4294967295 - merged[merged.length - 1][1] - 1;
}
console.log(allowed);


