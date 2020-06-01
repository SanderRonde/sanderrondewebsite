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
		BROWSER_EXTENSIONS = 'browser_extensions',
		BASH = 'bash',
		REACT = 'react',
	}

	export const enum SKILL_GROUP {
		HUMAN,
		FRONTEND,
		BACKEND,
		SYSTEMS,
		SOFTWARE,
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
				{
					name: SKILL.BROWSER_EXTENSIONS,
					translate: true,
					level: SKILL_LEVEL.GREAT,
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
			par1: `Hoi ik ben Sander, en zoals je misschien al hebt gelezen ben ik een informatica student en full-stack developer.Ik heb een passie voor het oplossen van moeilijke problemen op zowel de frontend als de backend.`,
			par2: `Ik begon zo'n {{frontend}} jaar geleden met het ontwikkelen van chrome extensies en heb dat sindsdien uitgebreid naar full-stack development met verschillende database systemen en backends, systems/microcontrollers programmeren met voornamelijk C en een beetje machine learning`,
			par3: `Deze website dient zowel als online CV als een plek om te laten zien wat ik kan, aangezien de website ook volledig gebouwd is met mijn eigen {{wclib}} library. Je kunt hieronder meer leren over mijn portfolio of je kunt focusen op vaardigheden door erop te klikken.`,
		},
		en: {
			par1: `Hi I'm Sander, and as you might have already read, I'm a computer science student and full-stack developer. I have a passion for solving hard problems in either the frontend or the backend.`,
			par2: `I started out some {{frontend}} years ago with developing chrome extensions and have since expanded to full-stack development with various database systems and backends, systems/microcontroller programming with mostly C and a bit of machine learning.`,
			par3: `This website serves as both a browsable resumé and a way to show off what I can do, being built using my own {{wclib}} library. You can learn more about my portfolio down below or you can focus on the projects related to a skill by clicking on one.`,
		},
	};
}

export type InternationalText =
	| {
			[lang in LANGUAGE]: string;
	  }
	| string;

export function getInternationText(
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

	interface BaseEntry {
		start: Date;
		end: Date | END_DATE;
		type: TYPE;
		skills: Skill.SKILL[];
		icon?: string[];
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
		school: InternationalText;
		schoolURL?: InternationalText;
	}

	export interface EducationEntry extends BaseEntry {
		type: TYPE.EDUCATION;
		school: InternationalText;
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

	export const lifeTimeline: LifeTimeline = [
		{
			type: TYPE.EDUCATION,
			school: 'Strabrecht College, Geldrop',
			schoolURL: ['https://www.strabrecht.nl/'],
			start: new Date(2008, 8),
			end: new Date(2014, 5),
			skills: [],
			title: 'Atheneum',
			description: {
				en: 'Profile: Nature & Tech',
				nl: 'Profiel: Natuur & Techniek',
			},
		},
		{
			type: TYPE.EDUCATION,
			school: {
				en: 'Leiden University, Leiden',
				nl: 'Universiteit Leiden, Leiden',
			},
			schoolURL: [
				{
					en: 'https://www.universiteitleiden.nl/en',
					nl: 'https://www.universiteitleiden.nl/',
				},
			],
			start: new Date(2014, 8),
			end: new Date(2018, 2),
			icon: ['/timeline/leiden_university.png'],
			title: {
				en: 'Bachelor in Computer Science',
				nl: 'Bachelor Informatica',
			},
			description: '',
			skills: [
				Skill.SKILL.CPLUSPLUS,
				Skill.SKILL.CSS,
				Skill.SKILL.HTML,
				Skill.SKILL.JAVASCRIPT,
				Skill.SKILL.LINUX,
			],
		},
		{
			type: TYPE.EDUCATION_PROJECT,
			school: {
				en: 'Leiden University, Leiden',
				nl: 'Universiteit Leiden, Leiden',
			},
			schoolURL: {
				en: 'https://www.universiteitleiden.nl/en',
				nl: 'https://www.universiteitleiden.nl/',
			},
			start: new Date(2014, 8),
			end: new Date(2018, 2),
			source: 'https://github.com/sanderronde/bachelor-thesis',
			title:
				'Bachelor Thesis: Detecting anomalies with recurrent neural networks',
			url: '/thesis.pdf',
			description: {
				en:
					'Bachelor thesis exploring the application of recurrent neural networks in detecting anomalies in user behavior on computer networks',
				nl:
					'Bachelor thesis waarin onderzocht wordt hoe recurrente neurale netwerken gebruikt kunnen worden voor het detecteren van abnormaal gedrag in computernetwerken',
			},
			skills: [
				Skill.SKILL.PYTHON,
				Skill.SKILL.BASH,
				Skill.SKILL.LATEX,
				Skill.SKILL.KERAS,
			],
		},
		{
			type: TYPE.EDUCATION,
			school: {
				en: 'University of Amsterdam & Vrije Universiteit Amsterdam',
				nl: 'Universiteit van Amsterdam & Vrije Universiteit Amsterdam',
			},
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
			start: new Date(2018, 3),
			end: END_DATE.TBD,
			icon: ['/timeline/uva.png', '/timeline/vu.png'],
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
			],
		},
		{
			type: TYPE.WORK,
			start: new Date(2017, 11),
			end: new Date(2019, 7),
			skills: [],
			title: {
				en: 'Computer help',
				nl: 'Computer hulp',
			},
			employer: 'Studentaanhuis',
			employerURL: 'https://www.studentaanhuis.nl/',
			description: {
				en: 'Fixing various computer- and smartphone related problems',
				nl:
					'Oplossen van verschillende computer- en smartphone gerelateerde problemen',
			},
			icon: ['/timeline/sah.png'],
		},
		{
			type: TYPE.WORK,
			start: new Date(2019, 7),
			end: END_DATE.TBD,
			skills: [
				Skill.SKILL.CSS,
				Skill.SKILL.DJANGO,
				Skill.SKILL.HTML,
				Skill.SKILL.JAVASCRIPT,
				Skill.SKILL.TYPESCRIPT,
				Skill.SKILL.PYTHON,
				Skill.SKILL.REACT,
			],
			employer: 'Nextup Software',
			employerURL: 'https://nextupsoftware.com/',
			title: 'Full stack developer',
			description: {
				en:
					'Maintaining and expanding on a transport management system witha  frontend written in React, MobX and typescript and a backend using Django Python. Additionally managing the security of the full system. Mainly consists of ensuring test coverage, regular pentests and general security advice.',
				nl:
					'Onderhouden en uitbreiden van een transportmanagement systeem met een frontend in React, MobX en Typescript en een backend in Django Python. Daarnaast het beheren van de security van het volledige systeem. Bestaat voornamelijk uit het zorgen voor test coverage, regelmatige pentests en algemeen security advies.',
			},
			icon: ['/timeline/nextup.png'],
		},
		{
			type: TYPE.PERSONAL_PROJECT,
			start: new Date(2015, 3),
			end: END_DATE.NEVER,
			source: 'https://github.com/SanderRonde/BinderApp',
			url:
				'https://chrome.google.com/webstore/detail/binder-app/jeolbigkboigkhlfhilmedbakkkcmeif',
			skills: [
				Skill.SKILL.BROWSER_EXTENSIONS,
				Skill.SKILL.CSS,
				Skill.SKILL.HTML,
				Skill.SKILL.JAVASCRIPT,
			],
			title: 'Binder App (browser app)',
			description: {
				en:
					'A browser app that allows you to quickly open websites from your desktop by binding keywords to websites. Also implements some omnibar features like searching search engines.',
				nl:
					'Een browser app waarmee je snel en makkelijk websites kan openen vanaf je desktop door bepaalde keywords aan websites te binden. Bevat ook een aantal omnibar features zoals het doorzoeken van zoekmachines.',
			},
			icon: ['/timeline/binder_app.png'],
		},
		{
			type: TYPE.PERSONAL_PROJECT,
			start: new Date(2016, 10),
			end: END_DATE.NEVER,
			source: 'https://github.com/SanderRonde/WatchMeType',
			skills: [
				Skill.SKILL.CSS,
				Skill.SKILL.HTML,
				Skill.SKILL.TYPESCRIPT,
				Skill.SKILL.NODE,
				Skill.SKILL.REACT,
			],
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
			start: new Date(2016, 10),
			end: END_DATE.NEVER,
			source: 'https://github.com/SanderRonde/WatchMeType',
			skills: [
				Skill.SKILL.CSS,
				Skill.SKILL.HTML,
				Skill.SKILL.TYPESCRIPT,
				Skill.SKILL.NODE,
				Skill.SKILL.REACT,
			],
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
			// TODO:
			start: new Date(2016, 10),
			end: END_DATE.NEVER,
			source: 'https://github.com/SanderRonde/sanderrondewebsite',
			url: 'http://sanderron.de/',
			skills: [
				Skill.SKILL.CSS,
				Skill.SKILL.HTML,
				Skill.SKILL.TYPESCRIPT,
				Skill.SKILL.NODE,
			],
			title: 'sanderron.de',
			// TODO: determine min size needed
			icon: ['/icons/128.png'],
			description: {
				en: "The website you're reading this on",
				nl: 'De website waarop je dit leest',
			},
		},
	];
}

export interface MeConfig {
	about: About.AboutConfig;
	skillGroups: Skill.SkillGroup[];
}

const me: MeConfig = {
	about: About.about,
	skillGroups: Skill.skillGroups,
};

export default me;
