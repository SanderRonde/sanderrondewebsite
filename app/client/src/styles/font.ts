import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { render } from 'lit-html';

export const FontCSS = new TemplateFn<any>(
	function (html) {
		return html`<style>
			span[data-type='html'] {
				font-family: 'Roboto';
			}
		</style>`;
	},
	CHANGE_TYPE.ALWAYS,
	render
);
