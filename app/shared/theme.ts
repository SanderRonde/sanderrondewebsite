export const enum THEME {
	// LIGHT = "light",
	DARK = 'dark',
	DEFAULT_THEME = 'dark',
}

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
	secondary: ThemeShade;
	text: ThemeShade;
}

export const themes: {
	[key in THEME]: Theme;
} = {
	dark: {
		background: {
			main: '#1B1B1B',
			light: '#262527',
			dark: '#101012',
		},
		text: {
			main: '#C5C5C5',
			dark: '#7B7B7B',
			light: '#FFF',
		},
		secondary: {
			main: '#FFD03E',
			light: '#FFD442',
			dark: '#A47F17',
		},
		primary: {
			main: '#2176FF',
			light: '#3383FF',
			dark: '#1E6AF0',
		},
	},
};

const THEMES: THEME[] = [THEME.DARK];
export function strToTheme(str: string) {
	return THEMES.find((l) => l === str);
}
