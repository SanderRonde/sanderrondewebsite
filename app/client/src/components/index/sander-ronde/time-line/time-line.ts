import { ConfigurableWebComponent, Props, config } from 'wc-lib';
import { IDMapType, ClassMapType } from './time-line-querymap';
import { CenterersCSS } from '../../../../styles/centerers.js';
import { I18NType } from '../../../../../../i18n/i18n-defs';
import { themes } from '../../../../../../shared/theme';
import { LANGUAGE } from '../../../../../../i18n/i18n';
import { TimeLineHTML } from './time-line.html.js';
import { TimeLineCSS } from './time-line.css.js';

@config({
	is: 'time-line',
	css: [TimeLineCSS, CenterersCSS],
	html: TimeLineHTML,
})
export class TimeLine extends ConfigurableWebComponent<{
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
