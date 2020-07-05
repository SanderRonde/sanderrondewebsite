import {
	TemplateResult,
	PropertyCommitter,
	EventPart,
	BooleanAttributePart,
	AttributeCommitter,
	NodePart,
	isDirective,
	noChange,
} from 'lit-html';
import {
	THEME,
	themes,
	DEFAULT_THEME,
	THEME_COOKIE_NAME,
} from '../../../../shared/theme';
import {
	I18NGetMessage,
	LANGUAGE,
	DEFAULT_LANG,
	LANG_COOKIE_NAME,
} from '../../../../i18n/i18n';
import { SanderRonde } from '../../components/index/sander-ronde/';
import { registerServiceworker, onIdle } from '../../shared/sw';
import { I18NReturner } from '../../shared/client-i18n';
import { I18NType } from '../../../../i18n/i18n-defs';
import { getCookie } from '../../shared/cookies';
import { WebComponent } from 'wc-lib';

import en from '../../../../i18n/locales/en.json.js';
import nl from '../../../../i18n/locales/nl.json.js';

function registerComponents() {
	WebComponent.initComplexTemplateProvider({
		TemplateResult,
		PropertyCommitter,
		EventPart,
		BooleanAttributePart,
		AttributeCommitter,
		NodePart,
		isDirective,
		noChange,
	});
	WebComponent.initI18N({
		urlFormat: '/i18n/locales/$LANG$.json',
		defaultLang: getCookie(LANG_COOKIE_NAME, DEFAULT_LANG),
		returner: I18NReturner,
		getMessage: I18NGetMessage,
		langFiles: {
			en,
			nl,
		} as {
			[key in LANGUAGE]: I18NType;
		},
	});
	WebComponent.initTheme({
		theme: themes,
		defaultTheme: getCookie(THEME_COOKIE_NAME, DEFAULT_THEME) as THEME,
	});

	SanderRonde.define();
}

registerComponents();

onIdle(() => {
	registerServiceworker();
});
