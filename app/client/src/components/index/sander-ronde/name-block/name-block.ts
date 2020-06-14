import { IDMapType, ClassMapType } from './name-block-querymap';
import { CenterersCSS } from '../../../../styles/centerers';
import { FadeInCSS } from '../../../../styles/fade-in';
import { ToolTip } from '../../../shared/tool-tip/';
import { NameBlockHTML } from './name-block.html';
import { LinkCSS } from '../../../../styles/link';
import { NameBlockCSS } from './name-block.css';
import { SanderRonde } from '../sander-ronde';
import { IndexBase } from '../../base';
import { config } from 'wc-lib';

@config({
	is: 'name-block',
	css: [NameBlockCSS, CenterersCSS, LinkCSS, FadeInCSS],
	html: NameBlockHTML,
	dependencies: [ToolTip],
})
export class NameBlock extends IndexBase<{
	selectors: {
		IDS: IDMapType;
		CLASSES: ClassMapType;
	};
	parent: SanderRonde;
}> {
	scrollDown() {
		this.getParent()?.$['info-block'].scrollIntoView();
	}
}
