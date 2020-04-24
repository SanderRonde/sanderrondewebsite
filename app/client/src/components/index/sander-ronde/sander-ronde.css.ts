import { TemplateFn, CHANGE_TYPE, css } from 'wc-lib';
import { SanderRonde } from './sander-ronde.js';
import { html, render } from 'lit-html';

export const SanderRondeCSS = new TemplateFn<SanderRonde>(
	function () {
		return html`
			<style>
				${css(this).$.scroller} {
					width: 100vw;
					height: 100vh;
					overflow-x: hidden;
					overflow-y: auto;
				}

				${css(this).$.scroller.pseudo(':-webkit-scrollbar')} {
					width: 0.5em;
					height: 0.5em;
				}

				${css(this).$.scroller.pseudo(':-webkit-scrollbar-thumb')} {
					background: #373c49;
				}

				${css(this).$.scroller.pseudo(':-webkit-scrollbar-track')} {
					background: none;
				}

				${css(this).$['name-block']} {
					display: flex;
					flex-grow: 100;
				}
			</style>
		`;
	},
	CHANGE_TYPE.NEVER,
	render
);
