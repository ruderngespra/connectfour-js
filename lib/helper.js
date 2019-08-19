function buildBoard(x, y) {
    var xCounter = 0;
    var yCounter = 0;
    var board = [];
    for (var i = 0; i < x * y; i += 1) {
        if (xCounter == x) {
            xCounter = 0;
            yCounter += 1;
        }
        board.push([xCounter, yCounter]);
        xCounter += 1;
    }
    board.map(function(position) {
        position.push(null);
    });
    return board;
}

function findIndexOfSpecificPositionInBoardArray(x, y, board) {
    return board
        .map(function(position, index) {
            if (position[0] == x && position[1] == y) {
                return index;
            } else {
                return false;
            }
        })
        .find(function(value) {
            return value != false;
        });
}

// TODO! This function is nearly the same as the one before!
function findColorAtSpecificPositionInBoardArray(x, y, array) {
    return array.find(function(position) {
        return position[0] == x && position[1] == y;
    })
        ? array.find(function(position) {
              return position[0] == x && position[1] == y;
          })[2]
        : null;
}

function determineLastMove(lastBoard, currentBoard) {
    for (var i = 0; i < lastBoard.length; i += 1) {
        if (lastBoard[i] != currentBoard[i]) {
            return lastBoard[i][0];
        }
    }
}

function check([x, y], color, array, direction, connectAmount, counter = 0) {
    var newColor = findColorAtSpecificPositionInBoardArray(x, y, array);
    if (newColor == color) {
        counter += 1;
        // console.log(connectAmount);
        // console.log(counter);
        if (counter == connectAmount) {
            // console.log(color + ' won.');
            return true;
        }
        if (direction == 'up') {
            y += 1;
        } else if (direction == 'right') {
            x += 1;
        } else if (direction == 'upRight') {
            x += 1;
            y += 1;
        } else if (direction == 'downRight') {
            x += 1;
            y -= 1;
        }
        return check([x, y], color, array, direction, connectAmount, counter);
    }
}

module.exports = {
    check,
    buildBoard,
    findIndexOfSpecificPositionInBoardArray,
    determineLastMove,
    findColorAtSpecificPositionInBoardArray,
};
