import { BubbleSelectCSS } from '../bubble-select/bubble-select.css.js';
import { LANGUAGES } from '../../../../../../i18n/i18n.js';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { LangSelect } from './lang-select.js';
import { render } from 'lit-html';

export const LangBubbleSelectCSS = new TemplateFn<LangSelect>(
	function (html, { theme }) {
		return html`${BubbleSelectCSS(html, theme, LANGUAGES.length)}`;
	},
	CHANGE_TYPE.THEME,
	render
);

export const LangSelectCSS = new TemplateFn<LangSelect>(
	function (html) {
		return html`<style>
			#container {
				position: absolute;
				right: 70px;
				z-index: 1000;
			}

			.lang-background {
				transform: translate(2px, 2px);
			}
		</style>`;
	},
	CHANGE_TYPE.NEVER,
	render
);
