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
import { ToolTip } from '../../../shared/';
import { config } from 'wc-lib';
import { updateServiceworkerCookies } from '../../../../shared/sw';
import { I18NKeys } from '../../../../../../i18n/i18n-keys';

@config({
	is: 'theme-select',
	css: [ThemeBubbleSelectCSS, ThemeSelectCSS, TransitionCSS],
	html: ThemeSelectHTML,
	dependencies: [ToolTip],
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
		updateServiceworkerCookies();
	}

	public preview(selected: THEME) {
		this.setTheme(selected as any);
	}

	public endPreview() {
		this.setTheme(this.current as any);
	}

	protected async onLangChange() {
		const tooltips = this.$$('.tooltip');
		await Promise.all(
			tooltips.map(async (tooltip) => {
				tooltip.props.message = await this.__prom(
					I18NKeys.shared.themeSelect.changeTheme,
					{
						theme: await this.__prom(
							`${
								I18NKeys.shared.themeSelect._
							}${tooltip.getAttribute('data-theme')}` as any
						),
					}
				);
			})
		);
	}
}
