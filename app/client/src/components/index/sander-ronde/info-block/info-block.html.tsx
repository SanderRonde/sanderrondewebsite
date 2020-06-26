import config, { Skill } from '../../../../config/me.js';
import { I18NKeys } from '../../../../../../i18n/i18n-keys';
import { RawHTML } from '../../../shared/raw-html/raw-html';
import { SkillRow, SKILL_ROW_ALIGNMENT } from './skill-row/skill-row.js';
import { LinkCSS } from '../../../../styles/link';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { InfoBlock } from './info-block';
import { render } from 'lit-html';

function getApproxGroupSize(group: Skill.SkillGroup) {
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
		(g) => [g, getApproxGroupSize(g)] as [Skill.SkillGroup, number]
	)
).map((group) => {
	return {
		...group,
		skills: group.skills.sort((a, b) => {
			const levelDiff =
				Skill.skillLevelToNumber(b.level) -
				Skill.skillLevelToNumber(a.level);
			if (levelDiff !== 0) return levelDiff;

			// Why is this even possible
			if (a.name > b.name) return 1;
			if (a.name < b.name) return -1;
			return 0;
		}),
	};
});

export const InfoBlockHTML = new TemplateFn<InfoBlock>(
	function (html) {
		return (
			<div class="horizontal-centerer fill-x">
				<div id="container">
					<div id="about-me-container" class="block">
						<div id="about-me">
							<div class="header">
								{this.__(
									I18NKeys.index.infoBlock.aboutMe.title
								)}
							</div>
							<div class="content">
								<p>
									{this.__(
										I18NKeys.index.infoBlock.aboutMe.par1
									)}
								</p>
								<p>
									{this.__(
										I18NKeys.index.infoBlock.aboutMe.par2,
										{
											frontend:
												new Date().getFullYear() - 2010,
										}
									)}
								</p>
								<p>
									<RawHTML
										custom-css={LinkCSS}
										content={this.__(
											I18NKeys.index.infoBlock.aboutMe
												.par3,
											{
												wclib: `<a 
													href="https://github.com/SanderRonde/wc-lib" 
													target="_blank" 
													rel="noopener" 
													class="link">wc-lib</a>`,
											}
										)}
									/>
								</p>
							</div>
						</div>
					</div>
					<div id="skills-container" class="block">
						<div id="skills">
							<div class="header">
								{this.__(I18NKeys.index.infoBlock.skills.title)}
							</div>
							<div class="content">
								{skillGroups.map((skillGroup) => (
									<SkillRow
										group={skillGroup}
										align={SKILL_ROW_ALIGNMENT.RIGHT}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		) as any;
	},
	CHANGE_TYPE.NEVER,
	render
);
