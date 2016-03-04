"use strict";

// deps

	const 	path = require('path'),
			fs = require('simplefs'),
			sqlite3 = require('sqlite3').verbose();

// module

module.exports = class Warcraft3SoundsDatabase {

	constructor () {
		this.db = new sqlite3.Database(path.join(__dirname, 'Warcraft3Sounds.sqlite3'));
	}

	create () {

		var that = this;

		return new Promise(function(resolve, reject) {

			that.db.run(
				"CREATE TABLE races (" +
					" id INTEGER PRIMARY KEY AUTOINCREMENT," +
					" code VARCHAR(20) NOT NULL," +
					" name VARCHAR(25) NOT NULL," +
					" UNIQUE (code)" +
			");", [], function(err) {

				if (err) {
					reject('(create table races) ' + (err.message) ? err.message : err);
				}
				else {

					var req = that.db.prepare("INSERT INTO races (id, code, name) VALUES (:id, :code, :name);", function() {

						if (err) {
							reject((err.message) ? err.message : err);
						}
						else {

							req.run({ ':id': 1, ':code': 'humans', ':name': 'Humains' });
							req.run({ ':id': 2, ':code': 'nightelfs', ':name': 'Elfes de la nuit' });
							req.run({ ':id': 3, ':code': 'orcs', ':name': 'Orcs' });
							req.run({ ':id': 4, ':code': 'undeads', ':name': 'Morts vivants' });
							req.run({ ':id': 5, ':code': 'neutrals', ':name': 'Neutres' });

							req.finalize(function() {

								if (err) {
									reject((err.message) ? err.message : err);
								}
								else {
									resolve();
								}

							});
						
						}

					});

				}

			});

		});

	}

	init () {

		var that = this;

		return new Promise(function(resolve, reject) {

			var bCreationNeeded = !fs.fileExists(path.join(__dirname, 'Warcraft3Sounds.sqlite3'));

			that.db.serialize(function() {

				if (bCreationNeeded) {
					that.create().then(function() { resolve(); }).catch(reject);
				}
				else {
					resolve();
				}

			});

		});

	}

	getRaces() {

		var that = this;

		return new Promise(function(resolve, reject) {

			that.db.all("SELECT id, code, name FROM races ORDER BY races.name;", [], function(err, rows) {

				if (err) {
					reject((err.message) ? err.message : err);
				}
				else if (!rows) {
					resolve([]);
				}
				else {
					resolve(rows);
				}

			});

		});

	}

};