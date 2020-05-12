import {
	ConfigurableWebComponent,
	Props,
	PROP_TYPE,
	config,
	TemplateFn,
	CHANGE_TYPE,
} from 'wc-lib';
import { IDMapType, ClassMapType } from './raw-html-querymap';
import { I18NType } from '../../../../../i18n/i18n-defs';
import { themes } from '../../../../../shared/theme';
import { LANGUAGE } from '../../../../../i18n/i18n';
import { render } from 'lit-html';

function templateStringsArray(...content: string[]) {
	const arr = ([...content] as unknown) as TemplateStringsArray;
	(arr as any).raw = [...content];
	return arr;
}

@config({
	is: 'raw-html',
	html: new TemplateFn<RawHTML>(
		function (html, props) {
			return <div>{html(templateStringsArray(props.content))}</div>;
		},
		CHANGE_TYPE.PROP,
		render
	),
})
export class RawHTML extends ConfigurableWebComponent<{
	selectors: {
		IDS: IDMapType;
		CLASSES: ClassMapType;
	};
	langs: LANGUAGE;
	i18n: I18NType;
	themes: typeof themes;
}> {
	props = Props.define(this, {
		reflect: {
			content: {
				type: PROP_TYPE.STRING,
				value: '',
			},
		},
	});
}
