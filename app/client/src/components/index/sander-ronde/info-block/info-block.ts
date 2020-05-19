import { IDMapType, ClassMapType } from './info-block-querymap';
import { CenterersCSS } from '../../../../styles/centerers';
import { I18NType } from '../../../../../../i18n/i18n-defs';
import { ConfigurableWebComponent, config } from 'wc-lib';
import { themes } from '../../../../../../shared/theme';
import { LANGUAGE } from '../../../../../../i18n/i18n';
import { ToolTip } from '../../../shared/tool-tip/';
import { RawHTML } from '../../../shared/raw-html/';
import { InfoBlockHTML } from './info-block.html';
import { InfoBlockCSS } from './info-block.css';

@config({
	is: 'info-block',
	css: [InfoBlockCSS, CenterersCSS],
	html: InfoBlockHTML,
	dependencies: [ToolTip, RawHTML],
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
