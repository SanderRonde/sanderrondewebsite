import {  Skill } from '../../client/src/config/me';
import { I18NRoot } from '../i18n';

export const messages = {
	generic: {
		dismiss: {
			message: 'dismiss',
		},
		reload: {
			message: 'reload',
		},
	},
	index: {
		nameBlock: {
			education: {
				uniLeiden: {
					message: 'Leiden University',
				},
			},
			links: {
				vu: {
					message: 'https://www.vu.nl/en/',
				},
				uva: {
					message: 'https://www.uva.nl/en',
				},
				bachelor: {
					message:
						'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/computer-science',
				},
				uniLeiden: {
					message: 'https://www.universiteitleiden.nl/en',
				},
				scrollDown: {
					message: 'scroll down',
				},
			},
		},
		infoBlock: {
			aboutMe: {
				title: {
					message: 'About me',
				},
				par1: {
					message: `Hi I'm Sander, and as you might have already read, I'm a computer science student and full-stack developer. I have a passion for solving hard problems in either the frontend or the backend.`,
				},
				par2: {
					message: `I started out some {{frontend}} years ago with developing chrome extensions and have since expanded to full-stack development with various database systems and backends, systems/microcontroller programming with mostly C and a bit of machine learning.`,
				},
				par3: {
					message: `This website serves as both a browsable resumé and a way to show off what I can do, being built using my own {{wclib}} library. You can learn more about my portfolio down below or you can focus on the projects related to a skill by clicking on one.`,
				},
			},
			skills: {
				_: { message: '', blank: true },
				title: {
					message: 'Skills',
				},
				[Skill.SKILL.DUTCH]: {
					message: 'Dutch',
				},
				[Skill.SKILL.ENGLISH]: {
					message: 'English',
				},
				[Skill.SKILL.GERMAN]: {
					message: 'German',
				},
				[Skill.SKILL.FRENCH]: {
					message: 'French',
				},
				[Skill.SKILL.BROWSER_EXTENSIONS]: {
					message: 'Browser extensions',
				},
			},
			skillLevels: {
				_: { message: '', blank: true },
				level: {
					message: 'Level: {{level}}',
				},
				[Skill.SKILL_LEVEL.BASIC]: {
					message: 'basic',
				},
				[Skill.SKILL_LEVEL.DECENT]: {
					message: 'decent',
				},
				[Skill.SKILL_LEVEL.GOOD]: {
					message: 'good',
				},
				[Skill.SKILL_LEVEL.GREAT]: {
					message: 'great',
				},
				[Skill.SKILL_LEVEL.FLUENT]: {
					message: 'fluent',
				},
			},
		},
	},
	shared: {
		sw: {
			works_offline: {
				message: 'Works offline now',
			},
			update_ready: {
				message: 'Page can be updated',
			},
		},
	},
};

export default messages as I18NRoot;
