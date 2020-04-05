import { EntrypointHTMLFileOptions } from '../../../../shared/types.js';
import { html } from '../../../../shared/util.js';

export default function indexHTML({
	defer = false,
	mainTag = html`<sander-ronde></sander-ronde>`
}: EntrypointHTMLFileOptions = {}) {
    return html`
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<title>Sander Ronde</title>
				<meta charset="utf-8" />
				<meta name="description" content="Sander Ronde" />
				<!-- <meta name="manifest" href="/manifest.json" /> -->
				<link rel="icon" href="/favicon.ico" type="images/x-icon" />
			</head>
			<body style="margin: 0;">
				${mainTag}
				<script ${defer ? 'defer async' : ''} type="module" src="/entrypoints/index/index.js"></script>
			</body>
		</html>
		`;
}
