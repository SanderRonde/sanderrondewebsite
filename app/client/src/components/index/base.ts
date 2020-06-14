import { EventListenerObj, SelectorMap } from 'wc-lib';
import { SanderRonde } from './sander-ronde';
import { ComponentBase } from '../base';

export class IndexBase<
	GA extends {
		events?: EventListenerObj;
		selectors?: SelectorMap;
		parent?: any;
	}
> extends ComponentBase<{
	root: SanderRonde;
	events: GA['events'];
	selectors: GA['selectors'];
	parent: GA['parent'];
}> {}
