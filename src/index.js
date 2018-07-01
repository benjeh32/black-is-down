// Imports
import './index.css';

// Requires
var emojiscribe = require('emojiscribe');

// Templates
var gameTemplate = require("./templates/partials/game.handlebars");

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

    // Build data
    var context = {
        clue: gameState.clue,
        answer: emojiscribe.describeWithEmoji(gameState.answer),
        activeTime: convertMilliseconds((new Date().getTime() - gameState.activeFrom)),
        previousGames: []
    };

    gameState.previousGames.forEach(previousGame => {
        var contextGame = {
            clue: previousGame.clue,
            answer: previousGame.filmName,
            solvedBy: previousGame.solvedBy,
            activeTime: convertMilliseconds(previousGame.activeTo - previousGame.activeFrom)
        };
        context.previousGames.push(contextGame);
    });

    // Update content
    $("body").empty().append(gameTemplate(context));
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

// Main entry point
$(document).ready(loadGame);