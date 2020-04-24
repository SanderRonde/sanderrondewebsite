import { ConfigurableWebComponent, Props, config } from 'wc-lib';
import { IDMapType, ClassMapType } from './name-block-querymap';
import { CenterersCSS } from '../../../styles/centerers.js';
import { I18NType } from '../../../../../i18n/i18n-defs';
import { themes } from '../../../../../shared/theme';
import { NameBlockHTML } from './name-block.html.js';
import { LANGUAGE } from '../../../../../i18n/i18n';
import { NameBlockCSS } from './name-block.css.js';
import { LinkCSS } from '../../../styles/link.js';

@config({
	is: 'name-block',
	css: [NameBlockCSS, CenterersCSS, LinkCSS],
	html: NameBlockHTML,
})
export class NameBlock extends ConfigurableWebComponent<{
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
