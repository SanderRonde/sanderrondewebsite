import { SemiStaticFiles } from './lib/semi-static-files.js';
import { Entrypoints } from './lib/entrypoints.js';
import { ROOT_DIR } from './lib/constants.js';
import serverTiming from 'server-timing';
import cookieParser from 'cookie-parser';
import { Routes } from './lib/routes.js';
import { Log } from './lib/log.js';
import { Dev } from './lib/dev.js';
import { IO } from './lib/io.js';
import express from 'express';
import morgan from 'morgan';
import fs from 'fs-extra';
import https from 'https';
import http from 'http';
import spdy from 'spdy';
import path from 'path';

/**
 * The main app class used to wrap everything up
 */
export class WebServer {
	public app!: express.Express;
	public httpServer!: http.Server;
	public httpsServer!: https.Server;

	constructor(public io: IO.IO) {}

	async init() {
		this._initVars();
		this._initRoutes();
		this._listen();
		if (!this.io.noAutoReload) {
			Dev.initAutoReload(this);
		}
		return this;
	}

	/**
	 * Initialize all variables
	 */
	private _initVars() {
		this.app = express();
	}

	private _markSendMethods() {
		this.app.use((_req, res, next) => {
			res.startTime('route-resolution', 'Resolving matching route');
			next();
		});
	}

	/**
	 * Initialize all routes to the website
	 */
	private _initRoutes() {
		this.app.use(serverTiming() as express.RequestHandler);
		this.app.use(morgan('dev'));
		this.app.use(cookieParser());
		this._markSendMethods();
		Entrypoints.registerEntrypointHandlers(this);
		SemiStaticFiles.initRoutes(this);
		if (this.io.dev) {
			Dev.initRoutes(this);
		}
		Routes.initRoutes(this);
		Routes.init404(this);
	}

	private async _getCerts(): Promise<spdy.server.ServerOptions | null> {
		try {
			return {
				cert: await fs.readFile(
					path.join(ROOT_DIR, 'certs', 'cert.crt')
				),
				key: await fs.readFile(path.join(ROOT_DIR, 'certs', 'key.key')),
			};
		} catch (e) {
			return null;
		}
	}

	/**
	 * Start listening for requests
	 */
	private async _listen() {
		const certs = await this._getCerts();
		this.httpServer = http
			.createServer(this.app)
			.listen(this.io.ports.http, () => {
				Log.success(
					'HTTP',
					`HTTP server listening on port ${this.io.ports.http}`
				);
			});
		if (certs) {
			this.httpsServer = spdy
				.createServer(certs, this.app)
				.listen(this.io.ports.https, () => {
					Log.success(
						'HTTPS',
						`HTTPS server listening on port ${this.io.ports.https}`
					);
				});
		} else {
			Log.warning('HTTPS', 'No certs found, not hosting HTTPS server');
		}
	}
}

(async () => {
	await new WebServer(IO.getIO()).init();
})();
