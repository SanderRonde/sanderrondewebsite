import {
	IDMapType,
	ClassMapType,
	SelectorMapType,
} from './elevated-card-querymap';
import { TransitionCSS } from '../../../styles/transition';
import { ElevatedCardHTML } from './elevated-card.html';
import { ElevatedCardCSS } from './elevated-card.css';
import { Props, config, PROP_TYPE } from 'wc-lib';
import { ComponentBase } from '../../base';

@config({
	is: 'elevated-card',
	css: [ElevatedCardCSS, TransitionCSS],
	html: ElevatedCardHTML,
})
export class ElevatedCard extends ComponentBase<{
	selectors: {
		IDS: IDMapType;
		CLASSES: ClassMapType;
		SELECTORS: SelectorMapType;
	};
}> {
	props = Props.define(this, {
		reflect: {
			level: {
				type: PROP_TYPE.NUMBER,
				defaultValue: 1,
				coerce: true,
				required: true,
			},
		},
	});
}
