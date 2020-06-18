import { ToolTip } from '../../../../shared/index.js';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { SkillRow } from './skill-row.js';
import { render } from 'lit-html';
import { I18NKeys } from '../../../../../../../i18n/i18n-keys.js';

export const SkillRowHTML = new TemplateFn<SkillRow>(
	function (html, props) {
		return (
			<div id="skill-group">
				{props.group &&
					props.group.skills.map((skill) => {
						const name = skill.translate
							? this.__(
									`${I18NKeys.index.infoBlock.skills._}${skill.name}` as any
							  )
							: skill.name;
						return skill.level ? (
							<ToolTip
								message={this.__(
									I18NKeys.index.infoBlock.skillLevels.level,
									{
										level: this.__prom(
											`${I18NKeys.index.infoBlock.skillLevels._}${skill.level}` as any
										),
									}
								)}
							>
								<div class="skill">{name}</div>
							</ToolTip>
						) : (
							<div class="skill">{name}</div>
						);
					})}
			</div>
		);
	},
	CHANGE_TYPE.PROP,
	render
);
