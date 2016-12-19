//huge shoutout to u/douglowder - couldn't have gotten through this one without your code to illuminate the way. 

/*--- Day 17: Two Steps Forward ---

You're trying to access a secure vault protected by a 4x4 grid of small rooms connected by doors. You start in the top-left room (marked S), and you can access the vault (marked V) once you reach the bottom-right room:

#########
#S| | | #
#-#-#-#-#
# | | | #
#-#-#-#-#
# | | | #
#-#-#-#-#
# | | |  
####### V
Fixed walls are marked with #, and doors are marked with - or |.

The doors in your current room are either open or closed (and locked) based on the hexadecimal MD5 hash of a passcode (your puzzle input) followed by a sequence of uppercase characters representing the path you have taken so far (U for up, D for down, L for left, and R for right).

Only the first four characters of the hash are used; they represent, respectively, the doors up, down, left, and right from your current position. Any b, c, d, e, or f means that the corresponding door is open; any other character (any number or a) means that the corresponding door is closed and locked.

To access the vault, all you need to do is reach the bottom-right room; reaching this room opens the vault and all doors in the maze.

For example, suppose the passcode is hijkl. Initially, you have taken no steps, and so your path is empty: you simply find the MD5 hash of hijkl alone. The first four characters of this hash are ced9, which indicate that up is open (c), down is open (e), left is open (d), and right is closed and locked (9). Because you start in the top-left corner, there are no "up" or "left" doors to be open, so your only choice is down.

Next, having gone only one step (down, or D), you find the hash of hijklD. This produces f2bc, which indicates that you can go back up, left (but that's a wall), or right. Going right means hashing hijklDR to get 5745 - all doors closed and locked. However, going up instead is worthwhile: even though it returns you to the room you started in, your path would then be DU, opening a different set of doors.

After going DU (and then hashing hijklDU to get 528e), only the right door is open; after going DUR, all doors lock. (Fortunately, your actual passcode is not hijkl).

Passcodes actually used by Easter Bunny Vault Security do allow access to the vault if you know the right path. For example:

If your passcode were ihgpwlah, the shortest path would be DDRRRD.
With kglvqrro, the shortest path would be DDUDRLRRUDRD.
With ulqzkmiv, the shortest would be DRURDRUDDLLDLUURRDULRLDUUDDDRR.
Given your vault's passcode, what is the shortest path (the actual path, not just the length) to reach the vault?

--- Part Two ---

You're curious how robust this security solution really is, and so you decide to find longer and longer paths which still provide access to the vault. You remember that paths always end the first time they reach the bottom-right room (that is, they can never pass through it, only end in it).

For example:

If your passcode were ihgpwlah, the longest path would take 370 steps.
With kglvqrro, the longest path would be 492 steps long.
With ulqzkmiv, the longest path would be 830 steps long.
What is the length of the longest path that reaches the vault? */

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

