import { THEME_SHADE } from '../../../../../shared/theme.js';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { SanderRonde } from './sander-ronde.js';
import { html, render } from 'lit-html';

const MIN_JOINED_TIMELINE_WIDTH = 800;

export const SanderRondeHTML = new TemplateFn<SanderRonde>(
	function () {
		let alternator: boolean = false;
		function alternate() {
			alternator = !alternator;
			return alternator;
		}

		return html`
			<div id="scroller">
				<!-- TODO: remove invisibility when done with timeline development -->
				<background-block
					id="name-background"
					fill
					style="display: none;"
					shade="${alternate()
						? THEME_SHADE.LIGHT
						: THEME_SHADE.REGULAR}"
				>
					<name-block id="name-block"></name-block>
				</background-block>
				<background-block
					id="info-background"
					shade="${alternate()
						? THEME_SHADE.LIGHT
						: THEME_SHADE.REGULAR}"
				></background-block>
				${window.innerWidth < MIN_JOINED_TIMELINE_WIDTH
					? html`
							<background-block
								id="eet-background"
								shade="${alternate()
									? THEME_SHADE.LIGHT
									: THEME_SHADE.REGULAR}"
							></background-block>
							<background-block
								id="projects-background"
								shade="${alternate()
									? THEME_SHADE.LIGHT
									: THEME_SHADE.REGULAR}"
							></background-block>
					  `
					: html`
							<background-block
								id="joined-timeline-background"
								shade="${alternate()
									? THEME_SHADE.LIGHT
									: THEME_SHADE.REGULAR}"
							></background-block>
					  `}
			</div>
		`;
	},
	CHANGE_TYPE.NEVER,
	render
);
