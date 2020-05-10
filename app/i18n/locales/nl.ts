import { SKILL, SKILL_LEVEL } from '../../client/src/config/me.js';
import { I18NRoot } from '../i18n';

export const messages = {
	generic: {
		dismiss: {
			message: 'verberg',
		},
		reload: {
			message: 'opnieuw laden',
		},
	},
	index: {
		nameBlock: {
			education: {
				uniLeiden: {
					message: 'Universiteit Leiden',
				},
			},
			links: {
				vu: {
					message: 'https://www.vu.nl/nl/',
				},
				uva: {
					message: 'https://www.uva.nl/nl',
				},
				bachelor: {
					message:
						'https://www.universiteitleiden.nl/onderwijs/opleidingen/bachelor/informatica',
				},
				uniLeiden: {
					message: 'https://www.universiteitleiden.nl/',
				},
				scrollDown: {
					message: 'scroll naar beneden',
				},
			},
		},
		infoBlock: {
			aboutMe: {
				title: {
					message: 'Over mij',
				},
				content: {
					message: 'Lorem ipsum... (nl)',
				},
			},
			skills: {
				_: { message: '', blank: true },
				title: {
					message: 'Vaardigheden',
				},
				[SKILL.DUTCH]: {
					message: 'Nederlands',
				},
				[SKILL.ENGLISH]: {
					message: 'Engels',
				},
				[SKILL.GERMAN]: {
					message: 'Duits',
				},
				[SKILL.FRENCH]: {
					message: 'Frans',
				},
				[SKILL.BROWSER_EXTENSIONS]: {
					message: 'Browser extensies',
				},
			},
			skillLevels: {
				_: { message: '', blank: true },
				level: {
					message: 'Niveau: {{level}}',
				},
				[SKILL_LEVEL.BASIC]: {
					message: 'basis',
				},
				[SKILL_LEVEL.DECENT]: {
					message: 'redelijk',
				},
				[SKILL_LEVEL.GOOD]: {
					message: 'goed',
				},
				[SKILL_LEVEL.GREAT]: {
					message: 'heel goed',
				},
				[SKILL_LEVEL.FLUENT]: {
					message: 'vloeiend',
				},
			},
		},
	},
	shared: {
		sw: {
			works_offline: {
				message: 'Pagina werkt offline',
			},
			update_ready: {
				message: 'Pagina kan worden geüpdate',
			},
		},
	},
};

export default messages as I18NRoot;
