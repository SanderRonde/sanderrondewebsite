import {
	BUBBLE_ANIMATION_DURATION,
	BubbleSelect,
} from '../bubble-select/bubble-select.js';
import { THEMES } from '../../../../../../shared/theme.js';
import { TemplateFn, CHANGE_TYPE, css } from 'wc-lib';
import { render } from 'lit-html';

const BUBBLE_SIZE = 45;
const BUBBLE_PADDING = 5 * 2;

export const BubbleSelectCSS = new TemplateFn<BubbleSelect<{}, {}, {}, {}>>(
	function (html, _props, theme) {
		return html`<style>
			${css(this).c.bubble.or.c.highlighter} {
				width: ${BUBBLE_SIZE}px;
				height: ${BUBBLE_SIZE}px;
				border-radius: 50%;
			}

			${css(this).c.bubble.toggle.active.descendant.c.highlighter} {
				background-color: ${theme.highlight.main};
			}

			${css(this).c.bubble} {
				padding: ${BUBBLE_PADDING / 2}px 0;
				cursor: pointer;
				transform: translateY(0);
				transition: transform 250ms ease-in-out;
			}

			${css(this).c.bubble.toggle['on-top']} {
				z-index: 100;
			}

			${css(this).$.container} {
				position: absolute;
				right: 15px;
			}

			${css(this).$.positioner} {
				transform: translateY(
					-${(THEMES.length - 1) * (BUBBLE_SIZE + BUBBLE_PADDING)}px
				);
				transition: transform ${BUBBLE_ANIMATION_DURATION}ms ease-in-out;
			}

			${css(this).$.positioner.toggle.expanded} {
				transform: translateY(0);
			}

			${new Array(THEMES.length)
				.fill('')
				.map((_, index) => {
					return `${
						(css(this).c.bubble.and as any)[`shift--${index + 1}`]
					} {
						transform: translateY(-${(index + 1) * (BUBBLE_SIZE + BUBBLE_PADDING)}px);
				}`;
				})
				.join('\n')}

			${new Array(THEMES.length)
				.fill('')
				.map((_, index) => {
					return `${
						(css(this).c.bubble.and as any)[`shift-${index + 1}`]
					} {
						transform: translateY(${(index + 1) * (BUBBLE_SIZE + BUBBLE_PADDING)}px);
				}`;
				})
				.join('\n')}
		</style>`;
	},
	CHANGE_TYPE.PROP,
	render
);
