import { TemplateFn, CHANGE_TYPE, ConfigurableWebComponent } from 'wc-lib';
import { themes } from '../../../shared/theme';
import { render } from 'lit-html';

const TRANSITION_TIME = 200;

export const TransitionCSS = new TemplateFn<
	ConfigurableWebComponent<{ themes: typeof themes }>
>(
	function (html) {
		return html`<style>
			* {
				transition: background-color ${TRANSITION_TIME}ms ease-in-out,
					color ${TRANSITION_TIME}ms ease-in-out,
					fill ${TRANSITION_TIME}ms ease-in-out;
			}
		</style>`;
	},
	CHANGE_TYPE.NEVER,
	render
);
