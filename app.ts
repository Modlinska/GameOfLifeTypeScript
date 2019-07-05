class GameOfLife {
    boardWidth: number;
    boardHeight: number;
    board: HTMLElement;
    cells;

    constructor(width: number, height: number, board: HTMLElement) {
        this.boardWidth = width;
        this.boardHeight = height;
        this.board = board;
        this.cells = [];
    }

    createBoard() {
        this.board.style.height = this.boardHeight + "px";
        this.board.style.width = this.boardWidth + "px";
        const squares: number = this.boardHeight / 10 * this.boardWidth / 10;
        for (let i = 0; i < squares; i++) {
            const newDiv: HTMLElement = document.createElement('div');
            this.board.appendChild(newDiv);
        }
        this.cells = this.board.children;
        for (let cell of this.cells) {
            cell.addEventListener('click', function (e) {
                cell.classList.toggle('live');
            });
        }
    }

    firstGlider() {
        this.setCellState(10, 10, "live");
        this.setCellState(11, 10, "live");
        this.setCellState(10, 9, "live");
        this.setCellState(11, 12, "live");
        this.setCellState(12, 13, "live");

    }

    getDivIndex(x: number, y: number) {
        const index: number = x + y * (this.boardWidth / 10);
        return this.cells[index];
    }

    setCellState(x: number, y: number, state: string) {
        if (state === "live") {
            this.getDivIndex(x, y).classList.add("live")
        } else {
            this.getDivIndex(x, y).classList.remove("live")
        }
    }

    computeCellNextState(x: number, y: number) {
        const currentElement: HTMLElement = this.getDivIndex(x, y);

        const neighbors: HTMLElement[] = [
            this.getDivIndex(x - 1, y - 1),
            this.getDivIndex(x, y - 1),
            this.getDivIndex(x + 1, y - 1),
            this.getDivIndex(x - 1, y),
            this.getDivIndex(x + 1, y),
            this.getDivIndex(x - 1, y + 1),
            this.getDivIndex(x, y + 1),
            this.getDivIndex(x + 1, y + 1)
        ];
        let liveNeighborCounter: number = 0;

        for (let neighbor of neighbors) {
            if (neighbor !== undefined && neighbor.classList.contains('live')) {
                liveNeighborCounter++;
            }
        }

        if (currentElement.classList.contains('live') && (liveNeighborCounter === 2 || liveNeighborCounter === 3)) {
            return 1
        } else if (!currentElement.classList.contains('live') && liveNeighborCounter === 3) {
            return 1
        } else {
            return 0
        }

    }

    computeNextGeneration() {
        for (let i = 0; i < this.boardHeight / 10; i++) {
            for (let j = 0; j < this.boardWidth / 10; j++) {
                if (this.computeCellNextState(j, i) === 1) {
                    this.setCellState(j, i, "live");
                } else {
                    this.setCellState(j, i, "dead");
                }
            }
        }
    }

    printNextGeneration() {
        this.computeNextGeneration();
    }
}

window.onload = () => {
    const board: HTMLElement = document.getElementById('board');
    const game = new GameOfLife(1000, 600, board);
    game.createBoard();
    game.firstGlider();
    const play: HTMLElement = document.getElementById('play');
    const pause: HTMLElement = document.getElementById('pause');
    let timer;
    play.addEventListener("click", function () {
        timer = setInterval(function () {
            game.printNextGeneration();
        }, 100);
    });
    pause.addEventListener('click', function () {
        clearInterval(timer);
    })

};

