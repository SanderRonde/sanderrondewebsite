import { TimeLineEntry } from './index/sander-ronde/time-line/time-line-entry';
import { BackgroundBlock } from './shared/background-block/background-block';
import { NameBlock } from './index/sander-ronde/name-block/name-block';
import { InfoBlock } from './index/sander-ronde/info-block/info-block';
import { SkillRow } from './index/sander-ronde/info-block/skill-row';
import { TimeLine } from './index/sander-ronde/time-line/time-line';
import { RawHTML } from './shared/raw-html/raw-html';
import { ElevatedCard, ToolTip } from './shared';
import { JSXBase } from 'wc-lib';

declare global {
	namespace JSX {
		type IntrinsicElements = JSXBase.IntrinsicElements;
		type ElementAttributesProperty = JSXBase.ElementAttributesProperty;
	}

	type HTMLPinElement = SVGElement;
	type HTMLRawhtmlElement = RawHTML;
	type HTMLToolTipElement = ToolTip;
	type HTMLEmailElement = SVGElement;
	type HTMLGithubElement = SVGElement;
	type HTMLSkillrowElement = SkillRow;
	type HTMLSkillRowElement = SkillRow;
	type HTMLTimelineElement = TimeLine;
	type HTMLTimeLineElement = TimeLine;
	type HTMLNameblockElement = NameBlock;
	type HTMLDocumentElement = SVGElement;
	type HTMLNameBlockElement = NameBlock;
	type HTMLInfoblockElement = InfoBlock;
	type HTMLInfoBlockElement = InfoBlock;
	type HTMLDownarrowElement = SVGElement;
	type HTMLDownArrowElement = SVGElement;
	type HTMLElevatedcardElement = ElevatedCard;
	type HTMLElevatedCardElement = ElevatedCard;
	type HTMLTimelineentryElement = TimeLineEntry;
	type HTMLTimeLineEntryElement = TimeLineEntry;
	type HTMLBackgroundblockElement = BackgroundBlock;
	type HTMLBackgroundBlockElement = BackgroundBlock;
}
