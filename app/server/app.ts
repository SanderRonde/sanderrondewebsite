import * as serveStatic from 'serve-static';
import { getIO, IO } from './lib/io';
import * as express from 'express';
import * as path from 'path';
import * as http from 'http';

const THESIS_FILE = path.join(__dirname, '../', 'repos',
	'bachelor-thesis', 'docs/assets', 'thesis.pdf');

class WebServer {
	public app!: express.Express;

	private _http: number;

	constructor({
		ports: {
			http = 1234
		} = {
			http: 1234,
			https: 1235
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
		this.app.use(serveStatic(path.join(__dirname, '../client/public'), {
			extensions: ['pdf'],
			index: false
		}));
		this.app.get('/thesis(.pdf)?', (_req, res, _next) => {
			res.sendFile(THESIS_FILE);
		});
		this.app.use((_req, res, _next) => {
			res.status(404).send('404');
		});
	}

	private _listen() {
		// HTTPS is unused for now
		http.createServer(this.app).listen(this._http, () => {
			console.log(`HTTP server listening on port ${this._http}`);
		});
	}
}

new WebServer(getIO());