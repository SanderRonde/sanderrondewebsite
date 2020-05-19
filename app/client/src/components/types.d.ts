import { BackgroundBlock } from './shared/background-block/background-block';
import { TimeLine } from './index/sander-ronde/time-line/time-line';
import { NameBlock } from './index/sander-ronde/name-block/name-block';
import { InfoBlock } from './index/sander-ronde/info-block/info-block';
import { RawHTML } from './shared/raw-html/raw-html';
import { JSXBase } from 'wc-lib';

declare global {
	namespace JSX {
		type IntrinsicElements = JSXBase.IntrinsicElements;
		type ElementAttributesProperty = JSXBase.ElementAttributesProperty;
	}

	type HTMLRawhtmlElement = RawHTML;
	type HTMLTimelineElement = TimeLine;
	type HTMLNameblockElement = NameBlock;
	type HTMLInfoblockElement = InfoBlock;
	type HTMLDownarrowElement = SVGElement;
	type HTMLBackgroundblockElement = BackgroundBlock;
}
