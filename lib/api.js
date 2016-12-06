
"use strict";

// dependances

	const 	path = require("path"),
			fs = require("node-promfs");

// consts

	const	BASIC_URL = "/api/plugins/warcraft3sounds/";

// module

module.exports = (Container, database) => {

	// sons

	Container.get("servers.app").get(BASIC_URL + "sounds/:file", (req, res) => {

		// let file = path.join(__dirname, "sounds", req.params.file);
		let file = path.join("C:\\Users\\meona\\Desktop\\in", req.params.file);

		if (Container.get("conf").get("debug")) {
			Container.get("logs").log("warcraft3sounds / get file");
			Container.get("logs").log(req.params.file + " => " + file);
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

		database.getRaces().then((races) => {

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

		database.getRace(req.params.race).then((race) => {

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

			database.getRace(req.params.race).then((race) => {

				if (!race) {
					Container.get("servers.web").sendNotFoundJSONResponse(req, res);
				}
				else {

					database.getCharacters(race).then((characters) => {

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

			database.getRace(req.params.race).then((race) => {

				if (!race) {
					Container.get("servers.web").sendNotFoundJSONResponse(req, res);
				}
				else {

					database.getCharacter(race, req.params.character).then((character) => {

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

				database.getRace(req.params.race).then((race) => {

					if (!race) {
						Container.get("servers.web").sendNotFoundJSONResponse(req, res);
					}
					else {

						database.getCharacter(race, req.params.character).then((character) => {

							if (!character) {
								Container.get("servers.web").sendNotFoundJSONResponse(req, res);
							}
							else {

								database.getActions(character).then((actions) => {

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

				database.getRace(req.params.race).then((race) => {

					if (!race) {
						Container.get("servers.web").sendNotFoundJSONResponse(req, res);
					}
					else {

						database.getCharacter(race, req.params.character).then((character) => {

							if (!character) {
								Container.get("servers.web").sendNotFoundJSONResponse(req, res);
							}
							else {

								database.getAction(character, req.params.action).then((action) => {

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

			database.getRace(req.params.race).then((race) => {

				if (!race) {
					Container.get("servers.web").sendNotFoundJSONResponse(req, res);
				}
				else {

					database.getMusics(race).then((musics) => {

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

			database.getRace(req.params.race).then((race) => {

				if (!race) {
					Container.get("servers.web").sendNotFoundJSONResponse(req, res);
				}
				else {

					database.getMusic(race, req.params.music).then((music) => {

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

			database.getRace(req.params.race).then((race) => {

				if (!race) {
					Container.get("servers.web").sendNotFoundJSONResponse(req, res);
				}
				else {

					database.getWarnings(race).then((warnings) => {

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

			database.getRace(req.params.race).then((race) => {

				if (!race) {
					Container.get("servers.web").sendNotFoundJSONResponse(req, res);
				}
				else {

					database.getWarning(race, req.params.warning).then((warning) => {

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

};
