var inquirer = require('inquirer');
var figlet = require('figlet');
var Game = require('./lib/game.js');

var game = new Game();

var render = function() {
    // "clear" the console
    console.log('\033[2J');
    // Create ascii art based on the word
    console.log(figlet.textSync(game.word.render()));
    // Print the previously guessed letters
    console.log(`Incorrect guesses: [ ${[...game.guesses].join(', ')} ]`);
    // Print the score and number of guesses remaining
    console.log(`Score: ${game.score}, Guesses: ${game.tries})`);
};

var menu = function() {
    render();
    if (game.finished() && game.tries > 0) {
        console.log('Congratulations, you get a point!')
        restart();
    } else if (game.finished() && game.tries <= 0) {
        console.log('Sorry, you have run out of guesses.');
        restart();
    } else {
        guess();
    }
};

var guess = function() {
    inquirer
        .prompt([{
            message: 'Guess a letter',
            type: 'input',
            name: 'letter',
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
            filter: function(input) {
                return input.toLowerCase();
            }
        }])
        .then(function(answers) {
            game.guess(answers.letter);
            menu();
        });
};

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
