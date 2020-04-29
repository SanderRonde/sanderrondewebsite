import { SingleTimeline } from './single-timeline.js';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { render } from 'lit-html';

export const SingleTimelineHTML = new TemplateFn<SingleTimeline>(function (html) {
	return html`
		<div></div>
	`
}, CHANGE_TYPE.PROP, render);
