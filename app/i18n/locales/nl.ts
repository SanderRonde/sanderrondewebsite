import { Skill, About } from '../../client/src/config/me';
import { THEME } from '../../shared/theme';
import { I18NRoot, LANGUAGE } from '../i18n';
import { I18NKeys } from '../i18n-keys';

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
			titles: {
				master: {
					message: 'Master informatie',
				},
				bachelor: {
					message: 'Bachelor informatie',
				},
				uniLeiden: {
					message: 'Universiteit Leiden website',
				},
				github: {
					message: 'Github profiel',
				},
			},
		},
		infoBlock: {
			aboutMe: {
				title: {
					message: 'Over mij',
				},
				...(() => {
					const obj: Partial<
						{
							[par in About.Paragraphs]: {
								message: string;
							};
						}
					> = {};
					for (const key in About.about.nl) {
						obj[key as About.Paragraphs] = {
							message: About.about.nl[key as About.Paragraphs],
						};
					}
					return obj;
				})(),
			},
			skills: {
				_: { message: '', blank: true },
				title: {
					message: 'Vaardigheden',
				},
				[Skill.SKILL.DUTCH]: {
					message: 'Nederlands',
				},
				[Skill.SKILL.ENGLISH]: {
					message: 'Engels',
				},
				[Skill.SKILL.GERMAN]: {
					message: 'Duits',
				},
				[Skill.SKILL.FRENCH]: {
					message: 'Frans',
				},
				[Skill.SKILL.BROWSER_EXTENSIONS]: {
					message: 'Browser extensies',
				},
			},
			skillLevels: {
				_: { message: '', blank: true },
				level: {
					message: 'Niveau: {{level}}',
				},
				[Skill.SKILL_LEVEL.BASIC]: {
					message: 'basis',
				},
				[Skill.SKILL_LEVEL.DECENT]: {
					message: 'redelijk',
				},
				[Skill.SKILL_LEVEL.GOOD]: {
					message: 'goed',
				},
				[Skill.SKILL_LEVEL.GREAT]: {
					message: 'heel goed',
				},
				[Skill.SKILL_LEVEL.FLUENT]: {
					message: 'vloeiend',
				},
			},
		},
		timeline: {
			timelineEntry: {
				time: {
					end: {
						current: {
							message: 'huidig',
						},
					},
				},
			},
			timelineHeader: {
				header: {
					message: 'Tijdlijn',
				},
				eet: {
					message: 'Tijdlijn (werk/school)',
				},
				pproj: {
					message: 'Tijdlijn (projecten)',
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
		langSelect: {
			changeLang: {
				message: 'Verander taal naar {{lang}}',
			},
			_: { message: '', blank: true },
			[LANGUAGE.EN]: {
				message: 'engels',
			},
			[LANGUAGE.NL]: {
				message: 'nederlands',
			},
		},
		themeSelect: {
			changeTheme: {
				message: 'Verander thema naar {{theme}}',
			},
			_: { message: '', blank: true },
			[THEME.LIGHT]: {
				message: 'licht',
			},
			[THEME.DARK]: {
				message: 'donker',
			},
			[THEME.HIGH_CONTRAST]: {
				message: 'hoog contrast',
			},
		},
	},
};

export default messages as I18NRoot;
