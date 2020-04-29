import { ConfigurableWebComponent, Props, config } from 'wc-lib';
import { IDMapType, ClassMapType } from './single-timeline-querymap';
import { SingleTimelineHTML } from './single-timeline.html.js';
import { SingleTimelineCSS } from './single-timeline.css.js';

@config({
	is: 'single-timeline',
	css: SingleTimelineCSS,
	html: SingleTimelineHTML
})
export class SingleTimeline extends ConfigurableWebComponent<{
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