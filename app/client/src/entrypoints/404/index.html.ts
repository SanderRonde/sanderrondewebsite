import { EntrypointHTMLFileOptions } from '../../../../shared/types.js';
import { themes } from '../../../../shared/theme.js';
import { html } from '../../../../shared/util.js';
import { head } from '../../shared/html.js';

export default async function notFoundHTML({
	autoReload,
	theme,
	lang,
	hostname,
}: EntrypointHTMLFileOptions) {
	return html`
		<!DOCTYPE html>
		<html lang="${lang}">
			<head>
				<title>Sander Ronde</title>
				${head(themes[theme], hostname, autoReload)}
				<style>
					body {
						margin: 0;
					}

					.vertical-centerer {
						width: 100vw;
						height: 100vh;
						display: flex;
						flex-direction: column;
						justify-content: center;
					}

					.horizontal-centerer {
						width: 100vw;
						display: flex;
						flex-direction: row;
						justify-content: center;
					}

					@media screen and (max-width: 999px) {
						#main-text {
							font-size: 14vw;
						}
					}
					@media screen and (min-width: 1000px) {
						#main-text {
							font-size: 1000%;
						}
					}
					#main-text {
						line-height: 0.9em;
						margin: 0;
						font-weight: normal;
						color: ${themes[theme].highlight.main};
					}
				</style>
			</head>
			<body
				style="margin: 0; background-color: ${themes[theme].background
					.main};"
			>
				<div class="vertical-centerer">
					<div class="horizontal-centerer">
						<header id="main-text">
							404 :(
						</header>
					</div>
				</div>
				${autoReload
					? ((await eval("import('@sanderronde/autoreload')")) as {
							default: typeof import('@sanderronde/autoreload');
					  }).default.includeHTML
					: ''}
			</body>
		</html>
	`;
}
