import { BubbleSelectCSS } from '../bubble-select/bubble-select.css.js';
import { THEMES } from '../../../../../../shared/theme.js';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { ThemeSelect } from './theme-select.js';
import { render } from 'lit-html';

export const ThemeBubbleSelectCSS = new TemplateFn<ThemeSelect>(
	function (html, { theme }) {
		return html`${BubbleSelectCSS(html, theme, THEMES.length)}`;
	},
	CHANGE_TYPE.THEME,
	render
);

export const ThemeSelectCSS = new TemplateFn<ThemeSelect>(
	function (html) {
		return html`<style>
			#container {
				position: absolute;
				right: 15px;
				z-index: 1000;
			}

			.theme-background {
				width: 41px;
				height: 41px;
				border-radius: 50%;
				transform: translate(2px, 2px);
			}

			.highlight-color {
				width: 15px;
				height: 15px;
				border-radius: 50%;
				transform: translate(17.5px, 13px);
				z-index: 10;
			}

			.primary-color {
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
