import { initRoutes } from './lib/routes';
import { getIO, IO } from './lib/io';
import * as express from 'express';
import * as http from 'http';

class WebServer {
	public app!: express.Express;

	private _http: number;

	constructor({
		ports: {
			http = 1234
		}
	}: IO) {
		this._http = http;

		this._initVars();
		this._initRoutes();
		this._listen();
	}

	private _initVars() {
		this.app = express();
	}

	private _initRoutes() {
		initRoutes(this.app);
	}

	private _listen() {
		// HTTPS is unused for now since this is behind a proxy
		http.createServer(this.app).listen(this._http, () => {
			console.log(`HTTP server listening on port ${this._http}`);
		});
	}
}

new WebServer(getIO());