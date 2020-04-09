import { TemplateFn, CHANGE_TYPE, css } from 'wc-lib';
import { MessageToast } from './message-toast';
import { render } from 'lit-html';

export const MessageToastCSS = new TemplateFn<MessageToast>(
	function (html) {
		return html`
			<style>
				:host {
					position: fixed;
					bottom: 0;
					transform: translateY(100%);
					left: 20px;
					transition: transform 300ms ease-in, opacity 300ms ease-in;
					-webkit-box-shadow: 11px 9px 18px 0px rgba(0, 0, 0, 0.75);
					-moz-box-shadow: 11px 9px 18px 0px rgba(0, 0, 0, 0.75);
					box-shadow: 11px 9px 18px 0px rgba(0, 0, 0, 0.75);
					opacity: 0;
				}

				:host(.visible) {
					transform: translateY(-20px);
					opacity: 1;
				}

				${css(this).$.toast} {
					min-width: 288px;
					max-width: 568px;
					border-radius: 2px;
					position: fixed;
					z-index: 3;
					bottom: 0;
					left: 0;
					right: 0;
					color: #fff;
					background: #323232;
					padding: 14px 29px;
					display: -webkit-flex;
					display: flex;
					font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
				}

				@media (min-width: 640px) {
					#toast {
						bottom: 30px;
						left: 30px;
						right: auto;
					}
				}

				${css(this).$.button} {
					border: none;
					background-color: transparent;
					margin: 0;
					padding: 0;
					font-size: 100%;
					font: inherit;
					vertical-align: baseline;
					background: none;

					color: yellow;
					cursor: pointer;
					margin: 0 0 0 auto;
					text-transform: uppercase;
					min-width: -webkit-min-content;
					min-width: -moz-min-content;
					min-width: min-content;
				}

				${css(this).$.button.pseudo('focus')} {
					outline: none;
					color: #fff;
				}
			</style>
		`;
	},
	CHANGE_TYPE.NEVER,
	render
);
