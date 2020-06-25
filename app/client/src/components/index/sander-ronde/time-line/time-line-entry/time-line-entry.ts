import { IDMapType, ClassMapType } from './time-line-entry-querymap';
import { SkillRow } from '../../info-block/skill-row/skill-row';
import { Props, config, ComplexType, PROP_TYPE } from 'wc-lib';
import { TimeLineEntryHTML } from './time-line-entry.html.js';
import { TimeLineEntryCSS } from './time-line-entry.css.js';
import { LifeTimeline } from '../../../../../config/me';
import { LinkCSS } from '../../../../../styles/link';
import { ElevatedCard } from '../../../../shared/';
import { IndexBase } from '../../../base';

export const enum TIMELINE_DIRECTION {
	LEFT = 'left',
	RIGHT = 'right',
}

@config({
	is: 'time-line-entry',
	css: [TimeLineEntryCSS, LinkCSS],
	html: TimeLineEntryHTML,
	dependencies: [SkillRow, ElevatedCard],
})
export class TimeLineEntry extends IndexBase<{
	selectors: {
		IDS: IDMapType;
		CLASSES: ClassMapType;
	};
	events?: {
		highlightdaterange: {
			args: [
				{
					start: Date;
					end: Date;
				}
			];
		};
		removehighlight: {
			args: [];
		};
	};
}> {
	props = Props.define(this, {
		reflect: {
			entry: {
				type: ComplexType<LifeTimeline.Entry>(),
				value: null,
				watch: false,
				required: true,
			},
			direction: {
				type: PROP_TYPE.STRING,
				required: true,
			},
		},
	});

	dateEnter() {
		this.fire('highlightdaterange', {
			start: this.props.entry.start,
			end:
				this.props.entry.end && this.props.entry.end instanceof Date
					? this.props.entry.end
					: this.props.entry.type ===
					  LifeTimeline.TYPE.PERSONAL_PROJECT
					? this.props.entry.start
					: new Date(),
		});
	}

	dateLeave() {
		this.fire('removehighlight');
	}
}
