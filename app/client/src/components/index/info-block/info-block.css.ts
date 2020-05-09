import { TemplateFn, CHANGE_TYPE, css } from 'wc-lib';
import { InfoBlock } from './info-block.js';
import { render } from 'lit-html';

export const InfoBlockCSS = new TemplateFn<InfoBlock>(
	function (html, _props, theme) {
		return html`<style>
			${css(this).$.container} {
				color: ${theme.text.main};
				width: calc(600px + 10vw);
				padding: 0 5vw;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
			}

			${css(this).c.header} {
				font-size: 200%;
				font-weight: 500;
				margin-bottom: 1px;
			}

			${css(this).$.skills.child.c.header} {
				text-align: right;
			}
		</style>`;
	},
	CHANGE_TYPE.THEME,
	render
);
