import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { ElevatedCard } from './elevated-card';
import { render } from 'lit-html';

export const ElevatedCardHTML = new TemplateFn<ElevatedCard>(
	function (html) {
		return (
			<div id="shadow" class="transition">
				<slot id="slot"></slot>
			</div>
		);
	},
	CHANGE_TYPE.NEVER,
	render
);
