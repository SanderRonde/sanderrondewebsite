import { TimeLineEntry } from './index/sander-ronde/time-line/time-line-entry';
import { BackgroundBlock } from './shared/background-block/background-block';
import { NameBlock } from './index/sander-ronde/name-block/name-block';
import { InfoBlock } from './index/sander-ronde/info-block/info-block';
import { SkillRow } from './index/sander-ronde/info-block/skill-row';
import { TimeLine } from './index/sander-ronde/time-line/time-line';
import { RawHTML } from './shared/raw-html/raw-html';
import { ElevatedCard } from './shared';
import { JSXBase } from 'wc-lib';

declare global {
	namespace JSX {
		type IntrinsicElements = JSXBase.IntrinsicElements;
		type ElementAttributesProperty = JSXBase.ElementAttributesProperty;
	}

	type HTMLPinElement = SVGElement;
	type HTMLRawhtmlElement = RawHTML;
	type HTMLSkillrowElement = SkillRow;
	type HTMLTimelineElement = TimeLine;
	type HTMLNameblockElement = NameBlock;
	type HTMLInfoblockElement = InfoBlock;
	type HTMLDownarrowElement = SVGElement;
	type HTMLElevatedcardElement = ElevatedCard;
	type HTMLTimelineentryElement = TimeLineEntry;
	type HTMLBackgroundblockElement = BackgroundBlock;
}
