import { THEME_SHADE } from '../../../../../shared/theme';
import { TemplateFn, CHANGE_TYPE, css } from 'wc-lib';
import { BackgroundBlock } from './background-block';
import { render } from 'lit-html';

export const BackgroundBlockCSS = new TemplateFn<BackgroundBlock>(
	function (html, props, theme) {
		return html`<style>
			${css(this).$.block} {
				width: 100vw;
				${props.padding ? 'padding: 10vh 0;' : ''}
				min-height: ${props.fill ? '80vh' : '10vh'};
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
				min-height: ${props.fill ? '100vh' : '1vh'};
			}

			${css(this).$.block.or.id.slot} {
				display: flex;
				flex-direction: column;
				flex-grow: 100;
			}
		</style>`;
	},
	CHANGE_TYPE.THEME | CHANGE_TYPE.PROP,
	render
);
