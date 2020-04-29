import { ExperienceTimeline } from './experience-timeline.js';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { render } from 'lit-html';

const MIN_JOINED_TIMELINE_WIDTH = 800;

export const ExperienceTimelineHTML = new TemplateFn<ExperienceTimeline>(
	function (html) {
		return html`
			<div id="container">
				${window.innerWidth < MIN_JOINED_TIMELINE_WIDTH
					? html`
							<single-timeline
								id="eet-timeline"
							></single-timeline>
							<single-timeline
								id="projects-timeline"
							></single-timeline>
					  `
					: html`
							<joined-timeline
								id="joined-timeline"
							></joined-timeline>
					  `}
			</div>
		`;
	},
	CHANGE_TYPE.NEVER,
	render
);
