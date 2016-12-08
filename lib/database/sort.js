
const fs = require("fs");
const path = require("path");

const soundsdir = path.join("C:\\Users\\meona\\Desktop\\in");
const sqlfile = path.join(__dirname, "_create.sql");

const search = /'([a-zA-Z0-9_]+\.[a-z]+)'/;


String.prototype.capitalize = function () {
	return this.charAt(0).toUpperCase() + this.slice(1);
};


function readLines(input, callback, end) {

	let remaining = "";

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

let matched = [];
readLines(fs.createReadStream(sqlfile, "utf8"), (content) => {

	content = content.trim();

	if ("" !== content) {

		let match = content.match(search);

		if (null !== match) {
			matched.push(match[1]);
		}

	}

}, () => {

	fs.readFile(sqlfile, "utf8", (err, content) => {

		if (err) {
			console.log("ERR readFile", err);
		}
		else {

			let replacements = [];
			matched.forEach((match) => {

				try {

					if (fs.statSync(path.join(soundsdir, match)).isFile()) {
						replacements.push(match);
					}

				}
				catch(e) {
					console.log(match);
					console.log("ou pas");
				}
				
			});

			/*replacements.forEach((replace) => {
				content = content.replace(replace.content, replace.real);
			});

			fs.writeFile(sqlfile + "2", content, "utf8", (err) => {

				if (err) {
					console.log("ERR writeFile", err);
				}
				else {
					console.log("ok");
				}

			});*/

		}

	});

});
