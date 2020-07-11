import { BubbleSelect, BUBBLE_SELECT_TOGGLES } from './bubble-select.js';
import {
	JSXTemplater,
	TemplateRenderResult,
} from 'wc-lib/build/cjs/lib/template-fn';

export const BubbleSelectHTML = function <B>(
	html: JSXTemplater<TemplateRenderResult>,
	component: BubbleSelect<B, {}, {}, {}>,
	items: B[],
	renderBubble: (itemName: B) => TemplateRenderResult
) {
	const current = component.current;
	const initial = component.initial;

	const orderedMap = [
		...items.filter((themeName) => themeName !== initial),
		items.find((themeName) => themeName === initial)!,
	];

	return (
		<div id="container">
			<div
				id="positioner"
				class={{
					[BUBBLE_SELECT_TOGGLES.EXPANDED]: component.props.expanded,
				}}
			>
				{orderedMap.map((bubbleName) => {
					return (
						<div
							class={[
								'bubble',
								{
									[BUBBLE_SELECT_TOGGLES.ACTIVE]:
										current === bubbleName,
								},
							]}
							{...{
								tabindex: 0,
								'@': {
									focus: () => {
										component.setActiveBubble(bubbleName);
									},
									blur: () => {
										component.setActiveBubble(
											component.current
										);
									},
									keydown: (e) => {
										if (
											e.code === 'Enter' ||
											e.code === 'Space'
										) {
											component.bubbleSelect(bubbleName);
										}
									},
								},
							}}
						>
							<div
								class="highlighter"
								{...{
									'@': {
										click: () =>
											component.bubbleSelect(bubbleName),
										mouseenter: () =>
											component.previewBubble(bubbleName),
										mouseleave: () =>
											component.endPreviewBubble(),
									},
								}}
							>
								{renderBubble(bubbleName)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
