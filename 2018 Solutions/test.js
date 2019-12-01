let map = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1]];

let stations = [];
let newMap = [];

for (var y = 0; y < map.length; y++) {
    for (var x = 0; x < map.length; x++) {
        if (map[y][x] > 0) {
            stations.push({ x, y });
        }
    }
}

console.log(stations);

for (var y = 0; y < map.length; y++) {
    for (var x = 0; x < map.length; x++) {
        let dist = 99;
        for (let i = 0; i < stations.length; i++) {
            let newdistance = mdistance(x, y, stations[i].x, stations[i].y);
            if (newdistance < dist) {
                dist = newdistance;
            }
        }
    }
}

function mdistance(x1, y1, x2, y2) {
    return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}
