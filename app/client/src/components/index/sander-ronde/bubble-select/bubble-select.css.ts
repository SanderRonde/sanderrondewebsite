import {
	JSXTemplater,
	TemplateRenderResult,
} from 'wc-lib/build/cjs/lib/template-fn';
import { BUBBLE_ANIMATION_DURATION } from '../bubble-select/bubble-select.js';
import { TRANSITION_TIME } from '../../../../styles/transition.js';
import { Theme } from '../../../../../../shared/theme.js';

const BUBBLE_SIZE = 45;
const BUBBLE_PADDING = 5 * 2;

export const BubbleSelectCSS = (
	html: JSXTemplater<TemplateRenderResult>,
	theme: Theme,
	numEntries: number
) => html`<style>
	.bubble, .highlighter {
		width: ${BUBBLE_SIZE}px;
		height: ${BUBBLE_SIZE}px;
		border-radius: 50%;
	}

	.bubble.active .highlighter {
		background-color: ${theme.highlight.main};
	}

	.bubble {
		padding: ${BUBBLE_PADDING / 2}px 0;
		cursor: pointer;
		transform: translateY(0);
		transition: transform 250ms ease-in-out;
	}

	.bubble:focus {
		outline: none;
	}

	.bubble.on-top {
		z-index: 100;
	}

	#positioner {
		transform: translateY(
			-${(numEntries - 1) * (BUBBLE_SIZE + BUBBLE_PADDING)}px
		);
		transition: transform ${BUBBLE_ANIMATION_DURATION}ms ease-in-out,
			background-color ${TRANSITION_TIME}ms ease-in-out,
			color ${TRANSITION_TIME}ms ease-in-out,
			fill ${TRANSITION_TIME}ms ease-in-out;
	}

	#positioner.expanded {
		transform: translateY(0);
	}

	${new Array(numEntries)
		.fill('')
		.map((_, index) => {
			return `.bubble.shift--${index + 1} {
				transform: translateY(-${(index + 1) * (BUBBLE_SIZE + BUBBLE_PADDING)}px);
			}`;
		})
		.join('\n')}

	${new Array(numEntries)
		.fill('')
		.map((_, index) => {
			return `.bubble.shift-${index + 1} {
				transform: translateY(${(index + 1) * (BUBBLE_SIZE + BUBBLE_PADDING)}px);
			}`;
		})
		.join('\n')}
</style>`;
