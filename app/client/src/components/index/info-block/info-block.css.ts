import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { InfoBlock } from './info-block.js';
import { render } from 'lit-html';

export const InfoBlockCSS = new TemplateFn<InfoBlock>(function (html) {
	return html`<style>
		
	</style>`
}, CHANGE_TYPE.THEME, render);
