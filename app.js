var GameOfLife = /** @class */ (function () {
    function GameOfLife(width, height, board) {
        this.boardWidth = width;
        this.boardHeight = height;
        this.board = board;
        this.cells = [];
    }
    GameOfLife.prototype.createBoard = function () {
        this.board.style.height = this.boardHeight + "px";
        this.board.style.width = this.boardWidth + "px";
        var squares = this.boardHeight / 10 * this.boardWidth / 10;
        for (var i = 0; i < squares; i++) {
            var newDiv = document.createElement('div');
            this.board.appendChild(newDiv);
        }
        this.cells = this.board.children;
        var _loop_1 = function (cell) {
            cell.addEventListener('click', function (e) {
                cell.classList.toggle('live');
            });
        };
        for (var _i = 0, _a = this.cells; _i < _a.length; _i++) {
            var cell = _a[_i];
            _loop_1(cell);
        }
    };
    GameOfLife.prototype.firstGlider = function () {
        this.setCellState(10, 10, "live");
        this.setCellState(11, 10, "live");
        this.setCellState(10, 9, "live");
        this.setCellState(11, 12, "live");
        this.setCellState(12, 13, "live");
    };
    GameOfLife.prototype.getDivIndex = function (x, y) {
        var index = x + y * (this.boardWidth / 10);
        return this.cells[index];
    };
    GameOfLife.prototype.setCellState = function (x, y, state) {
        if (state === "live") {
            this.getDivIndex(x, y).classList.add("live");
        }
        else {
            this.getDivIndex(x, y).classList.remove("live");
        }
    };
    GameOfLife.prototype.computeCellNextState = function (x, y) {
        var currentElement = this.getDivIndex(x, y);
        var neighbors = [
            this.getDivIndex(x - 1, y - 1),
            this.getDivIndex(x, y - 1),
            this.getDivIndex(x + 1, y - 1),
            this.getDivIndex(x - 1, y),
            this.getDivIndex(x + 1, y),
            this.getDivIndex(x - 1, y + 1),
            this.getDivIndex(x, y + 1),
            this.getDivIndex(x + 1, y + 1)
        ];
        var liveNeighborCounter = 0;
        for (var _i = 0, neighbors_1 = neighbors; _i < neighbors_1.length; _i++) {
            var neighbor = neighbors_1[_i];
            if (neighbor !== undefined && neighbor.classList.contains('live')) {
                liveNeighborCounter++;
            }
        }
        if (currentElement.classList.contains('live') && (liveNeighborCounter === 2 || liveNeighborCounter === 3)) {
            return 1;
        }
        else if (!currentElement.classList.contains('live') && liveNeighborCounter === 3) {
            return 1;
        }
        else {
            return 0;
        }
    };
    GameOfLife.prototype.computeNextGeneration = function () {
        for (var i = 0; i < this.boardHeight / 10; i++) {
            for (var j = 0; j < this.boardWidth / 10; j++) {
                if (this.computeCellNextState(j, i) === 1) {
                    this.setCellState(j, i, "live");
                }
                else {
                    this.setCellState(j, i, "dead");
                }
            }
        }
    };
    GameOfLife.prototype.printNextGeneration = function () {
        this.computeNextGeneration();
    };
    return GameOfLife;
}());
window.onload = function () {
    var board = document.getElementById('board');
    var game = new GameOfLife(1000, 600, board);
    game.createBoard();
    game.firstGlider();
    var play = document.getElementById('play');
    var pause = document.getElementById('pause');
    var timer;
    play.addEventListener("click", function () {
        timer = setInterval(function () {
            game.printNextGeneration();
        }, 100);
    });
    pause.addEventListener('click', function () {
        clearInterval(timer);
    });
};
