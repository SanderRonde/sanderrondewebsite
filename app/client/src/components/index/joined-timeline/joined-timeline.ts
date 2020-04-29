import { ConfigurableWebComponent, Props, config } from 'wc-lib';
import { IDMapType, ClassMapType } from './joined-timeline-querymap';
import { JoinedTimelineHTML } from './joined-timeline.html.js';
import { JoinedTimelineCSS } from './joined-timeline.css.js';

@config({
	is: 'joined-timeline',
	css: JoinedTimelineCSS,
	html: JoinedTimelineHTML
})
export class JoinedTimeline extends ConfigurableWebComponent<{
	selectors: {
		IDS: IDMapType;
		CLASSES: ClassMapType;
	}
}> {
	props = Props.define(this, {
		// ...
	});

	mounted() {
		// ...
	}

	firstRender() {
		// ...
	}
}