export function getTextWidth(text: string, fontData: string) {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d')!;
	ctx.font = fontData;
	return ctx.measureText(text).width;
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
