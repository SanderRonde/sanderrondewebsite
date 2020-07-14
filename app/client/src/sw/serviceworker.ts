/// <reference path="../../../../types/serviceworker.d.ts" />
declare var self: DedicatedWorkerGlobalScope;
export {};

import { THEME, DEFAULT_THEME, themes } from '../../../shared/theme';
import { SWConfig, SERVE_STATEGY } from '../../../shared/types';
import { LANGUAGE, DEFAULT_LANG } from '../../../i18n/i18n';
import indexHTML from '../entrypoints/index/index.html.js';
import _config from '../../build/private/swconfig.json';
import { flat, html } from '../../../shared/util.js';
import { get, set } from 'idb-keyval';

const config = _config as SWConfig;

const CACHE_NAME = 'sander-ronde-cache';

function getSSRDBKey(lang: LANGUAGE, theme: THEME, entrypoint: string) {
	return `ssr-${lang}-${theme}-${entrypoint}`;
}

async function updateServerSideRenderedCache(force: boolean = false) {
	const { lang, theme } = (await (
		await fetch('/get_vars', {
			method: 'POST',
			credentials: 'include',
		})
	).json()) as {
		lang: LANGUAGE;
		theme: THEME;
	};

	await Promise.all(
		config.serverSideRendered.map(async (entrypoint) => {
			const stored = (await get(
				getSSRDBKey(lang, theme, entrypoint)
			)) as string;
			const parsed: {
				expires: number;
				content: string;
			} = stored ? JSON.parse(stored) : undefined;
			if (!force && stored && Date.now() <= parsed.expires) {
				return;
			}

			const response = await fetch(`${entrypoint}/ssr/${lang}/${theme}`, {
				credentials: 'include',
			});
			const body = await response.text();
			const expires = Date.now() + 1000 * 60 * 60 * 24 * 14;

			await Promise.all([
				set('lang', lang),
				set('theme', theme),
				set(
					getSSRDBKey(lang, theme, `/${entrypoint}`),
					JSON.stringify({
						content: body,
						expires,
					})
				),
			]);
		})
	);
}

self.addEventListener('install', (event) => {
	self.skipWaiting();

	event.waitUntil(
		(async () => {
			const cache = await caches.open(CACHE_NAME);
			await Promise.all([
				cache.addAll([
					...flat([
						...config.groups.map((group) => {
							return group.files;
						}),
						...config.routes.map((route) => {
							return route.src;
						}),
					]),
					'/404',
				]),
				updateServerSideRenderedCache(),
			]);
		})()
	);
});

const pathMaps = [
	...flat(
		config.routes.map((route) => {
			return route.aliases.map((alias) => ({
				path: alias,
				serveStrategy: SERVE_STATEGY.FASTEST,
				isEntrypoint: route.isEntrypoint,
				notifyOnUpdate: true,
				src: route.src,
			}));
		})
	),
	...flat(
		config.groups.map((group) => {
			return group.files.map((file) => ({
				path: `/${file}`,
				serveStrategy: group.serveStategy,
				isEntrypoint: false,
				notifyOnUpdate: group.notifyOnUpdate || false,
				src: `/${file}`,
			}));
		})
	),
];

async function updateVersions() {
	const remoteVersionsFile = await fetch('/versions.json', {
		credentials: 'include',
	});
	const remoteVersions = await remoteVersionsFile
		.clone()
		.json()
		.catch(() => {});
	if (!remoteVersions) {
		return;
	}

	const cache = await caches.open(CACHE_NAME);
	const localVersionsFile = (await cache.match('/versions.json')) || {
		json() {
			return {} as {
				[key: string]: string;
			};
		},
	};
	const localVersions = await localVersionsFile.json();

	await Promise.all(
		Object.getOwnPropertyNames(remoteVersions).map(async (file) => {
			if (!(file in localVersions)) {
				//File does not exist, we need to cache it as well
				await cache.add(file);
			} else if (localVersions[file] !== remoteVersions[file]) {
				//Out of date, re-fetch
				await cache.delete(file);
				await cache.add(file);
			}
		})
	);
	await updateServerSideRenderedCache(true);
	await cache.put('/versions.json', remoteVersionsFile);
}

async function raceAll<T>(...promises: Promise<T>[]): Promise<T> {
	return new Promise<T>((resolve, reject) => {
		// When anything resolves, resolve
		promises.forEach((promise) => {
			promise.then(resolve);
		});
		// When all of them reject, reject
		Promise.all(
			promises.map((promise) => {
				return new Promise((resolve) => {
					promise.catch(() => resolve());
				});
			})
		).then(() => {
			reject();
		});
	});
}

function cacheMatch(req: Request): Promise<Response> {
	return new Promise((resolve, reject) => {
		return caches.match(req).then((response) => {
			if (!response) {
				reject();
			} else {
				resolve(response);
			}
		});
	});
}

async function fastest(req: Request): Promise<Response> {
	return (await raceAll(
		cacheMatch(req),
		fetch(req, {
			credentials: 'include',
		})
	)) as Response;
}

async function networkOrFallback(
	req: Request,
	fallback: Request | Response
): Promise<Response> {
	try {
		return fetch(req, {
			credentials: 'include',
		});
	} catch (e) {
		if (fallback instanceof Response) {
			return fallback;
		}
		return cacheMatch(fallback);
	}
}

async function serveEntrypoint(event: FetchEvent): Promise<Response> {
	const { pathname } = new URL(event.request.url);
	const lang = ((await get('lang')) || DEFAULT_LANG) as LANGUAGE;
	const theme = ((await get('theme')) || DEFAULT_THEME) as THEME;

	if (pathname === '/' || pathname === '/index') {
		const serverSideRendered = (await get(
			getSSRDBKey(lang, theme, '/index')
		)) as string | void;
		if (!serverSideRendered) {
			updateServerSideRenderedCache();
		}
		const renderedContent = serverSideRendered
			? JSON.parse(serverSideRendered).content
			: html`<sander-ronde
					><noscript>
						<span style="color: ${themes[theme].text.main};"
							>Javascript is not enabled, please enable it to use
							this website</span
						></noscript
					></sander-ronde
			  >`;
		return new Response(
			await indexHTML({
				defer: true,
				autoReload: false,
				theme: theme,
				lang: lang,
				content: renderedContent,
			}),
			{
				headers: {
					'Content-Type': 'text/html; charset=UTF-8',
				},
				status: 200,
			}
		);
	}
	return event.request.method === 'GET'
		? cacheMatch(new Request('/404'))
		: new Response(null, {
				status: 404,
		  });
}

self.addEventListener('fetch', async (event) => {
	const { pathname, hostname } = new URL(event.request.url);

	if (hostname !== location.hostname) {
		// External requests, fetch them externally
		event.respondWith(
			fetch(event.request, {
				credentials: 'include',
			})
		);
		return;
	}

	const match = pathMaps.find((pathMap) => pathMap.path === pathname);
	if (!match) {
		// Try to reach the network, otherwise return 404
		const fallback =
			event.request.method === 'GET'
				? new Request('/404')
				: new Response(null, {
						status: 404,
				  });
		await networkOrFallback(event.request, fallback);
		return;
	}

	const { isEntrypoint, serveStrategy, src } = match;

	if (isEntrypoint) {
		switch (serveStrategy) {
			case SERVE_STATEGY.FASTEST:
				event.respondWith(
					raceAll(
						serveEntrypoint(event),
						fetch(new Request(src), {
							credentials: 'include',
						})
					)
				);
				break;
		}
	} else {
		switch (serveStrategy) {
			case SERVE_STATEGY.FASTEST:
				event.respondWith(fastest(new Request(src)));
				break;
		}
	}

	if (isEntrypoint && navigator.onLine) {
		// Update versions
		try {
			await updateVersions();
		} catch (e) {}
	}
});

export type ServiceworkerMessages = {
	type: 'setCookie';
	data: {
		theme: THEME;
		lang: LANGUAGE;
	};
};
self.addEventListener<ServiceworkerMessages>('message', (event) => {
	event.waitUntil(
		(async () => {
			switch (event.data.type) {
				case 'setCookie':
					await Promise.all([
						set('theme', event.data.data.theme),
						set('lang', event.data.data.lang),
						updateServerSideRenderedCache(),
					]);
					break;
			}
		})()
	);
});
