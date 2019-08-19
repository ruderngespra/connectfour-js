var { connectFour } = require("./stringRepresentation.js");

function play(gameSettings, game) {
  var standard_input = process.stdin;
  standard_input.setEncoding("utf-8");
  var clearMonitorString = "";
  for (var i = 0; i < 80; i += 1) {
    clearMonitorString += "\n";
  }
  console.log(clearMonitorString);
  if (!gameSettings.playersAmount) {
    console.log("How many players?");
    standard_input.once("data", function(data) {
      var playersAmount = data;
      gameSettings.playersAmount = playersAmount;
      play(gameSettings);
    });
  } else if (!gameSettings.x) {
    console.log("How many columns?");
    standard_input.once("data", function(data) {
      var x = data;
      gameSettings.x = x;
      play(gameSettings);
    });
  } else if (!gameSettings.y) {
    console.log("How many rows?");
    standard_input.once("data", function(data) {
      var y = data;
      gameSettings.y = y;
      play(gameSettings);
    });
  } else if (!gameSettings.connectAmount) {
    console.log("How many dots to connect?");
    standard_input.once("data", function(data) {
      var connectAmount = data;
      gameSettings.connectAmount = connectAmount;
      play(gameSettings);
    });
  } else if (game) {
    // TODO: Das blinkt durch noch während der Animationen!
    game.showCurrentBoardAndMenu();
    // Hier die Winner-Condition einfügen!
    standard_input.setRawMode(true);
    standard_input.once("data", function(data) {
      if (data == "q") {
        process.exit();
      } else if (data == "r") {
        standard_input.setRawMode(false);
        play({});
        return;
      } else if (data == "b") {
        try {
          game = game.return();
        } finally {
        }
      } else if (data == "l" || data == "j") {
        game.moveCrane(data);
      } else if (data == "k") {
        game = game.nextMove(game.stringCranePosition);
        if (game.winner !== false) {
          console.log(game.clearMonitorString());
          console.log(game.toString(), "\n");
          console.log(game.winner, " won.\n\n\n");
          // var exclamation = '!';
          // function animateWin(counter = 0) {
          //     var timer = setTimeout(function() {
          //         console.log(exclamation);
          //         counter++;
          //         if (counter == 5) {
          //             clearTimeout(timer);
          //             game.animateLastMove();
          //         } else {
          //             animateWin(counter);
          //         }
          //     }, 200);
          //     process.exit();
          // }
          // animateWin();
          process.exit();
        }

        game.animateLastMove();
      } else {
      }
      play(gameSettings, game);
      // function tryMove(data) {
      //     try {
      //         if (condition) {
      //         }

      //         game = game.nextMove(data);
      //         if (game.winner !== false) {
      //             console.log(game.clearMonitorString);
      //             console.log(game.toString(), '\n');
      //             console.log(game.winner, ' won.');
      //             var exclamation = '!';
      //             function animateWin(counter = 0) {
      //                 var timer = setTimeout(function() {
      //                     console.log(exclamation);
      //                     counter++;
      //                     if (counter == 5) {
      //                         clearTimeout(timer);
      //                         game.animateLastMove();
      //                     } else {
      //                         animateWin(counter);
      //                     }
      //                 }, 200);
      //                 process.exit();
      //             }
      //             animateWin();
      //         } else {
      //             console.log(game.clearMonitorString);
      //             game.animateLastMove();
      //             play(gameSettings, game);
      //         }
      //     } catch (err) {
      //         console.log(game.clearMonitorString);
      //         console.log(game.toString());
      //         console.log(
      //             'Please choose a number between 0 and ' + game.x + '.'
      //         );
      //         tryMove();
      //     }
      // }
      // tryMove(data);
    });
  } else {
    game = new connectFour(gameSettings);
    play(gameSettings, game);
  }
}

play({
  turn: "0",
  winner: false
});

// var game = new connectFour({
//     x: 8,
//     y: 8,
//     turn: '0',
//     winner: false,
//     playersAmount: 2,
//     connectAmount: 4,
// });
