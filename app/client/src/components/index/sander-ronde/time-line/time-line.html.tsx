import me, { LifeTimeline } from '../../../../config/me';
import { TimeLine, TIMELINE_SIDES, CSS_TOGGLES } from './time-line';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { render } from 'lit-html';
import {
	TimeLineEntry,
	TIMELINE_DIRECTION,
} from './time-line-entry/time-line-entry';
import { I18NKeys } from '../../../../../../i18n/i18n-keys';

interface YearGroup {
	years: number[];
	short: boolean;
	entries: LifeTimeline.Entry[];
}

function getRange(start: number, end: number, include: boolean = false) {
	return new Array(end + ~~include - start).fill(0).map((_, index) => {
		return index + start;
	});
}

function createYearGroups(sortedEntries: LifeTimeline.Entry[]) {
	const yearMap: Map<number, LifeTimeline.Entry[]> = new Map();
	for (const entry of sortedEntries) {
		if (!yearMap.has(entry.start.getFullYear())) {
			yearMap.set(entry.start.getFullYear(), []);
		}
		yearMap.get(entry.start.getFullYear())!.push(entry);
	}

	const groups: YearGroup[] = [];
	const yearMapEntries = [...yearMap.keys()].sort();
	const yearRange = getRange(
		yearMapEntries[0],
		yearMapEntries[yearMapEntries.length - 1],
		true
	);
	for (const year of yearRange) {
		const yearEntries = yearMap.get(year)!;
		if (yearEntries && yearEntries.length > 0) {
			// Has entries
			groups.push({
				years: [year],
				short: false,
				entries: yearEntries,
			});
		} else {
			// Empty year
			const lastYear = groups[groups.length - 1];

			// If the last year was short as well, add this
			if (lastYear.short) {
				lastYear.years.push(year);
				continue;
			}

			// If this is an empty year but the last one was not,
			// then we push it because we want to show the
			// year after the last non-empty year
			if (lastYear.entries.length !== 0) {
				groups.push({
					years: [year],
					short: false,
					entries: [],
				});
				continue;
			}

			const lastLastYear = groups[groups.length - 2];
			// If the last year was not short but had no entries
			// and the year before that was not short and had entries,
			// create a new entry
			if (!lastLastYear.short && lastLastYear.entries.length > 0) {
				groups.push({
					years: [year],
					short: true,
					entries: [],
				});
				continue;
			}
		}
	}

	return groups;
}

export const TimeLineHTML = new TemplateFn<TimeLine>(
	function (html, props) {
		const shouldRenderEntry = (
			entry: LifeTimeline.Entry,
			side:
				| TIMELINE_SIDES.EDUCATION_EMPLOYMENT_TRAINING
				| TIMELINE_SIDES.PERSONAL_PROJECT
		) => {
			const sideMatches =
				(side === TIMELINE_SIDES.EDUCATION_EMPLOYMENT_TRAINING) ===
				LifeTimeline.isEET(entry);
			if (props.sides === TIMELINE_SIDES.BOTH) return sideMatches;
			return props.sides === side && sideMatches;
		};

		const renderEntry = (
			entry: LifeTimeline.Entry,
			side:
				| TIMELINE_SIDES.EDUCATION_EMPLOYMENT_TRAINING
				| TIMELINE_SIDES.PERSONAL_PROJECT
		) => {
			const sideIsEET =
				side === TIMELINE_SIDES.EDUCATION_EMPLOYMENT_TRAINING;
			const classObj = {
				'eet-item': sideIsEET,
				'pproj-item': !sideIsEET,
				'timeline-row-item': true,
			};
			return (
				<div class={classObj}>
					{shouldRenderEntry(entry, side) && (
						<div class="timeline-row-aligner">
							<TimeLineEntry
								class="timeline-entry"
								direction={
									sideIsEET
										? TIMELINE_DIRECTION.LEFT
										: TIMELINE_DIRECTION.RIGHT
								}
								entry={entry}
								{...{
									'@@': {
										highlightdaterange: this
											.highlightDateRange,
										removehighlight: this.disableHighlight,
									},
								}}
							/>
							<div class="arrow-centerer">
								<div class="timeline-arrow" />
							</div>
						</div>
					)}
				</div>
			);
		};

		const renderTimelineRow = (
			entry: LifeTimeline.Entry,
			isHighlighted: boolean
		) => (
			<div class="timeline-row">
				{renderEntry(
					entry,
					TIMELINE_SIDES.EDUCATION_EMPLOYMENT_TRAINING
				)}
				<div
					class={[
						'center-line',
						{
							[CSS_TOGGLES.HIGHLIGHTED]: isHighlighted,
						},
					]}
				></div>
				{renderEntry(entry, TIMELINE_SIDES.PERSONAL_PROJECT)}
			</div>
		);

		const renderEmptyTimelineRow = (
			timeGroup: YearGroup,
			highlighted: boolean
		) => (
			<div class="timeline-row">
				<div />
				<div
					class={[
						'center-line',
						{
							[CSS_TOGGLES.HIGHLIGHTED]: highlighted,
						},
					]}
				>
					<div class="year-tag">
						{timeGroup.short ? '...' : timeGroup.years[0]}
					</div>
				</div>
				<div />
			</div>
		);

		const shouldHighlightYear = (
			year: number,
			timeStart: Date,
			timeEnd: Date
		) => {
			const startOfYear = new Date(year, 0, 1);
			return timeStart <= startOfYear && timeEnd >= startOfYear;
		};

		const sortedToLeastRecent = me.timeline
			.filter((entry) => {
				switch (props.sides) {
					case TIMELINE_SIDES.BOTH:
						return true;
					case TIMELINE_SIDES.EDUCATION_EMPLOYMENT_TRAINING:
						return LifeTimeline.isEET(entry);
					case TIMELINE_SIDES.PERSONAL_PROJECT:
						return LifeTimeline.isPProj(entry);
				}
			})
			.sort((entry1, entry2) => {
				return entry2.start.getTime() - entry1.start.getTime();
			});

		const timeGroups = createYearGroups(sortedToLeastRecent);

		return (
			<div
				id="timeline-root"
				class={[
					'horizontal-centerer',
					'fill-x',
					{
						[CSS_TOGGLES.HIGHLIGHTED]: !!this.props
							.highlightedRange,
					},
				]}
			>
				<div id="timeline-table">
					<div class="timeline-row">
						<div class="top-row-entry" />
						<div class="center-line center-line-header">
							<div class="header">
								{(() => {
									switch (props.sides) {
										case TIMELINE_SIDES.BOTH:
											return this.__(
												I18NKeys.index.timeline
													.timelineHeader.header
											);
										case TIMELINE_SIDES.EDUCATION_EMPLOYMENT_TRAINING:
											return this.__(
												I18NKeys.index.timeline
													.timelineHeader.eet
											);
										case TIMELINE_SIDES.PERSONAL_PROJECT:
											return this.__(
												I18NKeys.index.timeline
													.timelineHeader.pproj
											);
									}
								})()}
							</div>
						</div>
						<div class="top-row-entry" />
					</div>
					{timeGroups.reverse().map((timeGroup) => {
						const yearHighlighted = (() => {
							if (!props.highlightedRange) return false;
							const [
								highlightStart,
								highlightEnd,
							] = props.highlightedRange;
							return shouldHighlightYear(
								timeGroup.years[0],
								highlightStart,
								highlightEnd
							);
						})();
						return [
							...timeGroup.entries.map((entry) => {
								const isHighlighted = (() => {
									if (!props.highlightedRange) return false;
									const [
										highlightStart,
										highlightEnd,
									] = props.highlightedRange;
									if (
										highlightStart.getTime() >
										entry.start.getTime()
									)
										return false;

									return (
										entry.start.getTime() <=
										highlightEnd.getTime()
									);
								})();
								return renderTimelineRow(entry, isHighlighted);
							}),
							renderEmptyTimelineRow(timeGroup, yearHighlighted),
						];
					})}
				</div>
			</div>
		);
	},
	CHANGE_TYPE.PROP | CHANGE_TYPE.LANG,
	render
);
