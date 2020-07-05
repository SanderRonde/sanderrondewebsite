import {
	IDMapType,
	ClassMapType,
	SelectorMapType,
} from './theme-select-querymap';
import {
	THEME,
	THEME_COOKIE_NAME,
	THEMES,
} from '../../../../../../shared/theme';
import { ThemeSelectCSS, ThemeBubbleSelectCSS } from './theme-select.css.js';
import { TransitionCSS } from '../../../../styles/transition';
import { BubbleSelect } from '../bubble-select/bubble-select';
import { ThemeSelectHTML } from './theme-select.html.js';
import { setCookie } from '../../../../shared/cookies';
import { config } from 'wc-lib';

@config({
	is: 'theme-select',
	css: [ThemeBubbleSelectCSS, ThemeSelectCSS, TransitionCSS],
	html: ThemeSelectHTML,
})
export class ThemeSelect extends BubbleSelect<
	THEME,
	IDMapType,
	ClassMapType,
	SelectorMapType
> {
	protected _initialBubbleOrder = (() => {
		const initialTheme = this.getThemeName();
		return [
			...THEMES.filter((themeName) => themeName !== initialTheme),
			THEMES.find((themeName) => themeName === initialTheme)!,
		];
	})();
	protected _bubbleOrder = [...this._initialBubbleOrder];

	public current = this.getThemeName();
	public initial = this.getThemeName();

	protected _setCurrent(current: THEME): void {
		this.setTheme(current as any);
		setCookie(THEME_COOKIE_NAME, current);
	}

	public preview(selected: THEME) {
		this.setTheme(selected as any);
	}

	public endPreview() {
		this.setTheme(this.current as any);
	}
}
