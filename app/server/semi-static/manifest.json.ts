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

	const dimensions = ['48', '72', '96', '128', '144', '168', '192', '512'];
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
			...dimensions.map((dimension) => ({
				src: `images/${dimension}.png`,
				sizes: `${dimension}x${dimension}`,
				type: 'image/png',
				purpose: 'badge any',
			})),
			...dimensions.map((dimension) => ({
				src: `images/${dimension}_masked.png`,
				sizes: `${dimension}x${dimension}`,
				type: 'image/png',
				purpose: 'maskable',
			})),
		],
	});
	cache.set(theme, value);
	return {
		content: value,
		mime: MIME_TYPE,
	};
}
