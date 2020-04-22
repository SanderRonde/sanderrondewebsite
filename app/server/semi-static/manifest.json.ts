import { THEME, themes } from '../../shared/theme.js';
import { Caching } from '../lib/cache.js';

const cache = Caching.createStore<THEME, string>(false);
const MIME_TYPE = '.json';

export function manifestJSON(
	theme: THEME
): {
	content: string;
	mime: typeof MIME_TYPE;
} {
	if (cache.has(theme))
		return {
			content: cache.get(theme)!,
			mime: MIME_TYPE,
		};

	const value = JSON.stringify({
		$schema: 'http://json.schemastore.org/web-manifest',
		name: 'Sander Ronde',
		dir: 'ltr',
		lang: 'nl',
		short_name: 'Sander Ronde',
		start_url: '/',
		orientation: 'portrait-primary',
		display: 'minimal-ui',
		background_color: themes[theme].background.main,
		theme_color: themes[theme].primary.main,
		description: 'Sander Ronde personal website',
		icons: [
			{
				src: 'images/48.png',
				sizes: '48x48',
				type: 'image/png',
			},
			{
				src: 'images/72.png',
				sizes: '72x72',
				type: 'image/png',
			},
			{
				src: 'images/96.png',
				sizes: '96x96',
				type: 'image/png',
			},
			{
				src: 'images/144.png',
				sizes: '144x144',
				type: 'image/png',
			},
			{
				src: 'images/168.png',
				sizes: '168x168',
				type: 'image/png',
			},
			{
				src: 'images/192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: 'images/512.png',
				sizes: '512x512',
				type: 'image/png',
			},
		],
	});
	cache.set(theme, value);
	return {
		content: value,
		mime: MIME_TYPE,
	};
}
