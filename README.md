# Black is Down
Emoji-based charades.

A game where players attempt to guess the movie that has been described using emoji.

## Status
### Continuous Integration
[![CircleCI](https://circleci.com/gh/benjeh32/black-is-down.svg?style=svg)](https://circleci.com/gh/benjeh32/black-is-down)

### Roadmap
Currently early in development. Rough roadmap is as follows:
- (Very) basic game on client side using pre-determined list of movies with name clues and synopsis clues.
- Server side implementation where players all play the same game, trying to be the first to guess the movie.
- Emoji descriptions generated from movie name using [Emojiscribe](https://github.com/benjeh32/emojiscribe).
    - This module is in development and as it improves so will the clues in the game.
- IMDB API integration for wider set of movies.

## Development
### Prerequisites
- [Node.js](https://nodejs.org/)

### Building
From a terminal:
```console
$ npm run build
```

### Running
After building, open `bin/index.html` in a browser.

Alternatively, to start a live-updating development server:
```console
$ npm run start
```

## License
Licensed under the [MIT License](https://github.com/benjeh32/black-is-down/blob/master/LICENSE.md).