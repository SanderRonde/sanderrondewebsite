import { ConfigurableWebComponent, config, Props, ComplexType } from 'wc-lib';
import { IDMapType, ClassMapType } from './name-block-querymap';
import { CenterersCSS } from '../../../../styles/centerers.js';
import { I18NType } from '../../../../../../i18n/i18n-defs';
import { FadeInCSS } from '../../../../styles/fade-in.js';
import { themes } from '../../../../../../shared/theme';
import { LANGUAGE } from '../../../../../../i18n/i18n';
import { NameBlockHTML } from './name-block.html.js';
import { LinkCSS } from '../../../../styles/link.js';
import { ToolTip } from '../../../shared/tool-tip/';
import { NameBlockCSS } from './name-block.css.js';
import { SanderRonde } from '../sander-ronde';

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
}> {
	props = Props.define(this, {
		reflect: {
			parent: {
				type: ComplexType<SanderRonde>(),
			},
		},
	});

	scrollDown() {
		this.props.parent?.$['info-block'].scrollIntoView();
	}
}
