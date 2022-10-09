function stairDemonstration(board) {
    let currXAxis = board.height - 1;
    let currYAxis = 0;

    let relevantStatuses = ["start", "target", "object"];
    while (currXAxis > 0 && currYAxis < board.width) {
        let currId = `${currXAxis}-${currYAxis}`;
        let currNode = board.nodes[currId];
        let currHTMLNode = document.getElementById(currId);
        if (!relevantStatuses.includes(currNode.status)) {
            currNode.status = "wall";
            board.wallsToAnimate.push(currHTMLNode);
        }

        currXAxis--;
        currYAxis++;
    }

    while (currXAxis < board.height - 2 && currYAxis < board.width) {
        let currId = `${currXAxis}-${currYAxis}`;
        let currNode = board.nodes[currId];
        let currHTMLNode = document.getElementById(currId);
        if (!relevantStatuses.includes(currNode.status)) {
            currNode.status = "wall";
            board.wallsToAnimate.push(currHTMLNode);
        }

        currXAxis++;
        currYAxis++;
    }

    while (currXAxis > 0 && currYAxis < board.width - 1) {
        let currId = `${currXAxis}-${currYAxis}`;
        let currNode = board.nodes[currId];
        let currHTMLNode = document.getElementById(currId);
        if (!relevantStatuses.includes(currNode.status)) {
            currNode.status = "wall";
            board.wallsToAnimate.push(currHTMLNode);
        }

        currXAxis--;
        currYAxis++;
    }
}

module.exports = stairDemonstration;