import { BackgroundBlock } from './background-block.js';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { render } from 'lit-html';

export const BackgroundBlockHTML = new TemplateFn<BackgroundBlock>(
	function (html) {
		return html`
			<div id="block">
				<slot></slot>
			</div>
		`;
	},
	CHANGE_TYPE.PROP,
	render
);
