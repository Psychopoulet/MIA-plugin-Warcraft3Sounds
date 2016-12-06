
-- races

CREATE TABLE races (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	code VARCHAR(20) NOT NULL,
	name VARCHAR(25) NOT NULL,
	UNIQUE (code)
);

INSERT INTO races (id, code, name) VALUES
(1, 'humans', 'Humains'),
(2, 'nightelfs', 'Elfes de la nuit'),
(3, 'orcs', 'Orcs'),
(4, 'undeads', 'Morts vivants'),
(5, 'neutrals', 'Neutres');

-- actions_types

CREATE TABLE actions_types (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	code VARCHAR(20) NOT NULL,
	name VARCHAR(25) NOT NULL,
	UNIQUE (code)
);

INSERT INTO actions_types (id, code, name) VALUES
(1, 'ready', 'Prêt !'),
(2, 'warcry', 'Cri de guerre'),
(3, 'what', 'What ?'),
(4, 'yes', 'Oui ?'),
(5, 'attack', 'Attaque'),
(6, 'fun', 'Fun'),
(7, 'death', 'Mort');

-- musics

CREATE TABLE musics (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	k_race INTEGER NOT NULL,
	code varchar(20) NOT NULL,
	name varchar(25) NOT NULL,
	file varchar(50) NOT NULL,
	UNIQUE (k_race, code),
	FOREIGN KEY (k_race) REFERENCES races (id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- warnings

CREATE TABLE warnings (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	k_race INTEGER NOT NULL,
	code varchar(20) NOT NULL,
	name varchar(25) NOT NULL,
	file varchar(50) NOT NULL,
	UNIQUE (k_race, code),
	FOREIGN KEY (k_race) REFERENCES races (id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO warnings (k_race, code, name, file) VALUES

(1, 'allyattack', 'Notre allié est attaqué !', 'KnightAllyAttack1.wav'),
(1, 'allyherodies', 'Le héros de notre allié est tombé', 'KnightAllyHeroDies1.wav'),
(1, 'allytownattack', 'La ville de notre allié est assiégée', 'KnightAllyTownAttack1.wav'),
(1, 'buildingcomplete', 'Travail terminé', 'PeasantBuildingComplete1.wav'),
(1, 'cannotbuildthere', 'Je ne peux rien bâtir ici', 'PeasantCannotBuildThere1.wav'),
(1, 'goldminecollapsed', 'Notre mine d''or s''est effondrée', 'KnightGoldMineCollapsed1.wav'),
(1, 'goldminelow', 'Notre mine d''or est presque épuisée', 'KnightGoldMineLow1.wav'),
(1, 'herodies', 'Notre héros est mort', 'KnightHeroDies1.wav'),
(1, 'inventoryfull', 'Inventaire plein', 'KnightInventoryFull1.wav'),
(1, 'noenergy', 'Mana insuffisant', 'KnightNoEnergy1.wav'),
(1, 'nofood', 'Il faut plus de fermes', 'KnightNoFood1.wav'),
(1, 'nogold', 'Nous avons besoin de plus d''or', 'KnightNoGold1.wav'),
(1, 'nolumber', 'Il nous faut plus de bois', 'KnightNoLumber1.wav'),
(1, 'researchcomplete', 'Recherche terminée', 'KnightResearchComplete1.wav'),
(1, 'townattack', 'Notre ville est assiégée', 'KnightTownAttack1.wav'),
(1, 'unitattack', 'Nous sommes attaqués', 'KnightUnitAttack1.wav'),
(1, 'upgradecomplete', 'Amélioration terminée', 'KnightUpgradeComplete1.wav'),

(2, 'allyattack', 'Nous devons aider nos alliés !', 'SentinelAllyUnderAttack1.wav'),
(2, 'allyherodies', 'Un champion allié est tombé !', 'SentinelAllyHeroDies1.wav'),
(2, 'allytownattack', 'La ville de notre allié a besoin de nous !', 'SentinelAllyTownAttack1.wav'),
(2, 'buildingcomplete', 'Bâtiment construit.', 'HuntressBuildingComplete1.wav'),
(2, 'cannotbuildthere', 'Impossible de construire ici.', 'HuntressCannotBuildThere1.wav'),
(2, 'goldminecollapsed', 'Notre mine d''or s''est effondrée', 'HuntressGoldMineCollapsed1.wav'),
(2, 'goldminelow', 'Notre mine d''or est presque épuisée', 'HuntressGoldMineLow1.wav'),
(2, 'herodies', 'Notre champion est mort', 'SentinelHeroDies1.wav'),
(2, 'inventoryfull', 'Inventaire plein', 'SentinelInventoryFull1.wav'),
(2, 'noenergy', 'Plus de mana', 'SentinelNoEnergy1.wav'),
(2, 'nofood', 'Construisez plus de puits de lune', 'HuntressNoFood1.wav'),
(2, 'nogold', 'Pas assez d''or', 'SentinelNoGold1.wav'),
(2, 'nolumber', 'Pas assez de bois', 'SentinelNoLumber1.wav'),
(2, 'researchcomplete', 'Recherche terminée', 'SentinelResearchComplete1.wav'),
(2, 'townattack', 'Ils souillent notre sanctuaire !', 'SentinelTownAttack1.wav'),
(2, 'unitattack', 'Nos guerriers engagent l''ennemi', 'SentinelUnitAttack1.wav'),
(2, 'upgradecomplete', 'Amélioration terminée', 'SentinelUpgradeComplete1.wav'),

(3, 'allyattack', 'Notre allié a besoin de nous', 'GruntAllyUnderAttack1.wav'),
(3, 'allyherodies', 'Le héros de notre allié est mort', 'GruntAllyHeroDies1.wav'),
(3, 'allytownattack', 'La ville de notre allié est attaquée !', 'GruntAllyTownAttack1.wav'),
(3, 'buildingcomplete', 'Travail terminé', 'PeonJobDone.wav'),
(3, 'cannotbuildthere', 'Impossible de construire ici', 'PeonCannotBuildThere1.wav'),
(3, 'goldminecollapsed', 'Notre mine d''or s''est effondrée', 'GruntGoldMineCollapsed1.wav'),
(3, 'goldminelow', 'Notre mine d''or est presque épuisée', 'GruntGoldMineLow1.wav'),
(3, 'herodies', 'Notre héros a été vaincu', 'GruntHeroDies1.wav'),
(3, 'inventoryfull', 'Inventaire plein', 'GruntInventoryFull1.wav'),
(3, 'noenergy', 'Pas assez de mana', 'GruntNoEnergy1.wav'),
(3, 'nofood', 'Construisez d''autres antre des orcs', 'GruntNoFood1.wav'),
(3, 'nogold', 'Il faut plus d''or', 'GruntNoGold1.wav'),
(3, 'nolumber', 'Il faut plus de bois', 'GruntNoLumber1.wav'),
(3, 'researchcomplete', 'Recherche terminée', 'GruntResearchComplete1.wav'),
(3, 'townattack', 'Notre ville est attaquée !', 'GruntTownAttack1.wav'),
(3, 'unitattack', 'Nous sommes attaqués !', 'GruntUnitAttack1.wav'),
(3, 'upgradecomplete', 'Amélioration terminée', 'GruntUpgradeComplete1.wav'),

(4, 'allyattack', 'Nos frères ont besoin d''aide', 'NecromancerAllyUnderAttack1.wav'),
(4, 'allyherodies', 'Un héros allié a succombé', 'NecromancerAllyHeroDies1.wav'),
(4, 'allytownattack', 'La ville de nos frères est attaquée', 'NecromancerAllyTownAttack1.wav'),
(4, 'buildingcomplete', 'L''invocation est accomplie', 'AcolyteBuildingComplete1.wav'),
(4, 'cannotbuildthere', 'Je ne peux pas invoquer ici', 'AcolyteCannotBuildThere1.wav'),
(4, 'goldminecollapsed', 'Notre mine d''or s''est effondrée', 'NecromancerGoldMineCollapsed1.wav'),
(4, 'goldminelow', 'Notre mine d''or est presque vide', 'NecromancerGoldMineNearlyEmpty1.wav'),
(4, 'herodies', 'Notre héros a succombé', 'NecromancerHeroDies1.wav'),
(4, 'inventoryfull', 'Inventaire plein', 'NecromancerInventoryFull1.wav'),
(4, 'noenergy', 'Pas assez de mana', 'NecromancerNoEnergy1.wav'),
(4, 'nofood', 'Dressez plus de ziggourat', 'NecromancerNoFood1.wav'),
(4, 'nogold', 'Il faut plus d''or', 'NecromancerNoGold1.wav'),
(4, 'nolumber', 'Il faut plus de bois', 'NecromancerNoLumber1.wav'),
(4, 'researchcomplete', 'Recherche terminée', 'NecromancerResearchComplete1.wav'),
(4, 'townattack', 'Des infidèles attaquent notre ville !', 'NecromancerTownAttack1.wav'),
(4, 'unitattack', 'Nos forces sont attaquées !', 'NecromancerUnitAttack1.wav'),
(4, 'upgradecomplete', 'Amélioration terminée', 'NecromancerUpgradeComplete1.wav'),
(4, 'placedoffblight', 'On ne peut invoquer que sur terre hantée', 'AcolytePlacedOffBlight1.wav'),

(5, 'goldminecollapsed', 'Une mine d''or s''est effondrée', 'GenericWarningGoldCollapsed1.mp3'),
(5, 'goldminelow', 'Une mine d''or est presque épuisée', 'GenericWarningGoldMineRunningLow1.wav'),
(5, 'herodies', 'Un héros est mort', 'GenericWarningHeroFallen1.mp3'),
(5, 'noenergy', 'Pas assez de mana', 'GenericWarningNoMana1.mp3'),
(5, 'researchcomplete', 'La recherche est terminée', 'GenericWarningResearchComplete1.mp3'),
(5, 'townattack', 'Une ville est assiégée', 'GenericWarningTownAttack1.mp3'),
(5, 'upgradecomplete', 'Amélioration terminée', 'GenericWarningUpgradeComplete1.mp3'),
(5, 'unitattack', 'Les forces d''un joueur sont attaquées', 'GenericWarningUnitAttack1.mp3');

-- characters

CREATE TABLE characters (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	k_race INTEGER NOT NULL,
	code varchar(20) NOT NULL,
	name varchar(25) NOT NULL,
	tft tinyint(1) NOT NULL DEFAULT 0,
	UNIQUE (k_race, code),
	FOREIGN KEY (k_race) REFERENCES races (id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO characters (id, k_race, code, name, tft) VALUES

-- humans

(1, 1, 'paladin', 'Paladin', 0),
(2, 1, 'mountainking', 'Roi de la montagne', 0),
(3, 1, 'archmage', 'Archimage', 0),
(4, 1, 'bloodelfmage', 'Mage elfe de sang', 1),
(5, 1, 'peasant', 'Paysan', 0),
(6, 1, 'footman', 'Soldat', 0),
(7, 1, 'rifleman', 'Fusiller', 0),
(8, 1, 'knight', 'Chevalier', 0),
(9, 1, 'gyrocopter', 'Gyrocoptère', 0),
(10, 1, 'gryphonrider', 'Chevaucheur de gryphon', 0),
(11, 1, 'priest', 'Prêtre', 0),
(12, 1, 'sorceress', 'Sorcière', 0),
(13, 1, 'spellbreaker', 'spellbreaker', 1),
(14, 1, 'hawkrider', 'hawkrider', 1),
(59, 1, 'jaina', 'Jaina', 0),
(60, 1, 'mortarteam', 'Mortier', 0),
(61, 1, 'muradin', 'Muradin', 0),
(62, 1, 'uther', 'Uther', 0),
(63, 1, 'windserpent', 'windserpent', 0),
(64, 1, 'villager', 'Villageois', 0),
(65, 1, 'captain', 'Capitaine', 0),

-- nightelfs

(28, 2, 'demonhunter', 'Chasseur de démons', 0),
(29, 2, 'keeperofthegrove', 'keeperofthegrove', 0),
(30, 2, 'moonpriestess', 'Prêtresse de la lune', 0),
(31, 2, 'warden', 'warden', 1),
(32, 2, 'archer', 'Archer', 0),
(33, 2, 'huntress', 'Chasseresse', 0),
(34, 2, 'dryad', 'Dryade', 0),
(35, 2, 'druidoftheclaw', 'druidoftheclaw', 0),
(36, 2, 'druidofthetalon', 'druidofthetalon', 0),
(37, 2, 'hippogryphrider', 'Chevaucheur d''hippogryphe', 0),
(73, 2, 'furion', 'Furion', 0),
(74, 2, 'illidan', 'Illidan', 0),
(75, 2, 'illidanmorphed', 'Illidan transformé', 0),
(76, 2, 'shandris', 'Shandris', 0),
(77, 2, 'sylvanas', 'Sylvanas', 0),
(78, 2, 'tyrande', 'Tyrande', 0),

-- orcs

(15, 3, 'blademaster', 'blademaster', 0),
(16, 3, 'farseer', 'farseer', 0),
(17, 3, 'taurenchieftain', 'taurenchieftain', 0),
(18, 3, 'shadowhunter', 'shadowhunter', 1),
(19, 3, 'peon', 'peon', 0),
(20, 3, 'grunt', 'grunt', 0),
(21, 3, 'headhunter', 'headhunter', 0),
(22, 3, 'wolfrider', 'wolfrider', 0),
(23, 3, 'wyvernrider', 'wyvernrider', 0),
(24, 3, 'tauren', 'tauren', 0),
(25, 3, 'shaman', 'shaman', 0),
(26, 3, 'witchdoctor', 'witchdoctor', 0),
(27, 3, 'spiritwalker', 'spiritwalker', 1),
(79, 3, 'cairne', 'Cairne', 0),
(80, 3, 'grom', 'Grom', 0),
(81, 3, 'thrall', 'Thrall', 0),
(82, 3, 'warlord', 'Warlord', 0),

-- undeads

(38, 4, 'deathknight', 'Chevalier de la mort', 0),
(39, 4, 'lich', 'Liche', 0),
(40, 4, 'dreadlord', 'dreadlord', 0),
(41, 4, 'cryptlord', 'cryptlord', 1),
(42, 4, 'acolyte', 'Acolyte', 0),
(43, 4, 'ghoul', 'Goule', 0),
(44, 4, 'cryptfiend', 'cryptfiend', 0),
(45, 4, 'abomination', 'Abomination', 0),
(46, 4, 'necromancer', 'Nécromancien', 0),
(47, 4, 'banshee', 'Banshee', 0),
(48, 4, 'shade', 'Ombre', 0),
(57, 4, 'arthas', 'Arthas', 0),
(83, 4, 'kelthuzad', 'Kelthuzad', 0),
(85, 4, 'tichondrius', 'Tichondrius', 0),

-- neutrals

(49, 5, 'alchemist', 'alchemist', 1),
(50, 5, 'ladyvash', 'ladyvash', 1),
(51, 5, 'tinker', 'tinker', 1),
(52, 5, 'beastmaster', 'beastmaster', 1),
(53, 5, 'pandaren', 'pandaren', 1),
(54, 5, 'darkranger', 'darkranger', 1),
(55, 5, 'pitlord', 'pitlord', 0),
(56, 5, 'firelord', 'firelord', 1),

(58, 5, 'bandit', 'Bandit', 0),
(66, 5, 'foresttroll', 'foresttroll', 0),
(67, 5, 'goblinmerchant', 'goblinmerchant', 0),
(68, 5, 'goblinsapper', 'goblinsapper', 0),
(69, 5, 'goblinzeppelin', 'goblinzeppelin', 0),
(70, 5, 'icetroll', 'icetroll', 0),
(71, 5, 'ogre', 'ogre', 0),
(72, 5, 'satyre', 'satyre', 0);

-- actions

CREATE TABLE actions (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	k_character INTEGER NOT NULL,
	k_action_type INTEGER NOT NULL,
	code varchar(20) NOT NULL,
	name varchar(25) NOT NULL,
	file varchar(50) NOT NULL,
	FOREIGN KEY (k_character) REFERENCES characters (id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (k_action_type) REFERENCES actions_types (id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO actions (k_character, k_action_type, code, name, file) VALUES

-- humans

(1, 1, 'ready1', 'Ma foi est mon glaive', 'HeroPaladinReady1.wav'),
(1, 2, 'warcry1', 'Que lightbringer te montre la voie', 'HeroPaladinWarcry1.wav'),
(1, 3, 'what1', 'Qu''attendez-vous de moi ?', 'HeroPaladinWhat1.wav'),
(1, 3, 'what2', 'Je n''ai aucune crainte', 'HeroPaladinWhat2.wav'),
(1, 3, 'what3', 'J''affronterai tous les périls', 'HeroPaladinWhat3.wav'),
(1, 3, 'what4', 'Comme il vous siéra', 'HeroPaladinWhat4.wav'),
(1, 4, 'yes1', 'Comme vous le souhaitez', 'HeroPaladinYes1.wav'),
(1, 4, 'yes2', 'Pour l''honneur', 'HeroPaladinYes2.wav'),
(1, 4, 'yes3', 'Pour la foi', 'HeroPaladinYes3.wav'),
(1, 4, 'yes4', 'Il en sera ainsi', 'HeroPaladinYes4.wav'),
(1, 5, 'attack1', 'Je suis le bras de la justice', 'HeroPaladinYesAttack1.wav'),
(1, 5, 'attack3', 'Mort aux infidèles', 'HeroPaladinYesAttack3.wav'),
(1, 5, 'attack2', 'En votre nom', 'HeroPaladinYesAttack2.wav'),
(1, 6, 'fun1', 'Je sers la foi', 'HeroPaladinPissed1.wav'),
(1, 6, 'fun2', 'Je suis le bouclier des croyants', 'HeroPaladinPissed2.wav'),
(1, 6, 'fun3', 'Bas les pattes ! J''ai fait voeux de chasteté.', 'HeroPaladinPissed3.wav'),
(1, 6, 'fun4', 'Oui JP, c''est mon dernier mot', 'HeroPaladinPissed4.wav'),
(1, 6, 'fun5', 'Je vais faire appel au public', 'HeroPaladinPissed5.wav'),
(1, 6, 'fun6', 'Le coté obscur n''est pas le plus fort, non. Plus rapide ! Plus facile. Plus séduisant...', 'HeroPaladinPissed6.wav'),
(1, 7, 'death1', 'Mort', 'HeroPaladinDeath.wav'),

(2, 1, 'ready1', 'Prêt !', 'HeroMountainKingReady1.wav'),
(2, 2, 'warcry1', 'Pour Khaz Modan !', 'HeroMountainKingWarcry1.wav'),
(2, 3, 'what1', 'Oui ?', 'HeroMountainKingWhat1.wav'),
(2, 3, 'what2', 'Vivement un peu d''action', 'HeroMountainKingWhat2.wav'),
(2, 3, 'what3', 'J''attend les ordres !', 'HeroMountainKingWhat3.wav'),
(2, 3, 'what4', 'Mmm ?', 'HeroMountainKingWhat4.wav'),
(2, 4, 'yes1', 'Très bien !', 'HeroMountainKingYes1.wav'),
(2, 4, 'yes2', 'C''est parti !', 'HeroMountainKingYes2.wav'),
(2, 4, 'yes3', 'En route !', 'HeroMountainKingYes3.wav'),
(2, 4, 'yes4', 'Laissez-moi passer !', 'HeroMountainKingYes4.wav'),
(2, 5, 'attack1', 'Aux armes !', 'HeroMountainKingYesAttack1.wav'),
(2, 5, 'attack2', 'Ca va faire mal', 'HeroMountainKingYesAttack2.wav'),
(2, 5, 'attack3', 'Tranche, taille et cours !', 'HeroMountainKingYesAttack3.wav'),
(2, 5, 'attack4', 'A l''assaut !', 'HeroMountainKingYesAttack4.wav'),
(2, 6, 'fun1', 'Un pastis, sinon rien', 'HeroMountainKingPissed1.wav'),
(2, 6, 'fun2', 'Tavernier, à boire et à manger', 'HeroMountainKingPissed2.wav'),
(2, 6, 'fun3', 'Qui est gros ?', 'HeroMountainKingPissed3.wav'),
(2, 6, 'fun4', 'Petit mais costaud !', 'HeroMountainKingPissed4.wav'),
(2, 6, 'fun5', 'On pourrait pas en discuter autour d''une chopine ?', 'HeroMountainKingPissed5.wav'),
(2, 6, 'fun6', 'Un tonneau d''hydromel, ça use le gosier', 'HeroMountainKingPissed6.wav'),
(2, 6, 'fun7', 'Du rhum, des femmes, et d''la bière nom de Dieu !', 'HeroMountainKingPissed7.wav'),
(2, 7, 'death1', 'Mort', 'HeroMountainKingDeath.wav'),

(3, 1, 'ready1', 'J''espère pour vous que ça en vaut la peine', 'HeroArchmageReady1.wav'),
(3, 2, 'warcry1', 'Pour la gloire', 'HeroArchmageWarcry1.wav'),
(3, 3, 'what1', 'Ainsi vous réclamez mon aide', 'HeroArchmageWhat1.wav'),
(3, 3, 'what2', 'Qui a-t-il, encore ?', 'HeroArchmageWhat2.wav'),
(3, 3, 'what3', 'Je vous écoute', 'HeroArchmageWhat3.wav'),
(3, 3, 'what4', 'Alors ?', 'HeroArchmageWhat4.wav'),
(3, 4, 'yes1', 'J''ai hâte d''y être', 'HeroArchmageYes1.wav'),
(3, 4, 'yes2', 'Parfait !', 'HeroArchmageYes2.wav'),
(3, 4, 'yes3', 'Puisqu''il le faut', 'HeroArchmageYes3.wav'),
(3, 4, 'yes4', 'Fort bien', 'HeroArchmageYes4.wav'),
(3, 5, 'attack1', 'J''engage le combat', 'HeroArchmageYes1.wav'),
(3, 5, 'attack2', 'Pour la gloire', 'HeroArchmageYes2.wav'),
(3, 5, 'attack3', 'Nim flori...', 'HeroArchmageYes3.wav'),
(3, 6, 'fun1', 'La seule chance qu''on a de gagner la guerre, c''est qu''en face ils soient aussi cons qu''ici.', 'HeroArchmageDeath1.wav'),
(3, 6, 'fun2', 'Vous avez lu Clausewitz ?', 'HeroArchmageDeath2.wav'),
(3, 6, 'fun3', 'Et Sun-Tzu vous l''avez lu ?', 'HeroArchmageDeath3.wav'),
(3, 6, 'fun4', 'Magie, magie, et vos idées n''ont pas de génie', 'HeroArchmageDeath4.wav'),
(3, 7, 'death1', 'Mort', 'HeroArchmageDeath.wav'),

(5, 1, 'ready1', 'Prêt à travailler !', 'PeasantReady1.wav'),
(5, 2, 'warcry1', 'Haaaaaa', 'PeasantWarcry1.wav'),
(5, 3, 'what1', 'Oui messire ?', 'PeasantWhat1.wav'),
(5, 3, 'what2', 'Qu''y a-t-il ?', 'PeasantWhat2.wav'),
(5, 3, 'what3', 'Encore du travail ?', 'PeasantWhat3.wav'),
(5, 3, 'what4', 'Pardon ?', 'PeasantWhat4.wav'),
(5, 4, 'yes1', 'Bien', 'PeasantYes1.wav'),
(5, 4, 'yes2', 'Oui monseigneur', 'PeasantYes2.wav'),
(5, 4, 'yes3', 'Très bien', 'PeasantYes3.wav'),
(5, 4, 'yes4', 'Je m''en charge', 'PeasantYes4.wav'),
(5, 5, 'attack1', 'Je peux essayer', 'PeasantYesAttack1.wav'),
(5, 5, 'attack2', 'Si vous le voulez vraiment', 'PeasantYesAttack2.wav'),
(5, 5, 'attack3', 'Vous n''avez personne d''autre ?', 'PeasantYesAttack3.wav'),
(5, 5, 'attack4', 'Ça y est, je suis mort...', 'PeasantYesAttack4.wav'),
(5, 6, 'fun1', 'Votre prénom, c''est François, c''est juste ?', 'PeasantPissed1.wav'),
(5, 6, 'fun2', 'Il est bon ! C''est un champion du monde !', 'PeasantPissed2.wav'),
(5, 6, 'fun3', 'Il pourrait me faire l''historique de la louche à travers les âges ?', 'PeasantPissed3.wav'),
(5, 6, 'fun4', 'Ne m''invitez jamais à diner, j''aurais toujours un doute.', 'PeasantPissed4.wav'),
(5, 6, 'fun5', 'il essaie de faire de l''humour ! Ecoutez ça, c''est pathétique.', 'PeasantPissed5.wav'),
(5, 7, 'death1', 'Mort', 'PeasantDeath.wav'),

(6, 1, 'ready1', 'Prêt à l''action', 'FootmanReady1.wav'),
(6, 2, 'warcry1', 'Pour Lordaeron !', 'FootmanWarcry1.wav'),
(6, 3, 'what1', 'Quels sont les ordres ?', 'FootmanWhat1.wav'),
(6, 3, 'what2', 'Que voulez-vous ?', 'FootmanWhat2.wav'),
(6, 3, 'what3', 'Oui monseigneur ?', 'FootmanWhat3.wav'),
(6, 3, 'what4', 'Donnez vos ordres !', 'FootmanWhat4.wav'),
(6, 4, 'yes1', 'Compris, monseigneur', 'FootmanYes1.wav'),
(6, 4, 'yes3', 'A vos ordres !', 'FootmanYes3.wav'),
(6, 4, 'yes2', 'J''y vais !', 'FootmanYes2.wav'),
(6, 4, 'yes4', 'Certainement !', 'FootmanYes4.wav'),
(6, 5, 'attack1', 'Laissez-les moi !', 'FootmanYesAttack1.wav'),
(6, 5, 'attack2', 'A l''attaque !', 'FootmanYesAttack2.wav'),
(6, 5, 'attack3', 'Aux armes !', 'FootmanYesAttack3.wav'),
(6, 6, 'fun1', 'Sortez couverts !', 'FootmanPissed1.wav'),
(6, 6, 'fun2', 'Avant l''heure c''est pas l''heure, après l''heure c''est plus l''heure.', 'FootmanPissed2.wav'),
(6, 6, 'fun3', 'Engagez-vous, rengagez-vous, qu''il disait Lothar.', 'FootmanPissed3.wav'),
(6, 6, 'fun4', 'Ce n''est qu''une égratignure', 'FootmanPissed4.wav'),
(6, 7, 'death1', 'Mort', 'FootmanDeath.wav'),

(8, 1, 'ready1', 'J''attend vos ordres', 'KnightReady1.wav'),
(8, 2, 'warcry1', 'Pour l''honneur, et la liberté !', 'KnightWarcry1.wav'),
(8, 3, 'what1', 'Sir ?', 'KnightWhat1.wav'),
(8, 3, 'what2', 'Votre honneur ?', 'KnightWhat2.wav'),
(8, 3, 'what3', 'Quels sont vos ordres ?', 'KnightWhat3.wav'),
(8, 3, 'what4', 'Oui, monseigneur ?', 'KnightWhat4.wav'),
(8, 4, 'yes1', 'Sur le champ !', 'KnightYes1.wav'),
(8, 4, 'yes2', 'Pour le roi !', 'KnightYes2.wav'),
(8, 4, 'yes3', 'Certainement', 'KnightYes3.wav'),
(8, 4, 'yes4', 'Je m''en charge', 'KnightYes4.wav'),
(8, 5, 'attack1', 'Pour le roi !', 'KnightYesAttack1.wav'),
(8, 5, 'attack2', 'Je vais le pourfendre !', 'KnightYesAttack2.wav'),
(8, 5, 'attack3', 'Jusqu''à la mort !', 'KnightYesAttack3.wav'),
(8, 6, 'fun1', 'Je suis l''homme qui tombe à pic', 'KnightPissed1.wav'),
(8, 6, 'fun2', 'Par le pouvoir du crâne ancestral !', 'KnightPissed2.wav'),
(8, 6, 'fun3', 'Ils sont fous, ces romains', 'KnightPissed3.wav'),
(8, 6, 'fun4', 'Les chaussettes de l''archiduchesse, sont-elles sêches, archi-sêches ?', 'KnightPissed4.wav'),
(8, 6, 'fun5', 'Je n''ai pas dit "ni"', 'KnightPissed5.wav'),
(8, 6, 'fun6', 'Un chasseur sachant chasser sans son chien est un bon chasseur.', 'KnightPissed6.wav'),
(8, 7, 'death1', 'Mort', 'humans_actions_knight_death_death1.wav'),

(9, 1, 'ready1', 'Larguez les amarres', 'GyrocopterReady1.wav'),
(9, 2, 'warcry1', 'Vers l''infini, et au-delà !', 'GyrocopterWarcry1.wav'),
(9, 3, 'what1', 'Que puis-je pour vous ?', 'GyrocopterWhat1.wav'),
(9, 3, 'what2', 'Quel est le plan de vol ?', 'GyrocopterWhat2.wav'),
(9, 3, 'what3', 'Donnez-moi le cap', 'GyrocopterWhat3.wav'),
(9, 3, 'what4', 'Tous les systèmes, OK !', 'GyrocopterWhat4.wav'),
(9, 3, 'what5', 'Ah ! Encore vous ?', 'GyrocopterWhat5.wav'),
(9, 4, 'yes1', 'Roger', 'GyrocopterYes1.wav'),
(9, 4, 'yes2', 'Cap enregistré', 'GyrocopterYes2.wav'),
(9, 4, 'yes3', 'On approche du mur du son', 'GyrocopterYes3.wav'),
(9, 4, 'yes4', 'Quoi, là-bas ?', 'GyrocopterYes4.wav'),
(9, 4, 'yes5', 'Ils ne m''entendront pas venir !', 'GyrocopterYes5.wav'),
(9, 5, 'attack1', 'Bombe, larguée', 'GyrocopterYesAttack1.wav'),
(9, 5, 'attack2', 'Cible verrouillée', 'GyrocopterYesAttack2.wav'),
(9, 5, 'attack3', 'J''attaque la cible !', 'GyrocopterYesAttack3.wav'),
(9, 5, 'attack4', 'Ça va faire mal !', 'GyrocopterYesAttack4.wav'),
(9, 6, 'fun1', 'Rogue Leader, au rapport', 'GyrocopterPissed1.wav'),
(9, 6, 'fun2', 'Restez en ligne', 'GyrocopterPissed2.wav'),
(9, 6, 'fun3', 'Je ne peux pas, ça bouge trop', 'GyrocopterPissed3.wav'),
(9, 6, 'fun4', 'Il est dans la ventilation', 'GyrocopterPissed4.wav'),
(9, 6, 'fun5', 'S''il peut saigner, on peut le tuer', 'GyrocopterPissed5.wav'),
(9, 6, 'fun6', 'Je parle d''une certaine spiritualité, elle est faite de oui, de non', 'GyrocopterPissed6.wav'),
(9, 6, 'fun7', 'Y''a-t-il un pilote dans l''avion ?', 'GyrocopterPissed7.wav'),
(9, 6, 'fun8', 'Ils ne sont pas à l''attention de savoir qu''ils existent', 'GyrocopterPissed8.wav'),
(9, 7, 'death1', 'Mort', 'GyrocopterDeath1.wav'),

(59, 2, 'warcry1', 'Pour Dalaran !', 'JainaWarcry1.wav'),
(59, 3, 'what1', 'Je peux aider ?', 'JainaWhat1.wav'),
(59, 3, 'what2', 'C''est étrange', 'JainaWhat2.wav'),
(59, 3, 'what3', 'Chut ! J''essaie de réfléchir !', 'JainaWhat3.wav'),
(59, 3, 'what4', 'Quel est votre plan ?', 'JainaWhat4.wav'),
(59, 4, 'yes1', 'Ça m''a l''air bien', 'JainaYes1.wav'),
(59, 4, 'yes2', 'Je vais voir', 'JainaYes2.wav'),
(59, 4, 'yes3', 'Ça parait intéressant', 'JainaYes3.wav'),
(59, 4, 'yes4', 'Je m''en charge', 'JainaYes4.wav'),
(59, 5, 'attack1', 'Je déteste avoir recours à la violence', 'JainaYesAttack1.wav'),
(59, 5, 'attack2', 'Vous l''avez cherché !', 'JainaYesAttack2.wav'),
(59, 6, 'fun1', 'Je ne suis pas un guerrier', 'JainaPissed1.wav'),
(59, 6, 'fun2', 'Je voulais étudier paisiblement !', 'JainaPissed2.wav'),
(59, 6, 'fun3', 'Il y a un grand trouble dans les courants magiques', 'JainaPissed3.wav'),
(59, 6, 'fun4', 'Je prie que mon père soit sain et sauf', 'JainaPissed4.wav'),
(59, 6, 'fun5', 'Les évènements commencent à être un peu bizarres', 'JainaPissed5.wav');

-- nightelfs

-- orcs

-- undeads

-- neutrals
