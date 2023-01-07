import { LANGUAGE } from '../../../i18n/i18n';

export namespace Skill {
	export const enum SKILL_LEVEL {
		FLUENT = 'fluent',
		GREAT = 'great',
		GOOD = 'good',
		DECENT = 'decent',
		BASIC = 'basic',
	}

	export function skillLevelToNumber(level: SKILL_LEVEL) {
		switch (level) {
			case SKILL_LEVEL.BASIC:
				return 0;
			case SKILL_LEVEL.DECENT:
				return 1;
			case SKILL_LEVEL.GOOD:
				return 2;
			case SKILL_LEVEL.GREAT:
				return 3;
			case SKILL_LEVEL.FLUENT:
				return 3;
		}
	}

	export const enum SKILL {
		DUTCH = 'dutch',
		ENGLISH = 'english',
		FRENCH = 'french',
		GERMAN = 'german',
		PYTHON = 'python',
		JAVASCRIPT = 'javascript',
		TYPESCRIPT = 'typescript',
		HTML = 'html',
		CSS = 'css',
		C = 'c',
		CPLUSPLUS = 'c++',
		PHP = 'php',
		ASSEMBLY = 'assembly',
		LATEX = 'latex',
		NODE = 'node',
		DJANGO = 'django',
		LINUX = 'linux',
		IDA_PRO = 'IDA pro',
		KERAS = 'keras',
		BASH = 'bash',
		REACT = 'react',
		REACT_NATIVE = 'react native',
		RUST = 'rust',
		WEB_COMPONENTS = 'web components',
		ANGULAR = 'angular',
		POSTGRESQL = 'postgresql',
	}

	export const enum SKILL_GROUP {
		HUMAN,
		FRONTEND,
		BACKEND,
		SYSTEMS,
		SOFTWARE,
		NONE,
	}

	export interface NameSkill {
		name: SKILL;
		translate?: boolean;
		level?: SKILL_LEVEL;
	}

	export interface Skill {
		name: SKILL;
		translate?: boolean;
		level: SKILL_LEVEL;
	}

	export interface SkillGroup {
		group: SKILL_GROUP;
		skills: Skill[];
	}

	export const skillGroups = [
		{
			group: Skill.SKILL_GROUP.HUMAN,
			skills: [
				{
					name: SKILL.DUTCH,
					translate: true,
					level: SKILL_LEVEL.FLUENT,
				},
				{
					name: SKILL.ENGLISH,
					translate: true,
					level: SKILL_LEVEL.FLUENT,
				},
				{
					name: SKILL.FRENCH,
					translate: true,
					level: SKILL_LEVEL.BASIC,
				},
				{
					name: SKILL.GERMAN,
					translate: true,
					level: SKILL_LEVEL.BASIC,
				},
			],
		},
		{
			group: SKILL_GROUP.FRONTEND,
			skills: [
				{
					name: SKILL.JAVASCRIPT,
					level: SKILL_LEVEL.GREAT,
				},
				{
					name: SKILL.TYPESCRIPT,
					level: SKILL_LEVEL.GREAT,
				},
				{
					name: SKILL.HTML,
					level: SKILL_LEVEL.GREAT,
				},
				{
					name: SKILL.CSS,
					level: SKILL_LEVEL.GREAT,
				},
				{
					name: SKILL.REACT,
					level: SKILL_LEVEL.GREAT,
				},
			],
		},
		{
			group: SKILL_GROUP.BACKEND,
			skills: [
				{
					name: SKILL.PYTHON,
					level: SKILL_LEVEL.GOOD,
				},
				{
					name: SKILL.DJANGO,
					level: SKILL_LEVEL.GOOD,
				},
				{
					name: SKILL.NODE,
					level: SKILL_LEVEL.GREAT,
				},
				{
					name: SKILL.PHP,
					level: SKILL_LEVEL.DECENT,
				},
			],
		},
		{
			group: SKILL_GROUP.SYSTEMS,
			skills: [
				{
					name: SKILL.C,
					level: SKILL_LEVEL.GREAT,
				},
				{
					name: SKILL.CPLUSPLUS,
					level: SKILL_LEVEL.GREAT,
				},
				{
					name: SKILL.ASSEMBLY,
					level: SKILL_LEVEL.DECENT,
				},
				{
					name: SKILL.BASH,
					level: SKILL_LEVEL.GOOD,
				},
				{
					name: SKILL.RUST,
					level: SKILL_LEVEL.GOOD,
				},
			],
		},
		{
			group: SKILL_GROUP.SOFTWARE,
			skills: [
				{
					name: SKILL.LINUX,
					level: SKILL_LEVEL.GOOD,
				},
				{
					name: SKILL.IDA_PRO,
					level: SKILL_LEVEL.GOOD,
				},
				{
					name: SKILL.KERAS,
					level: SKILL_LEVEL.GOOD,
				},
			],
		},
	];
}

export namespace About {
	export type Paragraphs = 'par1' | 'par2' | 'par3';

	export type AboutConfig = {
		[lang in LANGUAGE]: {
			[par in Paragraphs]: string;
		};
	};

	export const about: AboutConfig = {
		nl: {
			par1: `Hoi ik ben Sander, en zoals je misschien al hebt gelezen ben ik een full-stack developer. Ik heb een passie voor het oplossen van moeilijke problemen op zowel de frontend als de backend.`,
			par2: `Ik begon zo'n {{frontend}} jaar geleden met het ontwikkelen van chrome extensies en heb dat sindsdien uitgebreid naar full-stack development met verschillende database systemen en backends, systems/microcontrollers programmeren met voornamelijk C en een beetje machine learning.`,
			par3: `Deze website dient zowel als online CV als een plek om te laten zien wat ik kan, aangezien de website ook volledig gebouwd is met mijn eigen {{wclib}} library. Je kunt hieronder meer leren over mijn portfolio of je kunt focusen op vaardigheden door erop te klikken.`,
		},
		en: {
			par1: `Hi I'm Sander, and as you might have already read, I'm a full-stack developer. I have a passion for solving hard problems in either the frontend or the backend.`,
			par2: `I started out some {{frontend}} years ago with developing chrome extensions and have since expanded to full-stack development with various database systems and backends, systems/microcontroller programming with mostly C and a bit of machine learning.`,
			par3: `This website serves as both a browsable resume and a way to show off what I can do, being built using my own {{wclib}} library. You can learn more about my portfolio down below or you can focus on the projects related to a skill by clicking on one.`,
		},
	};
}

export type InternationalText =
	| {
			[lang in LANGUAGE]: string;
	  }
	| string;

export function getInternationalText(
	text: InternationalText,
	lang: LANGUAGE
): string {
	if (typeof text === 'string') return text;
	return text[lang];
}

export namespace LifeTimeline {
	export const enum TYPE {
		WORK = 'work',
		PERSONAL_PROJECT = 'project',
		EDUCATION_PROJECT = 'eduproject',
		EDUCATION = 'education',
	}

	export const enum END_DATE {
		NEVER = 'never',
		TBD = 'tbd',
	}

	interface Icon {
		source: string;
		alt: string;
	}

	interface BaseEntry {
		start: number;
		end: number | END_DATE;
		type: TYPE;
		skills: Skill.NameSkill[];
		icon?: Icon[];
		title: InternationalText;
		description: InternationalText;
	}

	export interface ProjectEntry extends BaseEntry {
		type: TYPE.PERSONAL_PROJECT;
		url?: InternationalText;
		source: string;
	}

	export interface EducationProjectEntry extends BaseEntry {
		type: TYPE.EDUCATION_PROJECT;
		url?: InternationalText;
		source: string;
		school: InternationalText[];
		schoolURL?: InternationalText[];
	}

	export interface EducationEntry extends BaseEntry {
		type: TYPE.EDUCATION;
		school: InternationalText[];
		schoolURL?: InternationalText[];
	}

	export interface WorkEntry extends BaseEntry {
		type: TYPE.WORK;
		employer: string;
		employerURL?: InternationalText;
	}

	export type Entry =
		| ProjectEntry
		| EducationEntry
		| WorkEntry
		| EducationProjectEntry;

	export type LifeTimeline = Entry[];

	export function isEET(
		entry: Entry
	): entry is EducationEntry | WorkEntry | EducationProjectEntry {
		switch (entry.type) {
			case TYPE.EDUCATION:
			case TYPE.EDUCATION_PROJECT:
			case TYPE.WORK:
				return true;
			case TYPE.PERSONAL_PROJECT:
				return false;
		}
	}

	export function isPProj(entry: Entry): entry is ProjectEntry {
		return !isEET(entry);
	}

	const currentHost = typeof location !== 'undefined' && location.host;
	const sanitizedHost =
		currentHost &&
		[
			'sanderron.de',
			'sanderronde.nl',
			'sanderronde.com',
			'www.sanderron.de',
			'www.sanderronde.nl',
			'www.sanderronde.com',
		].includes(currentHost)
			? currentHost
			: 'sanderron.de';
	export const lifeTimeline: LifeTimeline = [
		{
			type: TYPE.EDUCATION,
			school: ['Strabrecht College, Geldrop'],
			schoolURL: ['https://www.strabrecht.nl/'],
			icon: [
				{
					source: '/timeline/strabrecht.webp',
					alt: 'Strabrecht College logo',
				},
			],
			start: new Date(2008, 8).getTime(),
			end: new Date(2014, 5).getTime(),
			skills: [],
			title: 'Atheneum',
			description: {
				en: 'Profile: Nature & Tech',
				nl: 'Profiel: Natuur & Techniek',
			},
		},
		{
			type: TYPE.EDUCATION,
			school: [
				{
					en: 'Leiden University',
					nl: 'Universiteit Leiden',
				},
			],
			schoolURL: [
				{
					en: 'https://www.universiteitleiden.nl/en',
					nl: 'https://www.universiteitleiden.nl/',
				},
			],
			start: new Date(2014, 8).getTime(),
			end: new Date(2018, 2).getTime(),
			icon: [
				{
					source: '/timeline/leiden_university.webp',
					alt: 'Leiden University logo',
				},
			],
			title: {
				en: 'Bachelor in Computer Science',
				nl: 'Bachelor Informatica',
			},
			description: {
				en: 'Computer science bachelor at Leiden University',
				nl: 'Bachelor informatica aan de Universiteit Leiden',
			},
			skills: [
				Skill.SKILL.CPLUSPLUS,
				Skill.SKILL.CSS,
				Skill.SKILL.HTML,
				Skill.SKILL.JAVASCRIPT,
				Skill.SKILL.LINUX,
			].map((skill) => ({ name: skill })),
		},
		{
			type: TYPE.EDUCATION_PROJECT,
			school: [
				{
					en: 'Leiden University',
					nl: 'Universiteit Leiden',
				},
			],
			schoolURL: [
				{
					en: 'https://www.universiteitleiden.nl/en',
					nl: 'https://www.universiteitleiden.nl/',
				},
			],
			start: new Date(2014, 8).getTime(),
			end: new Date(2018, 2).getTime(),
			source: 'https://github.com/sanderronde/bachelor-thesis',
			title: "Bachelor's Thesis",
			icon: [
				{
					source: '/timeline/leiden_university.webp',
					alt: 'Leiden University logo',
				},
			],
			url: '/bachelor-thesis.pdf',
			description: {
				en:
					"Bachelor's thesis: Detecting anomalies with recurrent neural networks. Explores the application of recurrent neural networks in detecting anomalies in user behavior on computer networks",
				nl:
					"Bachelor's thesis: Detecting anomalies with recurrent neural networks. Hierin wordt onderzocht hoe recurrente neurale netwerken gebruikt kunnen worden voor het detecteren van abnormaal gedrag in computernetwerken",
			},
			skills: [
				Skill.SKILL.PYTHON,
				Skill.SKILL.BASH,
				Skill.SKILL.LATEX,
				Skill.SKILL.KERAS,
			].map((skill) => ({ name: skill })),
		},
		{
			type: TYPE.EDUCATION,
			school: ['UvA', 'VU'],
			schoolURL: [
				{
					en: 'https://www.uva.nl/en',
					nl: 'https://www.uva.nl/',
				},
				{
					en: 'https://www.vu.nl/en/',
					nl: 'https://www.vu.nl/',
				},
			],
			start: new Date(2018, 3).getTime(),
			end: new Date(2021, 6).getTime(),
			icon: [
				{
					source: '/timeline/uva.webp',
					alt: 'UvA logo',
				},
				{ source: '/timeline/vu.webp', alt: 'VU logo' },
			],
			title: {
				en: 'Master in Computer Science',
				nl: 'Master in Computer Science',
			},
			description: {
				en:
					'Computer science master, joint degree between both the UvA & VU. Following the Computer Systems Security track',
				nl:
					'Computer science master, joint degree tussen de UvA en VU. Gevolgde track is de Computer Systems Security track',
			},
			skills: [
				Skill.SKILL.C,
				Skill.SKILL.ASSEMBLY,
				Skill.SKILL.BASH,
				Skill.SKILL.IDA_PRO,
				Skill.SKILL.LINUX,
				Skill.SKILL.CSS,
				Skill.SKILL.HTML,
				Skill.SKILL.JAVASCRIPT,
				Skill.SKILL.TYPESCRIPT,
				Skill.SKILL.REACT,
				Skill.SKILL.PYTHON,
			].map((skill) => ({ name: skill })),
		},
		{
			type: TYPE.WORK,
			start: new Date(2017, 11).getTime(),
			end: new Date(2019, 7).getTime(),
			skills: [],
			title: {
				en: 'IT help',
				nl: 'IT hulp',
			},
			employer: 'Studentaanhuis',
			employerURL: 'https://www.studentaanhuis.nl/',
			description: {
				en: 'Fixing various computer- and smartphone related problems',
				nl:
					'Oplossen van verschillende computer- en smartphone gerelateerde problemen',
			},
			icon: [
				{ source: '/timeline/sah.webp', alt: 'Studentaanhuis logo' },
			],
		},
		{
			type: TYPE.WORK,
			start: new Date(2020, 10).getTime(),
			end: new Date(2021, 6).getTime(),
			skills: [
				Skill.SKILL.HTML,
				Skill.SKILL.JAVASCRIPT,
				Skill.SKILL.TYPESCRIPT,
			].map((skill) => ({ name: skill })),
			employer: '30MHz',
			employerURL: 'https://www.30mhz.com/',
			title: 'Internship (graduation)',
			description: {
				en:
					'Creating a design library for third party developers based on internally used design components.',
				nl:
					'Maken van een design library voor ontwikkelaars van derde partijen op basis van intern gebruikte design components.',
			},
			icon: [{ source: '/timeline/30mhz.webp', alt: '30MHz logo' }],
		},
		{
			type: TYPE.WORK,
			start: new Date(2021, 7).getTime(),
			end: END_DATE.TBD,
			skills: [
				Skill.SKILL.CSS,
				Skill.SKILL.HTML,
				Skill.SKILL.JAVASCRIPT,
				Skill.SKILL.TYPESCRIPT,
				Skill.SKILL.REACT,
				Skill.SKILL.REACT_NATIVE,
				Skill.SKILL.PHP,
				Skill.SKILL.POSTGRESQL,
			].map((skill) => ({ name: skill })),
			employer: 'Crisp',
			employerURL: 'https://www.crisp.nl/',
			title: 'Software Developer',
			description: {
				en:
					'Working on the main app, with a frontend written in React Native and Typescript and a backend that uses PHP and PostgreSQL.',
				nl:
					'Werken aan de app, met een frontend geschreven in Typescript en React Native en een backend die gebruik maakt van PHP en PostgreSQL.',
			},
			icon: [{ source: '/timeline/crisp.webp', alt: 'Crisp Logo' }],
		},
		{
			type: TYPE.WORK,
			start: new Date(2019, 7).getTime(),
			end: new Date(2020, 10).getTime(),
			skills: [
				Skill.SKILL.CSS,
				Skill.SKILL.DJANGO,
				Skill.SKILL.HTML,
				Skill.SKILL.JAVASCRIPT,
				Skill.SKILL.TYPESCRIPT,
				Skill.SKILL.PYTHON,
				Skill.SKILL.REACT,
			].map((skill) => ({ name: skill })),
			employer: 'NextUp Software',
			employerURL: 'https://nextupsoftware.com/',
			title: 'Full stack developer',
			description: {
				en:
					'Maintaining and expanding on a transport management system with a frontend written in React, Redux and Typescript and a backend using Django Python. Additionally managing the security of the full system. Mainly consists of ensuring test coverage, regular pentests and general security advice.',
				nl:
					'Onderhouden en uitbreiden van een transportmanagement systeem met een frontend in React, MobX en Typescript en een backend in Django Python. Daarnaast het beheren van de security van het volledige systeem. Bestaat voornamelijk uit het zorgen voor test coverage, regelmatige pentests en algemeen security advies.',
			},
			icon: [{ source: '/timeline/nextup.webp', alt: 'NextUp logo' }],
		},
		{
			type: TYPE.PERSONAL_PROJECT,
			start: new Date(2015, 3).getTime(),
			end: END_DATE.NEVER,
			source: 'https://github.com/SanderRonde/BinderApp',
			url:
				'https://chrome.google.com/webstore/detail/binder-app/jeolbigkboigkhlfhilmedbakkkcmeif',
			skills: [
				Skill.SKILL.CSS,
				Skill.SKILL.HTML,
				Skill.SKILL.JAVASCRIPT,
			].map((skill) => ({ name: skill })),
			title: 'Binder App (browser app)',
			description: {
				en:
					'A browser app that allows you to quickly open websites from your desktop by binding keywords to websites. Also implements some omnibar features like searching search engines.',
				nl:
					'Een browser app waarmee je snel en makkelijk websites kan openen vanaf je desktop door bepaalde keywords aan websites te binden. Bevat ook een aantal omnibar features zoals het doorzoeken van zoekmachines.',
			},
			icon: [
				{ source: '/timeline/binder_app.webp', alt: 'Binder App icon' },
			],
		},
		{
			type: TYPE.PERSONAL_PROJECT,
			start: new Date(2016, 10).getTime(),
			end: END_DATE.NEVER,
			source: 'https://github.com/SanderRonde/WatchMeType',
			skills: [
				Skill.SKILL.CSS,
				Skill.SKILL.HTML,
				Skill.SKILL.TYPESCRIPT,
				Skill.SKILL.NODE,
				Skill.SKILL.REACT,
			].map((skill) => ({ name: skill })),
			title: 'WatchMeType',
			description: {
				en:
					'A web app that allows you to type using nothing but your finger and a leap motion. Created as a demo for what the leap motion could do for typing on a smartwatch.',
				nl:
					'Een browser app waarmee je kan typen met enkel je vinger en een leap motion. Gemaakt als een demo voor wat de leap motion zou kunnen doen voor het typen op een smartwatch',
			},
		},
		{
			type: TYPE.PERSONAL_PROJECT,
			start: new Date(2020, 2).getTime(),
			end: new Date(2020, 6).getTime(),
			source: 'https://github.com/SanderRonde/sanderrondewebsite',
			url: `http://${sanitizedHost}/`,
			skills: [
				Skill.SKILL.CSS,
				Skill.SKILL.HTML,
				Skill.SKILL.TYPESCRIPT,
				Skill.SKILL.NODE,
			].map((skill) => ({ name: skill })),
			title: `www.${sanitizedHost}`,
			icon: [{ source: '/timeline/me.webp', alt: "this website's icon" }],
			description: {
				en: "The website you're reading this on",
				nl: 'De website waarop je dit leest',
			},
		},
		{
			type: TYPE.PERSONAL_PROJECT,
			start: new Date(2019, 6).getTime(),
			end: END_DATE.NEVER,
			source: 'https://github.com/SanderRonde/home-automation',
			skills: [
				Skill.SKILL.CSS,
				Skill.SKILL.HTML,
				Skill.SKILL.TYPESCRIPT,
				Skill.SKILL.NODE,
				Skill.SKILL.REACT,
				Skill.SKILL.PYTHON,
				Skill.SKILL.KERAS,
				Skill.SKILL.LINUX,
				Skill.SKILL.C,
				Skill.SKILL.CPLUSPLUS,
			].map((skill) => ({ name: skill })),
			title: 'Home Automation',
			description: {
				en:
					'A locally hosted home automation server that automates pretty much anything in my house using mostly microcontrollers. All controllable from a web app, touch screen, telegram bot and voice control. Check out the repo for more info.',
				nl:
					'Een locaal gehoste home automation server die vrijwel alles in mijn huis automatiseert met onder andere microcontrollers. Allemaal bestuurbaar vanuit een web app, touch screen, telegram bot of voice control. Bekijk de repo voor meer informatie.',
			},
		},
		{
			type: TYPE.PERSONAL_PROJECT,
			start: new Date(2019, 3).getTime(),
			end: END_DATE.NEVER,
			source: 'https://github.com/SanderRonde/wc-lib',
			url: 'https://www.npmjs.com/package/wc-lib',
			skills: [
				Skill.SKILL.CSS,
				Skill.SKILL.HTML,
				Skill.SKILL.TYPESCRIPT,
			].map((skill) => ({ name: skill })),
			title: 'wc-lib',
			description: {
				en:
					'A small library for creating webcomponents based around the idea of importing what you need. Used to build this website among others.',
				nl:
					'Een kleine library voor het maken van webcomponents, gebaseerd op het idee van enkel importeren wat nodig is. Gebruikt voor onder andere deze website.',
			},
		},
		{
			type: TYPE.PERSONAL_PROJECT,
			start: new Date(2018, 6).getTime(),
			end: END_DATE.NEVER,
			source: 'https://github.com/SanderRonde/password-manager',
			skills: [
				Skill.SKILL.CSS,
				Skill.SKILL.HTML,
				Skill.SKILL.TYPESCRIPT,
				Skill.SKILL.NODE,
			].map((skill) => ({ name: skill })),
			title: 'Password Manager',
			description: {
				en:
					'A fairly straight-forward self hosted password manager with a heavy focus on security and privacy.',
				nl:
					'Een self hosted password manager met een focus op veiligheid and privacy.',
			},
		},
		{
			type: TYPE.PERSONAL_PROJECT,
			start: new Date(2017, 8).getTime(),
			end: END_DATE.NEVER,
			source: 'https://github.com/SanderRonde/html-typings',
			url: 'https://html-typings.sanderron.de/',
			skills: [
				Skill.SKILL.HTML,
				Skill.SKILL.TYPESCRIPT,
				Skill.SKILL.NODE,
			].map((skill) => ({ name: skill })),
			title: 'HTML Typings',
			description: {
				en:
					'A tool for generating typescript typings for HTML files. Allowing for type-safe references to HTML elements.',
				nl:
					'Een programma voor het genereren van typescript typings voor HTML bestanden. Hierdoor zijn referenties naar HTML bestanden type-safe.',
			},
		},
		{
			type: TYPE.PERSONAL_PROJECT,
			start: new Date(2015, 11).getTime(),
			end: END_DATE.NEVER,
			source: 'https://github.com/SanderRonde/CustomRightClickMenu',
			url:
				'https://chrome.google.com/webstore/detail/custom-right-click-menu/onnbmgmepodkilcbdodhfepllfmafmlj',
			icon: [
				{
					source: '/timeline/crm.webp',
					alt: 'Custom Right-Click Menu icon',
				},
			],
			skills: [
				Skill.SKILL.HTML,
				Skill.SKILL.TYPESCRIPT,
				Skill.SKILL.NODE,
			].map((skill) => ({ name: skill })),
			title: 'Custom Right-Click Menu (v2+)',
			description: {
				en:
					'A browser extension for creating your own entry in the right-click menu. Allows adding of and activating custom scripts, links, sub-menus or custom CSS in your right-click menu.',
				nl:
					'Een browser extensie voor het maken van een eigen contextmenu veld. Hiermee kun je je eigen scripts, link, submenus of CSS activeren vanuit je contextmenu.',
			},
		},
		{
			type: TYPE.PERSONAL_PROJECT,
			start: new Date(2010, 11).getTime(),
			end: END_DATE.NEVER,
			source:
				'https://github.com/SanderRonde/CustomRightClickMenu/tree/oldCRM',
			icon: [
				{
					source: '/timeline/crmold.webp',
					alt: 'Custom Right-Click Menu v1 icon',
				},
			],
			skills: [
				Skill.SKILL.HTML,
				Skill.SKILL.TYPESCRIPT,
				Skill.SKILL.NODE,
			].map((skill) => ({ name: skill })),
			title: 'Custom Right-Click Menu (v1)',
			description: {
				en:
					'A browser extension for creating your own entry in the right-click menu. Allows adding of and activating custom scripts, links, sub-menus or custom CSS in your right-click menu.',
				nl:
					'Een browser extensie voor het maken van een eigen contextmenu veld. Hiermee kun je je eigen scripts, link, submenus of CSS activeren vanuit je contextmenu.',
			},
		},
		{
			type: TYPE.PERSONAL_PROJECT,
			start: new Date(2020, 1).getTime(),
			end: END_DATE.NEVER,
			source: 'https://github.com/SanderRonde/sharify',
			url: 'https://sharify.sanderron.de/',
			icon: [{ source: '/timeline/sharify.webp', alt: 'Sharify icon' }],
			skills: [
				Skill.SKILL.HTML,
				Skill.SKILL.CSS,
				Skill.SKILL.REACT,
				Skill.SKILL.TYPESCRIPT,
				Skill.SKILL.NODE,
			].map((skill) => ({ name: skill })),
			title: 'Sharify',
			description: {
				en:
					'A web app that generates spotify playlists based on the combined tastes of all participants.',
				nl:
					'Een web app voor het genereren van spotify playlists op basis van de gecombineerde smaken van alle deelnemers.',
			},
		},
		{
			type: TYPE.PERSONAL_PROJECT,
			start: new Date(2020, 0).getTime(),
			end: END_DATE.NEVER,
			source: 'https://github.com/SanderRonde/board-temperature-driver',
			skills: [Skill.SKILL.C, Skill.SKILL.CPLUSPLUS].map((skill) => ({
				name: skill,
			})),
			title: 'Board temperature driver',
			description: {
				en:
					'The code that powers an ESP8266-based microcontroller which monitors and records the temperature. Part of the home-automation project.',
				nl:
					'De code voor een ESP8266-gebaseerde microcontroller die de temperatuur meet en vastlegt. Deel van het home-automation project',
			},
		},
		{
			type: TYPE.PERSONAL_PROJECT,
			start: new Date(2019, 11).getTime(),
			end: END_DATE.NEVER,
			source:
				'https://github.com/SanderRonde/arduino-board-screen-driver',
			skills: [Skill.SKILL.C, Skill.SKILL.CPLUSPLUS].map((skill) => ({
				name: skill,
			})),
			title: 'Board screen driver',
			description: {
				en:
					'The code that powers an ESP8266-based microcontroller that controls a touch screen. This touch screen is used for turning on and off the lights among others. Part of the home-automation project.',
				nl:
					'De code voor een ESP8266-gebaseerde microcontroller die een touch screen bestuurt. De touch screen kan worden gebruikt om on andere het licht aan en uit te doen. Deel van het home-automation project',
			},
		},
		{
			type: TYPE.PERSONAL_PROJECT,
			start: new Date(2019, 11).getTime(),
			end: END_DATE.NEVER,
			source: 'https://github.com/SanderRonde/board-power-driver',
			skills: [Skill.SKILL.C, Skill.SKILL.CPLUSPLUS].map((skill) => ({
				name: skill,
			})),
			title: 'Board power driver',
			description: {
				en:
					'The code that powers an ESP8266-based microcontroller that allows for remote controlling of power sockets. Part of the home-automation project.',
				nl:
					'De code voor een ESP8266-gebaseerde microcontroller waarmee de stroom aan en uit kan worden gezet voor apparaten. Deel van het home-automation project',
			},
		},
		{
			type: TYPE.PERSONAL_PROJECT,
			start: new Date(2019, 11).getTime(),
			end: END_DATE.NEVER,
			source: 'https://github.com/SanderRonde/arduino-board-led-driver',
			skills: [Skill.SKILL.C, Skill.SKILL.CPLUSPLUS].map((skill) => ({
				name: skill,
			})),
			title: 'Board LED driver',
			description: {
				en:
					'The code that powers an arduino duo that controls an individually adressable LED strip with various patterns. Part of the home-automation project.',
				nl:
					'De code voor een ESP8266-gebaseerde microcontroller waarmee een individually adressable LED strip met verschillende patronen kan worden bediend. Deel van het home-automation project',
			},
		},
		{
			type: TYPE.PERSONAL_PROJECT,
			start: new Date(2019, 11).getTime(),
			end: END_DATE.NEVER,
			source: 'https://github.com/SanderRonde/board-pressure-sensor',
			skills: [Skill.SKILL.C, Skill.SKILL.CPLUSPLUS].map((skill) => ({
				name: skill,
			})),
			title: 'Board pressure sensor',
			description: {
				en:
					'The code that powers an ESP8266-based microcontroller that records and transmits the pressure it measures. Part of the home-automation project.',
				nl:
					'De code voor een ESP8266-gebaseerde microcontroller waarmee de druk wordt gemeten en opgeslagen. Deel van het home-automation project',
			},
		},
		{
			type: TYPE.EDUCATION_PROJECT,
			school: ['UvA', 'VU'],
			schoolURL: [
				{
					en: 'https://www.uva.nl/en',
					nl: 'https://www.uva.nl/',
				},
				{
					en: 'https://www.vu.nl/en/',
					nl: 'https://www.vu.nl/',
				},
			],
			start: new Date(2020, 8).getTime(),
			end: new Date(2021, 5).getTime(),
			source: 'https://github.com/sanderronde/master-thesis',
			title: "Master's Thesis",
			icon: [
				{
					source: '/timeline/uva.webp',
					alt: 'UvA logo',
				},
				{ source: '/timeline/vu.webp', alt: 'VU logo' },
			],
			url: '/master-thesis.pdf',
			description: {
				en:
					"Master's thesis: Migrating Angular Components to Web Components. Explores the ability for components in an Angular code base to be migrated from a closed format (Angular) to a universally supported format (Web Components), thereby allowing for use in all browsers and frameworks.",
				nl:
					"Master's thesis: Migrating Angular components to Web Components. Onderzoekt de mogelijkheid om Angular components van een gesloten format (Angular) te migreren naar een universeel ondersteund format (Web Components), waardoor deze componeten in alle browsers en frameworks bruikbaar worden.",
			},
			skills: [
				Skill.SKILL.TYPESCRIPT,
				Skill.SKILL.JAVASCRIPT,
				Skill.SKILL.CSS,
				Skill.SKILL.HTML,
				Skill.SKILL.WEB_COMPONENTS,
				Skill.SKILL.ANGULAR,
			].map((skill) => ({ name: skill })),
		},
		{
			type: TYPE.PERSONAL_PROJECT,
			start: new Date(2021, 11).getTime(),
			end: END_DATE.NEVER,
			source: 'https://github.com/SanderRonde/VSCode-Gerrit/',
			url:
				'https://marketplace.visualstudio.com/items?itemName=SanderRonde.vscode--gerrit',
			skills: [Skill.SKILL.TYPESCRIPT, Skill.SKILL.NODE].map((skill) => ({
				name: skill,
			})),
			title: 'VSCode-Gerrit',
			description: {
				en:
					'VSCode extension for working with the Gerrit code review tool. Allows for easy access to the Gerrit dashboard, and provides a way to create and submit code reviews.',
				nl:
					'VSCode extensie voor het werken met de Gerrit code review tool. Maakt het mogelijk om gemakkelijk toegang te krijgen tot de Gerrit dashboard, en maakt het mogelijk om code reviews te maken en in te dienen.',
			},
		},
		{
			type: TYPE.PERSONAL_PROJECT,
			start: new Date(2022, 2).getTime(),
			end: END_DATE.NEVER,
			source: 'https://github.com/SanderRonde/phpstan-vscode',
			url:
				'https://marketplace.visualstudio.com/items?itemName=SanderRonde.phpstan-vscode',
			skills: [Skill.SKILL.TYPESCRIPT, Skill.SKILL.NODE].map((skill) => ({
				name: skill,
			})),
			title: 'PHPStan-VSCode',
			description: {
				en:
					'VSCode extension for working with the PHPStan PHP Linter. Automatically runs PHPStan as you make changes to files, and provides a way to view the results of the PHPStan analysis.',
				nl:
					'VSCode extensie voor het werken met de PHPStan PHP Linter. Voert PHPStan automatisch uit terwijl je bestanden aanpast, en maakt het mogelijk om de resultaten van de PHPStan analyse te bekijken.',
			},
		},
	];
}

export interface MeConfig {
	about: About.AboutConfig;
	skillGroups: Skill.SkillGroup[];
	timeline: LifeTimeline.LifeTimeline;
}

const me: MeConfig = {
	about: About.about,
	skillGroups: Skill.skillGroups,
	timeline: LifeTimeline.lifeTimeline,
};

export default me;
