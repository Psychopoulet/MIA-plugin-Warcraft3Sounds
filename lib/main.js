
"use strict";

// dependances

	const 	path = require("path"),
			fs = require("node-promfs"),

			BASIC_URL = "/api/plugins/warcraft3sounds/";

// module

module.exports = class MIAPluginWarcraft3Sound extends require("node-pluginsmanager").plugin {

	constructor () {
		super();
		this.database = new (require(path.join(__dirname, "database", "database.js")))();
	}

	load (Container) {
		
		return this.database.init().then(() => {

			// sons

			Container.get("servers.app").get(BASIC_URL + "sounds/:file", (req, res) => {

				// let file = path.join(__dirname, "sounds", req.params.file);
				let file = path.join("C:\\Documents and Settings\\Hubi\\Bureau\\in", req.params.file);

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
						Container.get("servers.web").sendNotFoundHTMLResponse(req, res);
					}

				});

			})

			// races

			.get(BASIC_URL + "races", (req, res) => {

				if (Container.get("conf").get("debug")) {
					Container.get("logs").log("warcraft3sounds / get races");
				}

				this.database.getRaces().then((races) => {

					races.forEach((race, key) => {
						races[key].url = BASIC_URL + "races/" + race.code;
						races[key].charactersurl = BASIC_URL + "races/" + race.code + "/characters";
						races[key].musicsurl = BASIC_URL + "races/" + race.code + "/musics";
						races[key].warningsurl = BASIC_URL + "races/" + race.code + "/warnings";
					});

					Container.get("servers.web").sendValidJSONResponse(req, res, races);

				}).catch((err) => {
					Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get races : " + ((err.message) ? err.message : err));
					Container.get("servers.web").sendInternalErrorJSONResponse(req, res, (err.message) ? err.message : err);
				});

			}).get(BASIC_URL + "races/:race", (req, res) => {

				if (Container.get("conf").get("debug")) {
					Container.get("logs").log("warcraft3sounds / get " + req.params.race);
				}

				this.database.getRace(req.params.race).then((race) => {

					if (!race) {
						Container.get("servers.web").sendNotFoundJSONResponse(req, res);
					}
					else {
						race.url = BASIC_URL + "races/" + race.code;
						race.charactersurl = BASIC_URL + "races/" + race.code + "/characters";
						race.musicsurl = BASIC_URL + "races/" + race.code + "/musics";
						race.warningsurl = BASIC_URL + "races/" + race.code + "/warnings";
						Container.get("servers.web").sendValidJSONResponse(req, res, race);
					}

				}).catch((err) => {
					Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get race : " + ((err.message) ? err.message : err));
					Container.get("servers.web").sendInternalErrorJSONResponse(req, res, (err.message) ? err.message : err);
				});

			})

				// characters

				.get(BASIC_URL + "races/:race/characters", (req, res) => {

					if (Container.get("conf").get("debug")) {
						Container.get("logs").log("warcraft3sounds / get " + req.params.race + " characters");
					}

					this.database.getRace(req.params.race).then((race) => {

						if (!race) {
							Container.get("servers.web").sendNotFoundJSONResponse(req, res);
						}
						else {

							this.database.getCharacters(race).then((characters) => {

								characters.forEach((character, key) => {
									characters[key].url = BASIC_URL + "races/" + race.code + "/characters/" + character.code;
									characters[key].actionsurl = BASIC_URL + "races/" + race.code + "/characters/" + character.code + "/actions";
								});

								Container.get("servers.web").sendValidJSONResponse(req, res, characters);

							}).catch((err) => {
								Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get characters : " + ((err.message) ? err.message : err));
								Container.get("servers.web").sendInternalErrorJSONResponse(req, res, (err.message) ? err.message : err);
							});

						}

					}).catch((err) => {
						Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get race : " + ((err.message) ? err.message : err));
						Container.get("servers.web").sendInternalErrorJSONResponse(req, res, (err.message) ? err.message : err);
					});

				}).get(BASIC_URL + "races/:race/characters/:character", (req, res) => {

					if (Container.get("conf").get("debug")) {
						Container.get("logs").log("warcraft3sounds / get " + req.params.characters);
					}

					this.database.getRace(req.params.race).then((race) => {

						if (!race) {
							Container.get("servers.web").sendNotFoundJSONResponse(req, res);
						}
						else {

							this.database.getCharacter(race, req.params.character).then((character) => {

								if (!character) {
									Container.get("servers.web").sendNotFoundJSONResponse(req, res);
								}
								else {
									character.url = BASIC_URL + "races/" + race.code + "/characters/" + character.code;
									character.actionsurl = BASIC_URL + "races/" + race.code + "/characters/" + character.code + "/actions";
									Container.get("servers.web").sendValidJSONResponse(req, res, character);
								}

							}).catch((err) => {
								Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get character : " + ((err.message) ? err.message : err));
								Container.get("servers.web").sendInternalErrorJSONResponse(req, res, (err.message) ? err.message : err);
							});

						}

					}).catch((err) => {
						Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get race : " + ((err.message) ? err.message : err));
						Container.get("servers.web").sendInternalErrorJSONResponse(req, res, (err.message) ? err.message : err);
					});

				})

					// actions

					.get(BASIC_URL + "races/:race/characters/:character/actions", (req, res) => {

						if (Container.get("conf").get("debug")) {
							Container.get("logs").log("warcraft3sounds / get " + req.params.character + " actions");
						}

						this.database.getRace(req.params.race).then((race) => {

							if (!race) {
								Container.get("servers.web").sendNotFoundJSONResponse(req, res);
							}
							else {

								this.database.getCharacter(race, req.params.character).then((character) => {

									if (!character) {
										Container.get("servers.web").sendNotFoundJSONResponse(req, res);
									}
									else {

										this.database.getActions(character).then((actions) => {

											actions.forEach((action, key) => {
												actions[key].url = BASIC_URL + "races/" + race.code + "/characters/" + character.code + "/actions/" + action.code;
												actions[key].soundurl = BASIC_URL + "sounds/" + action.file;
											});

											Container.get("servers.web").sendValidJSONResponse(req, res, actions);

										}).catch((err) => {
											Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get actions : " + ((err.message) ? err.message : err));
											Container.get("servers.web").sendInternalErrorJSONResponse(req, res, (err.message) ? err.message : err);
										});

									}

								}).catch((err) => {
									Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get character : " + ((err.message) ? err.message : err));
									Container.get("servers.web").sendInternalErrorJSONResponse(req, res, (err.message) ? err.message : err);
								});

							}

						}).catch((err) => {
							Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get race : " + ((err.message) ? err.message : err));
							Container.get("servers.web").sendInternalErrorJSONResponse(req, res, (err.message) ? err.message : err);
						});

					}).get(BASIC_URL + "races/:race/characters/:character/actions/:action", (req, res) => {

						if (Container.get("conf").get("debug")) {
							Container.get("logs").log("warcraft3sounds / get " + req.params.action);
						}

						this.database.getRace(req.params.race).then((race) => {

							if (!race) {
								Container.get("servers.web").sendNotFoundJSONResponse(req, res);
							}
							else {

								this.database.getCharacter(race, req.params.character).then((character) => {

									if (!character) {
										Container.get("servers.web").sendNotFoundJSONResponse(req, res);
									}
									else {

										this.database.getAction(character, req.params.action).then((action) => {

											if (!action) {
												Container.get("servers.web").sendNotFoundJSONResponse(req, res);
											}
											else {

												action.url = BASIC_URL + "races/" + race.code + "/characters/" + character.code + "/actions/" + action.code;
												action.soundurl = BASIC_URL + "sounds/" + action.file;

												Container.get("servers.web").sendValidJSONResponse(req, res, action);

											}

										}).catch((err) => {
											Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get action : " + ((err.message) ? err.message : err));
											Container.get("servers.web").sendInternalErrorJSONResponse(req, res, (err.message) ? err.message : err);
										});

									}

								}).catch((err) => {
									Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get character : " + ((err.message) ? err.message : err));
									Container.get("servers.web").sendInternalErrorJSONResponse(req, res, (err.message) ? err.message : err);
								});

							}

						}).catch((err) => {
							Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get race : " + ((err.message) ? err.message : err));
							Container.get("servers.web").sendInternalErrorJSONResponse(req, res, (err.message) ? err.message : err);
						});

					})

				// musics

				.get(BASIC_URL + "races/:race/musics", (req, res) => {

					if (Container.get("conf").get("debug")) {
						Container.get("logs").log("warcraft3sounds / get " + req.params.race + " musics");
					}

					this.database.getRace(req.params.race).then((race) => {

						if (!race) {
							Container.get("servers.web").sendNotFoundJSONResponse(req, res);
						}
						else {

							this.database.getMusics(race).then((musics) => {

								musics.forEach((music, key) => {
									musics[key].url = BASIC_URL + "races/" + race.code + "/musics/" + music.code;
									musics[key].soundurl = BASIC_URL + "sounds/" + music.file;
								});

								Container.get("servers.web").sendValidJSONResponse(req, res, musics);

							}).catch((err) => {
								Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get musics : " + ((err.message) ? err.message : err));
								Container.get("servers.web").sendInternalErrorJSONResponse(req, res, (err.message) ? err.message : err);
							});

						}

					}).catch((err) => {
						Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get race : " + ((err.message) ? err.message : err));
						Container.get("servers.web").sendInternalErrorJSONResponse(req, res, (err.message) ? err.message : err);
					});

				}).get(BASIC_URL + "races/:race/musics/:music", (req, res) => {

					if (Container.get("conf").get("debug")) {
						Container.get("logs").log("warcraft3sounds / get " + req.params.music);
					}

					this.database.getRace(req.params.race).then((race) => {

						if (!race) {
							Container.get("servers.web").sendNotFoundJSONResponse(req, res);
						}
						else {

							this.database.getMusic(race, req.params.music).then((music) => {

								if (!music) {
									Container.get("servers.web").sendNotFoundJSONResponse(req, res);
								}
								else {

									music.url = BASIC_URL + "races/" + race.code + "/musics/" + music.code;
									music.soundurl = BASIC_URL + "sounds/" + music.file;

									Container.get("servers.web").sendValidJSONResponse(req, res, music);

								}

							}).catch((err) => {
								Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get music : " + ((err.message) ? err.message : err));
								Container.get("servers.web").sendInternalErrorJSONResponse(req, res, (err.message) ? err.message : err);
							});

						}

					}).catch((err) => {
						Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get race : " + ((err.message) ? err.message : err));
						Container.get("servers.web").sendInternalErrorJSONResponse(req, res, (err.message) ? err.message : err);
					});

				})

				// warnings

				.get(BASIC_URL + "races/:race/warnings", (req, res) => {

					if (Container.get("conf").get("debug")) {
						Container.get("logs").log("warcraft3sounds / get " + req.params.race + " warnings");
					}

					this.database.getRace(req.params.race).then((race) => {

						if (!race) {
							Container.get("servers.web").sendNotFoundJSONResponse(req, res);
						}
						else {

							this.database.getWarnings(race).then((warnings) => {

								warnings.forEach((warning, key) => {
									warnings[key].url = BASIC_URL + "races/" + race.code + "/warnings/" + warning.code;
									warnings[key].soundurl = BASIC_URL + "sounds/" + warning.file;
								});

								Container.get("servers.web").sendValidJSONResponse(req, res, warnings);

							}).catch((err) => {
								Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get warnings : " + ((err.message) ? err.message : err));
								Container.get("servers.web").sendInternalErrorJSONResponse(req, res, (err.message) ? err.message : err);
							});

						}

					}).catch((err) => {
						Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get race : " + ((err.message) ? err.message : err));
						Container.get("servers.web").sendInternalErrorJSONResponse(req, res, (err.message) ? err.message : err);
					});

				}).get(BASIC_URL + "races/:race/warnings/:warning", (req, res) => {

					if (Container.get("conf").get("debug")) {
						Container.get("logs").log("warcraft3sounds / get " + req.params.warning);
					}

					this.database.getRace(req.params.race).then((race) => {

						if (!race) {
							Container.get("servers.web").sendNotFoundJSONResponse(req, res);
						}
						else {

							this.database.getWarning(race, req.params.warning).then((warning) => {

								if (!warning) {
									Container.get("servers.web").sendNotFoundJSONResponse(req, res);
								}
								else {

									warning.url = BASIC_URL + "races/" + race.code + "/warnings/" + warning.code;
									warning.soundurl = BASIC_URL + "sounds/" + warning.file;

									Container.get("servers.web").sendValidJSONResponse(req, res, warning);

								}

							}).catch((err) => {
								Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get warning : " + ((err.message) ? err.message : err));
								Container.get("servers.web").sendInternalErrorJSONResponse(req, res, (err.message) ? err.message : err);
							});

						}

					}).catch((err) => {
						Container.get("logs").err("-- [plugins/Warcraft3Sounds] - get race : " + ((err.message) ? err.message : err));
						Container.get("servers.web").sendInternalErrorJSONResponse(req, res, (err.message) ? err.message : err);
					});

				});

			/*

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
