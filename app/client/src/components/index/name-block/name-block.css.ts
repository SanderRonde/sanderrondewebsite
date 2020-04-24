import { TemplateFn, CHANGE_TYPE, css } from 'wc-lib';
import { NameBlock } from './name-block.js';
import { render } from 'lit-html';

export const NameBlockCSS = new TemplateFn<NameBlock>(
	function (html, _props, theme) {
		return html`<style>
			${css(this).$.block},
			span[data-type='html'] {
				display: flex;
				flex-grow: 100;
			}

			${css(this).$.container} {
				color: ${theme.secondary.main};
				text-align: center;
			}

			${css(this).$.name} {
				font-size: 1000%;
				line-height: 0.9em;
			}

			${css(this).c.tagline} {
				font-size: 200%;
			}

			${css(this).$.education} {
				margin-top: 10px;
			}

			${css(this).c['education-line']} {
				font-size: 120%;
			}
		</style>`;
	},
	CHANGE_TYPE.THEME,
	render
);
