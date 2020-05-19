import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { TimeLine } from './time-line';
import { render } from 'lit-html';

export const TimeLineHTML = new TemplateFn<TimeLine>(
	function (html) {
		return <div class="horizontal-centerer fill-x">Text</div>;
	},
	CHANGE_TYPE.PROP,
	render
);
