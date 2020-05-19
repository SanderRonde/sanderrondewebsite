import { ConfigurableWebComponent, Props, config } from 'wc-lib';
import { IDMapType, ClassMapType } from './elevated-card-querymap';
import { I18NType } from '../../../../../i18n/i18n-defs';
import { ElevatedCardHTML } from './elevated-card.html';
import { ElevatedCardCSS } from './elevated-card.css';
import { themes } from '../../../../../shared/theme';
import { LANGUAGE } from '../../../../../i18n/i18n';

@config({
	is: 'elevated-card',
	css: ElevatedCardCSS,
	html: ElevatedCardHTML,
})
export class ElevatedCard extends ConfigurableWebComponent<{
	selectors: {
		IDS: IDMapType;
		CLASSES: ClassMapType;
	};
	langs: LANGUAGE;
	i18n: I18NType;
	themes: typeof themes;
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
