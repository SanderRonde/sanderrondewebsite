import { ConfigurableWebComponent, Props, config } from 'wc-lib';
import { IDMapType, ClassMapType } from './joined-timeline-querymap';
import { JoinedTimelineHTML } from './joined-timeline.html.js';
import { JoinedTimelineCSS } from './joined-timeline.css.js';
import { CenterersCSS } from '../../../../styles/centerers.js';
import { I18NType } from '../../../../../../i18n/i18n-defs';
import { themes } from '../../../../../../shared/theme';
import { LANGUAGE } from '../../../../../../i18n/i18n';

@config({
	is: 'joined-timeline',
	css: [JoinedTimelineCSS, CenterersCSS],
	html: JoinedTimelineHTML,
})
export class JoinedTimeline extends ConfigurableWebComponent<{
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
