app.controller('ControllerWarcraftSounds', ['$scope', '$actions', '$popup', function($scope, $actions, $popup) {

	"use strict";

	// attributes

		// private

			var tabActionsTypes = [];

		// public

			$scope.races = $scope.characters = $scope.actions = $scope.musics = $scope.warnings = $scope.childs = [];
			$scope.selectedrace = $scope.selectedmusic = $scope.selectedwarning = $scope.selectedcharacter = null;

	// methods

		// selects

			$scope.selectRace = function(race) {

				if (race) {

					$scope.selectedrace = race;

					socket.emit('plugin.warcraft3sounds.characters.get', { race : race });
					socket.emit('plugin.warcraft3sounds.musics.get', { race : race });
					socket.emit('plugin.warcraft3sounds.warnings.get', { race : race });

				}
				else {
					$scope.characters = $scope.actions = $scope.musics = $scope.warnings = [];
					$scope.selectedrace = $scope.selectedmusic = $scope.selectedwarning = $scope.selectedcharacter = null;
				}

			};

			$scope.selectCharacter = function(race, character) {

				if (race && character) {
					$scope.selectedcharacter = character;
					socket.emit('plugin.warcraft3sounds.actions.get', { race : race, character : character });
				}
				else {
					$scope.selectedcharacter = null;
					$scope.actions = [];
				}

			};

		// previews

			$scope.previewMusic = function(race, music) {

                $popup.sound({
                	sources: [ music.url ],
                	title: race.name + ' - ' + music.name
                });

			};
			$scope.previewWarning = function(race, warning) {

                $popup.sound({
                	sources: [ warning.url ],
                	title: race.name + ' - ' + warning.name
                });

			};
            $scope.previewAction = function(race, character, action) {
            	
                $popup.sound({
                	sources: [ action.url ],
                	title: race.name + '/' + character.name + ' - ' + action.name
                });

            };

		// plays

			$scope.playMusicOnChild = function(child, music) {

				socket.emit('plugin.warcraft3sounds.music.play', {
					child : child, music : music
				});

			};
			$scope.playWarningOnChild = function(child, warning) {

				socket.emit('plugin.warcraft3sounds.warning.play', {
                    child : child, warning : warning
				});

			};
            $scope.playActionOnChild = function(child, action) {

                socket.emit('plugin.warcraft3sounds.action.play', {
                    child : child, action : action
                });

            };

		// actions

			$scope.createSound = function (child, sound) {

				for (var i = 0; i < tabActionsTypes.length; ++i) {

					if (tabActionsTypes[i].command == 'media.sound.play') {
						$actions.add(sound.name, child, tabActionsTypes[i], sound);
						break;
					}

				}

			};

	// constructor

		// events

			// actionstypes

			socket.on('actionstypes', function(actionstypes) {
				$scope.$apply(function() { tabActionsTypes = actionstypes; });
			})

			// childs

			.on('childs', function (childs) {
				
				$scope.$apply(function() {

					$scope.childs = [];
					angular.forEach(childs, function(child) {

						if (child.connected && 'ACCEPTED' == child.status.code) {
							$scope.childs.push(child);
						}

					});
					
					$scope.selectedchild = (1 == $scope.childs.length) ? $scope.childs[0] : null;
					
				});

		    });
	
			// sockets

				socket.on('plugin.warcraft3sounds.races.get', function (races) {

					$scope.$apply(function() {

						$scope.races = races;
						$scope.selectRace((1 == races.length) ? races[0] : null);
						
					});

				})
				.on('plugin.warcraft3sounds.characters.get', function (characters) {

					$scope.$apply(function() {

						$scope.characters = characters;
						$scope.selectCharacter($scope.selectedrace, (1 == characters.length) ? characters[0] : null);
						
					});

				})
					.on('plugin.warcraft3sounds.actions.get', function (actions) {

						$scope.$apply(function() {

							$scope.actions = actions;
							$scope.selectedaction = (1 == actions.length) ? actions[0] : null;
							
						});

					})
				.on('plugin.warcraft3sounds.musics.get', function (musics) {

					$scope.$apply(function() {

						$scope.musics = musics;
						$scope.selectedmusic = (1 == musics.length) ? musics[0] : null;
						
					});

				})
				.on('plugin.warcraft3sounds.warnings.get', function (warnings) {
					
					$scope.$apply(function() {

						$scope.warnings = warnings;
						$scope.selectedmusic = (1 == warnings.length) ? warnings[0] : null;
						
					});

				})
				.on('plugin.warcraft3sounds.error', function(err) {

					$popup.alert({
						message: err,
						type: 'danger'
					});

				});

}]);
