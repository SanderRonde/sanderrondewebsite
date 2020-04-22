import { TemplateFn, CHANGE_TYPE, css } from 'wc-lib';
import { BackgroundBlock } from './background-block.js';
import { render } from 'lit-html';
import { THEME_SHADE } from '../../../../../shared/theme.js';

export const BackgroundBlockCSS = new TemplateFn<BackgroundBlock>(
	function (html, props, theme) {
		return html`<style>
			${css(this).$.block} {
				width: 100vw;
				min-height: 100vh;
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
			}
		</style>`;
	},
	CHANGE_TYPE.THEME | CHANGE_TYPE.PROP,
	render
);
