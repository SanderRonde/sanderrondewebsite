import { SingleTimeline } from './index/sander-ronde/single-timeline/single-timeline';
import { JoinedTimeline } from './index/sander-ronde/joined-timeline/joined-timeline';
import { BackgroundBlock } from './shared/background-block/background-block';
import { NameBlock } from './index/sander-ronde/name-block/name-block';
import { InfoBlock } from './index/sander-ronde/info-block/info-block';
import { RawHTML } from './shared/raw-html/raw-html';
import DownArrow from './icons/down-arrow';
import { JSXBase } from 'wc-lib';

declare global {
	namespace JSX {
		type IntrinsicElements = JSXBase.IntrinsicElements;
		type ElementAttributesProperty = JSXBase.ElementAttributesProperty;
	}

	type HTMLRawhtmlElement = RawHTML;
	type HTMLNameblockElement = NameBlock;
	type HTMLInfoblockElement = InfoBlock;
	type HTMLSingletimelineElement = SingleTimeline;
	type HTMLJoinedtimelineElement = JoinedTimeline;
	type HTMLBackgroundblockElement = BackgroundBlock;
	type HTMLDownarrowElement = SVGElement;
}
