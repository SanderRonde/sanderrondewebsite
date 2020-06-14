import { IDMapType, ClassMapType } from './sander-ronde-querymap';
import { BackgroundBlock } from '../../shared/background-block/';
import { MessageToast } from '../../shared/message-toast/';
import { SanderRondeHTML } from './sander-ronde.html';
import { SanderRondeCSS } from './sander-ronde.css';
import { FontCSS } from '../../../styles/font';
import { NameBlock } from './name-block/';
import { InfoBlock } from './info-block/';
import { TimeLine } from './time-line/';
import { IndexBase } from '../base';
import { config } from 'wc-lib';

@config({
	is: 'sander-ronde',
	html: SanderRondeHTML,
	css: [SanderRondeCSS, FontCSS],
	dependencies: [
		MessageToast,
		BackgroundBlock,
		NameBlock,
		TimeLine,
		InfoBlock,
	],
})
export class SanderRonde extends IndexBase<{
	selectors: {
		IDS: IDMapType;
		CLASSES: ClassMapType;
	};
}> {}
