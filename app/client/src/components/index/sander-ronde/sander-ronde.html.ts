import { THEME_SHADE } from '../../../../../shared/theme.js';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { SanderRonde } from './sander-ronde.js';
import { html, render } from 'lit-html';

export const SanderRondeHTML = new TemplateFn<SanderRonde>(
	function () {
		return html`
			<div id="scroller">
				<background-block></background-block>
				<background-block
					shade="${THEME_SHADE.LIGHT}"
				></background-block>
			</div>
		`;
	},
	CHANGE_TYPE.NEVER,
	render
);
