import { BackgroundBlock } from '../../shared/background-block/background-block.js';
import { MessageToast } from '../../shared/message-toast/message-toast.js';
import { IDMapType, ClassMapType } from './sander-ronde-querymap';
import { ConfigurableWebComponent, config } from 'wc-lib';
import { I18NType } from '../../../../../i18n/i18n-defs';
import { SanderRondeHTML } from './sander-ronde.html.js';
import { NameBlock } from '../name-block/name-block.js';
import { themes } from '../../../../../shared/theme.js';
import { InfoBlock } from '../info-block/info-block.js';
import { SanderRondeCSS } from './sander-ronde.css.js';
import { LANGUAGE } from '../../../../../i18n/i18n';
import { FontCSS } from '../../../styles/font.js';

@config({
	is: 'sander-ronde',
	html: SanderRondeHTML,
	css: [SanderRondeCSS, FontCSS],
	dependencies: [MessageToast, BackgroundBlock, NameBlock, InfoBlock],
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
