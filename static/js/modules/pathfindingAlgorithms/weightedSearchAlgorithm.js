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
            // Do something
        }
    }

}