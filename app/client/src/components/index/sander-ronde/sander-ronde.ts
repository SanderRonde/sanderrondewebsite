import {
	ConfigurableWebComponent,
	config,
	TemplateFn,
	CHANGE_TYPE,
} from 'wc-lib';
import { LANGUAGE } from '../../../../../i18n/i18n';
import { I18NType } from '../../../../../i18n/i18n-defs';
import { I18NKeys } from '../../../../../i18n/i18n-keys';
import { render, html } from 'lit-html';

@config({
	is: 'sander-ronde',
	html: new TemplateFn<SanderRonde>(
		function () {
			return html`<div>${this.__(I18NKeys.index.hi)}</div> `;
		},
		CHANGE_TYPE.NEVER,
		render
	),
	css: null,
})
export class SanderRonde extends ConfigurableWebComponent<{
	langs: LANGUAGE;
	i18n: I18NType;
}> {}
