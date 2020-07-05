import {
	themes,
	Theme,
	THEME,
	THEMES,
} from '../../../../../../shared/theme.js';
import { ThemeSelect, THEME_SELECT_TOGGLES } from './theme-select.js';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { render } from 'lit-html';

export const ThemeSelectHTML = new TemplateFn<ThemeSelect>(
	function (html) {
		const currentTheme = this.props.currentTheme;
		const initialTheme = this.props.initialTheme;

		const themeArr = THEMES.map((themeName) => [
			themeName,
			themes[themeName as keyof typeof themes],
		]) as [THEME, Theme][];
		const orderedThemeArr = [
			...themeArr.filter(([themeName]) => themeName !== initialTheme),
			themeArr.find(([themeName]) => themeName === initialTheme)!,
		];

		return (
			<div id="container">
				<div
					id="positioner"
					class={{
						[THEME_SELECT_TOGGLES.EXPANDED]: this.props.expanded,
					}}
				>
					{orderedThemeArr.map(([themeName, theme]) => {
						return (
							<div
								class={[
									'theme',
									{
										[THEME_SELECT_TOGGLES.ACTIVE]:
											currentTheme === themeName,
									},
								]}
							>
								<div
									class="highlighter"
									{...{
										'@': {
											click: () =>
												this.themeSelect(themeName),
											mouseenter: () =>
												this.themePreview(themeName),
											mouseleave: () => this.endPreview(),
										},
									}}
								>
									<div
										class="theme-background"
										style={{
											backgroundColor:
												theme.background.main,
										}}
									>
										<div class="theme-colors">
											<div
												class="highlight-color"
												style={{
													backgroundColor:
														theme.highlight.main,
												}}
											>
												<div
													class="primary-color"
													style={{
														backgroundColor:
															theme.primary.main,
													}}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	},
	CHANGE_TYPE.NEVER,
	render
);
