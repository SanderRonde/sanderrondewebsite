import { ExperienceTimeline } from './experience-timeline.js';
import { TemplateFn, CHANGE_TYPE, css } from 'wc-lib';
import { render } from 'lit-html';

export const ExperienceTimelineCSS = new TemplateFn<ExperienceTimeline>(
	function (html) {
		return html`<style>
			${css(this).$.container} {
				display: flex;
				flex-direction: column;
			}
		</style>`;
	},
	CHANGE_TYPE.NEVER,
	render
);
