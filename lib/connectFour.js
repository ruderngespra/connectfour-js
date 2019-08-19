var {
    check,
    buildBoard,
    clearMonitorString,
    findIndexOfSpecificPositionInBoardArray,
    determineLastMove,
    findColorAtSpecificPositionInBoardArray,
} = require('./helper.js');

function connectFour(settings = {}) {
    this.x = settings.x ? settings.x : 8;
    this.y = settings.y ? settings.y : 8;
    this.turn = settings.turn ? String(settings.turn) : '0';
    this.history = settings.history
        ? settings.history
        : [buildBoard(this.x, this.y)];
    this.board =
        this.history.length > 0
            ? this.history[this.history.length - 1]
            : buildBoard(this.x, this.y);
    this.playersAmount = settings.playersAmount ? settings.playersAmount : 2;
    this.connectAmount = settings.connectAmount ? settings.connectAmount : 4;
    this.winner = false;
}

connectFour.prototype.clearMonitorString = function() {
    var clearMonitorString = '';
    for (var i = 0; i < 50; i += 1) {
        clearMonitorString += '\n';
    }
    return clearMonitorString;
};

clearMonitorString;

connectFour.prototype.toString = function(board, width) {
    var currentBoard = board ? board : this.board;
    width = width ? width : this.x;
    return currentBoard
        .reduce(function(total, position, index) {
            var returnValue =
                total + '|' + (position[2] == null ? '_' : position[2]) + '|';
            index = index += 1;
            if (index % width == 0) {
                returnValue += '\n';
            }
            return returnValue;
        }, '')
        .split('\n')
        .reverse()
        .join('\n')
        .slice(1);
};

connectFour.prototype.nextMove = function(x) {
    try {
        var position = this.board.find(function(position) {
            return position[0] == x && position[2] == null;
        });
        var newValueAtPosition = position.slice();
        newValueAtPosition[2] = this.turn;
        var nextBoard = this.board.slice().map(function(internPosition) {
            return position == internPosition
                ? newValueAtPosition
                : internPosition;
        });
        var nextTurn =
            Number(this.turn) < this.playersAmount - 1
                ? Number(this.turn) + 1
                : 0;
        var nextHistory = this.history.slice();
        nextHistory.push(nextBoard);
        var nextGameState = new connectFour({
            x: this.x,
            y: this.y,
            history: nextHistory,
            playersAmount: this.playersAmount,
            connectAmount: this.connectAmount,
            turn: nextTurn,
        });
        if (nextGameState.checkAll(this.turn)) {
            nextGameState.winner = this.turn;
        }
        return nextGameState;
    } catch (err) {
        console.log(err.message);
        // throw Error('Move not possible.');
    }
};

// This will loop through the board-array:
// TODO: Refactor.

connectFour.prototype.checkAll = function(color) {
    var currentConnectAmount = this.connectAmount;
    // console.log('Current', currentConnectAmount);
    return this.board.find(function(position, index, array) {
        return (
            check(
                [position[0], position[1]],
                color,
                array,
                'up',
                currentConnectAmount
            ) ||
            check(
                [position[0], position[1]],
                color,
                array,
                'right',
                currentConnectAmount
            ) ||
            check(
                [position[0], position[1]],
                color,
                array,
                'upRight',
                currentConnectAmount
            ) ||
            check(
                [position[0], position[1]],
                color,
                array,
                'downRight',
                currentConnectAmount
            )
        );
    });
};

connectFour.prototype.return = function(steps = 1) {
    var stepsToGoBack = steps % this.playersAmount;
    var newTurn = Number(this.turn) - stepsToGoBack;
    console.log('new turn', newTurn);
    if (newTurn < 0) {
        newTurn = Number(this.playersAmount) + newTurn;
    }
    console.log('playersamount: ', this.playersAmount);
    console.log('new turn later', newTurn);
    return new connectFour({
        x: this.x,
        y: this.y,
        history: this.history.slice(0, this.history.length - steps),
        playersAmount: this.playersAmount,
        connectAmount: this.connectAmount,
        turn: newTurn,
    });
};

connectFour.prototype.animateLastMove = function(lastMoveX) {
    try {
        lastMoveX = determineLastMove(
            this.history[this.history.length - 2],
            this.history[this.history.length - 1]
        );
        var currentColor;
        var allAnimationBoards = [];
        var x = this.x;
        var showCurrentBoardAndMenu = this.showCurrentBoardAndMenu.bind(this); // Nice!
        var lastBoard = this.history[this.history.length - 2];
        for (var i = 0; i < this.y; i += 1) {
            currentColor = findColorAtSpecificPositionInBoardArray(
                lastMoveX,
                i,
                lastBoard
            );
            if (currentColor == null) {
                var indexOfPositionToBeChanged = findIndexOfSpecificPositionInBoardArray(
                    lastMoveX,
                    i,
                    lastBoard
                );
                var newAnimationBoard = lastBoard.slice();
                newAnimationBoard[indexOfPositionToBeChanged] = [
                    lastMoveX,
                    i,
                    Number(this.turn) - 1 >= 0
                        ? Number(this.turn) - 1
                        : Number(this.playersAmount) - 1,
                ];
                allAnimationBoards.push(newAnimationBoard);
            }
        }
        function animate(animations, counter = animations.length - 1) {
            var timer = setTimeout(function() {
                showCurrentBoardAndMenu(animations[counter], x);
                counter--;
                if (counter < 0) {
                    clearTimeout(timer);
                } else {
                    animate(animations, counter);
                }
            }, 50);
        }
        animate(allAnimationBoards);
    } catch (err) {
        // console.log('No last move.');
    }
};

module.exports = { connectFour };
