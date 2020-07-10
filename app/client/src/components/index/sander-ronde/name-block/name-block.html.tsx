import { I18NKeys } from '../../../../../../i18n/i18n-keys';
import { ToolTip } from '../../../shared/tool-tip/tool-tip';
import DownArrow from '../../../icons/down-arrow';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import Github from '../../../icons/github';
import Email from '../../../icons/email';
import { NameBlock } from './name-block';
import { render } from 'lit-html';

export const NameBlockHTML = new TemplateFn<NameBlock>(
	function (html) {
		return (
			<div id="block">
				<div class="vertical-centerer fill-x" id="main-content">
					<div class="horizontal-centerer">
						<div id="container" class="transition">
							<div id="name">Sander Ronde</div>
							<div id="tagline">
								<div id="tagline-study" class="tagline">
									<a
										href="https://masters.vu.nl/en/programmes/computer-science-systems-security/index.aspx"
										rel="noopener"
										class="link color transition"
										target="_blank"
										title={this.__(
											I18NKeys.index.nameBlock.titles
												.master
										)}
									>
										Computer Science Master
									</a>
									{"'s student @ "}
									<a
										href={this.__(
											I18NKeys.index.nameBlock.links.vu
										)}
										rel="noopener"
										class="link color transition"
										target="_blank"
										title="VU website"
									>
										VU
									</a>
									{' & '}
									<a
										href={this.__(
											I18NKeys.index.nameBlock.links.uva
										)}
										rel="noopener"
										class="link color transition"
										target="_blank"
										title="UVA website"
									>
										UVA
									</a>
								</div>
								<div id="tagline-work" class="tagline">
									{'Full-Stack software engineer @ '}
									<a
										href="https://nextupsoftware.com/"
										rel="noopener"
										class="link color transition"
										target="_blank"
										title="NextUp website"
									>
										NextUp Software
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
										class="link color transition"
										target="_blank"
										title={this.__(
											I18NKeys.index.nameBlock.titles
												.bachelor
										)}
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
										class="link color transition"
										target="_blank"
										title={this.__(
											I18NKeys.index.nameBlock.titles
												.uniLeiden
										)}
									>
										{this.__(
											I18NKeys.index.nameBlock.education
												.uniLeiden
										)}
									</a>
								</div>
							</div>
							<div id="links">
								<a
									id="github-link"
									class="icon-link link color transition"
									href="https://github.com/sanderronde"
									target="_blank"
									title={this.__(
										I18NKeys.index.nameBlock.titles.github
									)}
								>
									<Github
										id="github"
										width={50}
										height={45}
									/>
								</a>
								<a
									id="email-link"
									class="icon-link link color transition"
									href="mailto:sander@sanderron.de"
									title="Email"
								>
									<Email id="email" width={50} height={50} />
								</a>
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
							class="fade-in slow transition"
							title={this.__(
								I18NKeys.index.nameBlock.links.scrollDown
							)}
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
	CHANGE_TYPE.LANG,
	render
);
