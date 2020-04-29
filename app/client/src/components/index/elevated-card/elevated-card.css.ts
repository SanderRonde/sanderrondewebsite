import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { ElevatedCard } from './elevated-card.js';
import { render } from 'lit-html';

export const ElevatedCardCSS = new TemplateFn<ElevatedCard>(function (html) {
	return html`<style>
		
	</style>`
}, CHANGE_TYPE.THEME, render);
