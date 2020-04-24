import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { render } from 'lit-html';

export const CenterersCSS = new TemplateFn<any>(
	function (html) {
		return html`<style>
			.horizontal-centerer {
				display: flex;
				flex-direction: row;
				justify-content: center;
			}

			.vertical-centerer {
				display: flex;
				flex-direction: column;
				justify-content: center;
			}

			.fill-y {
				height: 100%;
			}

			.fill-x {
				width: 100%;
			}
		</style>`;
	},
	CHANGE_TYPE.NEVER,
	render
);
