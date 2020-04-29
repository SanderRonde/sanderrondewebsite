import { IDMapType, ClassMapType } from './info-block-querymap';
import { ConfigurableWebComponent, config } from 'wc-lib';
import { I18NType } from '../../../../../i18n/i18n-defs';
import { InfoBlockHTML } from './info-block.html.js';
import { themes } from '../../../../../shared/theme';
import { LANGUAGE } from '../../../../../i18n/i18n';
import { InfoBlockCSS } from './info-block.css.js';

@config({
	is: 'info-block',
	css: InfoBlockCSS,
	html: InfoBlockHTML,
})
export class InfoBlock extends ConfigurableWebComponent<{
	selectors: {
		IDS: IDMapType;
		CLASSES: ClassMapType;
	};
	langs: LANGUAGE;
	i18n: I18NType;
	themes: typeof themes;
}> {}
