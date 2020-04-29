import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { SingleTimeline } from './single-timeline.js';
import { render } from 'lit-html';

export const SingleTimelineCSS = new TemplateFn<SingleTimeline>(function (html) {
	return html`<style>
		
	</style>`
}, CHANGE_TYPE.THEME, render);
