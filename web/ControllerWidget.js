app.controller('ControllerWarcraftSounds', ['$scope', '$popup', "$MIA", function($scope, $popup, $MIA) {

	"use strict";

	// public

		// attributes

			$scope.races = $scope.characters = $scope.actions = $scope.musics = $scope.warnings = $scope.devices = [];
			$scope.selectedrace = $scope.selectedmusic = $scope.selectedwarning = $scope.selectedcharacter = null;

		// interface

			// selects

				$scope.selectRace = function(race) {

					if (!race) {
						$scope.characters = $scope.actions = $scope.musics = $scope.warnings = [];
						$scope.selectedrace = $scope.selectedmusic = $scope.selectedwarning = $scope.selectedcharacter = null;
					}
					else {

						$scope.selectedrace = race;

						$MIA.url(race.charactersurl).then(function(data) {

							$scope.characters = data;
							$scope.selectCharacter((1 == data.length) ? data[0] : null);
							
						}).catch(function(err) {

							$popup.alert({
								title: "Chargement des personnages",
								message: err.message,
								type: "danger"
							});

						});

						$MIA.url(race.musicsurl).then(function(data) {

							$scope.musics = data;
							$scope.selectedmusic = (1 == data.length) ? data[0] : null;
				
						}).catch(function(err) {

							$popup.alert({
								title: "Chargement des musiques",
								message: err.message,
								type: "danger"
							});

						});

						$MIA.url(race.warningsurl).then(function(data) {

							$scope.warnings = data;
							$scope.selectedwarning = (1 == data.length) ? data[0] : null;
				
						}).catch(function(err) {

							$popup.alert({
								title: "Chargement des alertes",
								message: err.message,
								type: "danger"
							});

						});

					}

				};

				$scope.selectCharacter = function(character) {

					if (!character) {
						$scope.selectedcharacter = null;
						$scope.actions = [];
					}
					else {

						$scope.selectedcharacter = character;

						$MIA.url(character.actionsurl).then(function(data) {

							$scope.actions = data;
							$scope.selectedaction = (1 == data.length) ? data[0] : null;
				
						}).catch(function(err) {

							$popup.alert({
								title: "Chargement des actions",
								message: err.message,
								type: "danger"
							});

						});

					}

				};

		// previews

			$scope.previewMusic = function(race, music) {

				$popup.sound({
					sources: [ music.soundurl ],
					title: race.name + ' - ' + music.name
				});

			};
			$scope.previewWarning = function(race, warning) {

				$popup.sound({
					sources: [ warning.soundurl ],
					title: race.name + ' - ' + warning.name
				});

			};
			$scope.previewAction = function(race, character, action) {
				
				$popup.sound({
					sources: [ action.soundurl ],
					title: race.name + '/' + character.name + ' - ' + action.name
				});

			};

		// plays

			$scope.playMusicOnChild = function(device, music) {

				socket.emit('plugin.warcraft3sounds.music.play', {
					device : device, music : music
				});

			};
			$scope.playWarningOnChild = function(device, warning) {

				socket.emit('plugin.warcraft3sounds.warning.play', {
					device : device, warning : warning
				});

			};
			$scope.playActionOnChild = function(device, action) {

				socket.emit('plugin.warcraft3sounds.action.play', {
					device : device, action : action
				});

			};

		// actions

			$scope.createSound = function (race, device, sound) {
				$actions.add(race.name + ' - ' + sound.name, device, $actions.getActionTypeByCommand('media.sound.play'), sound);
			};

	// socket

		socket.on('devices', function (devices) {
			
			$scope.$apply(function() {

				$scope.devices = [];
				angular.forEach(devices, function(device) {

					if (device.connected && 'ACCEPTED' == device.status.code) {
						$scope.devices.push(device);
					}

				});
				
				$scope.selecteddevice = (1 == $scope.devices.length) ? $scope.devices[0] : null;
				
			});

		}).on('plugin.warcraft3sounds.error', function(err) {

			$popup.alert({
				title: "Warcraft 3 sounds",
				message: err,
				type: 'danger'
			});

		});
	
	// init
	
		$MIA.onLogin(function() {

			$MIA.url("/api/plugins/warcraft3sounds/races").then(function(data) {

				$scope.races = data;
				$scope.selectRace((1 == data.length) ? data[0] : null);
				
			}).catch(function(err) {

				$popup.alert({
					title: "Chargement des races",
					message: err.message,
					type: "danger"
				});

			});

		});

}]);
