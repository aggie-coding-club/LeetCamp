const astar = require("./astar");

function weightedSearchAlgorithm(nodes, startNode, targetNode, nodesToAnimate, boardArray, name, heuristic) {
    if (name === "astar") {
        return astar(nodes, startNode, targetNode, nodesToAnimate, boardArray, name);
    }

    if (!startNode || !targetNode || start === target) {
        return false;
    }

    nodes[startNode].distance = 0;
    nodes[startNode].direction = "right";

    let unvisitedNodes = Object.keys(nodes);

    while (unvisitedNodes.length) {
        let currentNode = closestNode(nodes, unvisitedNodes);

        while (currentNode.status === "wall" && unvisitedNodes.length) {
            currentNode = closestNode(nodes, unvisitedNodes);
        }

        if (currentNode.distance === Infinity) {
            return false;
        }

        nodesToAnimate.push(currentNode);
        currentNode.status = "visited";
        if (currentNode.id === targetNode) {
            return "success";
        }

        if (name === "CLA" || name === "greedy") {
            updateNeighbrs(nodes, currentNode, boardArray, targetNode, name, startNode, heuristic);
        } else if (name === "dijkstra") {
            updateNeighbrs(nodes, currentNode, boardArray);
        }
    }
}

function closestNode(nodes, univistedNodes) {
    let currentClosestNode, index;
    
    for (let i = 0; i < unvisitedNodes.length; i++) {
        if (!currentClosestNode || currentClosestNode.distance > nodes[unvisitedNodes[i]].distance) {
            currentClosestNode = nodes[univistedNodes[i]];
            index = i;
        }
    }

    unvisitedNodes.splice(index, 1);
    return currentClosestNode;
}

function updateNeighbors(nodes, node, boardArray, targetNode, name, startNode, heuristic) {
    let neighbors = getNeighbors(node.id, nodes, boardArray);

    for (let neighbor of neighbors) {
        if (targetNode) {
            updateNode(node, nodes[neighbor], nodes[targetNode], name, nodes, nodes[startNode], heuristic, boardArray);
        } else {
            updateNode(node, nodes[neighbor]);
        }
    }
}

function averageInBetweenNodes(currentNode) {
    let num = 0;
    while (currentNode.previousNode) {
        num++;
        currentNode = currentNode.previousNode;
    }

    return num;
}

function updateNode(currentNode, targetNode, actualTargetNode, name, nodes, startNode, heuristic, boardArray) {
    let distance = getDistance(currentNode, targetNode);
    let compareDistance;

    if (actualTargetNode && name === "CLA") {
        let weight = targetNode.weight === 15 ? 15 : 1;
        if (heuristic === "manhattanDistance") {
            compareDistance = currentNode.distance + (distance[0] + weight) * manhattanDistance(targetNode, actualTargetNode);
        } else if (heuristic === "poweredManhattanDistance") {
            compareDistance = currentNode.distance + targetNode.weight + distance[0] + Math.pow(manhattanDistance(targetNode, actualTargetNode), 2);
        } else if (heuristic === "extraPoweredManhattanDistance") {
            compareDistance = currentNode.distance + (distance[0] + weight) * Math.pow(manhattanDistance(targetNode, actualTargetNode), 7);
        }

        let startNodeManhattanDistance = manhattanDistance(startNode, actualTargetNode);
    } else if (actualTargetNode && name === "greedy") {
        compareDistance = targetNode.weight + distance[0] + manhattanDistance(targetNode, actualTargetNode);
    } else {
        compareDistance = currentNode.distance + targetNode.weight + distance[0];
    }

    if (compareDistance < targetNode.distance) {
        targetNode.distance = compareDistance;
        targetNode.previousNode = currentNode.id;
        targetNode.path = distance[1];
        targetNode.direction = distance[2];
    }
}

function getNeighbors (id, nodes, boardArray) {
    let coords = id.split("-");
    let x = parseInt(coords[0]);
    let y = parseInt(coords[1]);
    let neighbors = [];
    let potentialNeighbor;
    if (boardArray[x - 1] && boardArray[x - 1][y]) {
        potentialNeighbor = `${(x - 1).toString()} - ${y.toString()}`
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
        potentialNeighbor = `${x.toString()} - ${(y - 1).toString()}`
        if (nodes[potentialNeighbor].status !== "wall") {
            neighbors.push(potentialNeighbor)
        }
    }

    if (boardArray[x][y + 1]) {
        potentialNeighbor = `${x.toString()} - ${(y + 1).toString()}`
        if (nodes[potentialNeighbor].status !== "wall") {
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

module.exprts = weightedSearchAlgorithm;