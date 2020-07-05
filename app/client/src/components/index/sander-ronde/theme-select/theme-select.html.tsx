import { BubbleSelectHTML } from '../bubble-select/bubble-select.html.js';
import { themes, THEMES, THEME } from '../../../../../../shared/theme.js';
import { TOOLTIP_DIRECTION } from '../../../shared/tool-tip/tool-tip.js';
import { ToolTip } from '../../../shared/index.js';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { ThemeSelect } from './theme-select.js';
import { render } from 'lit-html';

export const ThemeSelectHTML = new TemplateFn<ThemeSelect>(
	function (html) {
		return BubbleSelectHTML<THEME>(html, this, THEMES, (themeName) => {
			const theme = themes[themeName];
			return (
				<ToolTip direction={TOOLTIP_DIRECTION.LEFT} message={themeName}>
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
				</ToolTip>
			);
		});
	},
	CHANGE_TYPE.NEVER,
	render
);
