import {
	IDMapType,
	ClassMapType,
	SelectorMapType,
} from './message-toast-querymap';
import { bindToClass, config, Props, PROP_TYPE, wait } from 'wc-lib';
import { MessageToastHTML } from './message-toast.html';
import { MessageToastCSS } from './message-toast.css';
import { FontCSS } from '../../../styles/font';
import { ComponentBase } from '../../base';

export interface ToastConfig {
	message: string;
	button?: string;
	duration?: number;
	onClick?: (e: MouseEvent) => void;
}

@config({
	is: 'message-toast',
	html: MessageToastHTML,
	css: [MessageToastCSS, FontCSS],
})
export class MessageToast extends ComponentBase<{
	selectors: {
		IDS: IDMapType;
		CLASSES: ClassMapType;
		SELECTORS: SelectorMapType;
	};
	events: {
		click: {
			args: [MouseEvent];
		};
		hide: {
			args: [];
		};
	};
}> {
	props = Props.define(this, {
		reflect: {
			message: {
				type: PROP_TYPE.STRING,
				required: true,
			},
			button: {
				type: PROP_TYPE.STRING,
				value: 'hide',
			},
			duration: {
				type: PROP_TYPE.NUMBER,
				value: 10000,
			},
		},
	});

	async hide() {
		this.classList.remove('visible');
		await wait(500);
		this.remove();
		this.fire('hide');
	}

	@bindToClass
	onClick(e: MouseEvent) {
		this.fire('click', e);
		this.hide();
	}

	async mounted() {
		if (this.props.duration !== Infinity) {
			window.setTimeout(() => {
				this.hide();
			}, this.props.duration);
		}

		await wait(0);
		this.classList.add('visible');
	}

	private static _activeToast: MessageToast | null = null;

	private static _create({
		message,
		onClick,
		button = 'hide',
		duration = 10000,
	}: ToastConfig): MessageToast {
		const toast = document.createElement('message-toast') as MessageToast;
		toast.props.message = message;
		toast.props.button = button;
		toast.props.duration = duration;
		if (onClick) {
			toast.listen('click', onClick);
		}

		this._activeToast = toast;
		toast.listen('hide', () => {
			this._activeToast = null;
		});

		document.body.appendChild(toast);
		return toast;
	}

	static create(config: ToastConfig): MessageToast {
		if (this._activeToast) {
			this._activeToast.hide();
		}
		return this._create(config);
	}
}
