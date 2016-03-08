"use strict";

// deps

	const 	path = require('path'),
			fs = require('simplefs'),
			sqlite3 = require('sqlite3').verbose();

// module

module.exports = class Warcraft3SoundsDatabase {

	constructor () {
		this.db = null;
		this.dbFile = path.join(__dirname, 'Warcraft3Sounds.sqlite3');
	}

	init () {

		var that = this;

		return new Promise(function(resolve, reject) {

			var createFile = path.join(__dirname, 'create.sql');

			try {

				if (!fs.fileExists(createFile)) {
					that.db = new sqlite3.Database(that.dbFile);
					that.db.serialize(resolve);
				}
				else {

					that.close().then(function() {

						that.db = new sqlite3.Database(that.dbFile);
						that.db.serialize(function() {

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

						});

					}).catch(reject);

				}

			}
			catch(e) {
				reject((e.message) ? e.message : e);
			}

		});

	}

	close() {

		var that = this;

		return new Promise(function(resolve, reject) {

			if (!that.db) {
				that.db = null;
				fs.unlink(that.dbFile, resolve);
			}
			else {

				that.db.close(function() {
					that.db = null;
					fs.unlink(that.dbFile, resolve);
				});
				
			}

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