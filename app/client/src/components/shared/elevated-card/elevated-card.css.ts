import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { ElevatedCard } from './elevated-card';
import { render } from 'lit-html';

export function getShadow(level: number) {
	switch (level) {
		case 1:
			return `box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);`;
		case 2:
			return `box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);`;
		case 3:
			return `box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);`;
		case 4:
			return `box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);`;
		case 5:
			return `box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);`;
		case 0:
		default:
			return '';
	}
}

export const ElevatedCardCSS = new TemplateFn<ElevatedCard>(
	function (html, { props, theme }) {
		return html`<style>
			:host {
				position: relative;
			}

			#shadow {
				transition: background-color 300ms ease-in-out,
					color 300ms ease-in-out;
				background-color: ${theme.card};
				color: ${theme.text.main};
				${getShadow(props.level || 1)}
			}
		</style>`;
	},
	CHANGE_TYPE.THEME | CHANGE_TYPE.PROP,
	render
);
