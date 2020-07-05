import {
	IDMapType,
	ClassMapType,
	SelectorMapType,
} from './theme-select-querymap';
import {
	ThemeSelectCSS,
	BUBBLE_ANIMATION_DURATION,
} from './theme-select.css.js';
import {
	THEME,
	THEME_COOKIE_NAME,
	THEMES,
} from '../../../../../../shared/theme';
import { TransitionCSS } from '../../../../styles/transition';
import { ThemeSelectHTML } from './theme-select.html.js';
import { Props, config, PROP_TYPE, wait } from 'wc-lib';
import { setCookie } from '../../../../shared/cookies';
import { IndexBase } from '../../base';

export const enum THEME_SELECT_TOGGLES {
	ACTIVE = 'active',
	EXPANDED = 'expanded',
	ON_TOP = 'on-top',
}

@config({
	is: 'theme-select',
	css: [ThemeSelectCSS, TransitionCSS],
	html: ThemeSelectHTML,
})
export class ThemeSelect extends IndexBase<{
	selectors: {
		IDS: IDMapType;
		CLASSES: ClassMapType & {
			theme: HTMLDivElement;
		};
		SELECTORS: SelectorMapType & {
			'.theme': HTMLDivElement;
		};
		TOGGLES: THEME_SELECT_TOGGLES;
	};
}> {
	private _initialBubbleOrder = (() => {
		console.log(this.getThemeName());
		const initialTheme = this.getThemeName();
		return [
			...THEMES.filter((themeName) => themeName !== initialTheme),
			THEMES.find((themeName) => themeName === initialTheme)!,
		];
	})();
	private _bubbleOrder = [...this._initialBubbleOrder];

	props = Props.define(this, {
		priv: {
			expanded: {
				type: PROP_TYPE.BOOL,
				value: false,
			},
			currentTheme: {
				type: PROP_TYPE.STRING,
				exactType: '' as THEME,
				value: this.getThemeName(),
			},
			initialTheme: {
				type: PROP_TYPE.STRING,
				exactType: '' as THEME,
				value: this.getThemeName(),
			},
		},
	});

	expand() {
		this.props.expanded = true;
		this.$.positioner.classList.add(THEME_SELECT_TOGGLES.EXPANDED);
	}

	private _setTheme(themeName: THEME) {
		this.setTheme(themeName as any);
		this.props.currentTheme = themeName;
		debugger;
		setCookie(THEME_COOKIE_NAME, themeName);
		console.log('cookie', themeName);
	}

	private _setSelectedBubble(newThemeName: THEME, oldTheme: THEME) {
		// Now we want to swap the selected theme and the
		// current theme in the list
		// The current theme should always be last
		const selectedThemeIndex = this._bubbleOrder.findIndex(
			(t) => t === newThemeName
		);
		this._bubbleOrder[selectedThemeIndex] = oldTheme;
		this._bubbleOrder[this._bubbleOrder.length - 1] = newThemeName;
	}

	private async _applyBubbleOrder() {
		// The to-be bottom-most bubble should be most prominent
		const themeElements = this.$$('.theme');
		for (let i = 0; i < themeElements.length; i++) {
			const themeElement = themeElements[i];
			const themeName = this._initialBubbleOrder[i];
			if (themeName === this.props.currentTheme) {
				themeElement.classList.add(
					THEME_SELECT_TOGGLES.ON_TOP,
					THEME_SELECT_TOGGLES.ACTIVE
				);
			} else {
				themeElement.classList.remove(
					THEME_SELECT_TOGGLES.ON_TOP,
					THEME_SELECT_TOGGLES.ACTIVE
				);
			}
		}

		// Now move every bubble to where it should be
		for (let i = 0; i < themeElements.length; i++) {
			const themeElement = themeElements[i];
			const targetIndex = this._bubbleOrder.findIndex(
				(n) => n === this._initialBubbleOrder[i]
			);
			const indexDiff = targetIndex - i;

			themeElement.classList.forEach((value) => {
				if (value.startsWith('shift')) {
					themeElement.classList.remove(value);
				}
			});
			themeElement.classList.add(`shift-${indexDiff}`);
		}

		// Now wait out the animation
		await wait(BUBBLE_ANIMATION_DURATION);
	}

	async collapse(themeName: THEME) {
		if (themeName === this.props.currentTheme) {
			// Same as selected, just animate back up
			this.props.expanded = false;
			this.$.positioner.classList.remove(THEME_SELECT_TOGGLES.EXPANDED);
			return;
		}

		const oldTheme = this.props.currentTheme;

		// Set the theme
		this._setTheme(themeName);

		// Move the bubble
		this._setSelectedBubble(themeName, oldTheme);
		await this._applyBubbleOrder();

		// And now collapse
		this.props.expanded = false;
		this.$.positioner.classList.remove(THEME_SELECT_TOGGLES.EXPANDED);
	}

	themePreview(themeName: THEME) {
		this.setTheme(themeName as any);
	}

	endPreview() {
		this.setTheme(this.props.currentTheme as any);
	}

	async themeSelect(themeName: THEME) {
		console.log('select', themeName);
		if (this.props.expanded) {
			// Expanded, select that and collapse
			await this.collapse(themeName);
		} else {
			// Expand now
			this.expand();
		}
	}
}

// TODO: actually change/store the theme permanently
// also those errors in the compiler
