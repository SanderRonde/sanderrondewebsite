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
