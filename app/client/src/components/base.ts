import {
	ConfigurableWebComponent,
	EventListenerObj,
	SelectorMap,
} from 'wc-lib';
import { I18NType } from '../../../i18n/i18n-defs';
import { themes } from '../../../shared/theme';
import { LANGUAGE } from '../../../i18n/i18n';

export class ComponentBase<
	GA extends {
		events?: EventListenerObj;
		selectors?: SelectorMap;
		parent?: any;
		root?: any;
	} = {}
> extends ConfigurableWebComponent<{
	langs: LANGUAGE;
	i18n: I18NType;
	themes: typeof themes;
	root: GA['root'];
	events: GA['events'];
	selectors: GA['selectors'];
	parent: GA['parent'];
}> {}
