//day 2 input
var directions = [
    'DLDRDDDLULDRRLUDDLDUURDRDUULDRDDRRLDLLUUDDLLRLRDRUURLUDURDDRURLUDDUULUURLLRRRRUDULUDLULLUURRLLRRURRUDUUURRLUUUDURDLLLDULDRLRDDDUDDUURLRRRURULLUDDUULDRRRDDLRLUDDRRDLRDURLRURUDDUULDDUUDDURRLUURRULRRLDLULLRLRUULDUDDLLLRDDULRUDURRDUUDUUDDUULULURDLUDRURDLUUDRDUURDDDRDRLDLDRURRLLRURURLLULLRRUULRRRRDLDULDDLRRRULRURRDURUDUUULDUUDRLDDLDUDDRULLUDUULRRRDRRDRDULDLURDDURLRUDLURLUDDDRLLURUUUUUUURUULDUUDDRLULRUDURRDLDUULLRLULLURDDDDDLRRDLRLLDDUDRRRDDURDLRRUDDUDLRRRDDURULRURRRLDRDUDLD',
    'LRRDUDUUUDRRURRDUUULULUDDLLDRRRUDDUULRRDRUDRLLRLRULRRDUUDRLDURUDLLLDRRDLRLUUDRUDRRRUDRRRULDRRLLRDDDLLRDDRULRLLRUDRLLLULDLDDRDRUUUUUULURLLRUDRDRLLULLRUUURRDRULULUDLDURRUUDURLLUDRDLDDULUDLRDDRLRLURULDRURRRRURRDDUDRULUUUDDDRULRULDLLURUUULRDDLRUURLRLDLUULLURDRDDDUDDDRLDRDLLDRDDDDURLUUULDDRURULUDDURDRDRLULDULURDUURDRLLUUUULRULUUDRLLDDRRURUURLDLLRRRDLRURDDLDLDRLRRDLDURULDDLULRRRUUDLRDUURDURLURDDLDLRURLLLDRDULDDRUDDULDDRRLDLRDRDLDUUDLUULRLUDUUDUUUULDURULRRUDULURLRLDRLULLLDUDLLLRUDURDDDURLDDLRLRRDLUDLDDDDLULDRLDUUULDRRDDLRUULDLULUUURUDDRLDDDULRUDRURUURUUURRULRURDURLLRLLUULUULURDRLLUDDLU',
    'LLDURDUDRLURUDRLRLUDDRRURDULULDDUDUULRRLRLRRDRDRDURRLRLURRLRUDULLUULLURUDDRLDDDRURLUUDLDURRDURDDLUULRDURRUUURLRRURRDRDRDURRRLULLDRUDLRUDURDRDDLLULLULRRUDULDDRDRRDLLLDLURLRDRDLUDDRLDDLDRULDURLLRLDRDLUDDDDLDUUDRLLRRRRLDDRRLRLURLLRLLUULLDUUDLRDRRRDRDLLDULLDRLDDUDRDDRURRDDLRDLRRUUDRRRRDURUULDRDDURLURRRRURRDRRULULURULUUUDRRRLDLLLDDRULRUDDURDRLDDRDLULLLRURUDRLRDDLDLRRRUURDURLDURRUUDDLRDRUUUURDLRLULRUUDRLDLULLULUURURDULUDUDRRRLLRLURLLDLRRURURRUDLUDDDDRDUDUDUUUULLDRDLLLLUUUUDRLRLUDURLLUDRUUDLLURUULDDDDULUUURLLDL',
    'DLULLRDLRRLLLDLRRURRDRURDRUUULDDRLURURRDLRRULUUDDRLRRLDULRRUUDUULDDDUDLLDLURDRLLULLUUULLDURDRRRDDLRDUDRRRLRLDRRLRLULDDUDURRRLDLRULDULDDUDDRULDLDRDRDDRUDRUDURRRRUUDUDRLDURLDLRRUURRDDUDLLDUDRRURRLRRRRRLDUDDRLLLURUDRRUDRLRDUDUUUUUDURULLDUUDLRUUULDUUURURLUUDULDURUDDDLRRRDDRRDLRULLLRDDRLRLUULDUUULLLLDLRURLRRDURRLDLLLDURDLLUDDDLLDDURDDULURDRRRDDDLDDURRULUUDDLULLURULUULDLDDLUDRURURULUDDULRDRLDRRRUUUURUULDRLRRURRLULULURLLDRLRLURULRDDDULRDDLUR',
    'RURRULLRRDLDUDDRRULUDLURLRRDDRDULLLUUDDDRDDRRULLLDRLRUULRRUDLDLLLRLLULDRLDDDLLDDULLDRLULUUUURRRLLDRLDLDLDDLUDULRDDLLRLLLULLUDDRDDUUUUDLDLRRDDRDLUDURRUURUURDULLLLLULRRLDRLRDLUURDUUDLDRURURLLDRRRLLLLRDLDURRLRRLLRUUDDUULLRLUDLRRRRRURUDDURULURRUULRDDULUUDUUDDRDDDDDUUUDDDRRLDDRRDDUUULDURLDULURDRDLLURDULRUDRUULUULLRRRRLRUUDDUDLDURURLRRRULRDRRUDDRDDRLRRRLRURRRUULULLLUULLLULLUDLRDLDURRURDLDLRDUULDRLLRRLDUDDUULULR'];

//part 1 rows
var row1 = [1, 2, 3];
var row2 = [4, 5, 6];
var row3 = [7, 8, 9];

//part 2 rows
var row1b = [1];
var row2b = [2, 3, 4];
var row3b = [5, 6, 7, 8, 9];
var row4b = ['A', 'B', 'C'];
var row5b = ['D'];

//obvious
var password = "";
var passlen = 5;

//sample with verified answers
var test = ['ULL', 'RRDDD', 'LURDL', 'UUUUD'];
var testans1 = 1985;
var testans2 = '5DB3';

//position markers
var start = row2[1];
var curr;

//part 1 move options
function optionsA(pos, dir) {
    switch (pos) {
        case row1[0]: //1
            if (dir == 'U') {
                return pos = pos;
            } else if (dir == 'D') {
                return pos = row2[0];
            } else if (dir == 'L') {
                return pos = pos;
            } else if (dir == 'R') {
                return pos = row1[1];
            }
            break;
        case row1[1]: //2
            if (dir == 'U') {
                return pos = pos;
            } else if (dir == 'D') {
                return pos = row2[1];
            } else if (dir == 'L') {
                return pos = row1[0];
            } else if (dir == 'R') {
                return pos = row1[2];
            }
            break;
        case row1[2]: //3
            if (dir == 'U') {
                return pos = pos;
            } else if (dir == 'D') {
                return pos = row2[2];
            } else if (dir == 'L') {
                return pos = row1[1];
            } else if (dir == 'R') {
                return pos = pos;
            }
            break;
        case row2[0]: //4
            if (dir == 'U') {
               return pos = row1[0];
            } else if (dir == 'D') {
                return pos = row3[0];
            } else if (dir == 'L') {
               return pos = pos;
            } else if (dir == 'R') {
               return pos = row2[1];
            }
            break;
        case row2[1]: //5
            if (dir == 'U') {
               return pos = row1[1];
            } else if (dir == 'D') {
               return pos = row3[1];
            } else if (dir == 'L') {
               return pos = row2[0];
            } else if (dir == 'R') {
               return pos = row2[2];
            }
            break;
        case row2[2]: //6
            if (dir == 'U') {
               return pos = row1[2];
            } else if (dir == 'D') {
              return  pos = row3[2];
            } else if (dir == 'L') {
               return pos = row2[1];
            } else if (dir == 'R') {
               return pos = pos;
            }
            break;
        case row3[0]: //7
            if (dir == 'U') {
               return pos = row2[0];
            } else if (dir == 'D') {
               return pos = pos;
            } else if (dir == 'L') {
               return pos = pos;
            } else if (dir == 'R') {
               return pos = row3[1];
            }
            break;
        case row3[1]: //8
            if (dir == 'U') {
               return pos = row2[1];
            } else if (dir == 'D') {
               return pos = pos;
            } else if (dir == 'L') {
               return pos = row3[0];
            } else if (dir == 'R') {
               return pos = row3[2];
            }
            break;
        case row3[2]: //9
            if (dir == 'U') {
               return pos = row2[2];
            } else if (dir == 'D') {
               return pos = pos;
            } else if (dir == 'L') {
               return pos = row3[1];
            } else if (dir == 'R') {
               return pos = pos;
            }
            break;
    }
}

//part 2 move options
function optionsB(pos, dir) {
    switch (pos) {
        case row1b[0]: //1
            if (dir == 'U') {
                return pos = pos;
            } else if (dir == 'D') {
                return pos = row2b[1];
            } else if (dir == 'L') {
                return pos = pos;
            } else if (dir == 'R') {
                return pos = pos;
            }
            break;
        case row2b[0]: //2
            if (dir == 'U') {
                return pos = pos;
            } else if (dir == 'D') {
                return pos = row3b[1];
            } else if (dir == 'L') {
                return pos = pos;
            } else if (dir == 'R') {
                return pos = row2b[1];
            }
            break;
        case row2b[1]: //3
            if (dir == 'U') {
                return pos = row1b[0];
            } else if (dir == 'D') {
                return pos = row3b[2];
            } else if (dir == 'L') {
                return pos = row2b[0];
            } else if (dir == 'R') {
                return pos = row2b[2];
            }
            break;
        case row2b[2]: //4
            if (dir == 'U') {
                return pos = pos;
            } else if (dir == 'D') {
                return pos = row3b[3];
            } else if (dir == 'L') {
                return pos = row2b[1];
            } else if (dir == 'R') {
                return pos = pos;
            }
            break;
        case row3b[0]: //5
            if (dir == 'U') {
                return pos = pos;
            } else if (dir == 'D') {
                return pos = pos;
            } else if (dir == 'L') {
                return pos = pos;
            } else if (dir == 'R') {
                return pos = row3b[1];
            }
            break;
        case row3b[1]: //6
            if (dir == 'U') {
                return pos = row2b[0];
            } else if (dir == 'D') {
                return pos = row4b[0];
            } else if (dir == 'L') {
                return pos = row3b[0];
            } else if (dir == 'R') {
                return pos = row3b[2];
            }
            break;
        case row3b[2]: //7
            if (dir == 'U') {
                return pos = row2b[1];
            } else if (dir == 'D') {
                return pos = row4b[1];
            } else if (dir == 'L') {
                return pos = row3b[1];
            } else if (dir == 'R') {
                return pos = row3b[3];
            }
            break;
        case row3b[3]: //8
            if (dir == 'U') {
                return pos = row2b[2];
            } else if (dir == 'D') {
                return pos = row4b[2];
            } else if (dir == 'L') {
                return pos = row3b[2];
            } else if (dir == 'R') {
                return pos = row3b[4];
            }
            break;
        case row3b[4]: //9
            if (dir == 'U') {
                return pos = pos;
            } else if (dir == 'D') {
                return pos = pos;
            } else if (dir == 'L') {
                return pos = row3b[3];
            } else if (dir == 'R') {
                return pos = pos;
            }
            break;
        case row4b[0]: //A
            if (dir == 'U') {
                return pos = row3b[1];
            } else if (dir == 'D') {
                return pos = pos;
            } else if (dir == 'L') {
                return pos = pos;
            } else if (dir == 'R') {
                return pos = row4b[1];
            }
            break;
        case row4b[1]: //B
            if (dir == 'U') {
                return pos = row3b[2];
            } else if (dir == 'D') {
                return pos = row5b[0];
            } else if (dir == 'L') {
                return pos = row4b[0];
            } else if (dir == 'R') {
                return pos = row4b[2];
            }
            break;
        case row4b[2]: //C
            if (dir == 'U') {
                return pos = row3b[3];
            } else if (dir == 'D') {
                return pos = pos;
            } else if (dir == 'L') {
                return pos = row4b[1];
            } else if (dir == 'R') {
                return pos = pos;
            }
            break;
        case row5b[0]: //D
            if (dir == 'U') {
                return pos = row4b[1];
            } else if (dir == 'D') {
                return pos = pos;
            } else if (dir == 'L') {
                return pos = pos;
            } else if (dir == 'R') {
                return pos = pos;
            }
            break;
    }
}

//test var to make sure each line is reading the right lengths
var count = 0;

function findAnswer() {
    for (var i = 0; i < directions.length; i++) {
        for (var j = 0; j < directions[i].length; j++) {
            //be sure to assign the response from options to a var! Otherwise you won't see it lolz
            curr = optionsB(start, directions[i][j]);
            start = curr;
            count = j + 1;
        }
        password += curr;
        count = 0;
    }
}

findAnswer();

//show password, verify length is correct
console.log("The password is " + password + "; password length is " + password.length + "; correct length is " + passlen);