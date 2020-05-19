import { CLIENT_DIR, ROOT_DIR, APP_DIR } from './constants.js';
import serveStatic from 'serve-static';
import { WebServer } from '../app.js';
import { Routes } from './routes.js';
import path from 'path';

export namespace Dev {
	/**
	 * Rewrite all node-style imports to be relative
	 * So 'lit-html' -> '/node_modules/lit-html'
	 */
	function rewriteModuleImports(content: string) {
		return content
			.replace(
				/['"]wc-lib['"]/g,
				"'/node_modules/wc-lib/build/es/wc-lib.js'"
			)
			.replace(
				/['"]lit-html['"]/g,
				"'/node_modules/lit-html/lit-html.js'"
			);
	}

	export function initRoutes({ app }: WebServer) {
		const serveSrc = Routes.serve(path.join(CLIENT_DIR, 'src'), {
			rewrite: rewriteModuleImports,
			extensions: ['js'],
			index: true,
		});
		app.use((req, res, next) => {
			if (req.url.startsWith('/serviceworker.js')) {
				next();
				return;
			}
			serveSrc(req, res, next);
		});

		['node_modules/lit-html', 'node_modules/wc-lib'].forEach(
			(rootSubPath) => {
				app.use(
					Routes.serve(path.join(ROOT_DIR, rootSubPath), {
						extensions: ['js'],
						prefix: `/${rootSubPath}`,
					})
				);
			}
		);

		['wc-lib'].forEach((rootSubPath) => {
			app.use(
				Routes.serve(path.join(ROOT_DIR, 'types/clones', rootSubPath), {
					extensions: ['ts'],
					prefix: `/node_modules/${rootSubPath}`,
				})
			);
		});

		['i18n', 'shared'].forEach((subPath) => {
			app.use(
				Routes.serve(path.join(APP_DIR, subPath), {
					extensions: ['js'],
					prefix: `/${subPath}`,
				})
			);
		});

		app.use(
			serveStatic(path.join(CLIENT_DIR, 'build/private'), {
				index: false,
			})
		);
	}
}
