var Letter = require('./letter.js')

/**
 * Word constructor, stores word value and splits words into
 * an array of letter objects based on the characters of the word.
 * This array is stored in the letters variable
 */
function Word(value) {
	// The word we want our users to guess
	this.value = value;
	// An array of Letter objects that represent our word
	this.letters = value
		.split('')
		// The parameter to the following map call is called an arrow function
		// It is short hand for an anonymous function with a few special rules
		// Arrow functions were added to JavaScript fairly recently (ES6)
		.map(l => new Letter(l));
}

/**
 * Returns a representation of the word based on the visibility of
 * its letters. If a letter is not visible, a _ is shown
 */
Word.prototype.render = function() {
	return this.letters
		// call .render on each letter,
		// collect results into a new array.
		.map(l => l.render())
		// call .join to return a string
		.join('');
}

/**
 * Makes every letter in the word visible
 */
Word.prototype.reveal = function() {
	this.letters
		.forEach(l => {l.visible = true;});
	return this;
}

/**
 * Modifies any correctly guessed letter to set visible to true
 * then it will return true or false depending on if a correct letter was guessed
 */
Word.prototype.guess = function(guess) {
	return this.letters
		// Check each letter for a match
		// Set the the letter visibility to true if it hasn't already
		// Collect the results of each attempted letter match in an array
		.map(l => {
			var match = (guess === l.value);
			l.visible = l.visible || match;
			return match;
		})
		// return true if any new letter was matched
		.some(v => v);
}

/**
 * Return true or false depending on if the word has been completely guessed
 */
Word.prototype.complete = function() {
	return this.render() === this.value;
}

module.exports = Word;