import {
	ROOT_DIR,
	CLIENT_DIR,
	CACHE_HEADER,
	CACHE_MAX_AGE,
} from './constants.js';
import serveStatic from 'serve-static';
import { WebServer } from '../app.js';
import { server } from 'spdy';
import express from 'express';
import fs from 'fs-extra';
import path from 'path';

import notFoundHTML from '../../client/src/entrypoints/404/index.html.js';
import { RequestVars } from './request-vars.js';
import { IO } from './io.js';

const BACHELOR_THESIS_FILE = path.join(
	ROOT_DIR,
	'app/repos',
	'bachelor-thesis',
	'docs/assets',
	'thesis.pdf'
);
const MASTER_THESIS_FILE = path.join(
	ROOT_DIR,
	'app/repos',
	'master-thesis',
	'paper/src',
	'main.pdf'
);
const CV_EN_FILE = path.join(ROOT_DIR, 'app/client', 'static', 'cv.en.pdf');
const CV_NL_FILE = path.join(ROOT_DIR, 'app/client', 'static', 'cv.nl.pdf');

const HOSTS = ['sanderron.de', 'sanderronde.com', 'sanderronde.nl'];

export type SpdyExpressResponse = Partial<server.ServerResponse> &
	express.Response;

export namespace Routes {
	/**
	 * Similar to serve-static but allows for specifying a prefix
	 *
	 * @param {string} root - The root of the directory to serve from
	 * @param {{ prefix?: string; extensions?: string[] }} options - The
	 * 	options for this route
	 * @param {string} [options.prefix] - A prefix to "subtract" from
	 * 	the url. For example if you want to serve only /node_modules/xyz
	 * 	then you can't serve-static /node_modules/xyz because
	 * 	any request to /node_modules/xyz will seach in
	 * 	/node_modules/xyz/node_modules/xyz.
	 * 	So this version rewrites the URL to remove the prefix
	 * @param {string[]} [options.extensions] - Default extensions to
	 * 	fall back on if the path was not a match
	 * @param {rewrite?: (content: string,filename: string) => Promise<string> | string;} [options.rewrite] - Rewrite
	 *  the content of the file dynamically
	 *
	 * @returns {express.RequestHandler} - A request handler, for use
	 * 	in an express(...).use() call
	 */
	export function serve(
		root: string,
		{
			rewrite,
			prefix = '',
			extensions = [],
			index = false,
			cache = false,
		}: {
			rewrite?: (
				content: string,
				filename: string
			) => Promise<string> | string;
			prefix?: string;
			extensions?: string[];
			index?: boolean;
			cache?: boolean;
		} = {}
	): express.RequestHandler {
		return async (
			req: express.Request,
			res: express.Response,
			next: express.NextFunction
		) => {
			if (!req.url.startsWith(prefix)) {
				return next();
			}

			const basePath = path.join(root, req.url.slice(prefix.length));
			const filePaths = [
				basePath,
				...extensions.map((extension) => {
					return `${basePath}.${extension}`;
				}),
			];

			if (index && path.extname(basePath) === '') {
				filePaths.push(
					path.join(
						path.dirname(basePath),
						`${path.basename(basePath)}/index`
					)
				);
				filePaths.push(
					path.join(
						path.dirname(basePath),
						`${path.basename(basePath)}/index.js`
					)
				);
			}

			for (const filePath of filePaths) {
				if (await fs.pathExists(filePath)) {
					const stat = await fs.stat(filePath);
					if (stat.isFile()) {
						res.status(200);
						if (rewrite) {
							const content = await fs.readFile(filePath, {
								encoding: 'utf8',
							});
							if (cache) {
								res.set('Cache-Control', CACHE_HEADER);
							}
							const rewritten = await rewrite(content, filePath);
							res.contentType(path.basename(filePath));
							res.header('Content-Length', rewritten.length + '');
							res.send(rewritten);
							res.end();
						} else {
							res.sendFile(filePath);
						}
						return;
					}
				}
			}
			next();
		};
	}

	function initImageRoutes(app: WebServer['app']) {
		let isDay = new Date().getMonth() === 3 && new Date().getDate() === 29;
		setInterval(() => {
			isDay = new Date().getMonth() === 3 && new Date().getDate() === 29;
		}, 1000 * 60 * 60 * 3);

		const serveImages = serve(path.join(CLIENT_DIR, 'images/icons'), {
			extensions: [],
			prefix: '/icons',
			cache: true,
		});
		const serveSpecialImages = serve(
			path.join(CLIENT_DIR, 'images/hat_icons'),
			{
				extensions: [],
				prefix: '/icons',
				cache: true,
			}
		);
		app.use((req, res, next) => {
			if (isDay) {
				serveSpecialImages(req, res, next);
			} else {
				serveImages(req, res, next);
			}
		});
	}

	/**
	 * Initialize all serving routes
	 *
	 * @param {WebServer} server - The root WebServer
	 */
	export function initRoutes({ app }: WebServer) {
		const staticSettings: serveStatic.ServeStaticOptions = {
			index: false,
			cacheControl: true,
			immutable: false,
			maxAge: CACHE_MAX_AGE * 1000,
		};
		app.get(['/bachelor-thesis(.pdf)?'], (_req, res) => {
			res.endTime('route-resolution');
			res.startTime('send-file', 'Sending file');
			res.sendFile(BACHELOR_THESIS_FILE);
		});
		app.get(['/thesis(.pdf)?', '/master-thesis(.pdf)?'], (_req, res) => {
			res.endTime('route-resolution');
			res.startTime('send-file', 'Sending file');
			res.sendFile(MASTER_THESIS_FILE);
		});
		app.get(['/cv(.pdf)?', '/cv.en(.pdf)?'], (_req, res) => {
			res.endTime('route-resolution');
			res.startTime('send-file', 'Sending file');
			res.sendFile(CV_EN_FILE);
		});
		app.get('/cv.nl(.pdf)?', (_req, res) => {
			res.endTime('route-resolution');
			res.startTime('send-file', 'Sending file');
			res.sendFile(CV_NL_FILE);
		});
		app.use(
			serveStatic(path.join(CLIENT_DIR, 'static'), {
				extensions: ['pdf'],
				...staticSettings,
			})
		);
		initImageRoutes(app);
		app.use(
			serveStatic(path.join(CLIENT_DIR, 'images'), {
				...staticSettings,
			})
		);
		app.get('/sitemap.xml', async (req, res) => {
			const host = req.headers.host || 'sanderron.de';
			if (HOSTS.indexOf(host) === -1) {
				res.status(400);
				res.write('Nonexistent host');
				res.end();
				return;
			}
			res.sendFile(
				path.join(CLIENT_DIR, `build/public/sitemap.${host}.xml`)
			);
		});
		app.use(
			serveStatic(path.join(CLIENT_DIR, 'build/public'), {
				...staticSettings,
			})
		);
	}

	async function render404(
		req: express.Request,
		res: SpdyExpressResponse,
		io: IO.IO,
		status: number = 404
	) {
		res.status(status);
		res.contentType('.html');
		res.set('Cache-Control', CACHE_HEADER);
		const lang = RequestVars.getLang(req, res);
		const theme = RequestVars.getTheme(req, res);

		res.write(
			await notFoundHTML({
				autoReload: io.dev && !io.noAutoReload,
				lang,
				theme,
			})
		);
		res.end();
	}

	export function init404({ app, io }: WebServer) {
		app.get('/404', async (req, res: SpdyExpressResponse) => {
			await render404(req, res, io, 200);
		});
		app.use(async (req, res: SpdyExpressResponse) => {
			await render404(req, res, io);
		});
	}
}
