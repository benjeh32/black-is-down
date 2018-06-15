// Variables
var gameState;
var refreshMillis = 1000;

/**
 * Update the game state from server.
 */
function updateGameState() {
	// GET game state from server
    gameState = {
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
}

/**
 * Render the game.
 */
function renderGame() {

	// Update game
	updateGameState();
	
	// Clear previous display
	$("#clue span").remove();
	$("#active-time span").remove();
	$("#previous-games tbody").empty();

    // Display current game
    $("#clue").append("<span>" + gameState.clue + "</span>");
    $("#active-time").append("<span>" + (new Date().getTime() - gameState.activeFrom) + "ms" + "</span>");

    // Display previous games
    gameState.previousGames.forEach(previousGame => {
        $("#previous-games tbody").append("<tr>");
        $("#previous-games tbody").append("<td>" + previousGame.clue + "</td>");
        $("#previous-games tbody").append("<td>" + previousGame.filmName + "</td>");
        $("#previous-games tbody").append("<td>" + previousGame.solvedBy + "</td>");
        $("#previous-games tbody").append("<td>" + (previousGame.activeTo - previousGame.activeFrom) + "ms</td>");
        $("#previous-games tbody").append("</tr>");
    });
}

/**
 * Load the game.
 */
function loadGame() {
	// Initial render
	renderGame();
	
	// Render the game on an interval
	setInterval(renderGame, refreshMillis);	
}

// Main
$(document).ready(loadGame);