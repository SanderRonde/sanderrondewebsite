import { LANGUAGE, LANGUAGES } from '../../../../../../i18n/i18n.js';
import { BubbleSelectHTML } from '../bubble-select/bubble-select.html.js';
import { TOOLTIP_DIRECTION } from '../../../shared/tool-tip/tool-tip.js';
import { render, SVGTemplateResult } from 'lit-html';
import { ToolTip } from '../../../shared/index.js';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import NL from '../../../icons/languages/nl.js';
import EN from '../../../icons/languages/en.js';
import { LangSelect } from './lang-select.js';

const LANG_ICONS: {
	[LANG in LANGUAGE]: (config: {
		width?: number;
		height?: number;
		id?: string;
	}) => SVGTemplateResult;
} = {
	nl: NL,
	en: EN,
};

export const LangSelectHTML = new TemplateFn<LangSelect>(
	function (html) {
		return BubbleSelectHTML<LANGUAGE>(html, this, LANGUAGES, (langName) => {
			const LangSVG = LANG_ICONS[langName];
			return (
				<ToolTip direction={TOOLTIP_DIRECTION.LEFT} message={langName}>
					<div class="lang-background">
						<LangSVG width={41} height={41} />
					</div>
				</ToolTip>
			);
		});
	},
	CHANGE_TYPE.NEVER,
	render
);
