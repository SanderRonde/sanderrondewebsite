import { CLIENT_DIR, ROOT_DIR, APP_DIR } from './constants.js';
import { html } from '../../shared/util.js';
import serveStatic from 'serve-static';
import { WebServer } from '../app.js';
import { Routes } from './routes.js';
import * as WebSocket from 'ws';
import { Log } from './log.js';
import path from 'path';

export namespace Dev {
	/**
	 * Rewrite all node-style imports to be relative
	 * So 'lit-html' -> '/node_modules/lit-html'
	 */
	function rewriteModuleImports(content: string) {
		return content
			.replace(
				/['"]wc-lib['"]/g,
				"'/node_modules/wc-lib/build/es/wc-lib.js'"
			)
			.replace(
				/['"]lit-html['"]/g,
				"'/node_modules/lit-html/lit-html.js'"
			);
	}

	export function initRoutes({ app }: WebServer) {
		const serveSrc = Routes.serve(path.join(CLIENT_DIR, 'src'), {
			rewrite: rewriteModuleImports,
		});
		app.use((req, res, next) => {
			if (req.url.startsWith('/serviceworker.js')) {
				next();
				return;
			}
			serveSrc(req, res, next);
		});

		['node_modules/lit-html', 'node_modules/wc-lib'].forEach(
			(rootSubPath) => {
				app.use(
					Routes.serve(path.join(ROOT_DIR, rootSubPath), {
						extensions: ['js'],
						prefix: `/${rootSubPath}`,
					})
				);
			}
		);

		['wc-lib'].forEach((rootSubPath) => {
			app.use(
				Routes.serve(path.join(ROOT_DIR, 'types/clones', rootSubPath), {
					extensions: ['ts'],
					prefix: `/node_modules/${rootSubPath}`,
				})
			);
		});

		['i18n', 'shared'].forEach((subPath) => {
			app.use(
				Routes.serve(path.join(APP_DIR, subPath), {
					extensions: ['js'],
					prefix: `/${subPath}`,
				})
			);
		});

		app.use(
			serveStatic(path.join(CLIENT_DIR, 'build/private'), {
				index: false,
			})
		);
	}

	export async function initAutoReload({ io }: WebServer) {
		// Init hook
		const WebSocket = (await import('ws')).default;

		if (
			io.ports.ws !== io.ports.http + 2 ||
			io.ports.wss !== io.ports.https + 2
		) {
			Log.warning(
				'auto-reload',
				"auto reloader won't know what port to connect to since the WS(S) port is not HTTP(s) + 2"
			);
		}

		// Record sessions
		const wsServer = new WebSocket.Server({ port: io.ports.ws });
		const wssServer = new WebSocket.Server({ port: io.ports.wss });
		const sessions: Set<WebSocket> = new Set();
		let versionIndex: number = 0;
		[wsServer, wssServer].forEach((server) => {
			server.on('connection', (ws) => {
				sessions.add(ws);
				ws.on('close', () => sessions.delete(ws));

				ws.send(
					JSON.stringify({
						type: 'version',
						index: versionIndex,
					})
				);
			});
		});
		wsServer.on('listening', () => {
			Log.info(
				'auto-reload',
				`WS server listening on port ${io.ports.ws}`
			);
		});
		wssServer.on('listening', () => {
			Log.info(
				'auto-reload',
				`WSS server listening on port ${io.ports.wss}`
			);
		});

		// Watch
		const chokidar = await import('chokidar');
		[
			path.join(APP_DIR, 'client'),
			path.join(APP_DIR, 'i18n'),
			path.join(APP_DIR, 'shared'),
		].forEach((watchPath) => {
			chokidar.default
				.watch(watchPath, {
					persistent: true,
					awaitWriteFinish: {
						stabilityThreshold: 50,
					},
					cwd: ROOT_DIR,
					ignoreInitial: true,
					ignored: /.*\.(ts|map)/,
				})
				.on('change', () => {
					versionIndex++;
					Log.info(
						'auto-reload',
						'File changed, reloading client...'
					);
					sessions.forEach((session) => {
						session.send(
							JSON.stringify({
								type: 'reload',
								index: versionIndex,
							})
						);
					});
				});
		});
	}

	const _autoReloadHTML = html`
		<script type="module" src="/__autoreload.js"></script>
	`;
	export function autoReloadHTML() {
		return _autoReloadHTML;
	}
}
