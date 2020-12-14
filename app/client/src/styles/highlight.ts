import { IndexBase } from '../components/index/base';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { render } from 'lit-html';

export const HighlightCSS = new TemplateFn<IndexBase<{}>>(
	function (html, { theme }) {
		return html`<style>
			::selection {
				background: ${theme.highlight.dark};
				color: ${theme.text.highlighted};
			}
		</style>`;
	},
	CHANGE_TYPE.THEME,
	render
);
