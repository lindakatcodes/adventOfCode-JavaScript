

var height = 400000;

var tiles = ['.^^.^^^..^.^..^.^^.^^^^.^^.^^...^..^...^^^..^^...^..^^^^^^..^.^^^..^.^^^^.^^^.^...^^^.^^.^^^.^.^^.^.'];
var currPos = 0;
var currRow = "";
var safe = 0;



for (var i = 1; i < height; i++) {
    var prevRow = tiles[i - 1].split('');
    if (safe === 0) {
        for (var a = 0; a < prevRow.length; a++) {
            if (prevRow[a] === '.') {
                safe++;
            }
        }
    }
    for (var j = 0; j < prevRow.length; j++) {
        var left = prevRow[j - 1];
        if (left == undefined) {
            left = '.';
        }
        var center = prevRow[j];
        var right = prevRow[j + 1];
        if (right == undefined) {
            right = '.';
        }

        if ((left === '^' && center === '^' && right === '.') || (center === '^' && right === '^' && left === '.') || (left === '^' && center === '.' && right === '.') || (left === '.' && center === '.' && right === '^')) {
            currRow += '^';
        } else {
            currRow += '.';
            safe++;
        }
        currPos++;
    }
    tiles.push(currRow);
    currRow = "";
    currPos = 0;
}


console.log('Safe tiles: ' + safe);
