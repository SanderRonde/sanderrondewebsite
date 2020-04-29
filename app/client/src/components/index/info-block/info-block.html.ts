import { I18NKeys } from '../../../../../i18n/i18n-keys.js';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { InfoBlock } from './info-block.js';
import { render } from 'lit-html';

export const InfoBlockHTML = new TemplateFn<InfoBlock>(
	function (html) {
		return html`
			<div class="horizontal-centerer fill-x">
				<div id="container">
					<div id="about-me">
						<div class="header">
							${this.__(I18NKeys.index.infoBlock.aboutMe.title)}
						</div>
						<div class="content">
							${this.__(I18NKeys.index.infoBlock.aboutMe.content)}
						</div>
					</div>
					<div id="skills">
						<div class="header">
							${this.__(I18NKeys.index.infoBlock.skills.title)}
						</div>
						<div class="content"></div>
					</div>
				</div>
			</div>
		`;
	},
	CHANGE_TYPE.NEVER,
	render
);
