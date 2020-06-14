import { Props, config, PROP_TYPE } from 'wc-lib';
import { IDMapType, ClassMapType } from './time-line-querymap';
import { CenterersCSS } from '../../../../styles/centerers';
import { TimeLineHTML } from './time-line.html';
import { TimeLineCSS } from './time-line.css';
import { IndexBase } from '../../base';

@config({
	is: 'time-line',
	css: [TimeLineCSS, CenterersCSS],
	html: TimeLineHTML,
})
export class TimeLine extends IndexBase<{
	selectors: {
		IDS: IDMapType;
		CLASSES: ClassMapType;
	};
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
