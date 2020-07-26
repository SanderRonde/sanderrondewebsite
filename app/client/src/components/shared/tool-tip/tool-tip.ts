import {
	ToolTipCSS,
	MIN_TOOLTIP_MESSAGE_WIDTH,
	TOOLTIP_SIDE_PADDING,
} from './tool-tip.css.js';
import { IDMapType, ClassMapType, SelectorMapType } from './tool-tip-querymap';
import { FadeInCSS } from '../../../styles/fade-in';
import { Props, config, PROP_TYPE } from 'wc-lib';
import { ToolTipHTML } from './tool-tip.html';
import { ComponentBase } from '../../base.js';

export const enum TOGGLES {
	EXPANDED = 'expanded',
}

export const enum TOOLTIP_DIRECTION {
	TOP = 'top',
	BOTTOM = 'bottom',
	LEFT = 'left',
	RIGHT = 'right',
}

@config({
	is: 'tool-tip',
	css: [ToolTipCSS, FadeInCSS],
	html: ToolTipHTML,
})
export class ToolTip extends ComponentBase<{
	selectors: {
		IDS: IDMapType;
		CLASSES: ClassMapType;
		TOGGLES: TOGGLES | TOOLTIP_DIRECTION;
		SELECTORS: SelectorMapType;
	};
}> {
	props = Props.define(this, {
		reflect: {
			message: {
				type: PROP_TYPE.STRING,
				value: '',
				required: true,
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

	constructor() {
		super();
		this.listenProp('propChange', (key) => {
			if (key === 'message') {
				this.fit();
			}
		});
	}

	fit() {
		this._marginsUpdated = false;
	}

	private _marginsUpdated: boolean = false;
	updateMargin() {
		const contentBCR = this.$['slot-content']
			.assignedElements()[0]
			.getBoundingClientRect();
		const contentWidth = contentBCR.width;
		if (
			contentBCR.y + contentBCR.height + 30 >=
			(typeof window === 'undefined' ? 1080 : window.innerHeight)
		) {
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
		} else if (this.props.internalDirection === TOOLTIP_DIRECTION.LEFT) {
			this.$.tooltip.style.marginTop = `${-(
				(contentBCR.height + 45) /
				2
			)}px`;
			this.$.tooltip.style.marginLeft = `${-(msgWidth + 20)}px`;
		} else if (this.props.internalDirection === TOOLTIP_DIRECTION.RIGHT) {
			this.$.tooltip.style.marginTop = `${-(
				(contentBCR.height + 50) /
				2
			)}px`;
			this.$.tooltip.style.marginLeft = `${contentBCR.width + 15}px`;
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
