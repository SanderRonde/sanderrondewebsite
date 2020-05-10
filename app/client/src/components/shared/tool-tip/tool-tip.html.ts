import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { ToolTip, TOGGLES } from './tool-tip.js';
import { render } from 'lit-html';

export const ToolTipHTML = new TemplateFn<ToolTip>(
	function (html, props) {
		return html`
			<div id="container">
				<div id="content">
					<slot id="slot-content"></slot>
				</div>
				<div
					id="tooltip"
					class=${[
						'fade-in',
						{
							[TOGGLES.EXPANDED]: props.expanded,
						},
					]}
				>
					<div id="tooltip-arrow"></div>
					<div id="tooltip-message">${props.message}</div>
				</div>
			</div>
		`;
	},
	CHANGE_TYPE.PROP,
	render
);
