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

		let that = this;

		return new Promise(function(resolve, reject) {

			let createFile = path.join(__dirname, 'create.sql');

			try {

				if (!fs.isFileSync(createFile)) {
					that.db = new sqlite3.Database(that.dbFile);
					that.db.serialize(resolve);
				}
				else {

					that.close().then(function() {

						that.db = new sqlite3.Database(that.dbFile);
						that.db.serialize(function() {

							fs.readFileProm(createFile, 'utf8').then(function (sql) {

								let queries = [];

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
										fs.unlinkProm(createFile).then(resolve).catch(reject);
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

							}).catch(reject);

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

		let that = this;

		return new Promise(function(resolve, reject) {

			try {

				if (null == that.db) {
					fs.unlinkProm(that.dbFile).then(resolve).catch(reject);
				}
				else {

					that.db.close(function() {
						that.db = null;
						fs.unlinkProm(that.dbFile).then(resolve).catch(reject);
					});
					
				}

			}
			catch(e) {
				reject((e.message) ? e.message : e);
			}

		});

	}

	getRaces() {

		let that = this;

		return new Promise(function(resolve, reject) {

			try {

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

			}
			catch(e) {
				reject((e.message) ? e.message : e);
			}

		});

	}

	getCharacters(race) {

		let that = this;

		return new Promise(function(resolve, reject) {

			try {

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

			}
			catch(e) {
				reject((e.message) ? e.message : e);
			}

		});

	}

	getActions(character) {

		let that = this;

		return new Promise(function(resolve, reject) {

			try {

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

			}
			catch(e) {
				reject((e.message) ? e.message : e);
			}

		});

	}

	getMusics(race) {

		let that = this;

		return new Promise(function(resolve, reject) {

			try {

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

			}
			catch(e) {
				reject((e.message) ? e.message : e);
			}

		});

	}

	getWarnings(race) {

		let that = this;

		return new Promise(function(resolve, reject) {

			try {

				that.db.all("SELECT warnings.id, warnings.code, warnings.name, warnings.file" +
							" FROM warnings" +
							" WHERE warnings.k_race = :id_race" +
							" ORDER BY warnings.name;", { ':id_race': race.id }, function(err, rows) {

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

			}
			catch(e) {
				reject((e.message) ? e.message : e);
			}

		});

	}

};