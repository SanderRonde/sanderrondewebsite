import {
	IDMapType,
	ClassMapType,
	SelectorMapType,
} from './name-block-querymap';
import { TransitionCSS } from '../../../../styles/transition';
import { CenterersCSS } from '../../../../styles/centerers';
import { HighlightCSS } from '../../../../styles/highlight';
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
	css: [
		NameBlockCSS,
		CenterersCSS,
		LinkCSS,
		FadeInCSS,
		HighlightCSS,
		TransitionCSS,
	],
	html: NameBlockHTML,
	dependencies: [ToolTip],
})
export class NameBlock extends IndexBase<{
	selectors: {
		IDS: IDMapType;
		CLASSES: ClassMapType;
		SELECTORS: SelectorMapType;
	};
	parent: SanderRonde;
}> {
	scrollDown() {
		this.getParent()?.$['info-block'].scrollIntoView();
	}
}
