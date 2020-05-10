import { IDMapType, ClassMapType } from './name-block-querymap';
import { CenterersCSS } from '../../../styles/centerers.js';
import { ToolTip } from '../../shared/tool-tip/tool-tip.js';
import { ConfigurableWebComponent, config } from 'wc-lib';
import { I18NType } from '../../../../../i18n/i18n-defs';
import { FadeInCSS } from '../../../styles/fade-in.js';
import { themes } from '../../../../../shared/theme';
import { NameBlockHTML } from './name-block.html.js';
import { LANGUAGE } from '../../../../../i18n/i18n';
import { NameBlockCSS } from './name-block.css.js';
import { LinkCSS } from '../../../styles/link.js';

@config({
	is: 'name-block',
	css: [NameBlockCSS, CenterersCSS, LinkCSS, FadeInCSS],
	html: NameBlockHTML,
	dependencies: [ToolTip],
})
export class NameBlock extends ConfigurableWebComponent<{
	selectors: {
		IDS: IDMapType;
		CLASSES: ClassMapType;
	};
	langs: LANGUAGE;
	i18n: I18NType;
	themes: typeof themes;
}> {}
