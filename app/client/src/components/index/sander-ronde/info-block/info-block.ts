import { IDMapType, ClassMapType } from './info-block-querymap';
import { CenterersCSS } from '../../../../styles/centerers';
import { ToolTip } from '../../../shared/tool-tip/';
import { RawHTML } from '../../../shared/raw-html/';
import { InfoBlockHTML } from './info-block.html';
import { InfoBlockCSS } from './info-block.css';
import { IndexBase } from '../../base';
import { config } from 'wc-lib';

@config({
	is: 'info-block',
	css: [InfoBlockCSS, CenterersCSS],
	html: InfoBlockHTML,
	dependencies: [ToolTip, RawHTML],
})
export class InfoBlock extends IndexBase<{
	selectors: {
		IDS: IDMapType;
		CLASSES: ClassMapType;
	};
}> {}
