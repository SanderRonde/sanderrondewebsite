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
import { SanderRonde } from '../../components/index/sander-ronde/sander-ronde.js';
import { I18NGetMessage, LANGUAGE } from '../../../../i18n/i18n.js';
import { I18NReturner, getLang } from '../../shared/client-i18n.js';
import { registerServiceworker, onIdle } from '../../shared/sw.js';
import { I18NType } from '../../../../i18n/i18n-defs';
import { WebComponent } from 'wc-lib';

const en = require('../../i18n/locales/en.json');
const nl = require('../../i18n/locales/nl.json');

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
		defaultLang: getLang(),
		returner: I18NReturner,
		getMessage: I18NGetMessage,
		langFiles: {
			en,
			nl,
		} as {
			[key in LANGUAGE]: I18NType;
		},
	});

	SanderRonde.define();
}

registerComponents();

onIdle(() => {
	registerServiceworker();
});
