import {
	IDMapType,
	ClassMapType,
	SelectorMapType,
} from './lang-select-querymap';
import {
	LANGUAGE,
	LANGUAGES,
	LANG_COOKIE_NAME,
} from '../../../../../../i18n/i18n';
import { LangSelectCSS, LangBubbleSelectCSS } from './lang-select.css';
import { TransitionCSS } from '../../../../styles/transition';
import { BubbleSelect } from '../bubble-select/bubble-select';
import { setCookie } from '../../../../shared/cookies';
import { LangSelectHTML } from './lang-select.html';
import { ToolTip } from '../../../shared/';
import { config } from 'wc-lib';
import { updateServiceworkerCookies } from '../../../../shared/sw';
import { I18NKeys } from '../../../../../../i18n/i18n-keys';

@config({
	is: 'lang-select',
	css: [LangBubbleSelectCSS, LangSelectCSS, TransitionCSS],
	html: LangSelectHTML,
	dependencies: [ToolTip],
})
export class LangSelect extends BubbleSelect<
	LANGUAGE,
	IDMapType,
	ClassMapType,
	SelectorMapType
> {
	protected _initialBubbleOrder = (() => {
		const initialLang = this.getLang();
		return [
			...LANGUAGES.filter((langName) => langName !== initialLang),
			LANGUAGES.find((langName) => langName === initialLang)!,
		];
	})();
	protected _bubbleOrder = [...this._initialBubbleOrder];

	public current = this.getLang();
	public initial = this.getLang();

	protected _setCurrent(current: LANGUAGE): void {
		this.setLang(current as any);
		setCookie(LANG_COOKIE_NAME, current);
		updateServiceworkerCookies();
	}

	public preview(selected: LANGUAGE) {
		this.setLang(selected as any);
	}

	public endPreview() {
		this.setLang(this.current as any);
	}

	protected async onLangChange() {
		const tooltips = this.$$('.tooltip');
		await Promise.all(
			tooltips.map(async (tooltip) => {
				tooltip.props.message = await this.__prom(
					I18NKeys.shared.langSelect.changeLang,
					{
						lang: await this.__prom(
							`${
								I18NKeys.shared.langSelect._
							}${tooltip.getAttribute('data-lang')}` as any
						),
					}
				);
			})
		);
	}
}
