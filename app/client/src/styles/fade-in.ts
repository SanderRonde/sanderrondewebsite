import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { render } from 'lit-html';

export const FadeInCSS = new TemplateFn<any>(
	function (html) {
		return html`<style>
			@keyframes fadein-far {
				0% {
					opacity: 0;
					transform: translateY(30px);
				}
				100% {
					opacity: 1;
					transform: translateY(0);
				}
			}

			@keyframes fadein-close {
				0% {
					opacity: 0;
					transform: translateY(5px);
				}
				100% {
					opacity: 1;
					transform: translateY(0);
				}
			}

			@keyframes fadein {
				0% {
					opacity: 0;
					transform: translateY(10px);
				}
				100% {
					opacity: 1;
					transform: translateY(0);
				}
			}

			.fade-in {
				animation: fadein 250ms ease-out;
			}

			.fade-in.slow {
				animation-duration: 1000ms;
			}

			.fade-in.fast {
				animation-duration: 150ms;
			}

			.fade-in.far {
				animation-name: fadein-far;
			}

			.fade-in.close {
				animation-name: fadein-close;
			}
		</style>`;
	},
	CHANGE_TYPE.NEVER,
	render
);
