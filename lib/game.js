var Word = require('./word.js');

function Game() {
	this.score = 0;
	this.init();
}

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

Game.prototype.init = function() {
	this.word = this.random();
	var characters = new Set(this.word.value.split());
	this.tries = (26 - characters.length) / 2;
	this.guesses = new Set();
	this.done = false;
}

Game.prototype.random = function() {
	return new Word(this.bank[Math.floor(Math.random() * this.bank.length)]);
}

Game.prototype.guess = function(character) {
	if (this.tries > 0) {
		if (!this.word.guess(character)) {
			guesses.add(character);
			tries--;
		}
	}

	return tries;
}

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

exports = Game;