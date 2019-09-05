import * as serveStatic from 'serve-static';
import { Express } from 'express';
import * as path from 'path';

const THESIS_FILE = path.join(__dirname, '../', 'repos',
	'bachelor-thesis', 'docs/assets', 'thesis.pdf');

export function initRoutes(app: Express) {
	app.use(serveStatic(path.join(__dirname, '../client/public'), {
		extensions: ['pdf'],
		index: false
	}));
	app.get('/thesis(.pdf)?', (_req, res, _next) => {
		res.sendFile(THESIS_FILE);
	});
	app.use((_req, res, _next) => {
		res.status(404).send('404');
	});
}