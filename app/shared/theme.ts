export const enum THEME {
	LIGHT = 'light',
	DARK = 'dark',
	HIGH_CONTRAST = 'high-contrast',
}
export const DEFAULT_THEME = THEME.DARK;
export const THEME_COOKIE_NAME = 'theme';

export interface ThemeShade {
	light: string;
	main: string;
	dark: string;
}

export const enum THEME_SHADE {
	REGULAR = 'regular',
	LIGHT = 'light',
	DARK = 'dark',
}

export interface Theme {
	background: ThemeShade;
	primary: ThemeShade;
	highlight: ThemeShade;
	text: ThemeShade & {
		highlighted: string;
	};
	card: string;
}

export const themes: {
	[key in THEME]: Theme;
} = {
	[THEME.DARK]: {
		background: {
			main: '#1B1B1B',
			light: '#262527',
			dark: '#101012',
		},
		text: {
			main: '#C5C5C5',
			dark: '#7B7B7B',
			light: '#D5D5D5',
			highlighted: '#C5C5C5',
		},
		highlight: {
			main: '#FFD03E',
			light: '#FFD442',
			dark: '#A47F17',
		},
		primary: {
			main: '#2176FF',
			light: '#3383FF',
			dark: '#1E6AF0',
		},
		card: '#222222',
	},
	[THEME.HIGH_CONTRAST]: {
		background: {
			main: '#efefef',
			light: '#efefef',
			dark: '#efefef',
		},
		text: {
			main: '#070707',
			dark: '#070707',
			light: '#070707',
			highlighted: '#efefef',
		},
		highlight: {
			main: '#070707',
			light: '#070707',
			dark: '#070707',
		},
		primary: {
			main: '#070707',
			light: '#070707',
			dark: '#070707',
		},
		card: '#efefef',
	},
	[THEME.LIGHT]: {
		background: {
			main: '#e1e1e1',
			light: '#efefef',
			dark: '#dadada',
		},
		text: {
			main: '#2c2c2c',
			dark: '#070707',
			light: '#414141',
			highlighted: '#e1e1e1',
		},
		highlight: {
			main: '#6a6a6a',
			light: '#606060',
			dark: '#202020',
		},
		primary: {
			main: '#649fff',
			light: '#7caeff',
			dark: '#2f7eff',
		},
		card: '#dadada',
	},
};

export const THEMES: THEME[] = Object.keys(themes) as THEME[];
export function strToTheme(str: string) {
	return THEMES.find((l) => l === str);
}
