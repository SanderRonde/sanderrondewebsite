import { IDMapType, ClassMapType } from './background-block-querymap';
import { BackgroundBlockHTML } from './background-block.html';
import { BackgroundBlockCSS } from './background-block.css';
import { THEME_SHADE } from '../../../../../shared/theme';
import { Props, PROP_TYPE, config } from 'wc-lib';
import { ComponentBase } from '../../base';

@config({
	is: 'background-block',
	css: BackgroundBlockCSS,
	html: BackgroundBlockHTML,
})
export class BackgroundBlock extends ComponentBase<{
	selectors: {
		IDS: IDMapType;
		CLASSES: ClassMapType;
	};
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
				value: false,
			},
			padding: {
				type: PROP_TYPE.BOOL,
				value: true,
			},
		},
	});
}
