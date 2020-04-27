import { I18NKeys } from '../../../../../i18n/i18n-keys.js';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { NameBlock } from './name-block.js';
import { render } from 'lit-html';

export const NameBlockHTML = new TemplateFn<NameBlock>(
	function (html) {
		return html`
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
										>Computer Science Master</a
									>'s student @
									<a
										href="${this.__(
											I18NKeys.index.nameBlock.links.vu
										)}"
										rel="noopener"
										class="link color"
										target="_blank"
										>VU</a
									>
									&
									<a
										href="${this.__(
											I18NKeys.index.nameBlock.links.uva
										)}"
										rel="noopener"
										class="link color"
										target="_blank"
										>UVA</a
									>
								</div>
								<div id="tagline-work" class="tagline">
									Full-Stack software engineer @
									<a
										href="https://nextupsoftware.com/"
										rel="noopener"
										class="link color"
										target="_blank"
										>Nextup Software</a
									>
								</div>
							</div>
							<div id="education">
								<div class="education-line">
									<span title="graduated">🎓</span>
									<a
										href="${this.__(
											I18NKeys.index.nameBlock.links
												.bachelor
										)}"
										rel="noopener"
										class="link color"
										target="_blank"
										>Bachelor's degree in Computer
										Science</a
									>
									@
									<a
										href="${this.__(
											I18NKeys.index.nameBlock.links
												.uniLeiden
										)}"
										rel="noopener"
										class="link color"
										target="_blank"
										>${this.__(
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
					<a
						href="/#block-2"
						title="${this.__(
							I18NKeys.index.nameBlock.links.scrollDown
						)}"
						class="fade-in"
					>
						<!-- TODO: make this go somewhere -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							version="1.1"
							x="50px"
							y="50px"
							viewBox="0 0 1000 1000"
							enable-background="new 0 0 1000 1000"
							xml:space="preserve"
							id="scroll-down"
						>
							<g>
								<g>
									<path
										d="M77.3,249.3c-15.4-15.2-40.4-15.2-55.8,0c-15.4,15.2-15.4,40,0,55.2l450.6,446.1c15.4,15.2,40.4,15.2,55.8,0l450.6-446.1c15.4-15.2,15.4-40,0-55.2c-15.4-15.2-40.4-15.2-55.8,0L500,656.2L77.3,249.3z"
									/>
								</g>
								<g />
								<g />
								<g />
								<g />
								<g />
								<g />
								<g />
								<g />
								<g />
								<g />
								<g />
								<g />
								<g />
								<g />
								<g />
							</g>
						</svg>
					</a>
				</div>
			</div>
		`;
	},
	CHANGE_TYPE.PROP,
	render
);
