import { BackgroundBlock } from './shared/background-block/background-block';
import { SingleTimeline } from './index/single-timeline/single-timeline';
import { JoinedTimeline } from './index/joined-timeline/joined-timeline';
import { NameBlock } from './index/name-block/name-block';
import { InfoBlock } from './index/info-block/info-block';

declare global {
	type HTMLNameBlockElement = NameBlock;
	type HTMLInfoBlockElement = InfoBlock;
	type HTMLSingleTimelineElement = SingleTimeline;
	type HTMLJoinedTimelineElement = JoinedTimeline;
	type HTMLBackgroundBlockElement = BackgroundBlock;
}
