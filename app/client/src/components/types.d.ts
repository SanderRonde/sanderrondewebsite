import { NameBlock } from './index/name-block/name-block';
import { InfoBlock } from './index/info-block/info-block';

declare global {
	type HTMLNameBlockElement = NameBlock;
	type HTMLInfoBlockElement = InfoBlock;
}
