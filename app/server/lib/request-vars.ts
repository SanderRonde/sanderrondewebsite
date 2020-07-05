import {
	strToTheme,
	DEFAULT_THEME,
	THEME_COOKIE_NAME,
} from '../../shared/theme.js';
import {
	strToLanguage,
	DEFAULT_LANG,
	LANG_COOKIE_NAME,
} from '../../i18n/i18n.js';
import express from 'express';

export namespace RequestVars {
	export function getLang(req: express.Request, res: express.Response) {
		const languageStr = req.cookies[LANG_COOKIE_NAME];
		const language = strToLanguage(languageStr);
		if (!language) {
			res.cookie(LANG_COOKIE_NAME, DEFAULT_LANG);
			return DEFAULT_LANG;
		}
		return language;
	}

	export function getTheme(req: express.Request, res: express.Response) {
		const themeName = req.cookies[THEME_COOKIE_NAME];
		const theme = strToTheme(themeName);
		if (!theme) {
			res.cookie(THEME_COOKIE_NAME, DEFAULT_THEME);
			return DEFAULT_THEME;
		}
		return theme;
	}
}
