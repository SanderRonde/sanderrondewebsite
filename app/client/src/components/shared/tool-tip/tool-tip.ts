import {
	ToolTipCSS,
	MIN_TOOLTIP_MESSAGE_WIDTH,
	TOOLTIP_SIDE_PADDING,
} from './tool-tip.css.js';
import { ConfigurableWebComponent, Props, config, PROP_TYPE } from 'wc-lib';
import { IDMapType, ClassMapType } from './tool-tip-querymap';
import { FadeInCSS } from '../../../styles/fade-in.js';
import { ToolTipHTML } from './tool-tip.html.js';

export const enum TOGGLES {
	EXPANDED = 'expanded',
}

@config({
	is: 'tool-tip',
	css: [ToolTipCSS, FadeInCSS],
	html: ToolTipHTML,
})
export class ToolTip extends ConfigurableWebComponent<{
	selectors: {
		IDS: IDMapType;
		CLASSES: ClassMapType;
		TOGGLES: TOGGLES;
	};
}> {
	props = Props.define(this, {
		reflect: {
			message: {
				type: PROP_TYPE.STRING,
				value: '',
			},
			expanded: {
				type: PROP_TYPE.BOOL,
				value: false,
			},
			/**
			 * Whether to dynamically update margins every time
			 * that this is expanded (default false)
			 */
			dynamic: {
				type: PROP_TYPE.BOOL,
				value: false,
			},
		},
	});

	private _marginsUpdated: boolean = false;
	updateMargin() {
		if (this._marginsUpdated && !this.props.dynamic) return;
		this._marginsUpdated = true;
		const contentWidth = this.$['slot-content']
			.assignedElements()[0]
			.getBoundingClientRect().width;

		// Calculate the message width, surprisingly this is actually
		// 30% faster than doing the classic CSS+getBCR trick
		const ctx = document.createElement('canvas').getContext('2d')!;
		ctx.font = '16px Roboto';
		const msgWidth = Math.max(
			MIN_TOOLTIP_MESSAGE_WIDTH,
			ctx.measureText(this.props.message).width + TOOLTIP_SIDE_PADDING * 2
		);

		const center = Math.max(contentWidth) / 2;
		if (contentWidth > msgWidth) {
			const padding = (contentWidth - msgWidth) / 2;
			this.$['tooltip-message'].style.marginLeft = `${padding}px`;
		} else {
			const padding = (msgWidth - contentWidth) / 2;
			this.$['tooltip-message'].style.marginLeft = `${-padding}px`;
		}
		this.$['tooltip-arrow'].style.marginLeft = `${center}px`;
	}

	expand() {
		this.props.expanded = true;
		this.updateMargin();
	}

	retract() {
		this.props.expanded = false;
	}

	mounted() {
		const options = {
			passive: true,
		};
		this.addEventListener('mouseenter', () => this.expand(), options);
		this.addEventListener(
			'tap',
			(e) => {
				this.expand();
				e.stopPropagation();
			},
			options
		);
		this.addEventListener('mouseleave', () => this.retract(), options);
		window.addEventListener('tap', () => this.retract(), options);
	}
}
