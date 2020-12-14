import { TemplateFn, CHANGE_TYPE, ConfigurableWebComponent } from 'wc-lib';
import { themes } from '../../../shared/theme';
import { render } from 'lit-html';

export const LinkCSS = new TemplateFn<
	ConfigurableWebComponent<{ themes: typeof themes }>
>(
	function (html, { theme }) {
		return html`<style>
			.link {
				color: ${theme.text.main};
				fill: ${theme.text.main};
			}

			.link.light {
				color: ${theme.text.light};
				fill: ${theme.text.light};
			}

			.link.color {
				color: ${theme.highlight.main};
				fill: ${theme.highlight.main};
			}

			.link:hover {
				color: ${theme.text.dark};
				fill: ${theme.text.dark};
			}

			.link.color:hover {
				color: ${theme.highlight.dark};
				fill: ${theme.highlight.dark};
			}
		</style>`;
	},
	CHANGE_TYPE.THEME,
	render
);
