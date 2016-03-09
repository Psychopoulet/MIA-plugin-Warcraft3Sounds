
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

module.exports = class CronPlugin extends SimplePluginsManager.SimplePlugin {

	constructor () {
 
		super();
 
		this.directory = __dirname;
		this.loadDataFromPackageFile();

		this.database = new Warcraft3SoundsDatabase();
		this.basicurl = '/warcraft3sounds';
		
	}

	loadRaces (Container) {

		try {

			this.database.getRaces().then(function(races) {

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

	}

	run (Container) {
		
		var that = this;

		if (!fs.mkdirp(path.join(__dirname, 'sounds'))) {
			Container.get('logs').err("-- [plugins/Warcraft3Sounds] : Impossible de créer le dossier des sons.");
			Container.get('websockets').emit('plugins.warcraft3sounds.error', "Impossible de créer le dossier des sons.");
		}
		else {

			this.database.init().then(function() {

				Container.get('express').get('/warcraft3sounds/:file', function(req, res) {

					var file = path.join(__dirname, 'sounds', req.params.file);

					if (fs.fileExists(file)) {
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

				Container.get('websockets').onDisconnect(_freeSocket)
				.onLog(function(socket) {

					that.loadRaces(Container);

					socket.on('plugin.warcraft3sounds.characters.get', function (data) {

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

			})
			.catch(function(err) {
				Container.get('logs').err('-- [plugins/Warcraft3Sounds] - init database : ' + ((err.message) ? err.message : err));
				Container.get('websockets').emit('plugins.warcraft3sounds.error', ((err.message) ? err.message : err));
			});

		}

	}

	free () {

		super.free();

		Container.get('websockets').getSockets().forEach(_freeSocket);
		
		fs.rmdirp(path.join(__dirname, 'sounds'));
		this.database.close();

	}

};
