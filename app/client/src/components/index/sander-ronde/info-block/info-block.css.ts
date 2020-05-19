import { mediaQueryRule } from '../../../../styles/media-query';
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

				${css(this).c['skill-group']} {
					justify-content: center;
				}

				${css(this).c.skill} {
					padding: 6px;
					margin: 2px;
				}
			}

			${mediaQueryRule(
				css(this).c.skill,
				'font-size',
				new Map([
					[[0, 450], '12px'],
					[[450, Infinity], '16px'],
				])
			)}
		</style>`;
	},
	CHANGE_TYPE.THEME,
	render
);
