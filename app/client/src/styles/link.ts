import { TemplateFn, CHANGE_TYPE, ConfigurableWebComponent } from 'wc-lib';
import { themes } from '../../../shared/theme';
import { render } from 'lit-html';

export const LinkCSS = new TemplateFn<
	ConfigurableWebComponent<{ themes: typeof themes }>
>(
	function (html, _props, theme) {
		return html`<style>
			.link {
				color: ${theme.text.main};
			}

			.link:hover {
				color: ${theme.text.dark};
			}
		</style>`;
	},
	CHANGE_TYPE.NEVER,
	render
);
