const firewall = [[0, 3], [1, 2], [4, 4], [6, 4]];

let picosec = -1;
let severity = 0;

function findDepth(val) {
    for (let a = 0; a < firewall.length; a++) {
        if (firewall[a][0] === val) {
            return firewall[a];
        }
    }
    return -1;
}

for (let i = 0; i <= 6; i++) {
    picosec++;
    let position = i;
    let depth = findDepth(i);

    if (depth === -1) {
        continue;
    }

    let initial = picosec % depth[1];
    let next = (picosec + 1) % depth[1];

    if (position === depth[0]) {
        let security = initial;
        if (security === 0) {
            severity += (depth[0] * depth[1]);
        }
    }
}

console.log(`Severity: ${severity}`);
