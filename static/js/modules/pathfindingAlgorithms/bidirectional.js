const astar = require("./astar");

function biderictional(nodes, startNode, targetNode, nodesToAnimate, boardArray, name, heuristic, board) {
    if(name == "astar") {
        return astar(nodes, startNode, targetNode, nodesToAnimate, boardArray, name);
    }

    if(!startNode || !targetNode || startNode === targetNode) {
        return false;
    }

    nodes[startNode].distance = 0;
    nodes[startNode].direction = "right";
    nodes[targetNode].otherDistance = 0;
    nodes[targetNode].otherDirection = "left";

    let visitedNodes = {};

    // Both of these variables are arrays of unvisited Node objects
    let firstUnvisitedNodes = Object.keys(nodes);
    let secondUnvisitedNodes = Object.keys(nodes);

    while(firstUnvisitedNodes.length && secondUnvisitedNodes.length) {
        let currentNode = closestNode(nodes, firstUnvisitedNodes);
        let nextCurrentNode = closestNode(nodes, secondUnvisitedNodes);
        
        while((currentNode.status === "wall" || nextCurrentNode.status === "wall") && firstUnvisitedNodes.length && secondUnvisitedNodes.length) {
            if (currentNode.status === "wall") {
                currentNode = closestNode(nodes, firstUnvisitedNodes);
            }

            if (nextCurrentNode.status === "wall") {
                nextCurrentNode = nextClosestNode(nodes, secondUnvisitedNodes);
            }
        }

        if (currentNode.distance === Infinity || nextCurrentNode.otherDistance === Infinity) {
            return false;
        }

        nodesToAnimate.push(currentNode);
        nodesToAnimate.push(nextCurrentNode);

        currentNode.status = "visited";
        nextCurrentNode.status = "visited";

        if (visitedNodes[currentNode.id]) {
            board.middleNode = currentNode.id;
            return "success";
        } else if (visitedNodes[nextCurrentNode.id]) {
            board.middleNode = nextCurrentNode.id;
            return "success";
        } else if (currentNode === nextCurrentNode) {
            board.middleNode = nextCurrentNode.id;
            return "success";
        }

        visitedNodes[currentNode.id] = true;
        visitedNodes[nextCurrentNode.id] = true;

        // Update adjacent nodes accordingly
        updateNeighbors(nodes, currentNode, boardArray, targetNode, name, startNode, heuristic);
        updateNextNodeNeighbors(nodes, nextCurrentNode, boardArray, startNode, name, targetNode, heuristic);
    }
}

function closestNode(nodes, univistedNodes) {
    let currentClosestNode, index;

    for (let i = 0; i < univistedNodes.length; i++) {
        if (!currentClosestNode || currentClosestNode.distance > nodes[univistedNodes[i]].distance) {
            currentClosestNode = nodes[univistedNodes[i]];
            index = i;
        }
    }

    univistedNodes.splice(index, 1);
    return currentClosestNode;
}

function nextClosestNode(nodes, unvisitedNodes) {
    let currentClosestNode, index;

    for (let i = 0; i < unvisitedNodes.length; i++) {
        if(!currentClosestNode || currentClosestNode.otherDistance > nodes[unvisitedNodes[i]].otherDistance) {
            currentClosestNode = nodes[unvisitedNodes[i]];
            index = i;
        }
    }

    unvisitedNodes.splice(index, 1);
    return currentClosestNode;
}

function updateNeighbors(nodes, node, boardArray, targetNode, name, startNode, heuristic) {
    let neighbors = getNeighbors(node.id, nodes, boardArray);
    for (let neighbor of neighbors) {
        updateNode(nodes, nodes[neighbor], nodes[targetNode], name, nodes, nodes[startNode], heuristic, boardArray);
    }
}

function updateNextNodeNeighbors(nodes, node, boardArray, targetNode, name, startNode, heuristic) {
    let neighbors = getNeighbors(node.id, nodes, boardArray);
    for (let neighbor of neighbors) {
        updateNextNode(node, nodes[neighbor], nodes[targetNode], name, nodes, nodes[startNode], heuristic, boardArray);
    }
}

function updateNode(currentNode, targetNode, actualTargetNode, name, nodes, startNode, heuristic, boardArray) {
    let nodeDistance = getDistance(currentNode, targetNode);
    let nodeWeight = targetNode.weight === 15 ? 15 : 1;
    let distanceToCompare = currentNode.distance + (nodeWeight + nodeDistance[0]) * manhattanDistance(targetNode, actualTargetNode);

    if (distanceToCompare < targetNode.distance) {
        targetNode.distance = distanceToCompare;
        targetNode.previousNode = currentNode.id;
        targetNode.path = nodeDistance[1];
        targetNode.direction = nodeDistance[2];
    }
}

function updateNextNode(currentNode, targetNode, actualTargetNode, name, nodes, startNode, heuristic, boardArray) {
    let nodeDistance = getNextNodeDistance(currentNode, targetNode);
    let nodeWeight = targetNode.weight === 15 ? 15 : 1;
    let distanceToCompare = currentNode.otherDistance + (nodeWeight + nodeDistance[0]) * manhattanDistance(targetNode, actualTargetNode);

    if (distanceToCompare < targetNode.otherDistance) {
        targetNode.otherDistance = distanceToCompare;
        targetNode.otherPreviousNode = currentNode.id;
        targetNode.path = nodeDistance[1];
        targetNode.otherDirection = nodeDistance[2];
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
      if (nodes[potentialNeighbor].status !== "wall") neighbors.push(potentialNeighbor);
    }
    if (boardArray[x + 1] && boardArray[x + 1][y]) {
      potentialNeighbor = `${(x + 1).toString()}-${y.toString()}`
      if (nodes[potentialNeighbor].status !== "wall") neighbors.push(potentialNeighbor);
    }
    if (boardArray[x][y - 1]) {
      potentialNeighbor = `${x.toString()}-${(y - 1).toString()}`
      if (nodes[potentialNeighbor].status !== "wall") neighbors.push(potentialNeighbor);
    }
    if (boardArray[x][y + 1]) {
      potentialNeighbor = `${x.toString()}-${(y + 1).toString()}`
      if (nodes[potentialNeighbor].status !== "wall") neighbors.push(potentialNeighbor);
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
    if (x2 < x1) {
      if (nodeOne.direction === "up") {
        return [1, ["f"], "up"];
      } else if (nodeOne.direction === "right") {
        return [2, ["l", "f"], "up"];
      } else if (nodeOne.direction === "left") {
        return [2, ["r", "f"], "up"];
      } else if (nodeOne.direction === "down") {
        return [3, ["r", "r", "f"], "up"];
      }
    } else if (x2 > x1) {
      if (nodeOne.direction === "up") {
        return [3, ["r", "r", "f"], "down"];
      } else if (nodeOne.direction === "right") {
        return [2, ["r", "f"], "down"];
      } else if (nodeOne.direction === "left") {
        return [2, ["l", "f"], "down"];
      } else if (nodeOne.direction === "down") {
        return [1, ["f"], "down"];
      }
    }
    if (y2 < y1) {
      if (nodeOne.direction === "up") {
        return [2, ["l", "f"], "left"];
      } else if (nodeOne.direction === "right") {
        return [3, ["l", "l", "f"], "left"];
      } else if (nodeOne.direction === "left") {
        return [1, ["f"], "left"];
      } else if (nodeOne.direction === "down") {
        return [2, ["r", "f"], "left"];
      }
    } else if (y2 > y1) {
      if (nodeOne.direction === "up") {
        return [2, ["r", "f"], "right"];
      } else if (nodeOne.direction === "right") {
        return [1, ["f"], "right"];
      } else if (nodeOne.direction === "left") {
        return [3, ["r", "r", "f"], "right"];
      } else if (nodeOne.direction === "down") {
        return [2, ["l", "f"], "right"];
      }
    }
  }
  
  function getNextNodeDistance(nodeOne, nodeTwo) {
    let currentCoordinates = nodeOne.id.split("-");
    let targetCoordinates = nodeTwo.id.split("-");
    let x1 = parseInt(currentCoordinates[0]);
    let y1 = parseInt(currentCoordinates[1]);
    let x2 = parseInt(targetCoordinates[0]);
    let y2 = parseInt(targetCoordinates[1]);
    if (x2 < x1) {
      if (nodeOne.otherDirection === "up") {
        return [1, ["f"], "up"];
      } else if (nodeOne.otherDirection === "right") {
        return [2, ["l", "f"], "up"];
      } else if (nodeOne.otherDirection === "left") {
        return [2, ["r", "f"], "up"];
      } else if (nodeOne.otherDirection === "down") {
        return [3, ["r", "r", "f"], "up"];
      }
    } else if (x2 > x1) {
      if (nodeOne.otherDirection === "up") {
        return [3, ["r", "r", "f"], "down"];
      } else if (nodeOne.otherDirection === "right") {
        return [2, ["r", "f"], "down"];
      } else if (nodeOne.otherDirection === "left") {
        return [2, ["l", "f"], "down"];
      } else if (nodeOne.otherDirection === "down") {
        return [1, ["f"], "down"];
      }
    }
    if (y2 < y1) {
      if (nodeOne.otherDirection === "up") {
        return [2, ["l", "f"], "left"];
      } else if (nodeOne.otherDirection === "right") {
        return [3, ["l", "l", "f"], "left"];
      } else if (nodeOne.otherDirection === "left") {
        return [1, ["f"], "left"];
      } else if (nodeOne.otherDirection === "down") {
        return [2, ["r", "f"], "left"];
      }
    } else if (y2 > y1) {
      if (nodeOne.otherDirection === "up") {
        return [2, ["r", "f"], "right"];
      } else if (nodeOne.otherDirection === "right") {
        return [1, ["f"], "right"];
      } else if (nodeOne.otherDirection === "left") {
        return [3, ["r", "r", "f"], "right"];
      } else if (nodeOne.otherDirection === "down") {
        return [2, ["l", "f"], "right"];
      }
    }
  }

  function manhattanDistance(nodeOne, nodeTwo) {
    let nodeOneCoordinates = nodeOne.id.split("-").map(ele => parseInt(ele));
    let nodeTwoCoordinates = nodeTwo.id.split("-").map(ele => parseInt(ele));
    let xChange = Math.abs(nodeOneCoordinates[0] - nodeTwoCoordinates[0]);
    let yChange = Math.abs(nodeOneCoordinates[1] - nodeTwoCoordinates[1]);
    return (xChange + yChange);
  }
  
  function weightedManhattanDistance(nodeOne, nodeTwo, nodes) {
    let nodeOneCoordinates = nodeOne.id.split("-").map(ele => parseInt(ele));
    let nodeTwoCoordinates = nodeTwo.id.split("-").map(ele => parseInt(ele));
    let xChange = Math.abs(nodeOneCoordinates[0] - nodeTwoCoordinates[0]);
    let yChange = Math.abs(nodeOneCoordinates[1] - nodeTwoCoordinates[1]);
  
    if (nodeOneCoordinates[0] < nodeTwoCoordinates[0] && nodeOneCoordinates[1] < nodeTwoCoordinates[1]) {
  
      let additionalxChange = 0,
          additionalyChange = 0;
      for (let currentx = nodeOneCoordinates[0]; currentx <= nodeTwoCoordinates[0]; currentx++) {
        let currentId = `${currentx}-${nodeOne.id.split("-")[1]}`;
        let currentNode = nodes[currentId];
        additionalxChange += currentNode.weight;
      }
      for (let currenty = nodeOneCoordinates[1]; currenty <= nodeTwoCoordinates[1]; currenty++) {
        let currentId = `${nodeTwoCoordinates[0]}-${currenty}`;
        let currentNode = nodes[currentId];
        additionalyChange += currentNode.weight;
      }
  
      let otherAdditionalxChange = 0,
          otherAdditionalyChange = 0;
      for (let currenty = nodeOneCoordinates[1]; currenty <= nodeTwoCoordinates[1]; currenty++) {
        let currentId = `${nodeOne.id.split("-")[0]}-${currenty}`;
        let currentNode = nodes[currentId];
        additionalyChange += currentNode.weight;
      }
      for (let currentx = nodeOneCoordinates[0]; currentx <= nodeTwoCoordinates[0]; currentx++) {
        let currentId = `${currentx}-${nodeTwoCoordinates[1]}`;
        let currentNode = nodes[currentId];
        additionalxChange += currentNode.weight;
      }
  
      if (additionalxChange + additionalyChange < otherAdditionalxChange + otherAdditionalyChange) {
        xChange += additionalxChange;
        yChange += additionalyChange;
      } else {
        xChange += otherAdditionalxChange;
        yChange += otherAdditionalyChange;
      }
    } else if (nodeOneCoordinates[0] < nodeTwoCoordinates[0] && nodeOneCoordinates[1] >= nodeTwoCoordinates[1]) {
      let additionalxChange = 0,
          additionalyChange = 0;
      for (let currentx = nodeOneCoordinates[0]; currentx <= nodeTwoCoordinates[0]; currentx++) {
        let currentId = `${currentx}-${nodeOne.id.split("-")[1]}`;
        let currentNode = nodes[currentId];
        additionalxChange += currentNode.weight;
      }
      for (let currenty = nodeOneCoordinates[1]; currenty >= nodeTwoCoordinates[1]; currenty--) {
        let currentId = `${nodeTwoCoordinates[0]}-${currenty}`;
        let currentNode = nodes[currentId];
        additionalyChange += currentNode.weight;
      }
  
      let otherAdditionalxChange = 0,
          otherAdditionalyChange = 0;
      for (let currenty = nodeOneCoordinates[1]; currenty >= nodeTwoCoordinates[1]; currenty--) {
        let currentId = `${nodeOne.id.split("-")[0]}-${currenty}`;
        let currentNode = nodes[currentId];
        additionalyChange += currentNode.weight;
      }
      for (let currentx = nodeOneCoordinates[0]; currentx <= nodeTwoCoordinates[0]; currentx++) {
        let currentId = `${currentx}-${nodeTwoCoordinates[1]}`;
        let currentNode = nodes[currentId];
        additionalxChange += currentNode.weight;
      }
  
      if (additionalxChange + additionalyChange < otherAdditionalxChange + otherAdditionalyChange) {
        xChange += additionalxChange;
        yChange += additionalyChange;
      } else {
        xChange += otherAdditionalxChange;
        yChange += otherAdditionalyChange;
      }
    } else if (nodeOneCoordinates[0] >= nodeTwoCoordinates[0] && nodeOneCoordinates[1] < nodeTwoCoordinates[1]) {
      let additionalxChange = 0,
          additionalyChange = 0;
      for (let currentx = nodeOneCoordinates[0]; currentx >= nodeTwoCoordinates[0]; currentx--) {
        let currentId = `${currentx}-${nodeOne.id.split("-")[1]}`;
        let currentNode = nodes[currentId];
        additionalxChange += currentNode.weight;
      }
      for (let currenty = nodeOneCoordinates[1]; currenty <= nodeTwoCoordinates[1]; currenty++) {
        let currentId = `${nodeTwoCoordinates[0]}-${currenty}`;
        let currentNode = nodes[currentId];
        additionalyChange += currentNode.weight;
      }
  
      let otherAdditionalxChange = 0,
          otherAdditionalyChange = 0;
      for (let currenty = nodeOneCoordinates[1]; currenty <= nodeTwoCoordinates[1]; currenty++) {
        let currentId = `${nodeOne.id.split("-")[0]}-${currenty}`;
        let currentNode = nodes[currentId];
        additionalyChange += currentNode.weight;
      }
      for (let currentx = nodeOneCoordinates[0]; currentx >= nodeTwoCoordinates[0]; currentx--) {
        let currentId = `${currentx}-${nodeTwoCoordinates[1]}`;
        let currentNode = nodes[currentId];
        additionalxChange += currentNode.weight;
      }
  
      if (additionalxChange + additionalyChange < otherAdditionalxChange + otherAdditionalyChange) {
        xChange += additionalxChange;
        yChange += additionalyChange;
      } else {
        xChange += otherAdditionalxChange;
        yChange += otherAdditionalyChange;
      }
    } else if (nodeOneCoordinates[0] >= nodeTwoCoordinates[0] && nodeOneCoordinates[1] >= nodeTwoCoordinates[1]) {
        let additionalxChange = 0,
            additionalyChange = 0;
        for (let currentx = nodeOneCoordinates[0]; currentx >= nodeTwoCoordinates[0]; currentx--) {
          let currentId = `${currentx}-${nodeOne.id.split("-")[1]}`;
          let currentNode = nodes[currentId];
          additionalxChange += currentNode.weight;
        }
        for (let currenty = nodeOneCoordinates[1]; currenty >= nodeTwoCoordinates[1]; currenty--) {
          let currentId = `${nodeTwoCoordinates[0]}-${currenty}`;
          let currentNode = nodes[currentId];
          additionalyChange += currentNode.weight;
        }
  
        let otherAdditionalxChange = 0,
            otherAdditionalyChange = 0;
        for (let currenty = nodeOneCoordinates[1]; currenty >= nodeTwoCoordinates[1]; currenty--) {
          let currentId = `${nodeOne.id.split("-")[0]}-${currenty}`;
          let currentNode = nodes[currentId];
          additionalyChange += currentNode.weight;
        }
        for (let currentx = nodeOneCoordinates[0]; currentx >= nodeTwoCoordinates[0]; currentx--) {
          let currentId = `${currentx}-${nodeTwoCoordinates[1]}`;
          let currentNode = nodes[currentId];
          additionalxChange += currentNode.weight;
        }
  
        if (additionalxChange + additionalyChange < otherAdditionalxChange + otherAdditionalyChange) {
          xChange += additionalxChange;
          yChange += additionalyChange;
        } else {
          xChange += otherAdditionalxChange;
          yChange += otherAdditionalyChange;
        }
      }
  
  
    return xChange + yChange;
  
  
  }
  
  module.exports = bidirectional;