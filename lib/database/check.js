
// args

if (3 > process.argv.length) {
	console.log("Missing sounds directory");
}
else {

	// deps

		const fs = require("fs");
		const path = require("path");

	// consts

		const soundsdir = path.join(process.argv[2]);

		const sqlfile = path.join(__dirname, "create.sql");
		
		const search = /'([a-zA-Z0-9_]+\.[a-z]+)'/;

	// private

		// methods

			function _isFile(file) {

				let result = false;

					try {
						result = fs.statSync(file).isFile();
					}
					catch(e) {
						// nothing to do here
					}

				return result;

			}

			function _isDirectory(directory) {

				let result = false;

					try {
						result = fs.statSync(directory).isDirectory();
					}
					catch(e) {
						// nothing to do here
					}

				return result;

			}

			function _readLines(file, callback, end) {

				let remaining = "", input = fs.createReadStream(file, "utf8");

				input.on("data", function(data) {

					remaining += data.replace(/\r/g, "\n").replace(/\n\n/g, "\n");

					let index = remaining.indexOf("\n");
					let last  = 0;

					while (-1 < index) {

						callback(remaining.substring(last, index));

						last = index + 1;
						index = remaining.indexOf("\n", last);

					}

					remaining = remaining.substring(last);

				});

				input.on("end", function() {

					if (0 < remaining.length) {
						callback(remaining);
					}

					end();

				});

			}

	// check

		if (!_isDirectory(soundsdir)) {
			console.log("Sounds directory \"" + soundsdir + "\" does not exist");
		}
		else {

			let matched = [];
			_readLines(sqlfile, (content) => {

				content = content.trim();

				if ("" !== content) {

					let match = content.match(search);

					if (null !== match) {
						matched.push(match[1]);
					}

				}

			}, () => {

				matched.forEach((match) => {

					if (!_isFile(path.join(soundsdir, match))) {
						console.log("ou pas", path.join(soundsdir, match));
					}

				});

			});

		}

}
