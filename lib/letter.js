function Letter(value) {
	// Store the character value in the Letter object
	this.value = value;
	// If the letter is a space, visible defaults to true
	// Otherwise visible defaults to false
	this.visible = (value === ' ');
}

Letter.prototype.render = function() {
	// ternary operator below
	return (this.visible) ? this.value : '_';
}

exports = Letter;