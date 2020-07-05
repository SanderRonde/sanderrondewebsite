import { THEMES } from '../../../../../../shared/theme.js';
import { TemplateFn, CHANGE_TYPE, css } from 'wc-lib';
import { ThemeSelect } from './theme-select.js';
import { render } from 'lit-html';

const THEME_BUBBLE_SIZE = 45;
const THEME_BUBBLE_PADDING = 5 * 2;
export const BUBBLE_ANIMATION_DURATION = 250;

export const ThemeSelectCSS = new TemplateFn<ThemeSelect>(
	function (html, _props, theme) {
		return html`<style>
			${css(this).c.theme.or.c.highlighter} {
				width: ${THEME_BUBBLE_SIZE}px;
				height: ${THEME_BUBBLE_SIZE}px;
				border-radius: 50%;
			}

			${css(this).c.theme.toggle.active.descendant.c.highlighter} {
				background-color: ${theme.highlight.main};
			}

			${css(this).c['theme-background']} {
				width: 41px;
				height: 41px;
				border-radius: 50%;
				transform: translate(2px, 2px);
			}

			${css(this).c['highlight-color']} {
				width: 15px;
				height: 15px;
				border-radius: 50%;
				transform: translate(17.5px, 13px);
				z-index: 10;
			}

			${css(this).c['primary-color']} {
				width: 15px;
				height: 15px;
				border-radius: 50%;
				transform: translate(-10px, 0);
			}

			${css(this).c.theme} {
				padding: ${THEME_BUBBLE_PADDING / 2}px 0;
				cursor: pointer;
				transform: translateY(0);
				transition: transform 250ms ease-in-out;
			}

			${css(this).c.theme.toggle['on-top']} {
				z-index: 100;
			}

			${css(this).$.container} {
				position: absolute;
				right: 15px;
			}

			${css(this).$.positioner} {
				transform: translateY(
					-${(THEMES.length - 1) *
			(THEME_BUBBLE_SIZE + THEME_BUBBLE_PADDING)}px
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
						(css(this).c.theme.and as any)[`shift--${index + 1}`]
					} {
						transform: translateY(-${
							(index + 1) *
							(THEME_BUBBLE_SIZE + THEME_BUBBLE_PADDING)
						}px);
				}`;
				})
				.join('\n')}

			${new Array(THEMES.length)
				.fill('')
				.map((_, index) => {
					return `${
						(css(this).c.theme.and as any)[`shift-${index + 1}`]
					} {
						transform: translateY(${
							(index + 1) *
							(THEME_BUBBLE_SIZE + THEME_BUBBLE_PADDING)
						}px);
				}`;
				})
				.join('\n')}
		</style>`;
	},
	CHANGE_TYPE.PROP,
	render
);
