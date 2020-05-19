import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { TimeLine } from './time-line';
import { render } from 'lit-html';

export const TimeLineCSS = new TemplateFn<TimeLine>(
	function (html) {
		return html`<style></style>`;
	},
	CHANGE_TYPE.THEME,
	render
);
