import { I18NType } from './i18n-defs';
import { Part, directive } from 'lit-html';
import { I18NMessage } from './spec';

export const I18NReturner = directive(
	(promise: Promise<any>, placeholder: string) => (part: Part) => {
		part.setValue(placeholder);
		promise.then((str) => {
			part.setValue(str);
			part.commit();
		});
	}
);

export async function I18NGetMessage(
	langFile: I18NType,
	key: string,
	values: any[]
) {
	if (!(key in langFile)) {
		return '???';
	}

	// Get the relevant entry
	const item = langFile[key as keyof typeof langFile] as I18NMessage;
	const { message } = item;

	const replacements = await Promise.all(
		Object.keys(values[0] || {})
			.map((key): [string, any] => {
				return [key, values[0][key]];
			})
			.map(
				async ([key, value]): Promise<[string, any]> => {
					return [key, await value];
				}
			)
	);

	let result: string = message;
	for (const [key, value] of replacements) {
		const regexp = new RegExp(`{{${key}}}`, 'g');
		result = result.replace(regexp, String(value));
	}

	return result;
}

export type LANGUAGE = 'en'|'nl';
export const LANGUAGES: LANGUAGE[] = ['en', 'nl'];

const DEFAULT_LANG: LANGUAGE = 'en';
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
