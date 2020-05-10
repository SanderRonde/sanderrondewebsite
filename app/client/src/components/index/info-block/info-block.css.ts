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

			span[data-type='html'] {
				width: 100%;
			}

			${css(this).c['skill-group']} {
				display: flex;
				margin: 10px 0;
				flex-direction: row;
				justify-content: flex-end;
			}

			${css(this).c.skill} {
				display: inline-block;
				border-radius: 10px;
				padding: 8px;
				margin: 3px;
				font-weight: bold;
				text-transform: uppercase;
				cursor: pointer;
				transition: background-color 100ms ease-in;
				border: 3px solid ${theme.primary.main};
			}

			${css(this).c.skill.pseudo('hover')} {
				background-color: ${theme.primary.main};
			}
		</style>`;
	},
	CHANGE_TYPE.THEME,
	render
);
