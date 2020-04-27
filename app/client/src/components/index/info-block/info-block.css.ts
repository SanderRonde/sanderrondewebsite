import { TemplateFn, CHANGE_TYPE, css } from 'wc-lib';
import { InfoBlock } from './info-block.js';
import { render } from 'lit-html';

export const InfoBlockCSS = new TemplateFn<InfoBlock>(
	function (html, _props, theme) {
		return html`<style>
			${css(this).$.block},
			span[data-type='html'] {
				display: flex;
				flex-direction: column;
				flex-grow: 100;
			}

			${css(this).$['main-content']} {
				flex-grow: 100;
				color: ${theme.text.main};
			}
		</style>`;
	},
	CHANGE_TYPE.THEME,
	render
);
