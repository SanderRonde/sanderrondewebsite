import { Props, config, PROP_TYPE } from 'wc-lib';
import { IDMapType, ClassMapType } from './elevated-card-querymap';
import { ElevatedCardHTML } from './elevated-card.html';
import { ElevatedCardCSS } from './elevated-card.css';
import { ComponentBase } from '../../base';

@config({
	is: 'elevated-card',
	css: ElevatedCardCSS,
	html: ElevatedCardHTML,
})
export class ElevatedCard extends ComponentBase<{
	selectors: {
		IDS: IDMapType;
		CLASSES: ClassMapType;
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
