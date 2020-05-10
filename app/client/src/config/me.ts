export const enum SKILL_LEVEL {
	FLUENT,
	GREAT,
	GOOD,
	DECENT,
	BASIC,
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
	RUBY = 'ruby',
	NODE = 'node',
	DJANGO = 'django',
	LINUX = 'linux',
	IDA_PRO = 'IDA pro',
	KERAS = 'keras',
	BROWSER_EXTENSIONS = 'browser_extensions',
	BASH = 'bash',
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

interface MeConfig {
	skillGroups: SkillGroup[];
}

const me: MeConfig = {
	skillGroups: [
		{
			group: SKILL_GROUP.HUMAN,
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
				{
					name: SKILL.RUBY,
					level: SKILL_LEVEL.BASIC,
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
	],
};
export default me;
