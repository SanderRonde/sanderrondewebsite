import { ROOT_DIR, CLIENT_DIR, APP_DIR } from './constants.js';
import serveStatic from 'serve-static';
import { WebServer } from '../app.js';
import { server } from 'spdy';
import express from 'express';
import fs from 'fs-extra';
import path from 'path';

const THESIS_FILE = path.join(
	ROOT_DIR,
	'app/repos',
	'bachelor-thesis',
	'docs/assets',
	'thesis.pdf'
);

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
	function serve(
		root: string,
		{
			rewrite,
			prefix = '',
			extensions = [],
		}: {
			rewrite?: (
				content: string,
				filename: string
			) => Promise<string> | string;
			prefix?: string;
			extensions?: string[];
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
			for (const filePath of filePaths) {
				if (await fs.pathExists(filePath)) {
					const stat = await fs.stat(filePath);
					if (stat.isFile()) {
						res.status(200);
						if (rewrite) {
							const content = await fs.readFile(filePath, {
								encoding: 'utf8',
							});
							res.contentType(path.basename(filePath));
							res.send(await rewrite(content, filePath));
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

	function initImageRoutes(app: WebServer['app']) {
		let isDay = new Date().getMonth() === 3 && new Date().getDate() === 29;
		setInterval(() => {
			isDay = new Date().getMonth() === 3 && new Date().getDate() === 29;
		}, 1000 * 60 * 60 * 3);

		const serveImages = serve(path.join(CLIENT_DIR, 'images/src'), {
			extensions: ['pdf'],
			prefix: '/images',
		});
		const serveSpecialImages = serve(path.join(CLIENT_DIR, 'images/hat'), {
			extensions: ['pdf'],
			prefix: '/images',
		});
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
	export function initRoutes({ app, io }: WebServer) {
		app.use(
			serveStatic(path.join(CLIENT_DIR, 'static'), {
				extensions: ['pdf'],
				index: false,
			})
		);
		initImageRoutes(app);
		if (io.dev) {
			const serveSrc = serve(path.join(CLIENT_DIR, 'src'), {
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
						serve(path.join(ROOT_DIR, rootSubPath), {
							extensions: ['js'],
							prefix: `/${rootSubPath}`,
						})
					);
				}
			);

			['i18n', 'shared'].forEach((subPath) => {
				app.use(
					serve(path.join(APP_DIR, subPath), {
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
		app.use(
			serveStatic(path.join(CLIENT_DIR, 'build/public'), {
				index: false,
			})
		);
		app.get('/thesis(.pdf)?', (_req, res, _next) => {
			res.endTime('route-resolution');
			res.startTime('send-file', 'Sending file');
			res.sendFile(THESIS_FILE);
		});
		app.get('/404', (_req, res) => {
			// TODO: implement better 404 page
			res.status(200).send('404');
		});
		app.use((_req, res, _next) => {
			res.status(404).end();
		});
	}
}
