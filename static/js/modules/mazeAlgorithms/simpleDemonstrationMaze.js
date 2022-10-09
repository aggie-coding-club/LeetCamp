function simpleDemonstration(board) {
    let currYAxis = board.width - 10;

    for (let counter = 0; counter < 7; counter++){
        let currXAxisOne = Math.floor(board.height / 2) - counter;
        let currXAxisTwo = Math.floor(board.height / 2) + counter;
        let currIdOne = `${currXAxisOne}-${currYAxis}`;
        let currIdTwo = `${currXAxisTwo}-${currYAxis}`;
        let currElementOne = document.getElementById(currIdOne);
        let currElementTwo = document.getElementById(currIdTwo);

        board.wallsToAnimate.push(currElementOne);
        board.wallsToAnimate.push(currElementTwo);

        let currNodeOne = board.nodes[currIdOne];
        let currNodeTwo = board.nodes[currIdTwo];
        currNodeOne.status = "wall";
        currNodeOne.weight = 0;
        currNodeTwo.status = "wall";
        currNodeTwo.weight = 0;
    }
}

module.exports = simpleDemonstration;