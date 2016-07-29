'use strict';

var prettyjson = require('prettyjson');

var screen = {
	clear: function() {
		// Clear screen in octal - This is not allowed in strict mode
		//process.stdout.write('\033c');

		// Clear screen in hexa
		process.stdout.write('\x1Bc');
	},

	write: function(data, mode) {
		var output = data;

		if (mode === 'json') {
			output = JSON.stringify(data, null, 2)
		} else if (mode === 'pretty') {
			var options = {
				keysColor: 'cyan',
				dashColor: 'magenta',
				stringColor: 'white',
				numberColor: 'yellow'
			}

			output = prettyjson.render(data, options)
		}

		console.log(output)
	}
};

module.exports = screen;
