import * as serveStatic from 'serve-static';
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
	}: {
		ports?: {
			http?: number;
			https?: number;
		}
	} = {}) {
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

function getArg(name: string): string|void {
	for (let i = 0; i < process.argv.length; i++) {
		if (process.argv[i] === `--${name}`) {
			return process.argv[i + 1];
		} else if (process.argv[i].startsWith(`--${name}=`)) {
			return process.argv[i].slice(3 + name.length);
		}
	}
	return void 0;
}

function getNumArg(name: string): number|void {
	const arg = getArg(name);
	if (arg === void 0) return void 0;
	return ~~arg;
}

new WebServer({
	ports: {
		http: getNumArg('http') || undefined,
		https: getNumArg('https') || undefined
	}
});