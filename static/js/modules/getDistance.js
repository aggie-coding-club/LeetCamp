function getDistance(firstNode, secondNode){

    let currentCoords = firstNode.id.split("-");
    let targetCoords = secondNode.id.split("-");

    let x1 = parseInt(currentCoords[0]);
    let y1 = parseInt(currentCoords[1]);
    let x2 = parseInt(targetCoords[0]);
    let y2 = parseInt(targetCoords[1]);

    if (x2 < x1) {
        if (firstNode.direction === "up") {
            return [1, ["f"], "up"];
        } else if (firstNode.direction === "right") {
            return [2, ["l", "f"], "up"];
        } else if (firstNode.direction === "left") {
            return [2, ["r", "f"], "up"];
        } else if (firstNode.direction === "down") {
            return [3, ["r", "r", "f"], "up"];
        }

    } else if (x2 > x1) {
        if (firstNode.direction === "up") {
            return [3, ["r", "r", "f"], "down"];
        } else if (firstNode.direction === "right") {
            return [2, ["r", "f"], "down"];
        } else if (firstNode.direction === "left") {
            return [2, ["l", "f"], "down"];
        } else if (firstNode.direction === "down") {
            return [1, ["f"], "down"];
        }
    } else if (y2 < y1) {
        if (firstNode.direction === "up") {
            return [2, ["l", "f"], "left"];
        } else if (firstNode.direction === "right") {
            return [3, ["l", "l", "f"], "left"];
        } else if (firstNode.direction === "left") {
            return [1, ["f"], "left"];
        } else if (firstNode.direction === "down") {
            return [2, ["r", "f"], "left"];
        }
    } else if (y2 > y1) {
        if (firstNode.direction === "up") {
            return [2, ["r", "f"], "right"];
        } else if (firstNode.direction === "right") {
            return [1, ["f"], "right"];
        } else if (firstNode.direction === "left") {
            return [3, ["r", "r", "f"], "right"];
        } else if (firstNode.direction === "down") {
            return [2, ["l", "f"], "right"];
        }
    }
}

module.exports = getDistance;