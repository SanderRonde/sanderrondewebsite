import { TemplateFn, CHANGE_TYPE, css } from 'wc-lib';
import { ThemeSelect } from './theme-select.js';
import { render } from 'lit-html';

export const ThemeSelectCSS = new TemplateFn<ThemeSelect>(
	function (html) {
		return html`<style>
			${css(this).c['theme-background']} {
				width: 41px;
				height: 41px;
				border-radius: 50%;
				transform: translate(2px, 2px);
			}

			${css(this).c['highlight-color']} {
				width: 15px;
				height: 15px;
				border-radius: 50%;
				transform: translate(17.5px, 13px);
				z-index: 10;
			}

			${css(this).c['primary-color']} {
				width: 15px;
				height: 15px;
				border-radius: 50%;
				transform: translate(-10px, 0);
			}
		</style>`;
	},
	CHANGE_TYPE.NEVER,
	render
);
