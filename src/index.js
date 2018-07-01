// Imports
import './index.css';
import movies from './data/movies.json'

// Requires
var emojiscribe = require('emojiscribe');

// Templates
var gameTemplate = require("./templates/partials/game.handlebars");

// Variables
var gameState;
var refreshMillis = 1000;

/**
 * Update the game state.
 */
function updateGameState() {

    // Pick a random movie
    var movie = movies[Math.floor(Math.random() * movies.length)];

    // Build game state
    gameState = {
        clue: movie.clue,
        answer: movie.name,
        activeFrom: new Date()
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

    // Build data
    var context = {
        clue: gameState.clue,
        activeTime: convertMilliseconds((new Date() - gameState.activeFrom))
    };

    // Update content
    $("body").empty().append(gameTemplate(context));
}

/**
 * Load the game.
 */
function loadGame() {

    // Update game state
    updateGameState();

    // Initial render
    renderGame();

    // Render the game on an interval
    setInterval(renderGame, refreshMillis);
}

// Main entry point
$(document).ready(loadGame);