import { mediaQueryRule } from '../../../../styles/media-query';
import { TemplateFn, CHANGE_TYPE, css } from 'wc-lib';
import { NameBlock } from './name-block';
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
				color: ${theme.highlight.main};
				text-align: center;
			}

			${mediaQueryRule(
					css(this).$.name,
					'font-size',
					new Map([
						[[0, 1000], '14vw'],
						[[1000, Infinity], '1000%'],
					])
				)}
				${css(this).$.name} {
				line-height: 0.9em;
				margin: 0;
				font-weight: normal;
			}

			${css(this).$.education} {
				margin-top: 10px;
			}

			${css(this).$['down-arrow']} {
				fill: ${theme.highlight.main};
			}

			${css(this).$['scroll-down']} {
				width: 100px;
				margin-bottom: 20px;
				transform: translateY(0);
				transition: transform 200ms ease-in-out;
			}

			${css(this).$['scroll-down'].pseudo('hover')} {
				transform: translateY(10px);
			}

			${css(this).$['down-arrow']} {
				display: block;
				cursor: pointer;
			}

			${mediaQueryRule(
					css(this).c.tagline,
					'font-size',
					new Map([
						[[0, 800], '4vw'],
						[[800, Infinity], '200%'],
					])
				)}
				${mediaQueryRule(
					css(this).c['education-line'],
					'font-size',
					new Map([
						[[0, 800], '2.25vw'],
						[[800, Infinity], '120%'],
					])
				)}
				${css(this).$.links} {
				display: flex;
				flex-direction: row;
				justify-content: center;
			}

			${css(this).c['icon-link']} {
				margin: 10px;
				cursor: pointer;
			}

			${css(this).$['document-link']} {
				margin-top: 15px;
			}
		</style>`;
	},
	CHANGE_TYPE.THEME,
	render
);
