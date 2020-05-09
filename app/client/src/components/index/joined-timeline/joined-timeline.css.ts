import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { JoinedTimeline } from './joined-timeline.js';
import { render } from 'lit-html';

export const JoinedTimelineCSS = new TemplateFn<JoinedTimeline>(
	function (html) {
		return html`<style></style>`;
	},
	CHANGE_TYPE.THEME,
	render
);
