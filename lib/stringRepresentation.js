var { connectFour } = require('./connectFour.js');

// TODO: On the long run: One object with all string representation staff.
// connectFour.prototype.stringRepresentation = {};

connectFour.prototype.stringCranePosition = 0;

connectFour.prototype.generateCraneString = function() {
    var cranePosition = this.stringCranePosition;
    var length = this.x;
    var arrowString = '.';
    for (var i = 0; i < length; i += 1) {
        if (i == cranePosition) {
            arrowString += this.turn + '.';
        } else {
            arrowString += '...';
        }
    }
    return arrowString;
};

connectFour.prototype.moveCrane = function(input) {
    if (input == 'l') {
        if (this.stringCranePosition < this.x - 1) {
            this.stringCranePosition += 1;
        }
    } else if (input == 'j') {
        if (this.stringCranePosition > 0) {
            this.stringCranePosition -= 1;
        }
    }
};

connectFour.prototype.stringCranePosition = 0;

connectFour.prototype.showCurrentBoardAndMenu = function(board) {
    console.log(this.clearMonitorString());
    console.log(this.generateCraneString());
    console.log(this.toString(board, this.x));
    console.log('\n' + this.generateMenuString());
    console.log('\n' + this.turn + 's turn.' + '\n');
};

connectFour.prototype.generateMenuString = function() {
    var menuString = '-[B]ack]-[R]estart-[Q]uit';
    return menuString;
};

// var game = new connectFour({
//     x: 20,
//     y: 20,
//     turn: '0',
//     winner: false,
//     playersAmount: 2,
//     connectAmount: 4,
// });

// game.showCurrentBoardAndMenu();

module.exports = { connectFour };

// var game = new connectFour();
// game.showCurrentBoardAndMenu();
// game = game.return();
// game.showCurrentBoardAndMenu();
