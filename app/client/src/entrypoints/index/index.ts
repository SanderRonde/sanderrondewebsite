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
import { getLang, I18NReturner, I18NGetMessage } from '../../i18n/i18n.js';
import { registerServiceworker, onIdle } from '../../shared/sw.js';
import { WebComponent } from 'wc-lib';

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
	});

	SanderRonde.define();
}

registerComponents();

onIdle(() => {
	registerServiceworker();
});
