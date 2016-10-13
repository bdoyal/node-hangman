var Word = require('./word.js');

/**
 * Game constructor, sets initial score to 0 and calls init
 */
function Game() {
	this.score = 0;
	this.init();
}

/**
 * An array of all of the possible word choices as lower case strings
 */
Game.prototype.bank = [
		'black walnut',
		'butter pecan',
		'chocolate',
		'chocolate chip',
		'cookies and cream',
		'cookie dough',
		'english toffee',
		'french vanilla',
		'green tea',
		'mint chocolate chip',
		'neapolitan',
		'peppermint',
		'pistachio',
		'rocky road',
		'strawberry',
		'vanilla'
	]
	.map(s => s.toLowerCase());

/**
 * Initializes the game by selecting a word and (re)setting the tries, guessed
 * letters and game done state.
 */
Game.prototype.init = function() {
	this.word = this.random();
	// Collects all of the unique characters for the word into a set
	var characters = new Set(this.word.value.split(''));
	// Sets the number of tries to 1/4 the number of possible wrong characters
	this.tries = Math.floor((26 - characters.size) / 4);
	// Creates a guesses set to track wrong guesses made
	this.guesses = new Set();
	this.done = false;
}

/**
 * Selects a random string from the word bank creates a Word object from it
 */
Game.prototype.random = function() {
	return new Word(this.bank[Math.floor(Math.random() * this.bank.length)]);
}

/**
 * Checks if there are any tries left and attempts a guess, if incorrect tries
 * is decremented and the guessed character is added to the guesses set. Returns
 * the number of tries remaining.
 */
Game.prototype.guess = function(character) {
	if (this.tries > 0) {
		if (!this.word.guess(character)) {
			this.guesses.add(character);
			this.tries--;
		}
	}

	return this.tries;
}

/**
 * Checks if the game has been marked done and returns true if so,
 * If not, checks if the word has been completed and increases the score
 * or if there are no guesses left, decreases the score
 */
Game.prototype.finished = function() {
	if (!this.done) {
		if(this.word.complete()) {
			this.score++;
			this.done = true;
		}
		else if (this.tries <= 0) {
			this.score--;
			this.done = true;
		}
	}

	
	return this.done;
}

module.exports = Game;