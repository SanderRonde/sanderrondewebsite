import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { ElevatedCard } from './elevated-card.js';
import { render } from 'lit-html';

export const ElevatedCardHTML = new TemplateFn<ElevatedCard>(function (html) {
	return html`
		<div></div>
	`
}, CHANGE_TYPE.PROP, render);
