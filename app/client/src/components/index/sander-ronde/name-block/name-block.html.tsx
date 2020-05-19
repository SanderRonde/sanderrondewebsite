import { I18NKeys } from '../../../../../../i18n/i18n-keys';
import { ToolTip } from '../../../shared/tool-tip/tool-tip';
import DownArrow from '../../../icons/down-arrow';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { NameBlock } from './name-block';
import { render } from 'lit-html';

export const NameBlockHTML = new TemplateFn<NameBlock>(
	function (html) {
		// debugger;
		return (
			<div id="block">
				<div class="vertical-centerer fill-x" id="main-content">
					<div class="horizontal-centerer">
						<div id="container">
							<div id="name">Sander Ronde</div>
							<div id="tagline">
								<div id="tagline-study" class="tagline">
									<a
										href="https://masters.vu.nl/en/programmes/computer-science-systems-security/index.aspx"
										rel="noopener"
										class="link color"
										target="_blank"
									>
										Computer Science Master
									</a>
									{"'s student @ "}
									<a
										href={this.__(
											I18NKeys.index.nameBlock.links.vu
										)}
										rel="noopener"
										class="link color"
										target="_blank"
									>
										VU
									</a>
									{' & '}
									<a
										href={this.__(
											I18NKeys.index.nameBlock.links.uva
										)}
										rel="noopener"
										class="link color"
										target="_blank"
									>
										UVA
									</a>
								</div>
								<div id="tagline-work" class="tagline">
									{'Full-Stack software engineer @ '}
									<a
										href="https://nextupsoftware.com/"
										rel="noopener"
										class="link color"
										target="_blank"
									>
										Nextup Software
									</a>
								</div>
							</div>
							<div id="education">
								<div class="education-line">
									<span title="graduated">🎓</span>
									<a
										href={this.__(
											I18NKeys.index.nameBlock.links
												.bachelor
										)}
										rel="noopener"
										class="link color"
										target="_blank"
									>
										Bachelor's degree in Computer Science
									</a>
									{' @ '}
									<a
										href={this.__(
											I18NKeys.index.nameBlock.links
												.uniLeiden
										)}
										rel="noopener"
										class="link color"
										target="_blank"
									>
										{this.__(
											I18NKeys.index.nameBlock.education
												.uniLeiden
										)}
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="horizontal-centerer fill-x">
					<ToolTip
						message={this.__(
							I18NKeys.index.nameBlock.links.scrollDown
						)}
					>
						<span
							id="down-arrow"
							class="fade-in slow"
							{...{
								'@': {
									click: this.scrollDown,
								},
							}}
						>
							<DownArrow
								width={50}
								height={50}
								id="scroll-down"
							/>
						</span>
					</ToolTip>
				</div>
			</div>
		);
	},
	CHANGE_TYPE.PROP,
	render
);
