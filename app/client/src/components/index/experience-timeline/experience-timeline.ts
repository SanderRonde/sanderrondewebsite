import { IDMapType, ClassMapType } from './experience-timeline-querymap';
import { ExperienceTimelineHTML } from './experience-timeline.html.js';
import { JoinedTimeline } from '../joined-timeline/joined-timeline.js';
import { SingleTimeline } from '../single-timeline/single-timeline.js';
import { ExperienceTimelineCSS } from './experience-timeline.css.js';
import { ConfigurableWebComponent, config } from 'wc-lib';

@config({
	is: 'experience-timeline',
	css: ExperienceTimelineCSS,
	html: ExperienceTimelineHTML,
	dependencies: [SingleTimeline, JoinedTimeline],
})
export class ExperienceTimeline extends ConfigurableWebComponent<{
	selectors: {
		IDS: IDMapType;
		CLASSES: ClassMapType;
	};
}> {}
