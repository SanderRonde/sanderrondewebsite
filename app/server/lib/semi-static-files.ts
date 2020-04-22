import { WebServer } from '../app';
import { manifestJSON } from '../semi-static/manifest.json';
import { RequestVars } from './request-vars';

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
