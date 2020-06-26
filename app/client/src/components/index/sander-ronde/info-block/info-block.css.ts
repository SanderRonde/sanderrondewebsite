import { TemplateFn, CHANGE_TYPE, css } from 'wc-lib';
import { InfoBlock } from './info-block';
import { render } from 'lit-html';

export const InfoBlockCSS = new TemplateFn<InfoBlock>(
	function (html, _props, theme) {
		return html`<style>
			${css(this).$.container} {
				color: ${theme.text.main};
				width: calc(1000px);
				padding: 0 5vw;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
			}

			${css(this).c.block} {
				max-width: 450px;
			}

			${css(this).$['about-me']} {
				font-size: 120%;
			}

			${css(this).c.header} {
				font-size: 200%;
				font-weight: 500;
				margin-bottom: 1px;
			}

			${css(this).$.skills.descendant.c.header} {
				text-align: right;
			}

			span[data-type='html'] {
				width: 100%;
			}

			@media (max-width: 900px) {
				${css(this).$.container} {
					flex-direction: column;
				}

				${css(this).c.block} {
					width: 100%;
					max-width: none;
					display: flex;
					flex-direction: row;
					justify-content: center;
				}

				${css(this).$['about-me']} {
					max-width: 500px;
				}

				${css(this).c.block.descendant.c.header.or.$.skills.descendant.c
						.header} {
					text-align: center;
				}
			}

			${css(this).c['skill-row']} {
				margin: 10px 0;
				display: block;
			}
		</style>`;
	},
	CHANGE_TYPE.THEME,
	render
);
