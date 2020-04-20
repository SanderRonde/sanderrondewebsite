import { I18NType } from '../client/src/i18n/i18n-defs';
import { I18NMessage } from './spec';

function doReplacements(
	message: string,
	replacements: [string, any][]
): string | Promise<string> {
	const promises: Promise<any>[] = [];

	let result: string = message;
	for (const [key, value] of replacements) {
		const regexp = new RegExp(`{{${key}}}`, 'g');
		if (value instanceof Promise) {
			promises.push(
				(async () => {
					result = result.replace(regexp, String(await value));
				})()
			);
		} else {
			result = result.replace(regexp, String(value));
		}
	}

	if (promises.length) {
		return Promise.all(promises).then(() => result);
	}
	return result;
}

export function I18NGetMessage(langFile: I18NType, key: string, values: any[]) {
	if (!(key in langFile)) {
		return '???';
	}

	// Get the relevant entry
	const item = langFile[key as keyof typeof langFile] as I18NMessage;
	const { message } = item;

	const replacements = Object.keys(values[0] || {}).map((key): [
		string,
		any
	] => {
		return [key, values[0][key]];
	});

	if (replacements.length === 0) return message;

	return doReplacements(message, replacements);
}

export type LANGUAGE = 'en' | 'nl';
export const LANGUAGES: LANGUAGE[] = ['en', 'nl'];

export const DEFAULT_LANG: LANGUAGE = 'en';
export function getLang(): string {
	if (typeof document === undefined || !('cookie' in document)) {
		return DEFAULT_LANG;
	}

	const cookies = document.cookie.split(';').map((cookieString) => {
		const [key, ...rest] = cookieString.trim().split('=');
		return {
			key,
			value: rest.join('='),
		};
	});

	for (const { key, value } of cookies) {
		if (key === 'lang') return value;
	}

	document.cookie = `${document.cookie}; lang=${DEFAULT_LANG}`;
	return DEFAULT_LANG;
}
