import { I18NKeys } from '../../../../../../i18n/i18n-keys';
import { ToolTip } from '../../../shared/tool-tip/tool-tip';
import DownArrow from '../../../icons/down-arrow';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import Github from '../../../icons/github';
import Email from '../../../icons/email';
import { NameBlock } from './name-block';
import { render } from 'lit-html';
import Document from '../../../icons/document';

export const NameBlockHTML = new TemplateFn<NameBlock>(
	function (html) {
		return (
			<div id="block">
				<div class="vertical-centerer fill-x" id="main-content">
					<div class="horizontal-centerer">
						<div id="container" class="transition">
							<header>
								<h1 id="name">Sander Ronde</h1>
							</header>
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
									{'Currently looking for a job!'}
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
									</a>{' '}
									(
									<a
										href="https://sanderron.de/bachelor-thesis"
										rel="noopener"
										class="link color transition"
										target="_blank"
										title={this.__(
											I18NKeys.index.nameBlock.links
												.bachelorThesis
										)}
									>
										{this.__(
											I18NKeys.index.nameBlock.links
												.bachelorThesis
										)}
									</a>
									)
								</div>
							</div>
							<div id="links">
								<a
									id="github-link"
									class="icon-link link color transition"
									href="https://github.com/sanderronde"
									target="_blank"
									rel="noopener"
									title={this.__(
										I18NKeys.index.nameBlock.titles.github
									)}
									aria-label={this.__(
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
									rel="noopener"
									aria-label={'Email'}
								>
									<Email id="email" width={50} height={50} />
								</a>
								<a
									id="document-link"
									class="icon-link link color transition"
									href="/cv"
									title="CV"
									rel="noopener"
									aria-label={'CV'}
								>
									<Document id="cv" width={38} height={38} />
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
