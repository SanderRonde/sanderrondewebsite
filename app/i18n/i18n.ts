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

export function I18NGetMessage(
	langFile: {
		[key: string]: I18NMessage;
	},
	key: string,
	values: any[]
) {
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

export const enum LANGUAGE {
	EN = 'en',
	NL = 'nl',
	DEFAULT_LANG = 'en',
}
const LANGUAGES: LANGUAGE[] = [LANGUAGE.EN, LANGUAGE.NL];

export function strToLanguage(str: string) {
	return LANGUAGES.find((l) => l === str);
}

export interface I18NMessage {
	message: string;
}

export type I18NTree =
	| {
			[key: string]: I18NMessage;
	  }
	| {
			[key: string]: I18NTree;
	  };

export type I18NRoot = {
	[key: string]: I18NTree;
};
