

//puzzle input - initial state
var test = 10000;
var input = 10001110011110000;

//fill the disc: part 1 is 272, part 2 is 35651584
var diskLen = 35651584;

//vars to write data to until it's full, then the trimmed version
var dataFull = "";
var data = "";

//calculate checksum
    var check = "";

function fillDisk(input) {
    //a - data you currently have (iniital state or finished runs that aren't long enough)
    var a = input;

    //b - copy of a
    var bstart = a.toString().split('');

    //reverse b
    bstart.reverse();
    var bnext = bstart.join('');
   
   //initialize b  
    var b = "";
    
    //b - replace all 1's with 0's and 0's with 1's
    for (var i = 0; i < bnext.length; i++) {
        if (bnext[i] == 0) {
            b += 1;
        } else {
            b += 0;
        }
    }

    //finished line - a + 0 + b
    dataFull = a + '0' + b;
    if (dataFull.length < diskLen) {
        fillDisk(dataFull);
    }
}

function getSum(data) {
    check = "";
    //for each non-overlapping pair - if same, cs is 1, if different, cs is 0 
    for (var j = 0, k = 1; k < data.length; j++, k++) {
        if (data[j] == data[k]) {
            check += 1;
        } else {
            check += 0;
        }
        j++;
        k++;
    }

    //if length of checksum is even, repeat the process on this string until it's odd
    if (check.length % 2 === 0) {
        getSum(check);
    }
}

//call fillDisk, get data string, then calc checksum and log answer
fillDisk(input);

//ensure data is only as long as diskLen - if too long, drop the unneeded bits
data = dataFull.slice(0, diskLen);

getSum(data);
console.log("CheckSum is " + check);

