import { IndexBase } from '../components/index/base';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { render } from 'lit-html';

export const HighlightCSS = new TemplateFn<IndexBase<{}>>(
	function (html, _props, theme) {
		return html`<style>
			::selection {
				background: ${theme.secondary.dark};
				color: ${theme.text.light};
			}
		</style>`;
	},
	CHANGE_TYPE.THEME,
	render
);