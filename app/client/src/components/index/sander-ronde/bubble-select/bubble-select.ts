import { Props, PROP_TYPE, wait } from 'wc-lib';
import { IndexBase } from '../../base';

export const enum BUBBLE_SELECT_TOGGLES {
	ACTIVE = 'active',
	EXPANDED = 'expanded',
	ON_TOP = 'on-top',
}

export const BUBBLE_ANIMATION_DURATION = 250;

export abstract class BubbleSelect<B, I, C, S> extends IndexBase<{
	selectors: {
		IDS: {
			positioner: HTMLDivElement;
			container: HTMLDivElement;
		} & I;
		CLASSES: {
			bubble: HTMLDivElement;
			highlighter: HTMLDivElement;
		} & C;
		SELECTORS: {
			'.bubble': HTMLDivElement;
		} & S;
		TOGGLES: BUBBLE_SELECT_TOGGLES;
	};
}> {
	protected abstract _initialBubbleOrder: B[];
	protected abstract _bubbleOrder: B[];

	public abstract current: B;
	public abstract initial: B;

	props = Props.define(this, {
		priv: {
			expanded: {
				type: PROP_TYPE.BOOL,
				value: false,
			},
		},
	});

	expand() {
		this.props.expanded = true;
		this.$.positioner.classList.add(BUBBLE_SELECT_TOGGLES.EXPANDED);
	}

	protected abstract _setCurrent(current: B): void;

	private _setSelectedBubble(newThemeName: B, oldTheme: B) {
		// Now we want to swap the selected bubble and the
		// current bubble in the list
		// The current bubble should always be last
		const selectedThemeIndex = this._bubbleOrder.findIndex(
			(t) => t === newThemeName
		);
		this._bubbleOrder[selectedThemeIndex] = oldTheme;
		this._bubbleOrder[this._bubbleOrder.length - 1] = newThemeName;
	}

	private async _applyBubbleOrder() {
		// The to-be bottom-most bubble should be most prominent
		const bubbleElements = this.$$('.bubble');
		for (let i = 0; i < bubbleElements.length; i++) {
			const bubbleElement = bubbleElements[i];
			const bubbleName = this._initialBubbleOrder[i];
			if (bubbleName === this.current) {
				bubbleElement.classList.add(
					BUBBLE_SELECT_TOGGLES.ON_TOP,
					BUBBLE_SELECT_TOGGLES.ACTIVE
				);
			} else {
				bubbleElement.classList.remove(
					BUBBLE_SELECT_TOGGLES.ON_TOP,
					BUBBLE_SELECT_TOGGLES.ACTIVE
				);
			}
		}

		// Now move every bubble to where it should be
		for (let i = 0; i < bubbleElements.length; i++) {
			const bubbleElement = bubbleElements[i];
			const targetIndex = this._bubbleOrder.findIndex(
				(n) => n === this._initialBubbleOrder[i]
			);
			const indexDiff = targetIndex - i;

			bubbleElement.classList.forEach((value) => {
				if (value.startsWith('shift')) {
					bubbleElement.classList.remove(value);
				}
			});
			bubbleElement.classList.add(`shift-${indexDiff}`);
		}

		// Now wait out the animation
		await wait(BUBBLE_ANIMATION_DURATION);
	}

	async collapse(selected: B) {
		if (selected === this.current) {
			// Same as selected, just animate back up
			this.props.expanded = false;
			this.$.positioner.classList.remove(BUBBLE_SELECT_TOGGLES.EXPANDED);
			return;
		}

		const prev = this.current;

		// Set the theme
		this.current = selected;
		this._setCurrent(selected);

		// Move the bubble
		this._setSelectedBubble(selected, prev);
		await this._applyBubbleOrder();

		// And now collapse
		this.props.expanded = false;
		this.$.positioner.classList.remove(BUBBLE_SELECT_TOGGLES.EXPANDED);
	}

	public abstract preview(selected: B): void;

	public abstract endPreview(): void;

	async bubbleSelect(selected: B) {
		if (this.props.expanded) {
			// Expanded, select that and collapse
			await this.collapse(selected);
		} else {
			// Expand now
			this.expand();
		}
	}
}
