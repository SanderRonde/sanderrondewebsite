import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { render } from 'lit-html';

export const FadeInCSS = new TemplateFn<any>(
	function (html) {
		return html`<style>
			@keyframes fadein {
				0% {
					opacity: 0;
					transform: translateY(30px);
				}
				100% {
					opacity: 1;
					transform: translateY(0);
				}
			}

			.fade-in {
				animation: fadein 1s ease-out;
			}
		</style>`;
	},
	CHANGE_TYPE.NEVER,
	render
);
