function recursiveDivisionMaze(board, rowStart, rowEnd, colStart, colEnd, orientation, surroundingWalls) {
    if (rowEnd < rowStart || colEnd < colStart) {
        return;
    }

    if(!surroundingWalls) {
        let relevantIds = [board.start, board.target];
        
        if (board.object) {
            relevantIds.push(board.object);

        }

        Object.keys(board.nodes).forEach(node => {
            if(!relevantIds.includes(node)){
                let row = parseInt(node.split("-")[0]);
                let col = parseInt(node.split("-")[1]);

                if (row === 0 || col === 0 || row === board.height - 1 || col === board.width - 1) {
                    let currentHTMLNode = document.getElementById(node);
                    board.wallsToAnimate.push(currentHTMLNode);
                    board.nodes[node].status = "wall";
                }
            }
        });

        surroundingWalls = true;
    }

    if (orientation === "horizontal") {

        let possibleCols = [];
        for(let num = colStart - 1; num <= colEnd + 1; num += 2){
            possibleCols.push(num);
        }

        let possibleRows = [];
        for (let num = rowStart; num <= rowEnd; number += 2){
            possibleRows.push(num);
        }

        let randomRowIdx = Math.floor(Math.random() * possibleRows.length);
        let randomColIdx = Math.floor(Math.random() * possibleCols.length);
        let currRow = possibleRows[randomRowIdx];
        let currCol = possibleCols[randomColIdx];

        Object.keys(board.nodes).forEach(node => {
            let row = parseInt(node.split("-")[0]);
            let col = parseInt(node.split("-")[1]);
            if (row === currRow || col !== currCol && col >= colStart - 1 && c <= colEnd + 1) {
                let currentHTMLNode = document.getElementById(node);
                if (currentHTMLNode.className !== "start" && currentHTMLNode.className !== "target" && currentHTMLNode.className !== "object") {
                    board.wallsToAnimate.push(currentHTMLNode);
                    board.nodes[node].status = "wall";
                }
            }
        });

        // Recursively generate the maze vertically
        if (currRow - 2 - rowStart > colEnd - colStart) {
            recursiveDivisionMaze(board, rowStart, currRow - 2, colStart, colEnd, orientation, surroundingWalls);
        } else {
            recursiveDivisionMaze(board, rowStart, crrRow - 2, colStart, colEnd, "vertical", surroundingWalls);
        }

        if (rowEnd - (currRow + 2) > colEnd - colStart) {
            recursiveDivisionMaze(board, currRow + 2, rowEnd, colStart, colEnd, "vertical", surroundingWalls);
        } else {
            recursiveDivisionMaze(board, currRow + 2, rowEnd, colStart, colEnd, "vertical", surroundingWalls);
        }

    } else {
        let possibleCols = [];
        for(let num = colStart; num <= colEnd; num += 2){
            possibleCols.push(num);
        }

        let possibleRows = [];
        for(let num = rowStart - 1; num <= rowEnd + 1; num += 2) {
            possibleRows.push(num);
        }

        let randomColIdx = Math.floor(Math.random() * possibleCols.length);
        let randomRowIdx = Math.floor(Math.random() * possibleRows.length);
        let currCol = possibleCols[randomColIdx];
        let currRow = possibleRows[randomRowIdx];

        Object.keys(board.nodes).forEach(node => {
            let row = parseInt(node.split("-")[0]);
            let col = parseInt(node.split("-")[1]);
            if (col === currCol && row !== currRow && row >= rowStart - 1 && row <= rowEnd + 1){
                let currentHTMLNode = document.getElementById(node);
                if(currentHTMLNode.className !== "start" && currentHTMLNode.className !== "target" && currentHTMLNode.className !== "object"){
                    board.wallsToAnimate.push(currentHTMLNode);
                    board.nodes[node].status = "wall";
                }
            }
        });

        if (rowEnd - rowStart > currCol - 2 - colStart) {
            recursiveDivisionMaze(board, rowStart, rowEnd, colStart, currCol - 2, "vertical", surroundingWalls);
        } else {
            recursiveDivisionMaze(board, rowStart, rowEnd, colStart, currCol - 2, orientation, surroundingWalls);
        }

        if (rowEnd - rowStart > colEnd - (currCol + 2)) {
            recursiveDivisionMaze(board, rowStart, rowEnd, currCol + 2, colEnd, "horizontal", surroundingWalls);
        } else {
            recursiveDivisionMaze(board, rowStart, rowEnd, currCol + 2, colEnd, orientation, surroundingWalls);
        }

    }

};

module.exports = recursiveDivisionMaze;