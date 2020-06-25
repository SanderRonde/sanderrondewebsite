import { TimeLineEntry, TIMELINE_DIRECTION } from './time-line-entry.js';
import { TemplateFn, CHANGE_TYPE, css } from 'wc-lib';
import { render } from 'lit-html';

export const TimeLineEntryCSS = new TemplateFn<TimeLineEntry>(
	function (html, props, theme) {
		return html`<style>
			${css(this).c.icon} {
				width: 40px;
				height: 40px;
				border-radius: 50%;
				padding-top: 5px;
			}

			${css(this).c.icon.pseudo('first-child')} {
				padding-top: 0;
			}

			${css(this).$['content-col'].or.$['icon-col']} {
				display: flex;
				flex-direction: column;
			}

			${css(this).$['icon-col']} {
				${props.direction === TIMELINE_DIRECTION.LEFT
				? 'padding-left: 10px;'
				: 'padding-right: 10px;'}
			}

			${css(this).$.content} {
				display: flex;
				flex-direction: ${props.direction === TIMELINE_DIRECTION.RIGHT
				? 'row'
				: 'row-reverse'};
				padding: 10px;
			}

			${css(this).$.card} {
				max-width: 500px;
				display: block;
				border-bottom: 2px solid ${theme.primary.main};
			}

			${css(this).$['detail-row'].or.$['skill-row']} {
				display: none;
			}

			${css(this).$.title} {
				font-weight: bold;
				color: ${theme.text.light};
			}

			${css(this).$.time} {
				color: ${theme.text.main};
				cursor: pointer;
				font-size: 80%;
			}

			${css(this).$['title-row']} {
				text-align: ${props.direction === TIMELINE_DIRECTION.RIGHT
				? 'left'
				: 'right'};
				${props.direction === TIMELINE_DIRECTION.LEFT
				? 'padding-left: 10px;'
				: 'padding-right: 10px;'}
			}
		</style>`;
	},
	CHANGE_TYPE.PROP | CHANGE_TYPE.THEME,
	render
);
