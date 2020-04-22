import { getCookie, setCookie } from './shared/cookies.js';

{
	type WSMessage =
		| {
				type: 'version';
				index: number;
		  }
		| {
				type: 'reload';
				index: number;
		  };

	function reload(index: number) {
		setCookie('__autoreload', index + '');
		location.reload();
	}

	function onMessage(str: string) {
		const data = JSON.parse(str) as WSMessage;

		if (data.type === 'version') {
			const value = getCookie('__autoreload');
			if (value && value !== data.index + '') {
				reload(data.index);
			}
		} else if (data.type === 'reload') {
			reload(data.index);
		}
	}

	function connect() {
		const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
		const ws = new WebSocket(
			`${protocol}//${location.hostname}:${
				~~location.port + 5
			}/__autoreload`
		);
		ws.onclose = () => window.setTimeout(connect, 1500);

		ws.onmessage = (message) => {
			onMessage(message.data);
		};
	}

	connect();
}
