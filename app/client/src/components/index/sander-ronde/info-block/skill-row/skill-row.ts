import { ClassMapType, IDMapType } from './skill-row-querymap';
import { Props, config, ComplexType, PROP_TYPE } from 'wc-lib';
import { SkillRowHTML } from './skill-row.html.js';
import { SkillRowCSS } from './skill-row.css.js';
import { Skill } from '../../../../../config/me';
import { IndexBase } from '../../../base';

export const enum SKILL_ROW_ALIGNMENT {
	LEFT = 'left',
	RIGHT = 'right',
}

@config({
	is: 'skill-row',
	css: SkillRowCSS,
	html: SkillRowHTML,
})
export class SkillRow extends IndexBase<{
	selectors: {
		IDS: IDMapType;
		CLASSES: ClassMapType;
	};
}> {
	props = Props.define(this, {
		reflect: {
			group: {
				type: ComplexType<{
					skills: Skill.NameSkill[];
					group: Skill.SKILL_GROUP;
				}>(),
				required: true,
			},
			align: {
				type: PROP_TYPE.STRING,
				exactType: '' as SKILL_ROW_ALIGNMENT,
				value: SKILL_ROW_ALIGNMENT.LEFT,
			},
		},
	});
}
