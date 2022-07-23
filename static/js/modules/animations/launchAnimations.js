const weightedSearchAlgorithm = require("../pathfindingAlgorithms/weightedSearchAlgorithm");
const unweightedSearchAlgorithm = require("../pathfindingAlgorithms/unweightedSearchAlgorithm");

function launchAnimations(board, success, type, object, algorithm, heuristic) {
    let nodes = object ? board.objectNodesToAnimate.slice(0) : board.nodesToAnimate.slice(0);
    let animationSpeed = board.speed === "fast" ? 0 : board.speed === "average" ? 100 : 500;
    let shortestNodes;

    function timeout(idx) {
        setTimeout(function () {
            if (idx === nodes.length) {
                if (object) {
                    board.objectNodesToAnimate = [];
    
                    if (success) {
                        board.addShortestPath(board.object, board.start, "object");
                        board.claerNodeStatuses();
                        let newSuccess;
    
                        if (board.currentAlgorithm === "bidirectional") {
    
                        } else {
                            if (type === "weighted") {
                                newSuccess = weightedSearchAlgorithm(board.nodes, board.object, board.target, board.nodesToAnimate, board.boardArray, algorithm, heuristic);
                            } else {
                                newSuccess = unweightedSearchAlgorithm(board.nodes, board.object, board.target, board.nodesToAnimate, board.boardArray, algorithm);
                            }
                        }
                        document.getElementById(board.object).className = "visitedObjectNode";
                        launchAnimations(board, newSuccess, type);
                        return;
                    } else {
                        console.log("Fail");
                        board.reset();
                        board.toggleButtons();
                        return;
                    }
                } else {
                    board.nodesToAnimate = [];
                    if (success) {
                        if (document.getElementById(board.target).className !== "visitedTargetNodeBlue") {
                            document.getElementById(board.target).className = "visitedTargetNodeBlue";
                        }
    
                        if (board.isObject) {
                            board.addShortestPath(board.target, board.object);
                            board.drawShortestPathTimeout(board.target, board.object, type, "object");
                            board.objectShortestPathNodesToAnimate = [];
                            board.shortestPathNodesToAnimate = [];
                            board.reset("objectNotTransparent");
                        } else {
                            board.drawShortestPathTimeout(board.target, board.start, type);
                            board.objectShortestPathNodesToAnimate = [];
                            board.shortestPathNodesToAnimate = [];
                            board.reset();
                        }
    
                        shortestNodes = board.objectShortestPathNodesToAnimate.concat(board.shortestPathNodesToAnimate);
                        return;
                    } else {
                        console.log("Fail");
                        board.reset();
                        board.toggleButtons();
                        return;
                    }
                }
            } else if (idx === 0) {
                if (object) {
                    document.getElementById(board.start).className = "visitedStartNodePurple";
                } else {
                    if (document.getElementById(board.start).className !== "visitedStartNodePurple") {
                        document.getElementById(board.start).className = "visitedStartNodeBlue";
                    }
                }
    
                if (board.currentAlgorithm === "bidirectional") {
                    document.getElementById(board.target).className = "visitedTargetNodeBlue";
                }
                change(nodes[idx]);
            } else if (idx === nodes.length - 1 && board.currentAlgorithm === "bidirectional") {
                change(nodes[idx], nodes[idx - 1], "bidirectional");
            } else {
                change(nodes[idx], nodes[idx - 1]);
            }
    
            timeout(idx + 1);
        }, speed);
    }

    function change(currentNode, previousNode, bidirectional) {
        let currentHTMLNode = document.getElementById(currentNode.id);
        let classNames = ["start", "target", "object", "visitedStartNodeBlue", "visitedStartNodePurple", "visitedObjectNode", "visitedTargetNodePurple", "visitedTargetNodeBlue"];
        if (!classNames.includes(currentHTMLNode.className)) {
            currentHTMLNode.className = !bidirectional ? "current" : currentNode.weight === 15 ? "visited weight" : "visited";
        }

        if (currentHTMLNode.className === "visitedStartNodePurple" && !object) {
            currentHTMLNode.className = "visitedStartNodeBlue";
        }

        if (currentHTMLNode.className === "target" && object) {
            currentHTMLNode.className = "visitedTargetNodePurple";
        }

        if (previousNode) {
            let previousHTMLNode = document.getElementById(previousNode.id);
            if (!classNames.includes(previousHTMLNode.class)) {
                if (object) {
                    previousHTMLNode.className = previousNode.weight === 15 ? "visitedobject weight" : "visitedobject";
                } else {
                    previousHTMLNode.className = previousNode.weight === 15 ? "visited weight" : "visited";
                }
            }
        }
    }

    function shortestPathTimeout(idx) {
        setTimeout(function () {
            if (idx === shortestNodes.length) {
                board.reset();
                if (object) {
                    shortestPathChange(board.nodes[board.target], shortestNodes[idx - 1]);
                    board.objectShortestPathNodesToAnimate = [];
                    board.shortestPathNodesToAnimate = [];
                    board.claerNodeStatuses();
                    let newSuccesses;

                    if (type === "weighted") {
                        newSuccesses = weightedSearchAlgorithm(board.nodes, board.object, board.target, board.nodesToAnimate, board.boardArray, algorithm);
                    } else {
                        newSuccesses = unweightedSearchAlgorithm(board.nodes, board.object, board.target, board.nodesToAnimate, board.boardArray, algorithm);
                    }

                    launchAnimations(board, newSuccesses, type);
                    return;
                } else {
                    shortestPathChange(board.nodes[board.target], shortestNodes[idx - 1]);
                    board.objectShortestPathNodesToAnimate = [];
                    board.shortestPathNodesToAnimate = [];
                    return;
                }
            } else if (idx === 0) {
                shortestPathChange(shortestNodes[idx]);
            } else {
                shortestPathChange(idx + 1);
            }

            shortestPathTimeout(idx + 1);

        }, 40);
    }

    function shortestPathChange(currentNode, prevNode)  {
        let currentHTMLNode = document.getElementById(currentNode.id);
        if (type === "unweighted") {
            currentHTMLNode.className = "shortest-path-unweighted";
        } else {
            if (currentNode.direction === "up") {
                currentHTMLNode.className = "shortest-path-up";
            } else if (currentNode.direction === "down") {
                currentHTMLNode.className = "shortest-path-down";
            } else if (currentNode.direction === "right") {
                currentHTMLNode.className = "shortest-path-right";
            } else if (currentNode.direction === "left") {
                currentHTMLNode.className = "shortest-path-left";
            } else if (currentNode.direction === "down-right") {
                currentHTMLNode = "wall";
            }
        }

        if (prevNode) {
            let prevHTMLNode = document.getElementById(prevNode.id);
            prevHTMLNode.className = "shortest-path";
        } else {
            let elem = document.getElementById(board.start);
            elem.className = "shortest-path";
            elem.removeAttribute("style");
        }
    }

    timeout(0);

};

module.exports = launchAnimations;