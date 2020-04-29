import { ConfigurableWebComponent, Props, config } from 'wc-lib';
import { IDMapType, ClassMapType } from './elevated-card-querymap';
import { ElevatedCardHTML } from './elevated-card.html.js';
import { ElevatedCardCSS } from './elevated-card.css.js';

@config({
	is: 'elevated-card',
	css: ElevatedCardCSS,
	html: ElevatedCardHTML
})
export class ElevatedCard extends ConfigurableWebComponent<{
	selectors: {
		IDS: IDMapType;
		CLASSES: ClassMapType;
	}
}> {
	props = Props.define(this, {
		// ...
	});

	mounted() {
		// ...
	}

	firstRender() {
		// ...
	}
}