
"use strict";

// dependances

	const 	path = require("path"),
			fs = require("node-promfs"),

			BASIC_URL = "/plugins/warcraft3sounds/";

// module

module.exports = class MIAPluginWarcraft3Sound extends require("node-pluginsmanager").plugin {

	constructor () {
		super();
		this.database = new (require(path.join(__dirname, "database", "database.js")))();
	}

	load (Container) {
		
		return this.database.init().then(() => {

			// sons

			Container.get("servers.app").get(BASIC_URL + ":file", (req, res) => {

				let file = path.join(__dirname, "sounds", req.params.file);

				if (Container.get("conf").get("debug")) {
					Container.get("logs").log("warcraft3sounds / get file");
					Container.get("logs").log(req.params.file);
					Container.get("logs").log(file);
				}

				fs.isFileProm(file).then((exists) => {

					if (exists) {
						res.sendFile(file);
					}
					else {
						Container.get("servers.web").sendNotFoundResponse(res);
					}

				});

			})

			// races

			.get(BASIC_URL + "api/races", (req, res) => {

				if (Container.get("conf").get("debug")) {
					Container.get("logs").log("warcraft3sounds / get races");
				}

				this.database.getRaces().then(function(races) {

					Container.get("servers.web").sendValidJSONResponse(res, races);

				}).catch((err) => {
					Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get races : " + ((err.message) ? err.message : err));
					Container.get("servers.web").sendInternalErrorJSONResponse(res, (err.message) ? err.message : err);
				});

			}).get(BASIC_URL + "api/races/:race", (req, res) => {

				if (Container.get("conf").get("debug")) {
					Container.get("logs").log("warcraft3sounds / get races");
				}

				this.database.getRaces().then(function(races) {

					let race = null;

						for (let i = 0; i < races.length; ++i) {

							if (req.params.race === races[i].code) {
								race = races[i];
								break;
							}

						}

					if (race) {
						Container.get("servers.web").sendValidJSONResponse(res, race);
					}
					else {
						Container.get("servers.web").sendNotFoundResponse(res);
					}

				}).catch((err) => {
					Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get race : " + ((err.message) ? err.message : err));
					Container.get("servers.web").sendInternalErrorJSONResponse(res, (err.message) ? err.message : err);
				});

			});

			/*Container.get("websockets").onDisconnect(_freeSocket).onLog(function(socket) {

				try {

					if (Container.get("conf").get("debug")) {
						Container.get("logs").log("plugin.warcraft3sounds.races.get");
					}

					this.database.getRaces().then(function(races) {

						Container.get("websockets").emit("plugin.warcraft3sounds.races.get", races);

					}).catch((err) => {
						Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get races : " + ((err.message) ? err.message : err));
						Container.get("websockets").emit("plugins.warcraft3sounds.error", ((err.message) ? err.message : err));
					});

				}
				catch(e) {
					Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get races : " + ((e.message) ? e.message : e));
					Container.get("websockets").emit("plugins.warcraft3sounds.error", ((e.message) ? e.message : e));
				}

				socket.on("plugin.warcraft3sounds.characters.get", function (data) {

					if (Container.get("conf").get("debug")) {
						Container.get("logs").log("plugin.warcraft3sounds.characters.get");
					}

					if (!data) {
						Container.get("websockets").emit("plugin.warcraft3sounds.error", "Missing data.");
					}
					else if (!data.race || !data.race.code) {
						Container.get("websockets").emit("plugin.warcraft3sounds.error", "Missing race code.");
					}
					else {
						
						try {

							this.database.getCharacters(data.race).then(function(characters) {

								Container.get("websockets").emit("plugin.warcraft3sounds.characters.get", characters);

							}).catch((err) => {
								Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get characters : " + ((err.message) ? err.message : err));
								Container.get("websockets").emit("plugins.warcraft3sounds.error", ((err.message) ? err.message : err));
							});

						}
						catch(e) {
							Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get characters : " + ((e.message) ? e.message : e));
							Container.get("websockets").emit("plugins.warcraft3sounds.error", ((e.message) ? e.message : e));
						}

					}

				})
					.on("plugin.warcraft3sounds.actions.get", function (data) {

						if (Container.get("conf").get("debug")) {
							Container.get("logs").log("plugin.warcraft3sounds.actions.get");
						}

						if (!data) {
							Container.get("websockets").emit("plugin.warcraft3sounds.error", "Missing data.");
						}
						else if (!data.character || !data.character.code) {
							Container.get("websockets").emit("plugin.warcraft3sounds.error", "Missing character code.");
						}
						else {

							try {

								this.database.getActions(data.character).then(function(actions) {

									actions.forEach(function(action, i) {

										actions[i].url = this.basicurl + action.file;
										delete actions[i].file;

									});

									Container.get("websockets").emit("plugin.warcraft3sounds.actions.get", actions);

								}).catch((err) => {
									Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get actions : " + ((err.message) ? err.message : err));
									Container.get("websockets").emit("plugins.warcraft3sounds.error", ((err.message) ? err.message : err));
								});

							}
							catch(e) {
								Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get actions : " + ((e.message) ? e.message : e));
								Container.get("websockets").emit("plugins.warcraft3sounds.error", ((e.message) ? e.message : e));
							}

						}

					})
				.on("plugin.warcraft3sounds.musics.get", function (data) {

					if (Container.get("conf").get("debug")) {
						Container.get("logs").log("plugin.warcraft3sounds.musics.get");
					}

					if (!data) {
						Container.get("websockets").emit("plugin.warcraft3sounds.error", "Missing data.");
					}
					else if (!data.race || !data.race.code) {
						Container.get("websockets").emit("plugin.warcraft3sounds.error", "Missing race code.");
					}
					else {

						try {

							this.database.getMusics(data.race).then(function(musics) {

								musics.forEach(function(music, i) {

									musics[i].url = this.basicurl + music.file;
									delete musics[i].file;

								});

								Container.get("websockets").emit("plugin.warcraft3sounds.musics.get", musics);

							}).catch((err) => {
								Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get musics : " + ((err.message) ? err.message : err));
								Container.get("websockets").emit("plugins.warcraft3sounds.error", ((err.message) ? err.message : err));
							});

						}
						catch(e) {
							Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get musics : " + ((e.message) ? e.message : e));
							Container.get("websockets").emit("plugins.warcraft3sounds.error", ((e.message) ? e.message : e));
						}

					}

				})
				.on("plugin.warcraft3sounds.warnings.get", function (data) {

					if (Container.get("conf").get("debug")) {
						Container.get("logs").log("plugin.warcraft3sounds.warnings.get");
					}

					if (!data) {
						Container.get("websockets").emit("plugin.warcraft3sounds.error", "Missing data.");
					}
					else if (!data.race || !data.race.code) {
						Container.get("websockets").emit("plugin.warcraft3sounds.error", "Missing race code.");
					}
					else {
						
						try {

							this.database.getWarnings(data.race).then(function(warnings) {

								warnings.forEach(function(warning, i) {

									warnings[i].url = this.basicurl + warning.file;
									delete warnings[i].file;

								});

								Container.get("websockets").emit("plugin.warcraft3sounds.warnings.get", warnings);

							}).catch((err) => {
								Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get warnings : " + ((err.message) ? err.message : err));
								Container.get("websockets").emit("plugins.warcraft3sounds.error", ((err.message) ? err.message : err));
							});

						}
						catch(e) {
							Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get warnings : " + ((e.message) ? e.message : e));
							Container.get("websockets").emit("plugins.warcraft3sounds.error", ((e.message) ? e.message : e));
						}

					}

				})

				.on("plugin.warcraft3sounds.action.play", function (data) {

					if (Container.get("conf").get("debug")) {
						Container.get("logs").log("plugin.warcraft3sounds.action.play");
					}

					if (!data) {
						Container.get("websockets").emit("plugin.warcraft3sounds.error", "Missing data.");
					}
					else if (!data.action) {
						socket.emit("plugin.warcraft3sounds.error", "Missing \"action\" data");
					}
					else if (!data.action.url) {
						socket.emit("plugin.warcraft3sounds.error", "Missing \"action.url\" data");
					}
					else {
						Container.get("childssockets").emitTo(data.child.token, "child.sounds.play", data.action);
					}
						
				})
				.on("plugin.warcraft3sounds.music.play", function (data) {

					if (Container.get("conf").get("debug")) {
						Container.get("logs").log("plugin.warcraft3sounds.music.play");
					}

					if (!data) {
						Container.get("websockets").emit("plugin.warcraft3sounds.error", "Missing data.");
					}
					else if (!data.music) {
						socket.emit("plugin.warcraft3sounds.error", "Missing \"music\" data");
					}
					else if (!data.music.url) {
						socket.emit("plugin.warcraft3sounds.error", "Missing \"music.url\" data");
					}
					else {
						Container.get("childssockets").emitTo(data.child.token, "child.sounds.play", data.music);
					}

				})
				.on("plugin.warcraft3sounds.warning.play", function (data) {

					if (Container.get("conf").get("debug")) {
						Container.get("logs").log("plugin.warcraft3sounds.warning.play");
					}

					if (!data) {
						Container.get("websockets").emit("plugin.warcraft3sounds.error", "Missing data.");
					}
					else if (!data.warning) {
						socket.emit("plugin.warcraft3sounds.error", "Missing \"warning\" data");
					}
					else if (!data.warning.url) {
						socket.emit("plugin.warcraft3sounds.error", "Missing \"warning.url\" data");
					}
					else {
						Container.get("childssockets").emitTo(data.child.token, "child.sounds.play", data.warning);
					}

				});

			});*/

		}).catch((err) => {
			Container.get("logs").err("-- [plugins/Warcraft3Sounds] - init database : " + ((err.message) ? err.message : err));
			return Promise.reject((err.message) ? err.message : err);
		});

	}

	unload (Container) {

		return super.unload().then(() => {

			return new Promise((resolve, reject) => {

				this.database.close((err) => {

					if (err) {
						Container.get("logs").err("-- [plugins/Warcraft3Sounds] - unload : " + ((err.message) ? err.message : err));
						reject((err.message) ? err.message : err);
					}
					else {
						resolve();
					}

				});

			});

		});

	}

	install (Container) {

		return super.install().then(() => {

			return fs.mkdirpProm(path.join(__dirname, "sounds")).then(() => {
				Container.get("logs").success("-- [plugins/Warcraft3Sounds] : Dossier des sons créé.");
				return Promise.resolve();
			}).catch((err) => {
				Container.get("logs").err("-- [plugins/Warcraft3Sounds] : Impossible de créer le dossier des sons (" + ((err.message) ? err.message : err) + ").");
				return Promise.reject((err.message) ? err.message : err);
			});

		});

	}

	uninstall (Container) {

		return super.uninstall().then(() => {

			return fs.rmdirpProm(path.join(__dirname, "sounds"), () => {
				Container.get("logs").log("-- [plugins/Warcraft3Sounds] : Dossier des sons supprimé.");
				return Promise.resolve();
			}).catch((err) => {
				Container.get("logs").err("-- [plugins/Warcraft3Sounds] : Impossible de supprimer le dossier des sons (" + ((err.message) ? err.message : err) + ").");
				return Promise.reject((err.message) ? err.message : err);
			});

		});

	}

};
