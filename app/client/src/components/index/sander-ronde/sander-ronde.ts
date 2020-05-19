import { IDMapType, ClassMapType } from './sander-ronde-querymap';
import { BackgroundBlock } from '../../shared/background-block/';
import { MessageToast } from '../../shared/message-toast/';
import { ConfigurableWebComponent, config } from 'wc-lib';
import { I18NType } from '../../../../../i18n/i18n-defs';
import { SanderRondeHTML } from './sander-ronde.html.js';
import { themes } from '../../../../../shared/theme.js';
import { SanderRondeCSS } from './sander-ronde.css.js';
import { LANGUAGE } from '../../../../../i18n/i18n';
import { FontCSS } from '../../../styles/font.js';
import { NameBlock } from './name-block/';
import { InfoBlock } from './info-block/';
import { TimeLine } from './time-line/';

@config({
	is: 'sander-ronde',
	html: SanderRondeHTML,
	css: [SanderRondeCSS, FontCSS],
	dependencies: [
		MessageToast,
		BackgroundBlock,
		NameBlock,
		TimeLine,
		InfoBlock,
	],
})
export class SanderRonde extends ConfigurableWebComponent<{
	selectors: {
		IDS: IDMapType;
		CLASSES: ClassMapType;
	};
	langs: LANGUAGE;
	i18n: I18NType;
	themes: typeof themes;
}> {}
