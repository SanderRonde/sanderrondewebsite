import { ConfigurableWebComponent } from 'wc-lib';
import { until } from 'lit-html/directives/until';

export function getTextWidth(text: string, fontData: string) {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d')!;
	ctx.font = fontData;
	return ctx.measureText(text).width;
}

export async function getTextWidthServer(
	text: string,
	fontData: string
): Promise<number> {
	// Make sure rollup doesn't try to import this
	const { default: lib } = (await eval(`import('canvas')`)) as {
		default: typeof import('canvas');
	};
	const canvas = lib.createCanvas(500, 500);
	const ctx = canvas.getContext('2d')!;
	ctx.font = fontData;
	return ctx.measureText(text).width;
}

/**
 * When on the client, return the lit-html "until" directive,
 * when on the server return a promise that will be awaited
 */
export function untilAwait(
	self: ConfigurableWebComponent,
	prom: Promise<any>,
	placeholder: string
) {
	if (self.isSSR) {
		return prom;
	}
	return until(prom, placeholder);
}

export type AnimationDirection = 'forwards' | 'backwards';
export class ReusableAnimation {
	constructor(
		public animation: Animation,
		public direction: AnimationDirection,
		onFinish?: () => void
	) {
		if (onFinish) {
			this.animation.onfinish = onFinish;
		}
	}

	run(direction: AnimationDirection, onFinish?: () => void) {
		this.animation.onfinish = onFinish || (() => {});
		if (direction === this.direction) {
			this.animation.play();
		} else {
			this.animation.reverse();
			this.direction = direction;
		}
	}
}

export function createReusableAnimation(
	createAnimation: () => Animation,
	direction: AnimationDirection
): ReusableAnimation {
	return new ReusableAnimation(createAnimation(), direction);
}

export function cutIntoGroups<I>(arr: I[], groupSize: number): I[][] {
	const result: I[][] = [];
	for (let i = 0; i < arr.length; i += groupSize) {
		result.push(arr.slice(i, i + groupSize));
	}
	return result;
}
