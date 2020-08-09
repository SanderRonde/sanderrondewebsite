import { manifestJSON } from '../semi-static/manifest.json.js';
import { RequestVars } from './request-vars.js';
import { CACHE_HEADER } from './constants.js';
import { THEME } from '../../shared/theme.js';
import { WebServer } from '../app.js';
import { Caching } from './cache.js';

export namespace SemiStaticFiles {
	export function initRoutes({ app }: WebServer) {
		const manifestCache = Caching.createStore<
			THEME,
			{
				content: string;
				mime: string;
			}
		>(false);
		app.get('/manifest.json', (req, res) => {
			const theme = RequestVars.getTheme(req, res);
			const { content, mime } = (() => {
				if (manifestCache.has(theme)) {
					return manifestCache.get(theme)!;
				}
				return manifestJSON(theme);
			})();
			res.contentType(mime);
			res.set('Cache-Control', CACHE_HEADER);
			res.end(content);
		});
	}
}
