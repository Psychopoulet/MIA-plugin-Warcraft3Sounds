"use strict";

// deps

	const 	path = require("path"),
			fs = require("node-promfs"),
			sqlite3 = require("sqlite3").verbose();

// module

module.exports = class Warcraft3SoundsDatabase {

	constructor () {
		this.db = null;
		this.dbFile = path.join(__dirname, "Warcraft3Sounds.sqlite3");
	}

	init () {

		let createFile = path.join(__dirname, "create.sql");

		return fs.isFileProm(createFile).then((exists) => {

			if (!exists) {

				return new Promise((resolve, reject) => {

					this.db = new sqlite3.Database(this.dbFile);
					this.db.serialize((err) => {

						if (err) {
							reject((err.message) ? err.message : err);
						}
						else {
							resolve();
						}

					});

				});

			}
			else {

				return this.close().then(() => {

					return new Promise((resolve, reject) => {

						this.db = new sqlite3.Database(this.dbFile);
						this.db.serialize((err) => {

							if (err) {
								reject((err.message) ? err.message : err);
							}
							else {
								resolve();
							}

						});

					}).then(() => {

						return fs.readFileProm(createFile, "utf8").then((sql) => {

							return new Promise((resolve, reject) => {

								let queries = [];

								function executeQueries(that, i) {

									if (i >= queries.length) {
										fs.unlinkProm(createFile).then(resolve).catch(reject);
									}
									else {

										that.db.run(queries[i], [], (err) => {

											if (err) {
												reject((err.message) ? err.message : err);
											}
											else {
												executeQueries(that, i + 1);
											}

										});

									}

								}

								sql.split(";").forEach((query) => {

									query = query.trim()
												.replace(/--(.*)\s/g, "")
												.replace(/\s/g, " ");

									if ("" != query) {
										queries.push(query + ";");
									}

								});

								executeQueries(this, 0);

							});

						});

					});

				});

			}

		});

	}

	close() {

		if (null == this.db) {
			return fs.unlinkProm(this.dbFile);
		}
		else {

			return new Promise((resolve, reject) => {

				this.db.close((err) => {

					if (err) {
						reject((err.message) ? err.message : err);
					}
					else {
						this.db = null;
						fs.unlinkProm(this.dbFile).then(resolve).catch(reject);
					}
					
				});

			});
			
		}

	}

	getRaces() {

		return new Promise((resolve, reject) => {

			this.db.all("SELECT id, code, name FROM races ORDER BY races.name;", [], (err, rows) => {

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

		return new Promise((resolve, reject) => {

			this.db.all("SELECT id, code, name, tft" +
						" FROM characters" +
						" WHERE characters.k_race = :id_race" +
						" ORDER BY characters.name;", { ":id_race": race.id }, (err, rows) => {

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

		return new Promise((resolve, reject) => {

			this.db.all("SELECT" +
							"  actions.id, actions.code, actions.name, actions.file, " +
							"  actions_types.id AS type_id, actions_types.code AS type_code, actions_types.name AS type_name" +
						" FROM actions" +
							" INNER JOIN actions_types ON actions_types.id = actions.k_action_type" +
						" WHERE actions.k_character = :id_character" +
						" ORDER BY actions.name;", { ":id_character": character.id }, (err, rows) => {

				if (err) {
					reject((err.message) ? err.message : err);
				}
				else if (!rows) {
					resolve([]);
				}
				else {

					rows.forEach((action, i) => {

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

		return new Promise((resolve, reject) => {

			this.db.all("SELECT id, code, name, file" +
						" FROM musics" +
						" WHERE musics.k_race = :id_race" +
						" ORDER BY musics.name;", { ":id_race": race.id }, (err, rows) => {

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

		return new Promise((resolve, reject) => {

			this.db.all("SELECT warnings.id, warnings.code, warnings.name, warnings.file" +
						" FROM warnings" +
						" WHERE warnings.k_race = :id_race" +
						" ORDER BY warnings.name;", { ":id_race": race.id }, (err, rows) => {

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
