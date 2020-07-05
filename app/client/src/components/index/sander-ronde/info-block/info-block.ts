import {
	IDMapType,
	ClassMapType,
	SelectorMapType,
} from './info-block-querymap';
import { TransitionCSS } from '../../../../styles/transition';
import { CenterersCSS } from '../../../../styles/centerers';
import { HighlightCSS } from '../../../../styles/highlight';
import { ToolTip } from '../../../shared/tool-tip/';
import { RawHTML } from '../../../shared/raw-html/';
import { InfoBlockHTML } from './info-block.html';
import { InfoBlockCSS } from './info-block.css';
import { SkillRow } from './skill-row/';
import { IndexBase } from '../../base';
import { config } from 'wc-lib';

@config({
	is: 'info-block',
	css: [InfoBlockCSS, CenterersCSS, HighlightCSS, TransitionCSS],
	html: InfoBlockHTML,
	dependencies: [ToolTip, RawHTML, SkillRow],
})
export class InfoBlock extends IndexBase<{
	selectors: {
		IDS: IDMapType;
		CLASSES: ClassMapType;
		SELECTORS: SelectorMapType;
	};
}> {}
