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

										query = query.trim()
													.replace(/--(.*)\s/g, "")
													.replace(/\s/g, " ")
													.replace(/  /g, " ");

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

	getCharacters(race) {

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

	getActions(character) {

		var that = this;

		return new Promise(function(resolve, reject) {

			that.db.all("SELECT" +
							"  actions.id, actions.code, actions.name, actions.file, " +
							"  actions_types.id AS type_id, actions_types.code AS type_code, actions_types.name AS type_name" +
						" FROM actions" +
							" INNER JOIN actions_types ON actions_types.id = actions.k_action_type" +
						" WHERE actions.k_character = :id_character" +
						" ORDER BY actions.name;", { ':id_character': character.id }, function(err, rows) {

				if (err) {
					reject((err.message) ? err.message : err);
				}
				else if (!rows) {
					resolve([]);
				}
				else {

					rows.forEach(function(action, i) {

						rows[i].type = {
							id: rows[i].type_id,
							code: rows[i].type_code,
							name: rows[i].type_name
						};

						delete rows[i].type_id;
						delete rows[i].type_code;
						delete rows[i].type_name;

					});

					resolve(rows);
					
				}

			});

		});

	}

	getMusics(race) {

		var that = this;

		return new Promise(function(resolve, reject) {

			that.db.all("SELECT id, code, name, file" +
						" FROM musics" +
						" WHERE musics.k_race = :id_race" +
						" ORDER BY musics.name;", { ':id_race': race.id }, function(err, rows) {

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

	getWarnings(race) {

		var that = this;

		return new Promise(function(resolve, reject) {

			that.db.all("SELECT warnings.id, warnings.code, warnings.name, warnings.file," +
						" warnings_types.id AS type_id, warnings_types.code AS type_code, warnings_types.name AS type_name" +
						" FROM warnings" +
							" INNER JOIN warnings_types ON warnings_types.id = warnings.k_warning_type" +
						" WHERE warnings.k_race = :id_race" +
						" ORDER BY warnings_types.name, warnings.name;", { ':id_race': race.id }, function(err, rows) {

				if (err) {
					reject((err.message) ? err.message : err);
				}
				else if (!rows) {
					resolve([]);
				}
				else {

					rows.forEach(function(action, i) {

						rows[i].type = {
							id: rows[i].type_id,
							code: rows[i].type_code,
							name: rows[i].type_name
						};

						delete rows[i].type_id;
						delete rows[i].type_code;
						delete rows[i].type_name;

					});

					resolve(rows);

				}

			});

		});

	}

};