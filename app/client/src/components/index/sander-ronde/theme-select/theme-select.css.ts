import { BubbleSelectCSS } from '../bubble-select/bubble-select.css.js';
import { THEMES } from '../../../../../../shared/theme.js';
import { TemplateFn, CHANGE_TYPE, css } from 'wc-lib';
import { ThemeSelect } from './theme-select.js';
import { render } from 'lit-html';

export const ThemeBubbleSelectCSS = new TemplateFn<ThemeSelect>(
	function (html, _props, theme) {
		return html`<style>
			${BubbleSelectCSS(html, this, theme, THEMES.length)}
		</style>`;
	},
	CHANGE_TYPE.THEME,
	render
);

export const ThemeSelectCSS = new TemplateFn<ThemeSelect>(
	function (html) {
		return html`<style>
			${css(this).$.container} {
				position: absolute;
				right: 15px;
				z-index: 1000;
			}

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
