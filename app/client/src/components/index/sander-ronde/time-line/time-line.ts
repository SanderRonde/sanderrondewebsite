import { IDMapType, ClassMapType, SelectorMapType } from './time-line-querymap';
import { Props, config, PROP_TYPE, ComplexType } from 'wc-lib';
import { TransitionCSS } from '../../../../styles/transition';
import { THEME_SHADE } from '../../../../../../shared/theme';
import { CenterersCSS } from '../../../../styles/centerers';
import { HighlightCSS } from '../../../../styles/highlight';
import { TimeLineEntry } from './time-line-entry/';
import { TimeLineHTML } from './time-line.html';
import { TimeLineCSS } from './time-line.css';
import { SanderRonde } from '../sander-ronde';
import { IndexBase } from '../../base';

export const enum TIMELINE_SIDES {
	EDUCATION_EMPLOYMENT_TRAINING = 1,
	PERSONAL_PROJECT = 2,
	BOTH = 3,
}

export const enum CSS_TOGGLES {
	HIGHLIGHTED = 'higlighted',
}

@config({
	is: 'time-line',
	css: [TimeLineCSS, CenterersCSS, HighlightCSS, TransitionCSS],
	html: TimeLineHTML,
	dependencies: [TimeLineEntry],
})
export class TimeLine extends IndexBase<{
	selectors: {
		IDS: IDMapType;
		CLASSES: ClassMapType & {
			'timeline-row-item': HTMLDivElement;
			'eet-item': HTMLDivElement;
			'pproj-item': HTMLDivElement;
		};
		TOGGLES: CSS_TOGGLES;
		SELECTORS: SelectorMapType;
	};
	parent: SanderRonde;
}> {
	props = Props.define(this, {
		reflect: {
			sides: {
				type: PROP_TYPE.NUMBER,
				exactType: 0 as TIMELINE_SIDES,
				value: TIMELINE_SIDES.BOTH,
				required: true,
			},
			shade: {
				type: PROP_TYPE.STRING,
				exactType: '' as THEME_SHADE,
				value: THEME_SHADE.REGULAR,
			},
		},
		priv: {
			highlightedRange: {
				type: ComplexType<[Date, Date] | null>(),
				value: null,
			},
		},
	});

	highlightDateRange(range: { start: Date; end: Date }) {
		this.props.highlightedRange = [range.start, range.end];
	}

	disableHighlight() {
		this.props.highlightedRange = null;
	}
}
