function weightsDemonstration(board) {
    let currXAxis = board.height - 1;
    let currYAxis = 35;

    while (currXAxis > 5) {
        let currId = `${currXAxis}-${currYAxis}`;
        let currElement = document.getElementById(currId);
        board.wallsToAnimate.push(currElement);
        let currNode = board.nodes[currId];
        currNode.status = "wall";
        currNode.weight = 0;
        currXAxis--;
    }

    for (let currIdX = board.height - 2; currIdX > board.height - 11; currIdX--) {
        for (let currIdY = 1; currIdY < 35; currIdY++) {
            let currId = `${currIdX}-${currIdY}`;
            let currElement = document.getElementById(currId);
            board.wallsToAnimate.push(currElement);
            let currNode=  board.nodes[currId];
            if (currIdX === board.height - 2 && currIdY < 35 && currIdY > 26){
                currNode.status = "wall";
                currNode.weight = 0;
            } else {
                currNode.status = "unvisited";
                currNode.weight = 15;
            }
        }
    }
}

module.exports = weightsDemonstration;