import { MessageToast } from '../components/shared/message-toast/message-toast.js';
import { WebComponent } from 'wc-lib';
import { I18NKeys } from '../i18n/i18n-keys.js';

export function onIdle(fn: () => void) {
	if ('requestIdleCallback' in window) {
		(window as any).requestIdleCallback(fn);
	} else {
		window.requestAnimationFrame(fn);
	}
}

export async function registerServiceworker() {
	if ('serviceWorker' in navigator) {
		if (
			navigator.onLine &&
			(location.protocol === 'https:' ||
				location.hostname === 'localhost')
		) {
			const registration = await navigator.serviceWorker.register(
				'/serviceworker.js'
			);

			registration.addEventListener('updatefound', () => {
				const newWorker = registration.installing;
				newWorker &&
					newWorker.addEventListener('statechange', async () => {
						if (
							newWorker.state == 'activated' &&
							!navigator.serviceWorker.controller
						) {
							// Success
							MessageToast.define();
							MessageToast.create({
								message: await WebComponent.__prom(
									I18NKeys.shared.sw.works_offline
								),
								button: (
									await WebComponent.__prom(
										I18NKeys.generic.dismiss
									)
								).toUpperCase(),
								duration: 5000,
							});
						}
					});
			});
		}

		navigator.serviceWorker.addEventListener('message', async (event) => {
			const msg: {
				type: string;
				data: any;
			} = event.data;
			if (msg.type === 'offlineServe') {
				if (localStorage.getItem('msgOnOfflineServe')) {
					MessageToast.define();
					MessageToast.create({
						message: await WebComponent.__prom(
							I18NKeys.shared.sw.update_ready
						),
						button: (
							await WebComponent.__prom(I18NKeys.generic.reload)
						).toUpperCase(),
						duration: 5000,
						onClick() {
							location.reload();
						},
					});
				}
			}
		});
	}
}
