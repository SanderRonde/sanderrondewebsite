import { TemplateFn, CHANGE_TYPE, css } from 'wc-lib';
import { ToolTip } from './tool-tip';
import { render } from 'lit-html';

export const MIN_TOOLTIP_MESSAGE_WIDTH = 30;
export const TOOLTIP_SIDE_PADDING = 8;

export const ToolTipCSS = new TemplateFn<ToolTip>(
	function (html) {
		return html`<style>
			${css(this).$.container} {
				position: relative;
			}

			${css(this).$.tooltip} {
				display: none;
				position: absolute;
				padding-top: 8px;
				z-index: 100000;
			}

			${css(this).$.tooltip.toggle.top} {
				padding-top: 0;
				padding-bottom: 8px;
			}

			${css(this).$.tooltip.toggle.top.child.$['tooltip-arrow']} {
				margin-top: 39px;
			}

			${css(this).$.tooltip.toggle.left.child.$['tooltip-arrow']} {
				margin-left: calc(100% - 2.5px);
				margin-top: 23px;
			}

			${css(this).$.tooltip.toggle.right.child.$['tooltip-arrow']} {
				margin-left: -2.5px;
				margin-top: 23px;
			}

			${css(this).$.tooltip.toggle.expanded} {
				display: block;
			}

			${css(this).$['tooltip-message']} {
				box-sizing: border-box;
				min-width: ${MIN_TOOLTIP_MESSAGE_WIDTH}px;
				min-height: 32px;
				padding: 6px ${TOOLTIP_SIDE_PADDING}px;
				color: #fff;
				text-align: left;
				text-decoration: none;
				word-wrap: break-word;
				background-color: #434343;
				border-radius: 2px;
				-webkit-box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.48),
					0 6px 16px 0 rgba(0, 0, 0, 0.32),
					0 9px 28px 8px rgba(0, 0, 0, 0.2);
				box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.48),
					0 6px 16px 0 rgba(0, 0, 0, 0.32),
					0 9px 28px 8px rgba(0, 0, 0, 0.2);
			}

			${css(this).$['tooltip-arrow']} {
				margin-top: 7px;
				position: absolute;
				margin-left: 50%;
			}

			${css(this).$['tooltip-arrow'].pseudo(':before')} {
				-webkit-box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.07);
				box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.07);
				-webkit-transform: translateY(-6.53553391px) rotate(45deg);
				transform: translateY(-6.53553391px) rotate(45deg);
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				display: block;
				width: 5px;
				height: 5px;
				margin: auto;
				background-color: #434343;
				content: '';
				pointer-events: auto;
			}
		</style>`;
	},
	CHANGE_TYPE.ALWAYS,
	render
);
