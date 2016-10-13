var inquirer = require('inquirer');
var figlet = require('figlet');
var Game = require('./lib/game.js');

var game = new Game();

/**
 * Renders the main screen, including the word being guessed and any player
 * info (i.e. score, wrong letters guessed, guesses remaining)
 */
var render = function() {
    // "clear" the console
    console.log('\033[2J');
    // Create ascii art based on the word
    console.log(figlet.textSync(game.word.render().replace(' ', '    ')));
    console.log('\n\n\n\n');
    console.log(`Score: ${game.score}`);
    // Print the previously guessed letters
    console.log(`Incorrect guesses: [ ${[...game.guesses].join(', ')} ]`);
    // Print the score and number of guesses remaining
    console.log(`Remaining guesses: ${game.tries}`);
};

/**
 * Determines if the game is over, renders the main screen, messages the user
 * if the game has ended, then prompts the user as appropriate
 */
var menu = function() {
    if (game.finished() && game.tries > 0) {
    	render();
        console.log('Congratulations, you get a point!')
        restart();
    } else if (game.finished() && game.tries <= 0) {
    	game.word.reveal();
    	render();
        console.log('Sorry, you have run out of guesses.');
        restart();
    } else {
    	render();
        prompt();
    }
};

/**
 * Prompts the user for a letter to guess
 */
var prompt = function() {
    inquirer
        .prompt([{
            message: 'Guess a letter',
            type: 'input',
            name: 'letter',
            // Validates the user input is one letter,
            // between a and z and hasn't already been guessed
            validate: function(input) {
                if (input.length > 1) {
                    return 'Guess one letter at a time';
                } else if ([...game.guesses].indexOf(input) >= 0) {
                    return `You have already guessed ${input}, try another letter`;
                } else if (!input.match(/[a-z]/i)) {
                    return 'Guess a letter from a to z';
                } else {
                    return true;
                }
            },
            // Makes sure the letter is lower case before checking it
            filter: function(input) {
                return input.toLowerCase();
            }
        }])
        .then(function(answers) {
        	// submits the guess to the game object
            game.guess(answers.letter);
            menu();
        });
};

/**
 * Prompts the user if they would like to start a new game
 */
var restart = function() {
    inquirer
        .prompt([{
            message: 'Would you like to play again?',
            type: 'confirm',
            name: 'reset'
        }])
        .then(function(answers) {
            if (answers.reset) {
                game.init();
                menu();
            } else {
                process.exit();
            }
        });
};

menu();
