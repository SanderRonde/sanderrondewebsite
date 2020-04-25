import { mediaQueryRule } from '../../../styles/media-query.js';
import { TemplateFn, CHANGE_TYPE, css } from 'wc-lib';
import { NameBlock } from './name-block.js';
import { render } from 'lit-html';

export const NameBlockCSS = new TemplateFn<NameBlock>(
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
			}

			${css(this).$.container} {
				color: ${theme.secondary.main};
				text-align: center;
			}

			${mediaQueryRule(css(this).$.name, 'font-size', {
				xs: '330%',
				sm: '500%',
				lg: '1000%',
			})}

			${css(this).$.name} {
				line-height: 0.9em;
			}

			${css(this).$.education} {
				margin-top: 10px;
			}

			${css(this).$['scroll-down']} {
				fill: ${theme.secondary.main};
				width: 100px;
				margin-bottom: 20px;
				transform: translateY(0);
				transition: transform 200ms ease-in-out;
			}

			${css(this).$['scroll-down'].pseudo('hover')} {
				transform: translateY(20px);
			}

			${mediaQueryRule(css(this).c.tagline, 'font-size', {
				sm: '95%',
				lg: '200%',
			})}

			${mediaQueryRule(css(this).c['education-line'], 'font-size', {
				sm: '75%',
				lg: '120%',
			})}
		</style>`;
	},
	CHANGE_TYPE.ALWAYS,
	render
);
