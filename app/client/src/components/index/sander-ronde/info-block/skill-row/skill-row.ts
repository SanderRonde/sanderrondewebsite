import { ClassMapType, IDMapType } from './skill-row-querymap';
import { Props, config, ComplexType } from 'wc-lib';
import { SkillRowHTML } from './skill-row.html.js';
import { SkillRowCSS } from './skill-row.css.js';
import { Skill } from '../../../../../config/me';
import { IndexBase } from '../../../base';

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
					skills: Skill.Skill[];
					group: Skill.SKILL_GROUP;
				}>(),
				required: true,
			},
		},
	});
}
