//huge shoutout to u/douglowder - couldn't have gotten through this one without your code to illuminate the way. 

var crypto = require('crypto');

var passcode = 'dmypynyp';

var height = 4;
var width = 4;

//functions to switch between x,y and an id 
var nodeIdfromXY = function (v) {
    //if a wall in any direction, return null
    if (v[0] < 0 || v[0] >= width) {
        return null;
    }
    if (v[1] < 0 || v[1] >= height) {
        return null;
    }
    //otherwise return a value to use for id
    return width * v[1] + v[0];
};

//gets x value within width
var XfromId = function (nodeId) {
    return nodeId % width;
};

//gets y value 
var YfromId = function (nodeId) {
    return Math.floor(nodeId / width);
};

var XYfromId = function (nodeId) {
    return [XfromId(nodeId), YfromId(nodeId)];
};

//returns direction to go from node1 to possible node2
var direction = function (node1, node2) {
    var v1 = XYfromId(node1);
    var v2 = XYfromId(node2);
    if (v2[1] === v1[1]) {
        if (v2[0] === v1[0]) {
            return null;
        }
        return (v2[0] > v1[0] ? 'R' : 'L');
    } else if (v2[0] === v1[0]) {
        return (v2[1] > v1[1] ? 'D' : 'U');
    }
    return null;
};

//function to find next node in given direction if available
var nextNode = function (node, direction) {
    var v = XYfromId(node);
    switch (direction) {
        case 'R':
            v[0]++;
            break;
        case 'L':
            v[0]--;
            break;
        case 'D':
            v[1]++;
            break;
        case 'U':
            v[1]--;
            break;
    }
    return nodeIdfromXY(v);
};

//find all valid directions from given hash
var validDirections = function (hash) {
    var directions = ['U', 'D', 'L', 'R'];
    var valid = [];
    for (var i = 0; i < 4; i++) {
        if (hash.charAt(i).match(/[b-f]/)) {
            valid.push(directions[i]);
        }
    }
    return valid;
};

//finds all reachable neighbor nodes for current string
var neighbors = function (string, node) {
    string = passcode + string;
    string = crypto.createHash('md5').update(string).digest('hex');
    var valid = validDirections(string);
    var v = [];
    for (var i = 0; i < valid.length; i++) {
        var n = nextNode(node, valid[i]);
        if (n !== null) {
            v.push(n);
        }
    }
    return v;
};

//DFS to find all paths 
var searchNext = function (paths, string, start, end) {
    //if you're already at the end, push the current string and break the search
    if (start === end) {
        paths.push(string);
        return;
    }
    //gets neighbors and from each place from start, searches string with added directions
    var n = neighbors(string, start);
    for (var i = 0; i < n.length; i++) {
        var d = direction(start, n[i]);
        searchNext(paths, string + d, n[i], end);
    }
};

//function to return only the valid paths
var findGoodPaths = function () {
    var paths = [];
    searchNext(paths, "", 0, nodeIdfromXY([width - 1, height - 1]));
    return paths;
};

//call to find good paths
var goodPaths = findGoodPaths();

//get and log answers
var shortest = goodPaths.reduce(function (a, b) {
    return (a.length < b.length ? a : b);
});
console.log("Shortest path is " + shortest);

var longest = goodPaths.reduce(function (a, b) {
    return (a.length > b.length ? a : b);
});
console.log("Longest path length is " + longest.length);

