import { BackgroundBlock } from '../../shared/background-block/background-block';
import { TimeLine, TIMELINE_SIDES } from './time-line/time-line';
import { THEME_SHADE } from '../../../../../shared/theme';
import { ThemeSelect } from './theme-select/theme-select';
import { InfoBlock } from './info-block/info-block';
import { NameBlock } from './name-block/name-block';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { SanderRonde } from './sander-ronde';
import { LangSelect } from './lang-select/';
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
			<div id="container">
				<LangSelect />
				<ThemeSelect />
				<div id="scroller">
					<BackgroundBlock
						id="name-background"
						fill
						shade={
							alternate()
								? THEME_SHADE.LIGHT
								: THEME_SHADE.REGULAR
						}
						padding={false}
					>
						<NameBlock id="name-block" />
					</BackgroundBlock>
					<BackgroundBlock
						id="info-background"
						shade={
							alternate()
								? THEME_SHADE.LIGHT
								: THEME_SHADE.REGULAR
						}
					>
						<InfoBlock id="info-block" />
					</BackgroundBlock>
					{window.innerWidth < MIN_JOINED_TIMELINE_WIDTH ? (
						<span>
							{(() => {
								const shade = alternate()
									? THEME_SHADE.LIGHT
									: THEME_SHADE.REGULAR;
								return (
									<BackgroundBlock
										id="eet-background"
										shade={shade}
									>
										<TimeLine
											sides={
												TIMELINE_SIDES.EDUCATION_EMPLOYMENT_TRAINING
											}
											id="eet-timeline"
											shade={shade}
										/>
									</BackgroundBlock>
								);
							})()}
							{(() => {
								const shade = alternate()
									? THEME_SHADE.LIGHT
									: THEME_SHADE.REGULAR;
								return (
									<BackgroundBlock
										id="projects-background"
										shade={shade}
									>
										<TimeLine
											sides={
												TIMELINE_SIDES.PERSONAL_PROJECT
											}
											id="projects-timeline"
											shade={shade}
										/>
									</BackgroundBlock>
								);
							})()}
						</span>
					) : (
						(() => {
							const shade = alternate()
								? THEME_SHADE.LIGHT
								: THEME_SHADE.REGULAR;
							return (
								<BackgroundBlock
									id="joined-timeline-background"
									shade={shade}
								>
									<TimeLine
										sides={TIMELINE_SIDES.BOTH}
										id="joined-timeline"
										shade={shade}
									/>
								</BackgroundBlock>
							);
						})()
					)}
				</div>
			</div>
		);
	},
	CHANGE_TYPE.PROP,
	render
);
