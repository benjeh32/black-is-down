

// Variables
var currentGame;




/**
 * Render the current game.
 */
function renderGame() {

    // GET game state from server
    currentGame = {
        clue: "🦇👨",
        activeFrom: 1528928914066,
        previousGames: [
            {
                clue: "🇮🇹🚗🚗🚗🚌⛰️",
                activeFrom: 1528928877065,
                activeTo: 1528928908676,
                filmName: "The Italian Job",
                solvedBy: "Ben Thomas"
            },
            {
                clue: "🚢",
                activeFrom: 1528928877065,
                activeTo: 1528928908676,
                filmName: "Titanic",
                solvedBy: "Ben Thomas"
            }
        ]
    }

    // Display current game
    $("#clue").append(currentGame.clue);
    $("#active-time").append((new Date().getTime() - currentGame.activeFrom) + "ms");

    // Display previous games
    currentGame.previousGames.forEach(previousGame => {
        $("#previous-games").append("<tr>");
        $("#previous-games").append("<td>" + previousGame.clue + "</td>");
        $("#previous-games").append("<td>" + previousGame.filmName + "</td>");
        $("#previous-games").append("<td>" + previousGame.solvedBy + "</td>");
        $("#previous-games").append("<td>" + (previousGame.activeTo - previousGame.activeFrom) + "ms</td>");
        $("#previous-games").append("<td>");
    });
}

// Main
$(document).ready(renderGame);