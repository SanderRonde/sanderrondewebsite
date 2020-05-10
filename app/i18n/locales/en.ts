import { SKILL, SKILL_LEVEL } from '../../client/src/config/me.js';
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
				content: {
					message: 'Lorem ipsum... (en)',
				},
			},
			skills: {
				_: { message: '', blank: true },
				title: {
					message: 'Skills',
				},
				[SKILL.DUTCH]: {
					message: 'Dutch',
				},
				[SKILL.ENGLISH]: {
					message: 'English',
				},
				[SKILL.GERMAN]: {
					message: 'German',
				},
				[SKILL.FRENCH]: {
					message: 'French',
				},
				[SKILL.BROWSER_EXTENSIONS]: {
					message: 'Browser extensions',
				},
			},
			skillLevels: {
				_: { message: '', blank: true },
				level: {
					message: 'Level: {{level}}',
				},
				[SKILL_LEVEL.BASIC]: {
					message: 'basic',
				},
				[SKILL_LEVEL.DECENT]: {
					message: 'decent',
				},
				[SKILL_LEVEL.GOOD]: {
					message: 'good',
				},
				[SKILL_LEVEL.GREAT]: {
					message: 'great',
				},
				[SKILL_LEVEL.FLUENT]: {
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
