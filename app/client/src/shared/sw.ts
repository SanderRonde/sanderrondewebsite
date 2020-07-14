import { MessageToast } from '../components/shared/message-toast/message-toast.js';
import { THEME_COOKIE_NAME } from '../../../shared/theme.js';
import { LANG_COOKIE_NAME } from '../../../i18n/i18n.js';
import { I18NKeys } from '../../../i18n/i18n-keys';
import { getCookie } from './cookies.js';
import { WebComponent } from 'wc-lib';

export function onIdle(fn: () => void) {
	if ('requestIdleCallback' in window) {
		(window as any).requestIdleCallback(fn);
	} else {
		window.requestAnimationFrame(fn);
	}
}

export function updateServiceworkerCookies() {
	if (navigator.serviceWorker.controller) {
		const theme = getCookie(THEME_COOKIE_NAME);
		const lang = getCookie(LANG_COOKIE_NAME);

		if (theme && lang) {
			navigator.serviceWorker.controller.postMessage({
				type: 'setCookie',
				data: {
					theme,
					lang,
				},
			});
		}
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

		updateServiceworkerCookies();

		if (navigator.serviceWorker.controller) {
			navigator.serviceWorker.addEventListener(
				'message',
				async (event) => {
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
									await WebComponent.__prom(
										I18NKeys.generic.reload
									)
								).toUpperCase(),
								duration: 5000,
								onClick() {
									location.reload();
								},
							});
						}
					}
				}
			);
		}
	}
}
