const weightedSearchAlgorithm = require("../pathfindingAlgorithms/weightedSearchAlgorithm");
const unweightedSearchAlgorithm = require("../pathfindingAlgorithms/unweightedSearchAlgorithm");

function launchInstantAnimations(board, success, type, object, algorithm, heuristic) {
    let nodes = object ? board.objectNodesToAnimate.slice(0) : board.nodesToAnimate.slice(0);
    let shortestNodes;

    for (let i = 0; i < nodes.length; i++){
        if (i === 0) {
            change(nodes[i]);
        } else {
            change(nodes[i], nodes[i - 1]);
        }
    }

    if (object) {
        board.objectNodesToAnimate = [];

        if (success) {
            board.drawShortestPath(board.object, board.start, "object");
            board.clearNodeStatuses();
        
            let newSuccesses;
            if (type === "weighted") {
                newSuccesses = weightedSearchAlgorithm(board.nodes, board.object, board.target, board.nodesToAnimate, board.boardArray, algorithm, heuristic);
            } else {
                newSuccesses = unweightedSearchAlgorithm(board.nodes, board.object, board.target, board.nodesToAnimate, board.boardArray, algorithm);
            }
            
            launchInstantAnimations(board, newSuccesses, type);
            shortestNodes = board.objectShortestPathNodesToAnimate.concat(board.shortestPathNodesToAnimate);
        } else {
            console.log("Failure in launchInstantAnimations.js, line 33");
            board.reset();
            return;
        }

    } else {
        boards.nodesToAnimate = [];
        if (success) {
            if (board.isObject) {
                board.drawShortestPath(board.target, board.object);
            } else {
                board.drawShortestPath(board.target, board.start);
            }

            shortestNodes = board.objectShortestPathNodesToAnimate.concat(board.shortestPathNodesToAnimate);
        } else {
            console.log("Failure in launchInstantAnimations.js, line 49");
            board.reset();
            return;
        }
    }

    let j;
    for(j = 0; j < shortestNodes.length; j++) {
        if (j === 0) {
            shortestPathChange(shortestNodes[j]);
        } else {
            shortestPathChange(shortestNodes[j], shortestNodes[j - 1]);
        }
    }

    board.reset();

    if (object) {
        shortestPathChange(board.nodes[board.target], shortestNodes[j - 1]);
        board.objectShortestPathNodesToAnimate = [];
        board.shortestPathNodesToAnimate = [];
        board.clearNodeStatuses();
        let newSuccesses;

        if (type === "weighted") {
            newSuccesses = weightedSearchAlgorithm(board.nodes, board.object, board.target, board.nodesToAnimate, board.boardArray, algorithm);
        } else {
            newSuccesses = unweightedSearchAlgorithm(board.nodes, board.object, board.target, board.nodesToAnimate, board.boardArray, algorithm);
        }
        launchInstantAnimations(board, newSuccesses, type);
    } else {
        shortestPathChange(board.nodes[board.target], shortestNodes[j - 1]);
        board.objectShortestPathNodesToAnimate = [];
        board.shortestPathNodesToAnimate = [];
    }

    function change(currNode, prevNode) {
        let currHTMLNode = document.getElementById(currNode.id);
        let relevantClassNames = ["start", "shortest-path", "instantshortest-path", "instantshortest-path weight"];
        if (prevNode) {
            let prevHTMLNode = document.getElementById(prevNode.id);
            if (!relevantClassNames.includes(prevHTMLNode.className)) {
                if (object) {
                    prevHTMLNode.className = prevNode.weight === 15 ? "instantvisitedobject weight" : "instantvisitedobject";
                } else {
                    prevHTMLNode.className = prevNode.weight === 15 ? "instantvisited weight" : "instantvisited";
                }
            }
        }
    }

    function shortestPathChange(currNode, prevNode) {
        let currHTMLNode = document.getElementById(currNode.id);
        if (type === "unweighted") {
            currHTMLNode.className = "shortest-path-unweighted";
        } else {
            if (currNode.direction === "up") {
                currHTMLNode.className = "shortest-path-up";
            } else if (currNode.direction === "down") {
                currHTMLNode.className = "shortest-path-down";
            } else if (currNode.direction === "right") {
                currHTMLNode.className = "shortest-path-right";
            } else if (currNode.direction === "left") {
                currHTMLNode.className = "shortest-path-left";
            }
        }

        if (prevNode) {
            let prevHTMLNode = document.getElementById(prevNode.id);
            prevHTMLNode.className = prevNode.weight === 15 ? "instantshortest-path weight" : "instantshortest-path";
        } else {
            let elem = document.getElementById(board.start);
            elem.className = "startTransparent";
        }
    }

};

module.exports = launchInstantAnimations;