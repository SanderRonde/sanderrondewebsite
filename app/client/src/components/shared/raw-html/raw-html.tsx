import { Props, PROP_TYPE, config, TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { ComponentBase } from '../../base';
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
export class RawHTML extends ComponentBase {
	props = Props.define(this, {
		reflect: {
			content: {
				type: PROP_TYPE.STRING,
				value: '',
			},
		},
	});
}
