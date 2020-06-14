import { BackgroundBlock } from '../../shared/background-block/background-block';
import { THEME_SHADE } from '../../../../../shared/theme';
import { InfoBlock } from './info-block/info-block';
import { NameBlock } from './name-block/name-block';
import { TimeLine } from './time-line/time-line';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { SanderRonde } from './sander-ronde';
import { render } from 'lit-html';

const MIN_JOINED_TIMELINE_WIDTH = 800;

export const SanderRondeHTML = new TemplateFn<SanderRonde>(
	function (html) {
		let alternator: boolean = false;
		function alternate() {
			alternator = !alternator;
			return alternator;
		}

		return (
			<div id="scroller">
				<BackgroundBlock
					id="name-background"
					fill
					shade={
						alternate() ? THEME_SHADE.LIGHT : THEME_SHADE.REGULAR
					}
					padding={false}
				>
					<NameBlock id="name-block" {...{ '#parent': this }} />
				</BackgroundBlock>
				<BackgroundBlock
					id="info-background"
					shade={
						alternate() ? THEME_SHADE.LIGHT : THEME_SHADE.REGULAR
					}
				>
					<InfoBlock id="info-block" />
				</BackgroundBlock>
				{window.innerWidth < MIN_JOINED_TIMELINE_WIDTH ? (
					<span>
						<BackgroundBlock
							id="eet-background"
							shade={
								alternate()
									? THEME_SHADE.LIGHT
									: THEME_SHADE.REGULAR
							}
						>
							<TimeLine id="eet-timeline" />
						</BackgroundBlock>
						<BackgroundBlock
							id="projects-background"
							shade={
								alternate()
									? THEME_SHADE.LIGHT
									: THEME_SHADE.REGULAR
							}
						>
							<TimeLine id="projects-timeline" />
						</BackgroundBlock>
					</span>
				) : (
					<BackgroundBlock
						id="joined-timeline-background"
						shade={
							alternate()
								? THEME_SHADE.LIGHT
								: THEME_SHADE.REGULAR
						}
					>
						<TimeLine id="joined-timeline" />
					</BackgroundBlock>
				)}
			</div>
		);
	},
	CHANGE_TYPE.NEVER,
	render
);
