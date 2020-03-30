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
import { SSR } from '../build/modules/wc-lib/build/es/lib/ssr/ssr.js';
import { ssr } from '../build/modules/wc-lib/build/es/wc-lib-ssr.js';
import { ENTRYPOINTS } from './constants.js';
import { WebServer } from '../app.js';
import express from 'express';

import * as index from '../../client/build/entrypoints/index/exports.bundled.js';
import indexHTML from '../../client/src/entrypoints/index/index.html.js';
import { Caching } from './cache.js';

export namespace Entrypoints {
    export interface EntrpointHTMLFileOptions {
        defer?: boolean;
        mainTag?: string;
    }

    namespace Info {
        export function getHTML(entrypoint: ENTRYPOINTS) {
            switch (entrypoint) {
                case 'index':
                    return indexHTML;
            }
            return undefined;
        }

        function getImport(entrypoint: ENTRYPOINTS) {
            switch (entrypoint) {
                case 'index':
                    return index;
            }
            return undefined;
        }

        export function getInfo(entrypoint: ENTRYPOINTS) {
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
            entrypoint: ENTRYPOINTS,
            _info: ReturnType<typeof getInfo>,
            _req: express.Request
        ) {
            switch (entrypoint) {
                case 'index':
                    return {};
            }
            return {};
        }
    }

    namespace Rendering {
		const renderCacheStore = new Caching.CacheStore<
            {
                entrypoint: string;
            },
            string
        >((stored, current) => {
            return stored.entrypoint === current.entrypoint;
        });
        function getRenderedText(
            info: ReturnType<typeof Info.getInfo>,
            props: ReturnType<typeof Info.getProps>
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
            });

            const html = getHTML({
                defer: true,
                mainTag: rendered,
			});

            return html;
        }

        export function render(
            entrypoint: ENTRYPOINTS,
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) {
            const info = Info.getInfo(entrypoint);
            if (!info) {
                // return control to next handler
                next();
                return;
            }

            const props = Info.getProps(entrypoint, info, req);
            const cached = renderCacheStore.getCache({ entrypoint });

            const html = (() => {
				if (cached) return cached;

				const renderedHTML = getRenderedText(info, props);
				renderCacheStore.setCache({ entrypoint }, renderedHTML);
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
        ENTRYPOINTS.forEach((entrypoint) => {
            const baseRoute = `/${entrypoint}`;
            const entrypointRoutes =
                entrypoint === 'index' ? [baseRoute, '/'] : [baseRoute];
            entrypointRoutes.forEach((route) => {
                if (!noSSR) {
                    app.get(route, (req, res, next) => {
                        Rendering.render(entrypoint, req, res, next);
                    });
                }
                app.get(route, (_req, res, next) => {
                    renderHTMLFile(entrypoint, res, next);
                });
            });
        });
    }

    export function renderHTMLFile(
        entrypoint: ENTRYPOINTS,
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
        res.write(htmlRenderer({}));
        res.end();
    }
}
