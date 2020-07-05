import {
	BUBBLE_ANIMATION_DURATION,
	BubbleSelect,
} from '../bubble-select/bubble-select.js';
import {
	JSXTemplater,
	TemplateRenderResult,
} from 'wc-lib/build/cjs/lib/template-fn';
import { Theme } from '../../../../../../shared/theme.js';
import { css } from 'wc-lib';

const BUBBLE_SIZE = 45;
const BUBBLE_PADDING = 5 * 2;

export const BubbleSelectCSS = (
	html: JSXTemplater<TemplateRenderResult>,
	component: BubbleSelect<{}, {}, {}, {}>,
	theme: Theme,
	numEntries: number
) => html`<style>
	${css(component).c.bubble.or.c.highlighter} {
		width: ${BUBBLE_SIZE}px;
		height: ${BUBBLE_SIZE}px;
		border-radius: 50%;
	}

	${css(component).c.bubble.toggle.active.descendant.c.highlighter} {
		background-color: ${theme.highlight.main};
	}

	${css(component).c.bubble} {
		padding: ${BUBBLE_PADDING / 2}px 0;
		cursor: pointer;
		transform: translateY(0);
		transition: transform 250ms ease-in-out;
	}

	${css(component).c.bubble.toggle['on-top']} {
		z-index: 100;
	}

	${css(component).$.positioner} {
		transform: translateY(
			-${(numEntries - 1) * (BUBBLE_SIZE + BUBBLE_PADDING)}px
		);
		transition: transform ${BUBBLE_ANIMATION_DURATION}ms ease-in-out;
	}

	${css(component).$.positioner.toggle.expanded} {
		transform: translateY(0);
	}

	${new Array(numEntries)
		.fill('')
		.map((_, index) => {
			return `${
				(css(component).c.bubble.and as any)[`shift--${index + 1}`]
			} {
						transform: translateY(-${(index + 1) * (BUBBLE_SIZE + BUBBLE_PADDING)}px);
				}`;
		})
		.join('\n')}

	${new Array(numEntries)
		.fill('')
		.map((_, index) => {
			return `${
				(css(component).c.bubble.and as any)[`shift-${index + 1}`]
			} {
						transform: translateY(${(index + 1) * (BUBBLE_SIZE + BUBBLE_PADDING)}px);
				}`;
		})
		.join('\n')}
</style>`;
