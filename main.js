
"use strict";

// dependances

	const 	path = require('path'),
			fs = require('simplefs'),
			SimplePluginsManager = require('simplepluginsmanager'),
			Warcraft3SoundsDatabase = require(path.join(__dirname, 'database', 'database.js'));

// private

	function _freeSocket(socket) {

		socket.removeAllListeners('plugin.warcraft3sounds.races.get');
			socket.removeAllListeners('plugin.warcraft3sounds.characters.get');
				socket.removeAllListeners('plugin.warcraft3sounds.actions.get');
			socket.removeAllListeners('plugin.warcraft3sounds.musics.get');
			socket.removeAllListeners('plugin.warcraft3sounds.warnings.get');

		socket.removeAllListeners('plugin.warcraft3sounds.action.play');
		socket.removeAllListeners('plugin.warcraft3sounds.music.play');
		socket.removeAllListeners('plugin.warcraft3sounds.warning.play');

	}

// module

module.exports = class MIAPluginWarcraft3Sound extends SimplePluginsManager.SimplePlugin {

	constructor () {
 
		super();
 
		this.database = new Warcraft3SoundsDatabase();
		this.basicurl = '/warcraft3sounds/';
		
	}

	load (Container) {
		
		let that = this;

		return new Promise(function(resolve, reject) {

			that.database.init().then(function() {

				Container.get('express').get(that.basicurl + ':file', function(req, res) {

					let file = path.join(__dirname, 'sounds', req.params.file);

					if (Container.get('conf').get('debug')) {
						Container.get('logs').log('warcraft3sounds / get file');
						Container.get('logs').log(req.params.file);
						Container.get('logs').log(file);
					}

					if (fs.isFileSync(file)) {
						res.sendFile(file);
					}
					else {

						if (res.writeHead) {
							res.writeHead(404, {'Content-Type': 'text/plain'});
						}
						if (res.end) {
							res.end('Not found');
						}

					}

				});

				Container.get('websockets').onDisconnect(_freeSocket).onLog(function(socket) {

					try {

						if (Container.get('conf').get('debug')) {
							Container.get('logs').log('plugin.warcraft3sounds.races.get');
						}

						that.database.getRaces().then(function(races) {

							Container.get('websockets').emit('plugin.warcraft3sounds.races.get', races);

						}).catch(function(err) {
							Container.get('logs').err('-- [plugins/Warcraft3Sounds] - get races : ' + ((err.message) ? err.message : err));
							Container.get('websockets').emit('plugins.warcraft3sounds.error', ((err.message) ? err.message : err));
						});

					}
					catch(e) {
						Container.get('logs').err('-- [plugins/Warcraft3Sounds] - get races : ' + ((e.message) ? e.message : e));
						Container.get('websockets').emit('plugins.warcraft3sounds.error', ((e.message) ? e.message : e));
					}

					socket.on('plugin.warcraft3sounds.characters.get', function (data) {

						if (Container.get('conf').get('debug')) {
							Container.get('logs').log('plugin.warcraft3sounds.characters.get');
						}

						if (!data) {
							Container.get('websockets').emit('plugin.warcraft3sounds.error', 'Missing data.');
						}
						else if (!data.race || !data.race.code) {
							Container.get('websockets').emit('plugin.warcraft3sounds.error', 'Missing race code.');
						}
						else {
							
							try {

								that.database.getCharacters(data.race).then(function(characters) {

									Container.get('websockets').emit('plugin.warcraft3sounds.characters.get', characters);

								}).catch(function(err) {
									Container.get('logs').err('-- [plugins/Warcraft3Sounds] - get characters : ' + ((err.message) ? err.message : err));
									Container.get('websockets').emit('plugins.warcraft3sounds.error', ((err.message) ? err.message : err));
								});

							}
							catch(e) {
								Container.get('logs').err('-- [plugins/Warcraft3Sounds] - get characters : ' + ((e.message) ? e.message : e));
								Container.get('websockets').emit('plugins.warcraft3sounds.error', ((e.message) ? e.message : e));
							}

						}

					})
						.on('plugin.warcraft3sounds.actions.get', function (data) {

							if (Container.get('conf').get('debug')) {
								Container.get('logs').log('plugin.warcraft3sounds.actions.get');
							}

							if (!data) {
								Container.get('websockets').emit('plugin.warcraft3sounds.error', 'Missing data.');
							}
							else if (!data.character || !data.character.code) {
								Container.get('websockets').emit('plugin.warcraft3sounds.error', 'Missing character code.');
							}
							else {

								try {

									that.database.getActions(data.character).then(function(actions) {

										actions.forEach(function(action, i) {

											actions[i].url = that.basicurl + action.file;
											delete actions[i].file;

										});

										Container.get('websockets').emit('plugin.warcraft3sounds.actions.get', actions);

									}).catch(function(err) {
										Container.get('logs').err('-- [plugins/Warcraft3Sounds] - get actions : ' + ((err.message) ? err.message : err));
										Container.get('websockets').emit('plugins.warcraft3sounds.error', ((err.message) ? err.message : err));
									});

								}
								catch(e) {
									Container.get('logs').err('-- [plugins/Warcraft3Sounds] - get actions : ' + ((e.message) ? e.message : e));
									Container.get('websockets').emit('plugins.warcraft3sounds.error', ((e.message) ? e.message : e));
								}

							}

						})
					.on('plugin.warcraft3sounds.musics.get', function (data) {

						if (Container.get('conf').get('debug')) {
							Container.get('logs').log('plugin.warcraft3sounds.musics.get');
						}

						if (!data) {
							Container.get('websockets').emit('plugin.warcraft3sounds.error', 'Missing data.');
						}
						else if (!data.race || !data.race.code) {
							Container.get('websockets').emit('plugin.warcraft3sounds.error', 'Missing race code.');
						}
						else {

							try {

								that.database.getMusics(data.race).then(function(musics) {

									musics.forEach(function(music, i) {

										musics[i].url = that.basicurl + music.file;
										delete musics[i].file;

									});

									Container.get('websockets').emit('plugin.warcraft3sounds.musics.get', musics);

								}).catch(function(err) {
									Container.get('logs').err('-- [plugins/Warcraft3Sounds] - get musics : ' + ((err.message) ? err.message : err));
									Container.get('websockets').emit('plugins.warcraft3sounds.error', ((err.message) ? err.message : err));
								});

							}
							catch(e) {
								Container.get('logs').err('-- [plugins/Warcraft3Sounds] - get musics : ' + ((e.message) ? e.message : e));
								Container.get('websockets').emit('plugins.warcraft3sounds.error', ((e.message) ? e.message : e));
							}

						}

					})
					.on('plugin.warcraft3sounds.warnings.get', function (data) {

						if (Container.get('conf').get('debug')) {
							Container.get('logs').log('plugin.warcraft3sounds.warnings.get');
						}

						if (!data) {
							Container.get('websockets').emit('plugin.warcraft3sounds.error', 'Missing data.');
						}
						else if (!data.race || !data.race.code) {
							Container.get('websockets').emit('plugin.warcraft3sounds.error', 'Missing race code.');
						}
						else {
							
							try {

								that.database.getWarnings(data.race).then(function(warnings) {

									warnings.forEach(function(warning, i) {

										warnings[i].url = that.basicurl + warning.file;
										delete warnings[i].file;

									});

									Container.get('websockets').emit('plugin.warcraft3sounds.warnings.get', warnings);

								}).catch(function(err) {
									Container.get('logs').err('-- [plugins/Warcraft3Sounds] - get warnings : ' + ((err.message) ? err.message : err));
									Container.get('websockets').emit('plugins.warcraft3sounds.error', ((err.message) ? err.message : err));
								});

							}
							catch(e) {
								Container.get('logs').err('-- [plugins/Warcraft3Sounds] - get warnings : ' + ((e.message) ? e.message : e));
								Container.get('websockets').emit('plugins.warcraft3sounds.error', ((e.message) ? e.message : e));
							}

						}

					})

					.on('plugin.warcraft3sounds.action.play', function (data) {

						if (Container.get('conf').get('debug')) {
							Container.get('logs').log('plugin.warcraft3sounds.action.play');
						}

						if (!data) {
							Container.get('websockets').emit('plugin.warcraft3sounds.error', 'Missing data.');
						}
						else if (!data.action) {
							socket.emit('plugin.warcraft3sounds.error', 'Missing \'action\' data');
						}
						else if (!data.action.url) {
							socket.emit('plugin.warcraft3sounds.error', 'Missing \'action.url\' data');
						}
						else {
							Container.get('childssockets').emitTo(data.child.token, 'child.sounds.play', data.action);
						}
							
					})
					.on('plugin.warcraft3sounds.music.play', function (data) {

						if (Container.get('conf').get('debug')) {
							Container.get('logs').log('plugin.warcraft3sounds.music.play');
						}

						if (!data) {
							Container.get('websockets').emit('plugin.warcraft3sounds.error', 'Missing data.');
						}
						else if (!data.music) {
							socket.emit('plugin.warcraft3sounds.error', 'Missing \'music\' data');
						}
						else if (!data.music.url) {
							socket.emit('plugin.warcraft3sounds.error', 'Missing \'music.url\' data');
						}
						else {
							Container.get('childssockets').emitTo(data.child.token, 'child.sounds.play', data.music);
						}

					})
					.on('plugin.warcraft3sounds.warning.play', function (data) {

						if (Container.get('conf').get('debug')) {
							Container.get('logs').log('plugin.warcraft3sounds.warning.play');
						}

						if (!data) {
							Container.get('websockets').emit('plugin.warcraft3sounds.error', 'Missing data.');
						}
						else if (!data.warning) {
							socket.emit('plugin.warcraft3sounds.error', 'Missing \'warning\' data');
						}
						else if (!data.warning.url) {
							socket.emit('plugin.warcraft3sounds.error', 'Missing \'warning.url\' data');
						}
						else {
							Container.get('childssockets').emitTo(data.child.token, 'child.sounds.play', data.warning);
						}

					});

				});

				resolve();

			})
			.catch(function(err) {
				Container.get('logs').err('-- [plugins/Warcraft3Sounds] - init database : ' + ((err.message) ? err.message : err));
				Container.get('websockets').emit('plugins.warcraft3sounds.error', ((err.message) ? err.message : err));
				reject();
			});

		});

	}

	unload (Container) {

		let that = this;

		super.unload();

		return new Promise(function(resolve, reject) {

			try {
				Container.get('websockets').getSockets().forEach(_freeSocket);
				that.database.close();
			}
			catch(e) {
				Container.get('logs').err('-- [plugins/Warcraft3Sounds] - unload : ' + ((e.message) ? e.message : e));
			}

			resolve();

		});

	}

	install (Container) {

		return new Promise(function(resolve, reject) {

			try {

				fs.mkdirpProm(path.join(__dirname, 'sounds')).then(function() {
					Container.get('logs').log("-- [plugins/Warcraft3Sounds] : Dossier des sons créé.");
					resolve();
				}).catch(function(err) {
					Container.get('logs').err("-- [plugins/Warcraft3Sounds] : Impossible de créer le dossier des sons (" + err + ").");
					reject(err);
				});

			}
			catch(e) {
				Container.get('logs').err('-- [plugins/Warcraft3Sounds] - install : ' + ((e.message) ? e.message : e));
				reject((e.message) ? e.message : e);
			}

		});

	}

	uninstall () {

		return new Promise(function(resolve, reject) {

			try {
				
				fs.rmdirpProm(path.join(__dirname, 'sounds'), function(err) {
					Container.get('logs').log("-- [plugins/Warcraft3Sounds] : Dossier des sons supprimé.");
					resolve();
				}).catch(function(err) {
					Container.get('logs').err("-- [plugins/Warcraft3Sounds] : Impossible de supprimer le dossier des sons (" + err + ").");
					reject(err);
				});

			}
			catch(e) {
				Container.get('logs').err('-- [plugins/Warcraft3Sounds] - uninstall : ' + ((e.message) ? e.message : e));
				reject((e.message) ? e.message : e);
			}
		
		});

	}

};
