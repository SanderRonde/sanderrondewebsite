import { LANGUAGE } from '../../../i18n/i18n.js';
import { Part, directive } from 'lit-html';

export const I18NReturner = directive(
	(promise: Promise<any>) => (part: Part) => {
		promise.then((str) => {
			part.setValue(str);
			part.commit();
		});
	}
);

export function getLang(): string {
	if (typeof document === undefined || !('cookie' in document)) {
		return LANGUAGE.DEFAULT_LANG;
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

	document.cookie = `${document.cookie}; lang=${LANGUAGE.DEFAULT_LANG}`;
	return LANGUAGE.DEFAULT_LANG;
}
