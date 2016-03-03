
"use strict";

// dependances

	const 	path = require('path'),
			fs = require('simplefs'),
			SimplePluginsManager = require('simplepluginsmanager');

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
		
		// this.backupFilePath = path.join(__dirname, 'backup.json');
 
	}

	loadRaces (Container) {

		try {

			Container.get('websockets').emit('plugin.warcraft3sounds.races.get', [ { code: 'humans', name: 'Humains' } ]);

		}
		catch(e) {
			Container.get('logs').err('-- [plugins/Warcraft3Sounds] - loadRaces : ' + ((e.message) ? e.message : e));
			Container.get('websockets').emit('plugins.warcraft3sounds.error', ((e.message) ? e.message : e));
		}

	}

	run (Container) {
		
		var that = this;

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

					Container.get('websockets').emit('plugin.warcraft3sounds.characters.get', [{ code: 'paladin', name: 'Paladin' }]);

				}

			})
				.on('plugin.warcraft3sounds.actions.get', function (data) {

					if (!data) {
						Container.get('websockets').emit('plugin.warcraft3sounds.error', 'Missing data.');
					}
					else if (!data.race || !data.race.code) {
						Container.get('websockets').emit('plugin.warcraft3sounds.error', 'Missing race code.');
					}
					else if (!data.character || !data.character.code) {
						Container.get('websockets').emit('plugin.warcraft3sounds.error', 'Missing character code.');
					}
					else {

						Container.get('websockets').emit('plugin.warcraft3sounds.actions.get', []);

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

					Container.get('websockets').emit('plugin.warcraft3sounds.musics.get', []);

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
					
					Container.get('websockets').emit('plugin.warcraft3sounds.warnings.get', []);

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

	}

	free () {

		super.free();

		Container.get('websockets').getSockets().forEach(_freeSocket);

		/*if (isADelete && fs.fileExists(this.backupFilePath)) {
			fs.unlinkSync(this.backupFilePath);
		}*/
		
	}

};
