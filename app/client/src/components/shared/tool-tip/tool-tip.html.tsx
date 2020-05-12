import { ToolTip, TOGGLES, TOOLTIP_DIRECTION } from './tool-tip.js';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { render } from 'lit-html';

export const ToolTipHTML = new TemplateFn<ToolTip>(
	function (html, props) {
		return (
			<div id="container">
				<div id="content">
					<slot id="slot-content"></slot>
				</div>
				<div
					id="tooltip"
					class={[
						'fade-in',
						props.internalDirection,
						{
							'fade-down':
								props.internalDirection ===
								TOOLTIP_DIRECTION.TOP,
							[TOGGLES.EXPANDED]: props.expanded,
						},
					]}
				>
					<div id="tooltip-arrow"></div>
					<div id="tooltip-message">{props.message}</div>
				</div>
			</div>
		);
	},
	CHANGE_TYPE.PROP,
	render
);
