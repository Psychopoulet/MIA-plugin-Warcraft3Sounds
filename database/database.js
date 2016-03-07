"use strict";

// deps

	const 	path = require('path'),
			fs = require('simplefs'),
			sqlite3 = require('sqlite3').verbose();

// module

module.exports = class Warcraft3SoundsDatabase {

	constructor () {
		this.db = null;
	}

	create () {

		var that = this;

		return new Promise(function(resolve, reject) {

			var createFile = path.join(__dirname, 'create.sql');

			try {

				if (!fs.fileExists(createFile)) {
					resolve();
				}
				else {

					fs.readFile(createFile, 'utf8', function (err, sql) {

						if (err) {
							reject((err.message) ? err.message : err);
						}
						else {

							var queries = [];

							sql.split(';').forEach(function(query) {

								query = query.trim().replace(/\s/g, " ").replace(/  /g, " ");

								if ('' != query) {
									queries.push(query + ';');
								}

							});

							function executeQueries(i) {

								if (i >= queries.length) {
									fs.unlink(createFile, resolve);
								}
								else {

									that.db.run(queries[i], [], function(err) {

										if (err) {
											reject((err.message) ? err.message : err);
										}
										else {
											executeQueries(i + 1);
										}

									});

								}

							}

							executeQueries(0);

						}
						
					});

				}

			}
			catch(e) {
				reject((e.message) ? e.message : e);
			}

		});

	}

	update () {

		var that = this;

		return new Promise(function(resolve, reject) {

			var updateFile = path.join(__dirname, 'update.sql');

			try {

				if (!fs.fileExists(updateFile)) {
					resolve();
				}
				else {

					fs.readFile(updateFile, 'utf8', function (err, sql) {

						if (err) {
							reject((err.message) ? err.message : err);
						}
						else {

							var queries = [];

							sql.split(';').forEach(function(query) {

								query = query.trim().replace(/\s/g, " ").replace(/  /g, " ");

								if ('' != query) {
									queries.push(query + ';');
								}

							});

							function executeQueries(i) {

								if (i >= queries.length) {
									fs.unlink(updateFile, resolve);
								}
								else {

									that.db.run(queries[i], [], function(err) {

										if (err) {
											reject((err.message) ? err.message : err);
										}
										else {
											executeQueries(i + 1);
										}

									});

								}

							}

							executeQueries(0);

						}
						
					});

				}

			}
			catch(e) {
				reject((e.message) ? e.message : e);
			}

		});

	}

	init () {

		var that = this;

		return new Promise(function(resolve, reject) {

			var bCreationNeeded = !fs.fileExists(path.join(__dirname, 'Warcraft3Sounds.sqlite3'));

			that.db = new sqlite3.Database(path.join(__dirname, 'Warcraft3Sounds.sqlite3'));

			that.db.serialize(function() {

				if (bCreationNeeded) {

					that.create().then(function() {
						that.update().then(resolve).catch(reject);
					}).catch(function(err) {
						that.close(); reject(err);
					});

				}
				else {
					that.update().then(resolve).catch(reject);
				}

			});

		});

	}

	close() {

		if (this.db) {

			this.db.close(function() {
				fs.unlink(path.join(__dirname, 'Warcraft3Sounds.sqlite3'));
			});
			
		}

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

	getCharacter(race) {

		var that = this;

		return new Promise(function(resolve, reject) {

			that.db.all("SELECT id, code, name, tft" +
						" FROM characters" +
						" WHERE characters.k_race = :id_race" +
						" ORDER BY characters.name;", { ':id_race': race.id }, function(err, rows) {

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