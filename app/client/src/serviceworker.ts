/// <reference path="../../../types/serviceworker.d.ts" />
declare var self: DedicatedWorkerGlobalScope;
export {};

import _config from '../build/private/swconfig.json';
// import _versions from '../build/public/versions.json';
import { SWConfig, SERVE_STATEGY } from '../../shared/types';
import { flat } from '../../shared/util.js';

const config = _config as SWConfig;
// const versions = _versions as VersionMap;

const CACHE_NAME = 'sander-ronde-cache';

self.addEventListener('install', (event) => {
    self.skipWaiting();

    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            await cache.addAll(
                [...flat(
                    config.groups.map((group) => {
                        return group.files;
                    })
                ), '/404']
            );
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
				path: file,
				serveStrategy: group.serveStategy,
				isEntrypoint: false,
				notifyOnUpdate: group.notifyOnUpdate || false,
				src: file,
			}));
		})
	),
];

async function updateNotify() {
	// TODO: communicate to frontend that a new version is available
}

async function shouldNotify(file: string) {
	const match = pathMaps.find(pathMap => pathMap.src === file);
	if (!match) return false;

	return match.notifyOnUpdate;
}

async function updateVersions() {
	const remoteVersionsFile = await fetch('/versions.json')
	const remoteVersions = await remoteVersionsFile.clone().json().catch(() => {});
	if (!remoteVersions) {
		return;
	}

	const cache = await caches.open(CACHE_NAME);
	const localVersionsFile = (await cache.match('/versions.json')) || {
		json() {
			return {} as {
				[key: string]: string;
			};
		}
	};
	const localVersions = await localVersionsFile.json();

	let notify: boolean = false;
	await Promise.all(Object.getOwnPropertyNames(remoteVersions).map(async (file) => {
		if (!(file in localVersions)) {
			//File does not exist, we need to cache it as well
			await cache.add(file);
		} else if (localVersions[file] !== remoteVersions[file]) {
			//Out of date, re-fetch
			await cache.delete(file);
			await cache.add(file);

			// Check if we should notify
			if (await shouldNotify(file)) {
				notify = true;
			}
		}
	}));
	await cache.put('/versions.json', remoteVersionsFile);

	if (notify) {
		await updateNotify();
	}
}

async function raceAll<T>(...promises: Promise<T>[]): Promise<T> {
	return new Promise<T>((resolve, reject) => {
		// When anything resolves, resolve
		Promise.race(promises).then((value) => {
			resolve(value);
		}).catch(() => {});
		// When all of them reject, reject
		Promise.all(promises.map((promise) => {
			return new Promise((resolve) => {
				promise.catch(() => resolve());
			})
		})).then(() => {
			reject();
		})
	});
}

async function fastest(req: Request): Promise<Response> {
	return raceAll(caches.match(req), fetch(req, {
		credentials: 'include'
	})) as Promise<Response>
}

self.addEventListener('fetch', async (event) => {
    const { pathname, hostname } = new URL(event.request.url);

    if (hostname !== location.hostname) {
        // External requests, fetch them externally
        event.respondWith(fetch(event.request));
        return;
    }

	const match = pathMaps.find(pathMap => pathMap.path === pathname);
	if (!match) {
		// Return 404
		event.respondWith(fastest(new Request('/404')));
		return;
	}

	const { isEntrypoint, serveStrategy, src } = match;
	switch (serveStrategy) {
		case SERVE_STATEGY.FASTEST:
			event.respondWith(fastest(new Request(src)));
			break;
	}

	if (isEntrypoint) {
		// Update versions
		await updateVersions();
	}
});
