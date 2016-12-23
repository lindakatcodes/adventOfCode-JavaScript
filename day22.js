//well, line/used/avail actually splits the input up as desired which is as far as I managed to get - never got viable to actually give the right answer. I had to use u/AndrewGreenh 's codepen example to actually get my answers.

//https://codepen.io/anon/pen/BQEZzK/?editors=0010


var fs = require('fs');
var file = fs.readFileSync('\day22input.txt', 'utf8');
var input = file.split('\r\n');

var viable = 0;

for (var i = 2; i < input.length; i++) {
    var line = input[i].split(/ +/);
    var used = line[2].replace('T', '');
    var avail = line[3].replace('T', '');
    if (used !== 0) {
        for (var j = 3; j < input.length; j++) {
            var line2 = input[j].split(/ +/);
            var used2 = line2[2].replace('T', '');
            var avail2 = line2[3].replace('T', '');
            if (used !== used && avail >= used2) {
                viable++;
            }
        }
    }
}

console.log(viable);

