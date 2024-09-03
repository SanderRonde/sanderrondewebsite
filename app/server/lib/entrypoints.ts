import {
	TemplateResult,
	PropertyCommitter,
	EventPart,
	BooleanAttributePart,
	AttributeCommitter,
	NodePart,
	isDirective,
	noChange,
	directive,
} from '../build/modules/lit-html/lit-html.js';
import { SSR } from '../build/modules/wc-lib/build/es/lib/ssr/ssr.js';
import { ssr } from '../build/modules/wc-lib/build/es/wc-lib-ssr.js';
import {
	I18NGetMessage,
	LANGUAGE,
	strToLanguage,
	LANG_COOKIE_NAME,
} from '../../i18n/i18n.js';
import { CLIENT_DIR, CACHE_HEADER } from './constants.js';
import { themes, THEME, strToTheme } from '../../shared/theme.js';
import { ENTRYPOINTS_TYPE } from '../../shared/types';
import ENTRYPOINTS from '../../shared/entrypoints.js';
import { SpdyExpressResponse } from './routes.js';
import { RequestVars } from './request-vars.js';
import { WebServer } from '../app.js';
import { Caching } from './cache.js';
import { Duplex } from 'stream';
import { Log } from './log.js';
import express from 'express';
import fs from 'fs-extra';
import path from 'path';

import * as index from '../../client/build/private/entrypoints/index/exports.bundled.js';
import indexHTML from '../../client/src/entrypoints/index/index.html.js';
import { I18NType } from '../../i18n/i18n-defs';

import en from '../../i18n/locales/en.json.js';
import nl from '../../i18n/locales/nl.json.js';

const langFiles: {
	[key in LANGUAGE]: I18NType;
} = {
	en,
	nl,
};

export namespace Entrypoints {
	namespace Info {
		export function getHTML(entrypoint: ENTRYPOINTS_TYPE) {
			switch (entrypoint) {
				case 'index':
					return indexHTML;
			}
		}

		function getImport(entrypoint: ENTRYPOINTS_TYPE) {
			switch (entrypoint) {
				case 'index':
					return index;
			}
		}

		export function getInfo(entrypoint: ENTRYPOINTS_TYPE) {
			const info = getImport(entrypoint);
			const html = getHTML(entrypoint);
			if (info && html) {
				return {
					...info,
					getHTML: html,
				};
			}
			return undefined;
		}

		export function getProps(
			entrypoint: ENTRYPOINTS_TYPE,
			_info: ReturnType<typeof getInfo>,
			_req: express.Request
		) {
			switch (entrypoint) {
				case 'index':
					return {};
			}
		}
	}

	namespace Rendering {
		const renderCacheStore = Caching.createStore<
			{
				entrypoint: string;
				lang: LANGUAGE;
				theme: THEME;
			},
			string
		>(true, (stored, current) => {
			return (
				stored.entrypoint === current.entrypoint &&
				stored.lang === current.lang &&
				stored.theme === current.theme
			);
		});
		const serverSideRenderCacheStore = Caching.createStore<
			{
				entrypoint: string;
				lang: LANGUAGE;
				theme: THEME;
			},
			string
		>(true, (stored, current) => {
			return (
				stored.entrypoint === current.entrypoint &&
				stored.lang === current.lang &&
				stored.theme === current.theme
			);
		});

		export async function getServerSideRendered(
			info: ReturnType<typeof Info.getInfo>,
			props: ReturnType<typeof Info.getProps>,
			lang: LANGUAGE,
			theme: THEME,
			entrypoint: ENTRYPOINTS_TYPE,
			res: SpdyExpressResponse,
			cache: boolean = true
		) {
			if (cache) {
				res.startTime('check-cache', 'Checking cache');
				const cached = serverSideRenderCacheStore.get({
					entrypoint,
					lang,
					theme,
				});
				res.endTime('check-cache');
				if (cached) return cached;
			}

			const { Component } = info!;

			if ('initComplexTemplateProvider' in Component) {
				Component.initComplexTemplateProvider({
					TemplateResult,
					PropertyCommitter,
					EventPart,
					BooleanAttributePart,
					AttributeCommitter,
					NodePart,
					isDirective,
					noChange,
					directive,
				});
			}

			res.startTime('server-side-render', 'Server-side rendering');
			const rendered = await ssr(Component as SSR.BaseTypes.BaseClass, {
				props: props,
				attributes: {
					'server-side-rendered': true,
				},
				i18n: langFiles[lang],
				getMessage: I18NGetMessage,
				theme: themes[theme],
				themeName: theme,
				await: true,
				lang,
			});
			res.endTime('server-side-render');

			serverSideRenderCacheStore.set(
				{ entrypoint, lang, theme },
				rendered
			);

			return rendered;
		}

		async function getRenderedText(
			info: ReturnType<typeof Info.getInfo>,
			props: ReturnType<typeof Info.getProps>,
			lang: LANGUAGE,
			theme: THEME,
			{ io }: WebServer,
			entrypoint: ENTRYPOINTS_TYPE,
			res: SpdyExpressResponse
		) {
			const { Component, getHTML } = info!;

			if ('initComplexTemplateProvider' in Component) {
				Component.initComplexTemplateProvider({
					TemplateResult,
					PropertyCommitter,
					EventPart,
					BooleanAttributePart,
					AttributeCommitter,
					NodePart,
					isDirective,
					noChange,
					directive,
				});
			}

			const rendered = await getServerSideRendered(
				info,
				props,
				lang,
				theme,
				entrypoint,
				res,
				false
			);

			const html = await getHTML({
				theme,
				lang,
				defer: true,
				mainTag: rendered,
				autoReload: io.dev && !io.noAutoReload,
			});

			return html;
		}

		export async function render(
			entrypoint: ENTRYPOINTS_TYPE,
			route: string,
			req: express.Request,
			res: SpdyExpressResponse,
			next: express.NextFunction,
			server: WebServer
		) {
			if (applyLangQueryParam(req, res, route)) return;

			res.startTime('entrypoint-info', 'Getting entrypoint info');
			const info = Info.getInfo(entrypoint);
			if (!info) {
				// return control to next handler
				next();
				return;
			}

			const lang = RequestVars.getLang(req, res);
			const theme = RequestVars.getTheme(req, res);

			const props = Info.getProps(entrypoint, info, req);
			res.endTime('entrypoint-info');
			res.startTime('check-cache', 'Checking cache');
			const cached = renderCacheStore.get({ entrypoint, lang, theme });
			res.endTime('check-cache');

			const html = await (async () => {
				if (cached) return cached;

				const renderedHTML = await getRenderedText(
					info,
					props,
					lang,
					theme,
					server,
					entrypoint,
					res
				);
				renderCacheStore.set({ entrypoint, lang, theme }, renderedHTML);
				return renderedHTML;
			})();

			pushEntrypoint(res, entrypoint);

			res.status(200);
			res.set('Cache-Control', CACHE_HEADER);
			res.contentType('.html');
			res.write(html);
			res.end();
		}
	}

	const entrypointBundleCache = new Caching.FileCache();
	async function pushEntrypoint(
		res: SpdyExpressResponse,
		entrypoint: ENTRYPOINTS_TYPE
	) {
		if (res.push) {
			const fileURL = `entrypoints/${entrypoint}/${entrypoint}.js`;
			const srcFile = path.join(CLIENT_DIR, 'build/public', fileURL);
			const stream: Duplex = res.push(`/${fileURL}`, {
				status: 200,
				method: 'GET',
				request: {
					accept: '*/*',
				},
				response: {
					'Content-Type': 'application/javascript',
					'Cache-Control': CACHE_HEADER,
				},
			});
			stream.on('error', (err) => {
				Log.error('push', 'Failed to push file', err);
			});
			if (!entrypointBundleCache.has(srcFile)) {
				entrypointBundleCache.set(
					srcFile,
					await fs.readFile(srcFile, {
						encoding: 'utf8',
					})
				);
			}
			stream.write(entrypointBundleCache.get(srcFile));
			stream.end();
		}
	}

	export function registerEntrypointHandlers(server: WebServer) {
		const { app, io } = server;
		ENTRYPOINTS.forEach((entrypoint: ENTRYPOINTS_TYPE) => {
			const baseRoute = `/${entrypoint}`;
			const entrypointRoutes =
				entrypoint === 'index' ? [baseRoute, '/'] : [baseRoute];
			entrypointRoutes.forEach((route) => {
				if (!io.noSSR) {
					app.get(
						`${route}/`,
						async (req, res: SpdyExpressResponse, next) => {
							res.endTime('route-resolution');
							await Rendering.render(
								entrypoint,
								route,
								req,
								res,
								next,
								server
							);
						}
					);
					app.get(
						`${route}/ssr/:lang/:theme`,
						async (req, res: SpdyExpressResponse) => {
							res.endTime('route-resolution');
							const info = Info.getInfo(entrypoint);

							const lang = strToLanguage(req.params['lang']);
							const theme = strToTheme(req.params['theme']);

							if (!lang) {
								res.status(400).write('Invalid language');
								res.end();
								return;
							}
							if (!theme) {
								res.status(400).write('Invalid theme');
								res.end();
								return;
							}

							const rendered = await Rendering.getServerSideRendered(
								info,
								Info.getProps(entrypoint, info, req),
								lang,
								theme,
								entrypoint,
								res,
								true
							);

							res.status(200);
							res.set('Cache-Control', CACHE_HEADER);
							res.contentType('.txt');
							res.write(rendered);
							res.end();
						}
					);
				}
				app.get(
					`${route}/`,
					async (req, res: SpdyExpressResponse, next) => {
						res.endTime('route-resolution');
						await renderHTMLFile(
							entrypoint,
							route,
							req,
							res,
							next,
							server
						);
					}
				);
				app.post('/get_vars', async (req, res: SpdyExpressResponse) => {
					res.endTime('route-resolution');

					const lang = RequestVars.getLang(req, res);
					const theme = RequestVars.getTheme(req, res);

					res.status(200);
					res.contentType('json');
					res.write(
						JSON.stringify({
							lang,
							theme,
						})
					);
					res.end();
				});
			});
		});
	}

	function applyLangQueryParam(
		req: express.Request,
		res: SpdyExpressResponse,
		route: string
	) {
		if (req.query && req.query.lang) {
			const lang = strToLanguage(req.query.lang);
			if (lang) {
				res.cookie(LANG_COOKIE_NAME, lang);
			}
			res.redirect(302, route);
			return true;
		}
		return false;
	}

	export async function renderHTMLFile(
		entrypoint: ENTRYPOINTS_TYPE,
		route: string,
		req: express.Request,
		res: SpdyExpressResponse,
		next: express.NextFunction,
		{ io }: WebServer
	) {
		if (applyLangQueryParam(req, res, route)) return;

		const htmlRenderer = Info.getHTML(entrypoint);

		// Hand control over to "next" function
		if (!htmlRenderer) {
			next();
			return;
		}

		pushEntrypoint(res, entrypoint);

		res.status(200);
		res.contentType('.html');
		res.startTime('html-render', 'Rendering of simple HTML file');
		res.set('Cache-Control', CACHE_HEADER);
		const lang = RequestVars.getLang(req, res);
		const theme = RequestVars.getTheme(req, res);
		const html = await htmlRenderer({
			lang,
			theme,
			autoReload: io.dev && !io.noAutoReload,
		});
		res.endTime('html-render');
		res.write(html);
		res.end();
	}
}
