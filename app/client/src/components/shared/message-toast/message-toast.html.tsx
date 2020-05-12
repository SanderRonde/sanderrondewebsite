import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { MessageToast } from './message-toast';
import { render } from 'lit-html';

export const MessageToastHTML = new TemplateFn<MessageToast>(
	function (html, props) {
		return (
			<div id="toast">
				<div id="text">{props.message}</div>
				<button
					{...{
						'@': {
							click: this.onClick,
						},
					}}
					id="button"
				>
					{props.button}
				</button>
			</div>
		);
	},
	CHANGE_TYPE.PROP,
	render
);
