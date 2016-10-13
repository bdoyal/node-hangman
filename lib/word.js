var Letter = require('./letter.js')

function Word(value) {
	// The word we want our users to guess
	this.value = value;
	// An array of Letter objects that represent our word
	this.letters = value
		.split()
		.map(l => new Letter(l));
}

// Takes Letters and calls .show on each one,
// collects them into a new array,
// calls .join to return a string
Word.prototype.render = function() {
	return this.letters
		.map(l => l.render())
		.join();
}

// Modifiy any correctly guessed letter to set visible to true
// then it will return true or false depending on if a correct letter was guessed
Word.prototype.guess = function(guess) {
	return this.letters
		.map(l => {
			var match = (guess === l.value);
			l.visible = l.visible || match;
			return match;
		})
		.some(v => v);
}

// Return true or false depending on if the word has been completely guessed
Word.prototype.complete = function() {
	return this.render() === this.value;
}

module.exports = Word;