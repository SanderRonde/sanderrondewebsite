import { strToTheme, DEFAULT_THEME } from '../../shared/theme.js';
import { strToLanguage, DEFAULT_LANG } from '../../i18n/i18n.js';
import express from 'express';

export namespace RequestVars {
	export function getLang(req: express.Request, res: express.Response) {
		const languageStr = req.cookies['lang'];
		const language = strToLanguage(languageStr);
		if (!language) {
			res.cookie('lang', DEFAULT_LANG);
			return DEFAULT_LANG;
		}
		return language;
	}

	export function getTheme(req: express.Request, res: express.Response) {
		const languageStr = req.cookies['theme'];
		const language = strToTheme(languageStr);
		if (!language) {
			res.cookie('theme', DEFAULT_THEME);
			return DEFAULT_THEME;
		}
		return language;
	}
}
