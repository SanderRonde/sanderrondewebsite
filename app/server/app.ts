import { Entrypoints } from './lib/entrypoints.js';
import serverTiming from 'server-timing';
import cookieParser from 'cookie-parser';
import { Routes } from './lib/routes.js';
import { IO } from './lib/io.js';
import express from 'express';
import morgan from 'morgan';
import fs from 'fs-extra';
import http from 'http';
import spdy from 'spdy';
import path from 'path';
import { ROOT_DIR } from './lib/constants.js';

/**
 * The main app class used to wrap everything up
 */
export class WebServer {
	public app!: express.Express;

	constructor(public io: IO.IO) {}

	async init() {
		this._initVars();
		this._initRoutes();
		this._listen();
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
		Routes.initRoutes(this);
	}

	/**
	 * Start listening for requests
	 */
	private async _listen() {
		const config: spdy.server.ServerOptions = {
			cert: await fs.readFile(path.join(ROOT_DIR, 'certs', 'cert.crt')),
			key: await fs.readFile(path.join(ROOT_DIR, 'certs', 'key.key')),
		};
		http.createServer(this.app).listen(this.io.ports.http, () => {
			console.log(`HTTP server listening on port ${this.io.ports.http}`);
		});
		spdy.createServer(config, this.app).listen(this.io.ports.https, () => {
			console.log(
				`HTTPS server listening on port ${this.io.ports.https}`
			);
		});
	}
}

(async () => {
	await new WebServer(IO.getIO()).init();
})();
