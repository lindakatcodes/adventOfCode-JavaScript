const fs = require('fs');

let valid = 0;

const data = fs.readFileSync('../2017 Solutions/inputs/day04Input.txt').toString();

const input = data.split('\r\n');

function part1() {
    for (let i = 0; i < input.length; i++) {
        const currentPass = input[i].split(' ');
        let counter = 0;

        for (let k = 0; k < currentPass.length; k++) {
            const ele = currentPass[k];
            let pos = currentPass.indexOf(ele);
            let num = 0;
            while (pos !== -1) {
                num++;
                pos = currentPass.indexOf(ele, pos + 1);
            }

            if (num > 1) {
                break;
            } else if (num === 1) {
                counter++;
            }
        }

        if (counter === currentPass.length) {
            valid++;
        }
    }
}

function part2() {
    for (let i = 0; i < input.length; i++) {
        const currentPass = input[i].split(' ');
        let counter = 0;

        for (let k = 0; k < currentPass.length; k++) {
            const ele = currentPass[k];
            let num = 0;

            const testing = currentPass.filter(word => word.length === ele.length);
            testing.splice(testing.indexOf(ele), 1);

            for (let j = 0; j < testing.length; j++) {
                const thisWord = testing[j];

                const a = thisWord.split('').sort().join('');
                const b = ele.split('').sort().join('');

                if (a === b) {
                    num++;
                    break;
                }
            }


            if (num > 0) {
                break;
            } else if (num === 0) {
                counter++;
            }
        }

        if (counter === currentPass.length) {
            valid++;
        }
    }
}

part1();
console.log(`${valid} valid inputs for part 1.`);

valid = 0;

part2();
console.log(`${valid} valid inputs for part 2.`);
