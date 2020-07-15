import { LANGUAGES } from '../../../i18n/i18n.js';
import { Theme } from '../../../shared/theme.js';
import { html } from '../../../shared/util.js';

function getAnalyticsIndex(hostname: string) {
	if (hostname.includes('sanderronde.nl')) return 6;
	if (hostname.includes('sanderronde.com')) return 5;
	return 7;
}

const _icons = html`
	<link
		rel="apple-touch-icon"
		sizes="57x57"
		href="/icons/apple-icon-57x57.png"
	/>
	<link
		rel="apple-touch-icon"
		sizes="60x60"
		href="/icons/apple-icon-60x60.png"
	/>
	<link
		rel="apple-touch-icon"
		sizes="72x72"
		href="/icons/apple-icon-72x72.png"
	/>
	<link
		rel="apple-touch-icon"
		sizes="76x76"
		href="/icons/apple-icon-76x76.png"
	/>
	<link
		rel="apple-touch-icon"
		sizes="114x114"
		href="/icons/apple-icon-114x114.png"
	/>
	<link
		rel="apple-touch-icon"
		sizes="120x120"
		href="/icons/apple-icon-120x120.png"
	/>
	<link
		rel="apple-touch-icon"
		sizes="144x144"
		href="/icons/apple-icon-144x144.png"
	/>
	<link
		rel="apple-touch-icon"
		sizes="152x152"
		href="/icons/apple-icon-152x152.png"
	/>
	<link
		rel="apple-touch-icon"
		sizes="180x180"
		href="/icons/apple-icon-180x180.png"
	/>
	<link
		rel="icon"
		type="image/png"
		sizes="192x192"
		href="/icons/android-icon-192x192.png"
	/>
	<link
		rel="icon"
		type="image/png"
		sizes="32x32"
		href="/icons/favicon-32x32.png"
	/>
	<link
		rel="icon"
		type="image/png"
		sizes="96x96"
		href="/icons/favicon-96x96.png"
	/>
	<link
		rel="icon"
		type="image/png"
		sizes="16x16"
		href="/icons/favicon-16x16.png"
	/>
	<meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
	<meta name="theme-color" content="#ffffff" />
`;
export function icons() {
	return _icons;
}

export const head = (theme: Theme, hostname: string, dev: boolean) => html`
	<!-- Essentials -->
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<!-- CSP -->
	<meta
		http-equiv="Content-Security-Policy"
		content="${dev
			? "default-src 'self' 'unsafe-inline'; img-src 'self' https://www.google-analytics.com; script-src-elem 'self' https://www.googletagmanager.com https://www.google-analytics.com; connect-src *"
			: "default-src 'self' 'unsafe-inline'; img-src 'self' https://www.google-analytics.com; script-src-elem 'self' https://www.googletagmanager.com https://www.google-analytics.com"}"
	/>

	<!-- Meta info -->
	<meta name="description" content="Sander Ronde" />
	<meta name="theme-color" content="${theme.primary.main}" />
	<meta name="robots" content="index,follow" />
	<meta name="googlebot" content="index,follow" />

	<!-- Search result stuff -->
	<link rel="canonical" href="https://sanderron.de/" />
	${LANGUAGES.map((language) => {
		return html`<link
			rel="alternate"
			hreflang="${language}"
			href="https://sanderron.de/?lang=${language}"
		/>`;
	}).join('\n')}
	<link rel="alternate" hreflang="x-default" href="https://sanderron.de/" />

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
	<link rel="icon" href="/icons/favicon.ico" type="images/x-icon" />
	<style>
		@font-face {
			font-family: 'Roboto';
			font-style: normal;
			font-weight: 400;
			font-display: swap;
			src: local('Roboto'), local('Roboto-Regular'),
				url('/fonts/Roboto-Regular.ttf');
		}

		span[data-type='html'],
		#main-text {
			font-family: 'Roboto';
		}
	</style>

	<!-- Google Analytics -->
	<script
		async
		defer
		src="https://www.googletagmanager.com/gtag/js?id=UA-38781084-${getAnalyticsIndex(hostname)}"
	></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', 'UA-38781084-${getAnalyticsIndex(hostname)}');
	</script>
`;
