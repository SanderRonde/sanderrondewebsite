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

	SanderRonde.define();
}

registerComponents();

onIdle(() => {
	registerServiceworker();
});
