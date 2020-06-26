import { TemplateFn, CHANGE_TYPE, css } from 'wc-lib';
import { TimeLine } from './time-line';
import { render } from 'lit-html';
import { THEME_SHADE } from '../../../../../../shared/theme';

export const TimeLineCSS = new TemplateFn<TimeLine>(
	function (html, props, theme) {
		return html`<style>
			${css(this).$['timeline-table']} {
				display: table;
			}

			${css(this).c['timeline-row']} {
				display: table-row;
			}

			${css(this).c['timeline-row-item']} {
				display: table-cell;
			}

			${css(this).c['eet-item'].descendant.c['timeline-row-aligner'].or.c[
					'pproj-item'
				].descendant.c['timeline-row-aligner']} {
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
			}

			${css(this).c['pproj-item'].descendant.c['timeline-row-aligner']} {
				flex-direction: row-reverse;
			}

			${css(this).c['timeline-entry']} {
				margin: 5px 0;
				display: block;
				width: fit-content;
			}

			${css(this).c['center-line']} {
				background-color: ${theme.primary.main};
				width: 2px;
				display: table-cell;
				height: 100%;
				position: relative;
				height: 20px;
			}

			${css(this).c['timeline-arrow']} {
				margin: 0 7px;
				width: 0;
				height: 0;
				border-style: solid;
				border-width: 5px 0 5px 10px;
				border-color: transparent transparent transparent
					${theme.primary.main};
			}

			${css(this).c['pproj-item'].descendant.c['timeline-arrow']} {
				border-width: 5px 10px 5px 0;
				border-color: transparent ${theme.primary.main} transparent
					transparent;
			}

			${css(this).c['arrow-centerer']} {
				display: flex;
				flex-direction: column;
				justify-content: center;
			}

			${css(this).c['year-tag']} {
				color: white;
				padding: 2px 5px;
				position: absolute;
				transform: translateX(-50%);
				background-color: ${theme.primary.dark};
				border-radius: 5px;
				z-index: 10;
				opacity: 0;
				transition: opacity 250ms ease-in;
			}

			${css(this).$['timeline-root'].toggle.higlighted.descendant.c[
					'year-tag'
				]} {
				opacity: 1;
			}

			${css(this).c['header']} {
				color: white;
				padding: 2px 5px;
				position: absolute;
				transform: translateX(-50%);
				background-color: ${(() => {
					switch (props.shade) {
						case THEME_SHADE.DARK:
							return theme.background.dark;
						case THEME_SHADE.LIGHT:
							return theme.background.light;
						default:
							return theme.background.main;
					}
				})()};
				border-bottom: 2px solid ${theme.primary.main};
				z-index: 10;
				width: max-content;
				font-size: 200%;
			}

			${css(this).c['center-line-header']} {
				margin-bottom: 20px;
				height: 50px;
			}

			${css(this).c['center-line'].toggle.higlighted} {
				background-color: ${theme.secondary.main};
			}

			${css(this).c['center-line'].toggle.higlighted.descendant.c[
					'year-tag'
				]} {
				background-color: ${theme.secondary.dark};
			}
		</style>`;
	},
	CHANGE_TYPE.THEME | CHANGE_TYPE.PROP,
	render
);
