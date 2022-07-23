function mazeGenerationAnimations(board) {
    let nodes = board.wallsToAnimate.slice(0);
    let speed = board.speed === "fast" ? 5 : board.speed === "average" ? 25 : 75;

    function timeout(idx) {
        setTimeout(function () {
            if (idx === nodes.length) {
                board.wallsToAnimate = [];
                board.toggleButtons = [];
                board.toggleButtons();
                return;
            }

            nodes[idx].className = board.nodes[nodes[idx].id].weight === 15 ? "unvisited weight" : "wall";
            timeout(idx + 1);

        }, speed)
    }

    timeout(0);
};

module.exports = mazeGenerationAnimations;