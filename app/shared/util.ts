import { List } from 'ts-toolbelt';

/**
 * Function used to transform a template literal back into
 * a string.
 * Mostly used to trigger the lit-html-style syntax highlighting
 */
export function html(strings: TemplateStringsArray, ...values: any[]) {
	let string: string = strings[0];
	for (let i = 0; i < strings.length - 1; i++) {
		string += `${values[i]}${strings[i + 1]}`;
	}
	return string;
}

export function flat<A extends any[]>(arr: A): List.Flatten<A> {
	const flattened = ([] as unknown) as List.Flatten<A>;
	for (const element of arr) {
		if (Array.isArray(element)) {
			flattened.push(...flat(element));
		} else {
			flattened.push(element);
		}
	}
	return flattened;
}

export function cutIntoGroups<I>(arr: I[], groupSize: number): I[][] {
	const result: I[][] = [];
	for (let i = 0; i < arr.length; i += groupSize) {
		result.push(arr.slice(i, i + groupSize));
	}
	return result;
}
