import { SingleTimeline } from './index/sander-ronde/single-timeline/single-timeline';
import { JoinedTimeline } from './index/sander-ronde/joined-timeline/joined-timeline';
import { BackgroundBlock } from './shared/background-block/background-block';
import { NameBlock } from './index/sander-ronde/name-block/name-block';
import { InfoBlock } from './index/sander-ronde/info-block/info-block';
import { RawHTML } from './shared/raw-html/raw-html';

declare global {
	namespace JSX {
		type IntrinsicElements = {
			[K in keyof HTMLElementTagNameMap]: Partial<
				HTMLElementTagNameMap[K]
			> & {
				class?: string;
			};
		};

		interface ElementAttributesProperty {
			jsxProps: 'jsxProps';
		}
	}

	type HTMLRawhtmlElement = RawHTML;
	type HTMLRawHtmlElement = RawHTML;
	type HTMLNameBlockElement = NameBlock;
	type HTMLInfoBlockElement = InfoBlock;
	type HTMLSingleTimelineElement = SingleTimeline;
	type HTMLJoinedTimelineElement = JoinedTimeline;
	type HTMLBackgroundBlockElement = BackgroundBlock;
}
