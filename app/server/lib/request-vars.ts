import { strToLanguage, LANGUAGE } from '../../i18n/i18n';
import { THEME, strToTheme } from '../../shared/theme';
import express from 'express';

export namespace RequestVars {
	export function getLang(req: express.Request, res: express.Response) {
		const languageStr = req.cookies['lang'];
		const language = strToLanguage(languageStr);
		if (!language) {
			res.cookie('lang', LANGUAGE.DEFAULT_LANG);
			return LANGUAGE.DEFAULT_LANG;
		}
		return language;
	}

	export function getTheme(req: express.Request, res: express.Response) {
		const languageStr = req.cookies['theme'];
		const language = strToTheme(languageStr);
		if (!language) {
			res.cookie('theme', THEME.DEFAULT_THEME);
			return THEME.DEFAULT_THEME;
		}
		return language;
	}
}