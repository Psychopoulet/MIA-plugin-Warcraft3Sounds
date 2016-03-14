
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

-- warnings_types

CREATE TABLE warnings_types (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code VARCHAR(20) NOT NULL,
  name VARCHAR(25) NOT NULL,
  UNIQUE (code)
);

INSERT INTO warnings_types (id, code, name) VALUES
(1, 'cannotbuildthere', 'cannotbuildthere'),
(2, 'goldminelow', 'goldminelow'),
(3, 'goldminecollapsed', 'goldminecollapsed'),
(4, 'nofood', 'nofood'),
(5, 'noenergy', 'noenergy'),
(6, 'nogold', 'nogold'),
(7, 'nolumber', 'nolumber'),
(8, 'inventoryfull', 'inventoryfull'),
(9, 'townattack', 'townattack'),
(10, 'unitattack', 'unitattack'),
(11, 'herodies', 'herodies'),
(12, 'allytownattack', 'allytownattack'),
(13, 'allyattack', 'allyattack'),
(14, 'allyherodies', 'allyherodies'),
(15, 'buildingcomplete', 'buildingcomplete'),
(16, 'upgradecomplete', 'upgradecomplete'),
(17, 'researchcomplete', 'researchcomplete'),
(18, 'placedoffblight', 'placedoffblight'),
(19, 'mining', 'mining');

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
  k_warning_type INTEGER NOT NULL,
  code varchar(20) NOT NULL,
  name varchar(25) NOT NULL,
  file varchar(50) NOT NULL,
  UNIQUE (k_race, code),
  FOREIGN KEY (k_race) REFERENCES races (id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (k_warning_type) REFERENCES warnings_types (id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO warnings (k_race, k_warning_type, code, name, file) VALUES

(1, 1, 'cannotbuildthere', 'Je ne peux rien bâtir ici', 'PeasantCannotBuildThere1.wav'),
(1, 2, 'goldminelow', 'Notre mine d''or est presque épuisée', 'KnightGoldMineLow1.wav'),
(1, 3, 'goldminecollapsed', 'Notre mine d''or s''est effondrée', 'KnightGoldMineCollapsed1.wav'),
(1, 4, 'nofood', 'Il faut plus de fermes', 'KnightNoFood1.wav'),
(1, 5, 'noenergy', 'Mana insuffisant', 'KnightNoEnergy1.wav'),
(1, 6, 'nogold', 'Nous avons besoin de plus d''or', 'KnightNoGold1.wav'),
(1, 7, 'nolumber', 'Il nous faut plus de bois', 'KnightNoLumber1.wav'),
(1, 8, 'inventoryfull', 'Inventaire plein', 'KnightInventoryFull1.wav'),
(1, 9, 'townattack', 'Notre ville est assiégée', 'KnightTownAttack1.wav'),
(1, 10, 'unitattack', 'Nous sommes attaqués', 'KnightUnitAttack1.wav'),
(1, 11, 'herodies', 'Notre héro est mort', 'KnightHeroDies1.wav'),
(1, 12, 'allytownattack', 'La ville de notre allié est assiégée', 'KnightAllyTownAttack1.wav'),
(1, 13, 'allyattack', 'Notre allié est attaqué !', 'KnightAllyAttack1.wav'),
(1, 14, 'allyherodies', 'Le héro de notre allié est tombé', 'KnightAllyHeroDies1.wav'),
(1, 15, 'buildingcomplete', 'Travail terminé', 'PeasantBuildingComplete1.wav'),
(1, 16, 'upgradecomplete', 'Amélioration terminée', 'KnightUpgradeComplete1.wav'),
(1, 17, 'researchcomplete', 'Recherche terminée', 'KnightResearchComplete1.wav');

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
