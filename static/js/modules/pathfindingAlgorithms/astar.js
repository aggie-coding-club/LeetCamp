function astar(nodes, startNode, targetNode, nodesToAnimate, boardArray, name, heuristic) {
    if(!start || !target || start === target) {
        return false;
    }

    nodes[startNode].distance = 0;
    nodes[startNode].totalDistance = 0;
    nodes[startNode].direction = "up";

    // Create a string of all unvisited node object keys
    let univistedNodes = Object.keys(nodes);

    // While there are still nodes to be visited
    while(univistedNodes.length) {
        let currentNode = closestNode(nodes, univistedNodes);
        while(currentNode.status === "wall" && univistedNodes.length) {
            currentNode = closestNode(nodes, univistedNodes);
        }

        if(currentNode.distance === Infinity) {
            return false;
        }

        nodesToAnimate.push(currentNode);
        currentNode.status = "visited";
        if (currentNode.id === target) {
            return "success";
        }

        updateNeighbors(nodes, currentNode, boardArray, targetNode, name, startNode, heuristic);
    }
}

function closestNode(nodes, unvisitedNodes) {
    let currentClosestNode, index;

    for(let i =0 ; i < unvisitedNodes.length; i++) {
        if (!currentClosestNode || currentClosestNode.totalDistance > nodes[unvisitedNodes[i]].totalDistance) {
            currentClosestNode = nodes[unvisitedNodes[i]];
            index = i;
        } else if (currentClosestNode.totalDistance === nodes[unvisitedNodes[i]].totalDistance) {
            if (currentClosestNode.heuristicDistance > nodes[unvisitedNodes[i]].heuristicDistance) {
                currentClosestNode = nodes[unvisitedNodes[i]];
                index = i;
            }
        }
    }

    unvisitedNodes.splice(index, 1);
    return currentClosestNode;
}

function updateNeighbors(nodes, node, boardArray, targetNode, name, startNode, heuristic) {
    let neighbors = getNeighbors(node.id, nodes, boardArray);

    for(let neighbor of neighbors) {
        if (targetNode) {
            updateNode(node, nodes[neighbor], nodes[targetNode], name, nodes, nodes[startNode], heuristic, boardArray);
        } else {
            updateNode(node, nodes[neighbor]);
        }
    }
}

function updateNode(currentNode, tempTargetNode, actualTargetNode, name, nodes, startNode, heuristic, boardArray) {
    let distance = getDistance(currentNode, targetNode);

    if(!tempTargetNode.heuristicDistance) {
        tempTargetNode.heuristicDistance = manhattanDistance(tempTargetNode, actualTargetNode);
    }

    let compareDistances = currentNode.distance + tempTargetNode.weight + distance[0];
    if (compareDistances < tempTargetNode.distance) {
        tempTargetNode.distance = compareDistances;
        tempTargetNode.totalDistance = tempTargetNode.distance + tempTargetNode.heuristicDistance;
        tempTargetNode.previousNode = currentNode.id;
        tempTargetNode.path = distance[1];
        tempTargetNode.direction = distance[2];
    }
}

function getNeighbors(id, nodes, boardArray) {
    let coordinates = id.split("-");
    let x = parseInt(coordinates[0]);
    let y = parseInt(coordinates[1]);

    let neighbors = [];

    let potentialNeighbor;

    if (boardArray[x - 1] && boardArray[x - 1][y]) {
        potentialNeighbor = `${(x - 1).toString()}-${y.toString()}`
        if (nodes[potentialNeighbor].status !== "wall") {
            neighbors.push(potentialNeighbor);
        }
    }

    if (boardArray[x + 1] && boardArray[x + 1][y]) {
        potentialNeighbor = `${(x + 1).toString()}-${y.toString()}`
        if (nodes[potentialNeighbor].status !== "wall") {
            neighbors.push(potentialNeighbor);
        }
    }

    if (boardArray[x][y - 1]) {
        potentialNeighbor = `${x.toString()}-${(y - 1).toString()}`
        if (nodes[potentialNeighbor].status !== "wall") {
            neighbors.push(potentialNeighbor);
        }
    }

    if (boardArray[x][y + 1]) {
        potentialNeighbor = `${x.toString()}-${(y + 1).toString()}`
        if(nodes[potentialNeighbor].status !== "wall") {
            neighbors.push(potentialNeighbor);
        }
    }

    return neighbors;
}

function getDistance(nodeOne, nodeTwo) {
    let currentCoordinates = nodeOne.id.split("-");
    let targetCoordinates = nodeTwo.id.split("-");
    let x1 = parseInt(currentCoordinates[0]);
    let y1 = parseInt(currentCoordinates[1]);
    let x2 = parseInt(targetCoordinates[0]);
    let y2 = parseInt(targetCoordinates[1]);

    if (x2 < x1 && y1 === y2) {
      if (nodeOne.direction === "up") {
        return [1, ["f"], "up"];
      } else if (nodeOne.direction === "right") {
        return [2, ["l", "f"], "up"];
      } else if (nodeOne.direction === "left") {
        return [2, ["r", "f"], "up"];
      } else if (nodeOne.direction === "down") {
        return [3, ["r", "r", "f"], "up"];
      } else if (nodeOne.direction === "up-right") {
        return [1.5, null, "up"];
      } else if (nodeOne.direction === "down-right") {
        return [2.5, null, "up"];
      } else if (nodeOne.direction === "up-left") {
        return [1.5, null, "up"];
      } else if (nodeOne.direction === "down-left") {
        return [2.5, null, "up"];
      }

    } else if (x2 > x1 && y1 === y2) {
      if (nodeOne.direction === "up") {
        return [3, ["r", "r", "f"], "down"];
      } else if (nodeOne.direction === "right") {
        return [2, ["r", "f"], "down"];
      } else if (nodeOne.direction === "left") {
        return [2, ["l", "f"], "down"];
      } else if (nodeOne.direction === "down") {
        return [1, ["f"], "down"];
      } else if (nodeOne.direction === "up-right") {
        return [2.5, null, "down"];
      } else if (nodeOne.direction === "down-right") {
        return [1.5, null, "down"];
      } else if (nodeOne.direction === "up-left") {
        return [2.5, null, "down"];
      } else if (nodeOne.direction === "down-left") {
        return [1.5, null, "down"];
      }
    }

    if (y2 < y1 && x1 === x2) {
      if (nodeOne.direction === "up") {
        return [2, ["l", "f"], "left"];
      } else if (nodeOne.direction === "right") {
        return [3, ["l", "l", "f"], "left"];
      } else if (nodeOne.direction === "left") {
        return [1, ["f"], "left"];
      } else if (nodeOne.direction === "down") {
        return [2, ["r", "f"], "left"];
      } else if (nodeOne.direction === "up-right") {
        return [2.5, null, "left"];
      } else if (nodeOne.direction === "down-right") {
        return [2.5, null, "left"];
      } else if (nodeOne.direction === "up-left") {
        return [1.5, null, "left"];
      } else if (nodeOne.direction === "down-left") {
        return [1.5, null, "left"];
      }

    } else if (y2 > y1 && x1 === x2) {
      if (nodeOne.direction === "up") {
        return [2, ["r", "f"], "right"];
      } else if (nodeOne.direction === "right") {
        return [1, ["f"], "right"];
      } else if (nodeOne.direction === "left") {
        return [3, ["r", "r", "f"], "right"];
      } else if (nodeOne.direction === "down") {
        return [2, ["l", "f"], "right"];
      } else if (nodeOne.direction === "up-right") {
        return [1.5, null, "right"];
      } else if (nodeOne.direction === "down-right") {
        return [1.5, null, "right"];
      } else if (nodeOne.direction === "up-left") {
        return [2.5, null, "right"];
      } else if (nodeOne.direction === "down-left") {
        return [2.5, null, "right"];
      }
    }
  }

  function manhattanDistance(firstNode, secondNode) {
      let firstNodeCoords = firstNode.id.split("-").map(element => parseInt(element));
      let secondNodeCoords = secondNode.id.split("-").map(element => parseInt(element));

      let x1 = firstNodeCoords[0];
      let x2 = secondNodeCoords[0];
      let y1 = firstNodeCoords[1];
      let y2 = secondNodeCoords[1];

      let deltaX = Math.abs(x1 - x2);
      let deltaY = Math.abs(y1 - y2);

      return (deltaX + deltaY);
  }

module.exports = astar;