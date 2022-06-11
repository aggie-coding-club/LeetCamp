function unweightedSearchAlgorithm(nodes, startNode, targetNode, nodesToAnimate, boardArray, name) {
    if (!startNode || !targetNode || startNode === targetNode) {
        return false;
    }

    let struct = [nodes[startNode]]
    let visitedNodes = {startNode: true};

    while (struct.length) {
        let currentNode = name === "bfs" ? struct.shift() : struct.pop();
        nodesToAnimate.push(currentNode);

        if (name === "dfs") {
            visitedNodes[currentNode.id] = true;
        }

        currentNode.status = "visited";
        if (currentNode.id === target) {
            return "success";
        }

        let currentNeighbors = getNeighbors(currentNode.id, nodes, boardArray, name);
        for (let neighbor of currentNeighbors) {
            if (!visitedNodes[neighbor]) {
                if (name === "bfs") {
                    visitedNodes[neighbor] = true;
                }

                nodes[neighbor].previousNode = currentNode.id;
                struct.push(nodes[neighbor]);
            }
        }
    }

    return false;
}

function getNeighbors(id, nodes, boardArray, name) {
    let coordinates = id.split("-");
    let x = parseInt(coordinates[0]);
    let y = parseInt(coordinates[1]);
    let neighbors = [];
    let potentialNeighbor;
    if (boardArray[x - 1] && boardArray[x - 1][y]) {
      potentialNeighbor = `${(x - 1).toString()}-${y.toString()}`
      if (nodes[potentialNeighbor].status !== "wall") {
        if (name === "bfs") {
          neighbors.push(potentialNeighbor);
        } else {
          neighbors.unshift(potentialNeighbor);
        }
      }
    }
    if (boardArray[x][y + 1]) {
      potentialNeighbor = `${x.toString()}-${(y + 1).toString()}`
      if (nodes[potentialNeighbor].status !== "wall") {
        if (name === "bfs") {
          neighbors.push(potentialNeighbor);
        } else {
          neighbors.unshift(potentialNeighbor);
        }
      }
    }
    if (boardArray[x + 1] && boardArray[x + 1][y]) {
      potentialNeighbor = `${(x + 1).toString()}-${y.toString()}`
      if (nodes[potentialNeighbor].status !== "wall") {
        if (name === "bfs") {
          neighbors.push(potentialNeighbor);
        } else {
          neighbors.unshift(potentialNeighbor);
        }
      }
    }
    if (boardArray[x][y - 1]) {
      potentialNeighbor = `${x.toString()}-${(y - 1).toString()}`
      if (nodes[potentialNeighbor].status !== "wall") {
        if (name === "bfs") {
          neighbors.push(potentialNeighbor);
        } else {
          neighbors.unshift(potentialNeighbor);
        }
      }
    }
    return neighbors;
  }
  
  module.exports = unweightedSearchAlgorithm;