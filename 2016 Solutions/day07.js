//shoutout to u/asperellis - I had the same idea with testing the abba str but struggled with how to work out the in-bracket parts, so your code really helped me figure that out. Thanks!
//Also hopelessly confused myself on part 2, which your code helped immensely there, so double thanks! 

/*--- Day 7: Internet Protocol Version 7 ---

While snooping around the local network of EBHQ, you compile a list of IP addresses (they're IPv7, of course; IPv6 is much too limited). You'd like to figure out which IPs support TLS (transport-layer snooping).

An IP supports TLS if it has an Autonomous Bridge Bypass Annotation, or ABBA. An ABBA is any four-character sequence which consists of a pair of two different characters followed by the reverse of that pair, such as xyyx or abba. However, the IP also must not have an ABBA within any hypernet sequences, which are contained by square brackets.

For example:

abba[mnop]qrst supports TLS (abba outside square brackets).
abcd[bddb]xyyx does not support TLS (bddb is within square brackets, even though xyyx is outside square brackets).
aaaa[qwer]tyui does not support TLS (aaaa is invalid; the interior characters must be different).
ioxxoj[asdfgh]zxcvbn supports TLS (oxxo is outside square brackets, even though it's within a larger string).
How many IPs in your puzzle input support TLS?

--- Part Two ---

You would also like to know which IPs support SSL (super-secret listening).

An IP supports SSL if it has an Area-Broadcast Accessor, or ABA, anywhere in the supernet sequences (outside any square bracketed sections), and a corresponding Byte Allocation Block, or BAB, anywhere in the hypernet sequences. An ABA is any three-character sequence which consists of the same character twice with a different character between them, such as xyx or aba. A corresponding BAB is the same characters but in reversed positions: yxy and bab, respectively.

For example:

aba[bab]xyz supports SSL (aba outside square brackets with corresponding bab within square brackets).
xyx[xyx]xyx does not support SSL (xyx, but no corresponding yxy).
aaa[kek]eke supports SSL (eke in supernet with corresponding kek in hypernet; the aaa sequence is not related, because the interior character must be different).
zazbz[bzb]cdb supports SSL (zaz has no corresponding aza, but zbz has a corresponding bzb, even though zaz and zbz overlap).
How many IPs in your puzzle input support SSL? */

//test1 has 2 supports
var test1 = ['abba[mnop]qrst', 'abcd[bddb]xyyx', 'aaaa[qwer]tyui', 'ioxxoj[asdfgh]zxcvbn'];
//test2 has 3 supports
var test2 = ['aba[bab]xyz', 'xyx[xyx]xyx', 'aaa[kek]eke', 'zazbz[bzb]cdb'];

//read in puzzle input
var fs = require('fs');
var file = fs.readFileSync('\day7input.txt', 'utf8');
var input = file.replace(/\n/g, ',').split(',');


//vars to count supporting ips and set a flag for hypernet/inside bracket bits
var tlssupp = 0;
var hyperFlag = 'Hypernet-';
var sslsupp = 0;

//tests strings for abba support, returns true if includes abba and doesn't have one in the hyperflag
function hasAbba(arr) {
    var flag = false; //tests if true or not for indiv string
    for (var i = 0; i < arr.length; i++) {
        var str = arr[i];
        for (var j = 0; j < str.length; j++) {
            if (str[j] === str[j + 3] && str[j + 1] === str[j + 2] && str[j] !== str[j + 1]) {
                flag = true;
                if (str.indexOf(hyperFlag) === 0) {
                    return false;
                }
            }
        }
    }
    return flag;
};

//check strings for aba pattern
function hasAba(arr) {
    var flag = false;
    var abaArr = []; //arr holds all substrings that match the pattern
    arr.forEach(function (str) {
        for (var a = 0; a < str.length; a++) {
            //checks for pattern and makes sure hyperFlag doesn't exist in string (is therefore -1)
            if (str[a] === str[a + 2] && str[a] !== str[a + 1] && str.indexOf(hyperFlag) < 0) {
                abaArr.push(str.substr(a, 3));
            }
        }
    });

    //if items in your abaArr, check hyper sets
    if (abaArr.length > 0) {
        abaArr.forEach(function (z) {
            var bab = z[1] + z[0] + z[1]; //creates bab pattern to check for from aba (z)
            arr.forEach(function (str) { //run through array again
                for (var b = 0; b < str.length; b++) {
                    if (str.indexOf(hyperFlag) >= 0 && str.indexOf(bab) >= 0) { //if hyperFlag and bab pattern exists in the str you're checking
                        flag = true;
                        break;
                    }
                }
            });
        });
    }
    return flag;
};

//run the functions on each string bit of the array/input
input.forEach(function (str) {
    var arr = str.replace(/\[/g, ',' + hyperFlag).replace(/\]/g, ',').split(',');
    if (hasAbba(arr)) {
        tlssupp++;
    }

    if (hasAba(arr)) {
        sslsupp++;
    }
})

//log answers
console.log("Number supports TLS: " + tlssupp);
console.log("Number supports SSL: " + sslsupp);
