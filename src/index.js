// Imports
import './style.css';

// Requires
var emojiscribe = require('emojiscribe');

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
        answer: "Batman",
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
 * Convert milliseconds as days, hours, minutes and seconds.
 * 
 * @argument milliseconds Milliseconds in the time period to convert.
 * @returns The time period expressed in the format: 'D days, H hours, M minutes, S seconds'.
 */
function convertMilliseconds(milliseconds) {

    // Convert each part
    var seconds = parseInt((milliseconds / 1000) % 60);
    var minutes = parseInt((milliseconds / (1000 * 60)) % 60)
    var hours = parseInt((milliseconds / (1000 * 60 * 60)) % 24);
    var days = parseInt((milliseconds / (1000 * 60 * 60 * 24)));

    var convertedValue = '';

    // Only include days if at least one day
    if (days > 0) {
        convertedValue = convertedValue + days + (days == 1 ? ' day, ' : ' days, ');
    }

    // Include hours if not the first element, otherwise only include hours if at least one hour
    if (convertedValue || hours > 0) {
        convertedValue = convertedValue + hours + (hours == 1 ? ' hour, ' : ' hours, ');
    }

    // Include minutes if not the first element, otherwise only include minutes if at least one minute
    if (convertedValue || minutes > 0) {
        convertedValue = convertedValue + minutes + (minutes == 1 ? ' minute, ' : ' minutes, ');
    }

    // Always include seconds
    convertedValue = convertedValue + seconds + (seconds == 1 ? ' second' : ' seconds');

    return convertedValue;
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
    $("#clue").append("<span>" + emojiscribe.describeWithEmoji(gameState.answer) + "</span>");
    $("#active-time").append("<span>" + convertMilliseconds((new Date().getTime() - gameState.activeFrom)) + "</span>");

    // Display previous games
    gameState.previousGames.forEach(previousGame => {
        $("#previous-games tbody").append("<tr>");
        $("#previous-games tbody").append("<td>" + previousGame.clue + "</td>");
        $("#previous-games tbody").append("<td>" + previousGame.filmName + "</td>");
        $("#previous-games tbody").append("<td>" + previousGame.solvedBy + "</td>");
        $("#previous-games tbody").append("<td>" + convertMilliseconds(previousGame.activeTo - previousGame.activeFrom) + "</td>");
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