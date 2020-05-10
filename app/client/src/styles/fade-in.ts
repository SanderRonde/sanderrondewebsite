import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { render } from 'lit-html';

export const FadeInCSS = new TemplateFn<any>(
	function (html) {
		return html`<style>
			@keyframes fadein {
				0% {
					opacity: 0;
				}
				100% {
					opacity: 1;
				}
			}

			@keyframes down-far {
				0% {
					transform: translateY(30px);
				}
				100% {
					transform: translateY(0);
				}
			}

			@keyframes down-close {
				0% {
					transform: translateY(5px);
				}
				100% {
					transform: translateY(0);
				}
			}

			@keyframes down {
				0% {
					transform: translateY(10px);
				}
				100% {
					transform: translateY(0);
				}
			}

			.fade-in {
				animation: fadein 250ms ease-out, down 250ms ease-out;
			}

			.fade-in.slow {
				animation-duration: 1000ms;
			}

			.fade-in.fast {
				animation-duration: 150ms;
			}

			.fade-in.far {
				animation-name: fadein, down-far;
			}

			.fade-in.close {
				animation-name: fadein, down-close;
			}

			.fade-in.fade-up {
				animation-direction: forwards, reverse;
				animation-fill-mode: none, both;
			}
		</style>`;
	},
	CHANGE_TYPE.NEVER,
	render
);
