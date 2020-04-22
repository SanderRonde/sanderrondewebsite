import { manifestJSON } from '../semi-static/manifest.json.js';
import { RequestVars } from './request-vars.js';
import { WebServer } from '../app.js';

export namespace SemiStaticFiles {
	export function initRoutes({ app }: WebServer) {
		app.get('/manifest.json', (req, res) => {
			const theme = RequestVars.getTheme(req, res);
			const { content, mime } = manifestJSON(theme);
			res.contentType(mime);
			res.end(content);
		});
	}
}
