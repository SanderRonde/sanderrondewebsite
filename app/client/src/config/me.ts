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

function getInternationText(text: InternationalText, lang: LANGUAGE): string {
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

	interface BaseEntry {
		start: Date;
		end: Date;
		type: TYPE;
		skills: Skill.SKILL[];
		icon?: string;
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
		schoolURL?: InternationalText;
	}

	export interface WorkEntry extends BaseEntry {
		type: TYPE.WORK;
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
			schoolURL: 'https://www.strabrecht.nl/',
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
			schoolURL: {
				en: 'https://www.universiteitleiden.nl/en',
				nl: 'https://www.universiteitleiden.nl/',
			},
			start: new Date(2014, 8),
			end: new Date(2018, 2),
			// TODO: icon
			icon: '',
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
					'Bachelor thesis waarin onderzocht wordt hoe recurrente neurale netwerken gebruikt kunnen worden voor het detecteren van abnormaal gedrag in computer netwerken',
			},
			skills: [
				Skill.SKILL.PYTHON,
				Skill.SKILL.BASH,
				Skill.SKILL.LATEX,
				Skill.SKILL.KERAS,
			],
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
