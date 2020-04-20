import {
	TemplateResult,
	PropertyCommitter,
	EventPart,
	BooleanAttributePart,
	AttributeCommitter,
	NodePart,
	isDirective,
	noChange,
} from '../build/modules/lit-html/lit-html.js';
import {
	I18NGetMessage,
	LANGUAGE,
	LANGUAGES,
	DEFAULT_LANG,
} from '../../shared/i18n.js';
import { SSR } from '../build/modules/wc-lib/build/es/lib/ssr/ssr.js';
import { ssr } from '../build/modules/wc-lib/build/es/wc-lib-ssr.js';
import ENTRYPOINTS from '../../shared/entrypoints.js';
import { ENTRYPOINTS_TYPE } from '../../shared/types';
import { WebServer } from '../app.js';
import { Caching } from './cache.js';
import express from 'express';

import * as index from '../../client/build/private/entrypoints/index/exports.bundled.js';
import indexHTML from '../../client/src/entrypoints/index/index.html.js';
import { I18NType } from '../../client/src/i18n/i18n-defs.js';

import en from '../../client/src/i18n/locales/en.json.js';
import nl from '../../client/src/i18n/locales/nl.json.js';

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
		const renderCacheStore = new Caching.CacheStore<
			{
				entrypoint: string;
				lang: LANGUAGE;
			},
			string
		>((stored, current) => {
			return (
				stored.entrypoint === current.entrypoint &&
				stored.lang === current.lang
			);
		});
		function getRenderedText(
			info: ReturnType<typeof Info.getInfo>,
			props: ReturnType<typeof Info.getProps>,
			lang: LANGUAGE
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
				});
			}

			const rendered = ssr(Component as SSR.BaseTypes.BaseClass, {
				props: props,
				attributes: {
					'server-side-rendered': true,
				},
				i18n: langFiles[lang],
				getMessage: I18NGetMessage,
			});

			const html = getHTML({
				defer: true,
				mainTag: rendered,
			});

			return html;
		}

		function isValidLanguage(language: string): language is LANGUAGE {
			return LANGUAGES.includes(language as LANGUAGE);
		}

		function getLang(req: express.Request, res: express.Response) {
			const language = req.cookies['lang'];
			if (!language || !isValidLanguage(language)) {
				res.cookie('lang', DEFAULT_LANG);
				return DEFAULT_LANG;
			}
			return language;
		}

		export function render(
			entrypoint: ENTRYPOINTS_TYPE,
			req: express.Request,
			res: express.Response,
			next: express.NextFunction
		) {
			res.startTime('entrypoint-info', 'Getting entrypoint info');
			const info = Info.getInfo(entrypoint);
			if (!info) {
				// return control to next handler
				next();
				return;
			}

			const lang = getLang(req, res);

			const props = Info.getProps(entrypoint, info, req);
			res.endTime('entrypoint-info');
			res.startTime('check-cache', 'Checking cache');
			const cached = renderCacheStore.getCache({ entrypoint, lang });
			res.endTime('check-cache');

			const html = (() => {
				if (cached) return cached;

				res.startTime('server-side-render', 'Server-side rendering');
				const renderedHTML = getRenderedText(info, props, lang);
				res.endTime('server-side-render');
				renderCacheStore.setCache({ entrypoint, lang }, renderedHTML);
				return renderedHTML;
			})();

			res.status(200);
			res.contentType('.html');
			res.write(html);
			res.end();
		}
	}

	export function registerEntrypointHandlers({
		app,
		io: { noSSR },
	}: WebServer) {
		ENTRYPOINTS.forEach((entrypoint: ENTRYPOINTS_TYPE) => {
			const baseRoute = `/${entrypoint}`;
			const entrypointRoutes =
				entrypoint === 'index' ? [baseRoute, '/'] : [baseRoute];
			entrypointRoutes.forEach((route) => {
				if (!noSSR) {
					app.get(route, (req, res, next) => {
						res.endTime('route-resolution');
						Rendering.render(entrypoint, req, res, next);
					});
				}
				app.get(route, (_req, res, next) => {
					res.endTime('route-resolution');
					renderHTMLFile(entrypoint, res, next);
				});
			});
		});
	}

	export function renderHTMLFile(
		entrypoint: ENTRYPOINTS_TYPE,
		res: express.Response,
		next: express.NextFunction
	) {
		const htmlRenderer = Info.getHTML(entrypoint);

		// Hand control over to "next" function
		if (!htmlRenderer) {
			next();
			return;
		}

		res.status(200);
		res.contentType('.html');
		res.startTime('html-render', 'Rendering of simple HTML file');
		const html = htmlRenderer({});
		res.endTime('html-render');
		res.write(html);
		res.end();
	}
}
