import { BubbleSelectHTML } from '../bubble-select/bubble-select.html.js';
import { themes, THEMES, THEME } from '../../../../../../shared/theme.js';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { ThemeSelect } from './theme-select.js';
import { render } from 'lit-html';

export const ThemeSelectHTML = new TemplateFn<ThemeSelect>(
	function (html) {
		return BubbleSelectHTML<THEME>(html, this, THEMES, (themeName) => {
			const theme = themes[themeName];
			return (
				<div
					class="theme-background"
					style={{
						backgroundColor: theme.background.main,
					}}
				>
					<div class="theme-colors">
						<div
							class="highlight-color"
							style={{
								backgroundColor: theme.highlight.main,
							}}
						>
							<div
								class="primary-color"
								style={{
									backgroundColor: theme.primary.main,
								}}
							/>
						</div>
					</div>
				</div>
			);
		});
	},
	CHANGE_TYPE.NEVER,
	render
);
