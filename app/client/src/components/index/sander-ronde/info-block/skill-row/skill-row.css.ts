import { mediaQueryRule } from '../../../../../styles/media-query.js';
import { TemplateFn, CHANGE_TYPE, css } from 'wc-lib';
import { SkillRow } from './skill-row.js';
import { render } from 'lit-html';

export const SkillRowCSS = new TemplateFn<SkillRow>(
	function (html, _props, theme) {
		return html`<style>

			${css(this).$['skill-group']} {
				display: flex;
				margin: 10px 0;
				flex-direction: row;
				justify-content: flex-end;
			}

			${css(this).c.skill} {
				color: ${theme.text.main};
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
				${css(this).$['skill-group']} {
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
