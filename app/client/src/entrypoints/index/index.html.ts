import { EntrypointHTMLFileOptions } from '../../../../shared/types.js';
import { Dev } from '../../../../server/lib/dev.js';
import { html } from '../../../../shared/util.js';
import { head } from '../../shared/html.js';

export default function indexHTML({
	defer = false,
	mainTag = html`<sander-ronde></sander-ronde>`,
	autoReload,
}: EntrypointHTMLFileOptions) {
	return html`
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<title>Sander Ronde</title>
				${head()}
			</head>
			<body style="margin: 0;">
				${mainTag}
				<script
					${defer ? 'defer async' : ''}
					type="module"
					src="/entrypoints/index/index.js"
				></script>
				${autoReload ? Dev.autoReloadHTML() : ''}
			</body>
		</html>
	`;
}
