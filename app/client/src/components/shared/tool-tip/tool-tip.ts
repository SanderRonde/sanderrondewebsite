import {
	ToolTipCSS,
	MIN_TOOLTIP_MESSAGE_WIDTH,
	TOOLTIP_SIDE_PADDING,
} from './tool-tip.css.js';
import { ConfigurableWebComponent, Props, config, PROP_TYPE } from 'wc-lib';
import { IDMapType, ClassMapType } from './tool-tip-querymap';
import { I18NType } from '../../../../../i18n/i18n-defs.js';
import { themes } from '../../../../../shared/theme.js';
import { FadeInCSS } from '../../../styles/fade-in.js';
import { LANGUAGE } from '../../../../../i18n/i18n.js';
import { ToolTipHTML } from './tool-tip.html.js';

export const enum TOGGLES {
	EXPANDED = 'expanded',
}

export const enum TOOLTIP_DIRECTION {
	TOP = 'top',
	BOTTOM = 'bottom',
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
		TOGGLES: TOGGLES | TOOLTIP_DIRECTION;
	};
	langs: LANGUAGE;
	i18n: I18NType;
	themes: typeof themes;
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
			direction: {
				type: PROP_TYPE.STRING,
				exactType: ('' as unknown) as TOOLTIP_DIRECTION,
				value: TOOLTIP_DIRECTION.BOTTOM,
			},
		},
		priv: {
			internalDirection: {
				type: PROP_TYPE.STRING,
				exactType: ('' as unknown) as TOOLTIP_DIRECTION,
				value: TOOLTIP_DIRECTION.BOTTOM,
			},
		},
	});

	private _marginsUpdated: boolean = false;
	updateMargin() {
		const contentBCR = this.$['slot-content']
			.assignedElements()[0]
			.getBoundingClientRect();
		const contentWidth = contentBCR.width;
		if (contentBCR.y + contentBCR.height + 30 >= window.innerHeight) {
			this.props.internalDirection = TOOLTIP_DIRECTION.TOP;
		} else if (contentBCR.x < 30) {
			this.props.internalDirection = TOOLTIP_DIRECTION.BOTTOM;
		} else {
			this.props.internalDirection = this.props.direction;
		}

		if (
			this._marginsUpdated &&
			!this.props.dynamic &&
			this.props.internalDirection !== TOOLTIP_DIRECTION.TOP
		)
			return;
		this._marginsUpdated = true;
		console.log(contentBCR);

		// Calculate the message width, surprisingly this is actually
		// 30% faster than doing the classic CSS+getBCR trick
		const ctx = document.createElement('canvas').getContext('2d')!;
		ctx.font = '16px Roboto';
		const txt = ctx.measureText(this.props.message);
		const msgWidth = Math.max(
			MIN_TOOLTIP_MESSAGE_WIDTH,
			txt.width + TOOLTIP_SIDE_PADDING * 2
		);

		this.$.tooltip.style.width = `${msgWidth}px`;
		if (contentWidth > msgWidth) {
			const padding = (contentWidth - msgWidth) / 2;
			this.$.tooltip.style.marginLeft = `${padding}px`;
		} else {
			const padding = (msgWidth - contentWidth) / 2;
			this.$.tooltip.style.marginLeft = `${-padding}px`;
		}

		if (this.props.internalDirection === TOOLTIP_DIRECTION.TOP) {
			this.$.tooltip.style.marginTop = `${-contentBCR.height - 40}px`;
		}
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

		this.props.internalDirection = this.props.direction;
	}
}
