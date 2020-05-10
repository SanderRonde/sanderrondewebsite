import { I18NKeys } from '../../../../../i18n/i18n-keys.js';
import config, { SkillGroup, skillLevelToNumber } from '../../../config/me.js';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { InfoBlock } from './info-block.js';
import { render } from 'lit-html';

function getApproxGroupSize(group: SkillGroup) {
	return (
		group.skills.map((w) => w.name.length).reduce((p, c) => p + c, 0) +
		group.skills.length * 5
	);
}

function pyramidSort<V>(arr: [V, number][]): V[] {
	const sorted = arr.sort(([, a], [, b]) => {
		return b - a;
	});

	// Keep getting the lowest two
	const pyramid: V[] = [];

	if (arr.length === 0) return [];

	const even = arr.length % 2 === 0;
	if (even) {
		// Even, we have two middle items
		pyramid.push(arr[0][0], arr[1][0]);
	} else {
		pyramid.push(arr[0][0]);
	}

	for (let i = even ? 2 : 1; i < sorted.length; i += 2) {
		pyramid.unshift(sorted[i][0]);
		pyramid.push(sorted[i + 1][0]);
	}

	return pyramid;
}

const skillGroups = pyramidSort(
	config.skillGroups.map(
		(g) => [g, getApproxGroupSize(g)] as [SkillGroup, number]
	)
).map((group) => {
	return {
		...group,
		skills: group.skills.sort(
			(a, b) => skillLevelToNumber(a.level) - skillLevelToNumber(b.level)
		),
	};
});

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
						<div class="content">
							${skillGroups.map((skillGroup) => {
								return html`<div class="skill-group">
									${skillGroup.skills.map((skill) => {
										const name = skill.translate
											? this.__(
													`${I18NKeys.index.infoBlock.skills._}${skill.name}` as any
											  )
											: skill.name;
										return html`
											<tool-tip
												message="${this.__(
													I18NKeys.index.infoBlock
														.skillLevels.level,
													{
														level: this.__prom(
															`${I18NKeys.index.infoBlock.skillLevels._}${skill.level}` as any
														),
													}
												)}"
											>
												<div class="skill">${name}</div>
											</tool-tip>
										`;
									})}
								</div>`;
							})}
						</div>
					</div>
				</div>
			</div>
		`;
	},
	CHANGE_TYPE.NEVER,
	render
);
