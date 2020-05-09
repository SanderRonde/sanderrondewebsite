import { JoinedTimeline } from './joined-timeline.js';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { render } from 'lit-html';

export const JoinedTimelineHTML = new TemplateFn<JoinedTimeline>(
	function (html) {
		return html` <div class="horizontal-centerer fill-x">Text</div> `;
	},
	CHANGE_TYPE.PROP,
	render
);
