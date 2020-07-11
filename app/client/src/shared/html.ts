import { Theme } from '../../../shared/theme.js';
import { html } from '../../../shared/util.js';

const _icons = html`
	<link
		rel="apple-touch-icon"
		sizes="57x57"
		href="/images/apple-icon-57x57.png"
	/>
	<link
		rel="apple-touch-icon"
		sizes="60x60"
		href="/images/apple-icon-60x60.png"
	/>
	<link
		rel="apple-touch-icon"
		sizes="72x72"
		href="/images/apple-icon-72x72.png"
	/>
	<link
		rel="apple-touch-icon"
		sizes="76x76"
		href="/images/apple-icon-76x76.png"
	/>
	<link
		rel="apple-touch-icon"
		sizes="114x114"
		href="/images/apple-icon-114x114.png"
	/>
	<link
		rel="apple-touch-icon"
		sizes="120x120"
		href="/images/apple-icon-120x120.png"
	/>
	<link
		rel="apple-touch-icon"
		sizes="144x144"
		href="/images/apple-icon-144x144.png"
	/>
	<link
		rel="apple-touch-icon"
		sizes="152x152"
		href="/images/apple-icon-152x152.png"
	/>
	<link
		rel="apple-touch-icon"
		sizes="180x180"
		href="/images/apple-icon-180x180.png"
	/>
	<link
		rel="icon"
		type="image/png"
		sizes="192x192"
		href="/images/android-icon-192x192.png"
	/>
	<link
		rel="icon"
		type="image/png"
		sizes="32x32"
		href="/images/favicon-32x32.png"
	/>
	<link
		rel="icon"
		type="image/png"
		sizes="96x96"
		href="/images/favicon-96x96.png"
	/>
	<link
		rel="icon"
		type="image/png"
		sizes="16x16"
		href="/images/favicon-16x16.png"
	/>
	<meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
	<meta name="theme-color" content="#ffffff" />
`;
export function icons() {
	return _icons;
}

export const head = (theme: Theme) => html`
	<!-- Essentials -->
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<!-- CSP -->
	<meta http-equiv="Content-Security-Policy" content="default-src 'self'" />

	<!-- Meta info -->
	<meta name="description" content="Sander Ronde" />
	<meta name="theme-color" content="${theme.primary.main}" />
	<meta name="robots" content="index,follow" />
	<meta name="googlebot" content="index,follow" />

	<!-- Search result stuff -->
	<link rel="canonical" href="https://sanderron.de/" />

	<!-- Me -->
	<link rel="me" href="mailto:sander@sanderron.de" />

	<!-- Facebook -->
	<meta property="og:url" content="https://sanderron.de/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Sander Ronde" />
	<meta property="og:image" content="https://sanderron.de/icons/512.png" />
	<meta property="og:image:alt" content="Sander Ronde" />
	<meta property="og:description" content="Sander Ronde's personal website" />
	<meta property="og:site_name" content="Sander Ronde" />
	<meta property="og:locale" content="en_US" />
	<meta property="article:author" content="Sander Ronde" />

	<!-- Twitter -->
	<meta name="twitter:card" content="Sander Ronde's personal website" />
	<meta name="twitter:url" content="https://sanderron.de/" />
	<meta name="twitter:title" content="Sander Ronde" />
	<meta
		name="twitter:description"
		content="Sander Ronde's personal website"
	/>
	<meta name="twitter:image" content="https://sanderron.de/icons/512.png" />
	<meta name="twitter:image:alt" content="Sander Ronde" />

	${icons()}
	<link
		crossorigin
		rel="preload"
		href="/fonts/Roboto-Regular.ttf"
		as="font"
	/>
	<link rel="manifest" href="/manifest.json" />
	<link rel="icon" href="/images/favicon.ico" type="images/x-icon" />
	<style>
		@font-face {
			font-family: 'Roboto';
			font-style: normal;
			font-weight: 400;
			font-display: swap;
			src: local('Roboto'), local('Roboto-Regular'),
				url('/fonts/Roboto-Regular.ttf');
		}

		span[data-type='html'] {
			font-family: 'Roboto';
		}
	</style>
`;
