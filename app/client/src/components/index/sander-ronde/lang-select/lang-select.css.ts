import { BubbleSelectCSS } from '../bubble-select/bubble-select.css.js';
import { LANGUAGES } from '../../../../../../i18n/i18n.js';
import { TemplateFn, CHANGE_TYPE, css } from 'wc-lib';
import { LangSelect } from './lang-select.js';
import { render } from 'lit-html';

export const LangBubbleSelectCSS = new TemplateFn<LangSelect>(
	function (html, _props, theme) {
		return html`<style>
			${BubbleSelectCSS(html, this, theme, LANGUAGES.length)}
		</style>`;
	},
	CHANGE_TYPE.THEME,
	render
);

export const LangSelectCSS = new TemplateFn<LangSelect>(
	function (html) {
		return html`<style>
			${css(this).$.container} {
				position: absolute;
				right: 70px;
			}

			${css(this).c['lang-background']} {
				transform: translate(2px, 2px);
			}
		</style>`;
	},
	CHANGE_TYPE.NEVER,
	render
);
