import { ConfigurableWebComponent, Props, PROP_TYPE, config } from 'wc-lib';
import { IDMapType, ClassMapType } from './background-block-querymap';
import { THEME_SHADE, themes } from '../../../../../shared/theme';
import { BackgroundBlockHTML } from './background-block.html.js';
import { BackgroundBlockCSS } from './background-block.css.js';
import { I18NType } from '../../../../../i18n/i18n-defs';
import { LANGUAGE } from '../../../../../i18n/i18n';

@config({
	is: 'background-block',
	css: BackgroundBlockCSS,
	html: BackgroundBlockHTML,
})
export class BackgroundBlock extends ConfigurableWebComponent<{
	selectors: {
		IDS: IDMapType;
		CLASSES: ClassMapType;
	};
	langs: LANGUAGE;
	i18n: I18NType;
	themes: typeof themes;
}> {
	props = Props.define(this, {
		reflect: {
			shade: {
				type: PROP_TYPE.STRING,
				exactType: '' as THEME_SHADE,
				value: THEME_SHADE.REGULAR,
			},
			fill: {
				type: PROP_TYPE.BOOL,
				value: false
			}
		},
	});
}
