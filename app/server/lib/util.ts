export namespace Util {
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
}