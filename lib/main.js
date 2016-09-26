
"use strict";

// dependances

	const path = require("path");

// module

module.exports = class MIAPluginWarcraft3Sound extends require("node-pluginsmanager").plugin {

	constructor () {
		super();
		this.database = new (require(path.join(__dirname, "database", "database.js")))();
	}

	load (Container) {
		
		return this.database.init().then(() => {
			require(path.join(__dirname, "api.js"))(Container, this.database);
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

			return require("node-promfs").mkdirpProm(path.join(__dirname, "sounds")).then(() => {
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

			return require("node-promfs").rmdirpProm(path.join(__dirname, "sounds"), () => {
				Container.get("logs").log("-- [plugins/Warcraft3Sounds] : Dossier des sons supprimé.");
				return Promise.resolve();
			}).catch((err) => {
				Container.get("logs").err("-- [plugins/Warcraft3Sounds] : Impossible de supprimer le dossier des sons (" + ((err.message) ? err.message : err) + ").");
				return Promise.reject((err.message) ? err.message : err);
			});

		});

	}

};
