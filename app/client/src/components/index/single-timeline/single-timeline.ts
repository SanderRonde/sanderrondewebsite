import { ConfigurableWebComponent, Props, config } from 'wc-lib';
import { IDMapType, ClassMapType } from './single-timeline-querymap';
import { SingleTimelineHTML } from './single-timeline.html.js';
import { SingleTimelineCSS } from './single-timeline.css.js';
import { I18NType } from '../../../../../i18n/i18n-defs';
import { themes } from '../../../../../shared/theme';
import { LANGUAGE } from '../../../../../i18n/i18n';

@config({
	is: 'single-timeline',
	css: SingleTimelineCSS,
	html: SingleTimelineHTML
})
export class SingleTimeline extends ConfigurableWebComponent<{
	selectors: {
		IDS: IDMapType;
		CLASSES: ClassMapType;
	};
	langs: LANGUAGE;
	i18n: I18NType;
	themes: typeof themes;
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