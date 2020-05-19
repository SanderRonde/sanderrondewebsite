import { ConfigurableWebComponent, config, Props, ComplexType } from 'wc-lib';
import { IDMapType, ClassMapType } from './name-block-querymap';
import { CenterersCSS } from '../../../../styles/centerers';
import { I18NType } from '../../../../../../i18n/i18n-defs';
import { FadeInCSS } from '../../../../styles/fade-in';
import { themes } from '../../../../../../shared/theme';
import { LANGUAGE } from '../../../../../../i18n/i18n';
import { ToolTip } from '../../../shared/tool-tip/';
import { NameBlockHTML } from './name-block.html';
import { LinkCSS } from '../../../../styles/link';
import { NameBlockCSS } from './name-block.css';
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
