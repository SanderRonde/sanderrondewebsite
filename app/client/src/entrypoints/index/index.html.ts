import { EntrypointHTMLFileOptions } from '../../../../shared/types.js';
import { themes } from '../../../../shared/theme.js';
import { html } from '../../../../shared/util.js';
import { head } from '../../shared/html.js';

export default async function indexHTML({
	defer = false,
	mainTag = 'sander-ronde',
	autoReload,
	theme,
	lang,
}: EntrypointHTMLFileOptions) {
	return html`
		<!DOCTYPE html>
		<html lang="${lang}">
			<head>
				<title>Sander Ronde</title>
				${head(themes[theme])}
			</head>
			<body
				style="margin: 0; background-color: ${themes[theme].background
					.main};"
			>
				${html`<${mainTag}>Javascript is not enabled, please enable it to use this website</${mainTag}>`}
				<script
					${defer ? 'defer async' : ''}
					type="module"
					src="/entrypoints/index/index.js"
				></script>
				${autoReload
					? (await import('@sanderronde/autoreload')).default
							.includeHTML
					: ''}
			</body>
		</html>
	`;
}
