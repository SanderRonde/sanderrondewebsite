/// <reference path="../../typings/index.d.ts" />

import express = require('express');
import path = require('path');
import http = require('http');

const http2 = require('http2');

type Request = http.IncomingMessage & {
	params: {
		[key: string]: string;
	}
}
type RequestHandler = (req: Request, res: http.ServerResponse, next: () => void) => void;
interface RouterInstance {
	(req: Request, res: http.ServerResponse, next: () => void): void;
	use(handler: (err: Error|null, req: Request, res: http.ServerResponse, next: () => void) => void): void;
	use(path: string, handler: (err: Error|null, req: Request, res: http.ServerResponse, next: () => void) => void): void;
	get(path: string, handler: RequestHandler, ...handlers: Array<RequestHandler>): void;
	post(path: string, handler: RequestHandler, ...handlers: Array<RequestHandler>): void;
}
const Router: {
	new(): RouterInstance;
} = require('router');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const LEX = require('letsencrypt-express');
const finalhandler = require('finalhandler');

const ports = {
	http: 1337,
	https: 1338
};


new Promise((resolve, reject) => {
	// le.register(opts).then((certs: any) => {
	// 	resolve(certs);
	// }, (err: Error) => {
	// 	console.log('le error', err);
	// 	reject(err);
	// })
	resolve({});
}).then((certs) => {
	const app = express();
	const router = new Router();

	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, 'views/'));
	app.set('view engine', 'jade');

	router.use(favicon(path.join(__dirname, '../client/public/favicon.ico')));
	router.use(cookieParser());
	router.use(compression());
	//router.use('/', le.middleware());
	router.use(express.static(
		path.join(
			__dirname, '../client/public'
		), {
			maxAge: 3600 //TODO change
		}
	));

	function render(view: string) {
		return (req: Request, res: http.ServerResponse) => {
			app.render(view, {}, (err: Error|null, html: string) => {
				if (err) {
					console.log('err', err);
					res.writeHead(500);
				}
				res.setHeader('Content-type', 'text/html');
				res.end(html);
			});
		}
	}

	router.get('/', render('index'));

	router.use((err, req, res, next) => {
		if (err) {
			console.log(err);
			res.writeHead(500);
		}
		render('404')(req, res);
	});

	http.createServer((req, res) => {
		router(req as Request, res, finalhandler(req, res));
	}).listen(ports.http, () => {
		console.log(`HTTP server listening on port ${ports.http}`);
	});
});