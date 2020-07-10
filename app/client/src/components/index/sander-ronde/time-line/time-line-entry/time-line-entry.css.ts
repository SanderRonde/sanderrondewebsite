import { TimeLineEntry, TIMELINE_DIRECTION } from './time-line-entry.js';
import { getInternationalText } from '../../../../../config/me.js';
import {
	getTextWidth,
	getTextWidthServer,
} from '../../../../../shared/util.js';
import { TemplateFn, CHANGE_TYPE, css } from 'wc-lib';
import { render } from 'lit-html';

export const TimeLineEntryCSS = new TemplateFn<TimeLineEntry>(
	function (html, props, theme) {
		const lang = this.getLang();
		const maxTextWidth = Math.min(
			typeof window === 'undefined' ? 1920 : window.innerWidth - 150,
			400
		);
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
				display: block;
				border-bottom: 2px solid ${theme.primary.main};
				cursor: pointer;
			}

			${css(this).$['overflow-container']} {
				height: 0;
				width: 0;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				float: ${props.direction === TIMELINE_DIRECTION.LEFT
				? 'right'
				: 'left'};
			}

			${css(this).$['skill-row']} {
				margin-top: 5px;
				width: fit-content;
			}

			${css(this).$['detail-row']} {
				width: ${this.isSSR
				? (async () => {
						return Math.min(
							maxTextWidth,
							await getTextWidthServer(
								getInternationalText(
									props.entry.description,
									lang
								),
								'16px Roboto'
							)
						);
				  })()
				: Math.min(
						maxTextWidth,
						getTextWidth(
							getInternationalText(props.entry.description, lang),
							'16px Roboto'
						)
				  )}px;
			}

			${css(this).$['detail-row']} {
				margin-top: 5px;
				text-align: ${props.direction === TIMELINE_DIRECTION.LEFT
				? 'right'
				: 'left'};
				position: relative;
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

			${css(this).$['overflow-container']} {
				fill: ${theme.text.main};
			}

			${css(this).$.pin} {
				position: absolute;
				${props.direction === TIMELINE_DIRECTION.LEFT
				? 'left: 10px;'
				: 'right: 10px;'}
				top: 10px;
				opacity: 0;
				transition: opacity 100ms ease-in;
			}

			${css(this).$.card.toggle.expanded.toggle.pinned.descendant.$.pin} {
				opacity: 1;
			}
		</style>`;
	},
	CHANGE_TYPE.PROP | CHANGE_TYPE.THEME,
	render
);
