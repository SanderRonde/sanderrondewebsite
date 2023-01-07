import { Skill, About } from '../../client/src/config/me';
import { I18NRoot, LANGUAGE } from '../i18n';
import { THEME } from '../../shared/theme';

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
				bachelorThesis: {
					message: "Bachelor's Thesis",
				},
				masterThesis: {
					message: "Master's thesis",
				},
			},
			titles: {
				master: {
					message: 'Master program',
				},
				bachelor: {
					message: 'Bachelor program',
				},
				uniLeiden: {
					message: 'Leiden University website',
				},
				github: {
					message: 'Github profile',
				},
			},
		},
		infoBlock: {
			aboutMe: {
				title: {
					message: 'About me',
				},
				...(() => {
					const obj: Partial<
						{
							[par in About.Paragraphs]: {
								message: string;
							};
						}
					> = {};
					for (const key in About.about.en) {
						obj[key as About.Paragraphs] = {
							message: About.about.en[key as About.Paragraphs],
						};
					}
					return obj;
				})(),
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
		timeline: {
			timelineEntry: {
				time: {
					end: {
						current: {
							message: 'current',
						},
					},
				},
			},
			timelineHeader: {
				header: {
					message: 'Life Timeline',
				},
				eet: {
					message: 'Life Timeline (work/education)',
				},
				pproj: {
					message: 'Life Timeline (personal projects)',
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
		langSelect: {
			changeLang: {
				message: 'Set language to {{lang}}',
			},
			_: { message: '', blank: true },
			[LANGUAGE.EN]: {
				message: 'english',
			},
			[LANGUAGE.NL]: {
				message: 'dutch',
			},
		},
		themeSelect: {
			changeTheme: {
				message: 'Set theme to {{theme}}',
			},
			_: { message: '', blank: true },
			[THEME.LIGHT]: {
				message: 'light',
			},
			[THEME.DARK]: {
				message: 'dark',
			},
			[THEME.HIGH_CONTRAST]: {
				message: 'high contrast',
			},
		},
	},
};

export default messages as I18NRoot;
