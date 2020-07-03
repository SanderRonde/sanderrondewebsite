import { IDMapType, ClassMapType } from './time-line-entry-querymap';
import { ReusableAnimation } from '../../../../../../../shared/util';
import { SkillRow } from '../../info-block/skill-row/skill-row';
import { HighlightCSS } from '../../../../../styles/highlight';
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

export const enum TIMELINE_ENTRY_TOGGLES {
	EXPANDED = 'expanded',
	PINNED = 'pinned',
}

const ANIMATION_DURATION = 350;

@config({
	is: 'time-line-entry',
	css: [TimeLineEntryCSS, LinkCSS, HighlightCSS],
	html: TimeLineEntryHTML,
	dependencies: [SkillRow, ElevatedCard],
})
export class TimeLineEntry extends IndexBase<{
	selectors: {
		IDS: IDMapType;
		CLASSES: ClassMapType;
		TOGGLES: TIMELINE_ENTRY_TOGGLES;
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
				exactType: '' as TIMELINE_DIRECTION,
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

	private _animations: ReusableAnimation[] | null = null;
	private _animateCard(
		direction: 'forwards' | 'backwards',
		onFinish?: () => void
	) {
		if (this._animations) {
			this._animations.forEach((a) => a.run(direction, onFinish));
		} else {
			const targetWidth = this.$['overflow-container'].scrollWidth;
			const titleWidth = this.$['title'].scrollWidth + 10;
			const textAnimationDuration =
				(titleWidth / targetWidth) * ANIMATION_DURATION;
			this._animations = [
				new ReusableAnimation(
					this.$['overflow-container'].animate(
						[
							{
								height: 0,
								width: 0,
							},
							{
								height: `${this.$['overflow-container'].scrollHeight}px`,
								width: `${targetWidth}px`,
							},
						],
						{
							duration: ANIMATION_DURATION,
							easing: 'linear',
							fill: 'both',
							direction:
								direction === 'forwards' ? 'normal' : 'reverse',
						}
					),
					direction,
					onFinish
				),
				...(this.props.direction === TIMELINE_DIRECTION.LEFT
					? [
							new ReusableAnimation(
								this.$['overflow-container'].animate(
									[
										{
											marginLeft: `${titleWidth}px`,
										},
										{
											marginLeft: 0,
										},
									],
									{
										endDelay:
											ANIMATION_DURATION -
											textAnimationDuration,
										duration: textAnimationDuration,
										easing: 'linear',
										fill: 'both',
										direction:
											direction === 'forwards'
												? 'normal'
												: 'reverse',
									}
								),
								direction,
								onFinish
							),
							new ReusableAnimation(
								this.$['detail-row'].animate(
									[
										{
											transform: `translateX(-${targetWidth}px)`,
										},
										{
											transform: 'translateX(0)',
										},
									],
									{
										duration: ANIMATION_DURATION,
										easing: 'linear',
										fill: 'both',
										direction:
											direction === 'forwards'
												? 'normal'
												: 'reverse',
									}
								),
								direction,
								onFinish
							),
					  ]
					: []),
			];
		}
	}

	private _pinned: boolean = false;
	private _expanded: boolean = false;
	private _animating: boolean = false;
	cardEnter() {
		if (!this._animating && this._expanded) return;
		this._animating = true;
		this._animateCard('forwards', () => {
			this.$.card.classList.add(TIMELINE_ENTRY_TOGGLES.EXPANDED);
			this._expanded = true;
			this._animating = false;
		});
	}

	cardLeave() {
		if (this._pinned || (!this._animating && !this._expanded)) return;
		this._animating = true;
		this._animateCard('backwards', () => {
			this.$.card.classList.remove(TIMELINE_ENTRY_TOGGLES.EXPANDED);
			this._expanded = false;
			this._animating = false;
		});
	}

	cardClick() {
		this._pinned = !this._pinned;
		this.$.card.classList.toggle(
			TIMELINE_ENTRY_TOGGLES.PINNED,
			this._pinned
		);
		if (this._pinned) {
			this.cardEnter();
		} else {
			this.cardLeave();
		}
	}
}
