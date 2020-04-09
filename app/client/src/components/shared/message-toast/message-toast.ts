import {
	CHANGE_TYPE,
	bindToClass,
	TemplateFn,
	config,
	ConfigurableWebComponent,
	Props,
	PROP_TYPE,
	wait,
} from 'wc-lib';
import { render } from 'lit-html';

export interface ToastConfig {
	message: string;
	button?: string;
	duration?: number;
	onClick?: (e: MouseEvent) => void;
}

@config({
	is: 'message-toast',
	html: new TemplateFn<MessageToast>(
		function (html, props) {
			return html`
				<div id="toast">
					<div id="text">${props.message}</div>
					<button @click="${this.onClick}" id="button">
						${props.button}
					</div>
				</div>
			`;
		},
		CHANGE_TYPE.PROP,
		render
	),
	css: new TemplateFn<MessageToast>(
		(html) => {
			return html`
				<style>
					:host {
						position: fixed;
						bottom: 0;
						transform: translateY(100%);
						left: 20px;
						transition: transform 300ms ease-in,
							opacity 300ms ease-in;
						-webkit-box-shadow: 11px 9px 18px 0px
							rgba(0, 0, 0, 0.75);
						-moz-box-shadow: 11px 9px 18px 0px rgba(0, 0, 0, 0.75);
						box-shadow: 11px 9px 18px 0px rgba(0, 0, 0, 0.75);
						opacity: 0;
					}

					:host(.visible) {
						transform: translateY(-20px);
						opacity: 1;
					}

					#toast {
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
						font-family: 'Segoe UI', Tahoma, Geneva, Verdana,
							sans-serif;
					}

					@media (min-width: 640px) {
						#toast {
							bottom: 30px;
							left: 30px;
							right: auto;
						}
					}

					#button {
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

					#button:focus {
						outline: none;
						color: #fff;
					}
				</style>
			`;
		},
		CHANGE_TYPE.NEVER,
		render
	),
})
export class MessageToast extends ConfigurableWebComponent<{
	selectors: {
		IDS: {};
		CLASSES: {};
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
			message: PROP_TYPE.STRING,
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
