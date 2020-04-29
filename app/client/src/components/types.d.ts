import { ExperienceTimeline } from "./index/experience-timeline/experience-timeline";
import { BackgroundBlock } from "./shared/background-block/background-block";
import { SingleTimeline } from "./index/single-timeline/single-timeline";
import { NameBlock } from "./index/name-block/name-block";

declare global {
	type HTMLNameBlockElement = NameBlock;
	type HTMLSingleTimelineElement = SingleTimeline;
	type HTMLBackgroundBlockElement = BackgroundBlock;
	type HTMLExperienceTimelineElement = ExperienceTimeline;
}