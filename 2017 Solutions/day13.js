const firewall = [[0, 5], [1, 2], [2, 3], [4, 4], [6, 6], [8, 4], [10, 8], [12, 6], [14, 6], [16, 8], [18, 6], [20, 9], [22, 8], [24, 10], [26, 8], [28, 8], [30, 12], [32, 8], [34, 12], [36, 10], [38, 12], [40, 12], [42, 12], [44, 12], [46, 12], [48, 14], [50, 12], [52, 14], [54, 12], [56, 14], [58, 12], [60, 14], [62, 14], [64, 14], [66, 14], [68, 14], [70, 14], [72, 14], [76, 14], [80, 18], [84, 14], [90, 18], [92, 17]];

let picosec = -1;
let severity = 0;
let maxLevel = firewall[firewall.length - 1][0];
let delay = 0;

function findDepth(val) {
    for (let a = 0; a < firewall.length; a++) {
        if (firewall[a][0] === val) {
            return firewall[a];
        }
    }
    return -1;
}

function location(level) {
    let mod = (level - 1) * 2;
    return mod;
}

function findSeverity() {
    for (let i = 0; i <= maxLevel; i++) {
        picosec++;
        let position = i;
        let depth = findDepth(i);

        if (depth === -1) {
            continue;
        }

        let stage = picosec % location(depth[1]);

        if (stage === 0) {
            severity += (depth[0] * depth[1]);
        }
    }
}

findSeverity();
console.log(`Severity: ${severity}`);

let caught = true;


function findDelay(d) {
    let check = 0;
    let updated = 0 + d;
    for (let i = 0; i <= maxLevel; i++) {
        let position = i;
        let depth = findDepth(i);

        if (depth === -1) {
            updated++;
            continue;
        }

        let stage = updated % location(depth[1]);

        if (stage === 0 && position === depth[0]) {
            delay++;
            check++;
            break;
        }
        updated++;
    }

    if (check === 0) {
        caught = false;
        return;
    }
}

while (caught) {
    findDelay(delay);
}

console.log(`Delay: ${delay}`);

