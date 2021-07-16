import {
	SWConfig,
	SERVE_STATEGY,
	VersionMap,
	ENTRYPOINTS_TYPE,
} from './app/shared/types';
import {
	inlineTypedCSSPipe,
	generateHTMLCustomData,
	joinCustomData,
	HTMLCustomData,
} from 'wc-lib/build/cjs/tasks';
import * as builtins from 'rollup-plugin-node-builtins';
import * as _resolve from '@rollup/plugin-node-resolve';
import * as _sourcemaps from 'rollup-plugin-sourcemaps';
import * as _commonjs from '@rollup/plugin-commonjs';
import { ConfigurableWebComponent } from 'wc-lib';
import * as _json from '@rollup/plugin-json';
import * as htmlTypings from 'html-typings';
import * as uglify from 'uglify-es';
import * as crypto from 'crypto';
import * as rollup from 'rollup';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as glob from 'glob';
import * as gulp from 'gulp';
// @ts-ignore
import * as esm from 'esm';

(require as any).extensions['.js'] = function (module: any, filename: string) {
	const content = fs.readFileSync(filename, 'utf8');
	module._compile(content, filename);
};

const ENTRYPOINTS: ENTRYPOINTS_TYPE[] = ['index'];
const HOSTS = ['sanderron.de', 'sanderronde.com', 'sanderronde.nl'];
const STATIC_FILES: {
	src: string;
	path: string;
	langmap?: {
		[lang: string]: string;
	};
}[] = [
	{
		src: path.join(__dirname, 'app/client/static/cv.en.pdf'),
		path: '/cv',
		langmap: {
			en: '/cv.en.pdf',
			nl: '/cv.nl.pdf',
		},
	},
	{
		src: path.join(
			__dirname,
			'app/repos/bachelor-thesis/docs/assets/thesis.pdf'
		),
		path: '/bachelor-thesis',
	},
	{
		src: path.join(
			__dirname,
			'app/repos/master-thesis/paper/src/main.pdf'
		),
		path: '/master-thesis',
	},
];

const SEMI_STATIC_FILES = ['manifest.json'];

const json = (_json as unknown) as typeof _json.default;
const resolve = (_resolve as unknown) as typeof _resolve.default;
const commonjs = (_commonjs as unknown) as typeof _commonjs.default;
const sourcemaps = (_sourcemaps as unknown) as typeof _sourcemaps.default;

const CACHE_EXTENSIONS = [
	'js',
	'html',
	'ico',
	'json',
	'css',
	'png',
	'jpg',
	'jpeg',
	'webp',
];
const EXTENSION_GLOB = `{${CACHE_EXTENSIONS.join(',')}}`;

/**
 * Converts a string with dashes in
 * it to one that uses casing.
 * For example a-b-c -> aBC
 * foo-bar-baz -> fooBarBaz
 *
 * @param {string} str - The input
 *
 * @returns {string} - The converted string
 */
function dashesToCasing(str: string): string {
	let newStr = '';
	for (let i = 0; i < str.length; i++) {
		if (str[i] === '-') {
			newStr += str[i + 1].toUpperCase();
			i++;
		} else {
			newStr += str[i];
		}
	}
	return newStr;
}

/**
 * Glob but promisified
 * @param {string} pattern - The pattern to use
 * @param {glob.IOptions} [options] - Optional options
 *
 * @returns {Promise<string[]>} The matches
 */
function globPromise(
	pattern: string,
	options?: glob.IOptions
): Promise<string[]> {
	return new Promise<string[]>((resolve, reject) => {
		glob(pattern, options || {}, (error, matches) => {
			if (error) {
				reject(error);
			} else {
				resolve(matches);
			}
		});
	});
}

/**
 * Create a simple rollup bundle and uglify it
 */
async function createBundle(
	inPath: string,
	outPath: string,
	name: string,
	{
		format = 'iife',
		plugins = [resolve(), json()],
		uglify: doUglify = true,
	}: {
		format?: rollup.ModuleFormat;
		plugins?: rollup.Plugin[];
		uglify?: boolean;
	} = {}
) {
	const bundle = await rollup.rollup({
		input: inPath,
		output: {
			file: outPath,
			name: name,
			format,
		},
		onwarn: (warning, defaultHandler) => {
			if (warning.code === 'THIS_IS_UNDEFINED') {
				// Ignore
				return;
			}
			defaultHandler(warning);
		},
		plugins: [
			...plugins,
			...(process.env.ENV === 'dev' ? [sourcemaps()] : []),
		],
	});

	const { output } = await bundle.generate({
		file: outPath,
		name: name,
		format,
	});

	if (output.length === 0) {
		throw new Error('No output generated');
	}

	const code = (() => {
		if (!doUglify || process.env.ENV === 'dev') {
			return output[0].code;
		}
		const { error, code } = uglify.minify(output[0].code);
		if (error) {
			throw error;
		}
		return code;
	})();

	await fs.mkdirp(path.dirname(outPath));
	await fs.writeFile(outPath, code, {
		encoding: 'utf8',
	});
}

/**
 * Bundle all components into a single file
 */
gulp.task(
	'bundle',
	gulp.series(
		gulp.parallel(
			function copy() {
				const srcDir = path.join(__dirname, 'app/client/src');
				const destDir = path.join(__dirname, 'app/client/temp');
				return gulp
					.src(['**/*.js', '**/*.json', '!**/*.css.js'], {
						cwd: srcDir,
						base: srcDir,
					})
					.pipe(gulp.dest(destDir));
			},
			function minifyCSS() {
				const srcDir = path.join(__dirname, 'app/client/src');
				const destDir = path.join(__dirname, 'app/client/temp');
				return (
					gulp
						.src(['**/*.css.js'], {
							cwd: srcDir,
							base: srcDir,
						})
						.pipe(inlineTypedCSSPipe())
						// .pipe(
						// 	createPipable(async (content) => {
						// 		const minifier = new CleanCSS();
						// 		return content.replace(
						// 			/<style>((.|\n|\r)*?)<\/style>/g,
						// 			(_, innerContent) => {
						// 				return `<style>${
						// 					minifier.minify(innerContent).styles
						// 				}</style>`;
						// 			}
						// 		);
						// 	})
						// )
						.pipe(gulp.dest(destDir))
				);
			}
		),
		async function bundle() {
			await Promise.all(
				ENTRYPOINTS.map(async (entrypoint: ENTRYPOINTS_TYPE) => {
					await createBundle(
						path.join(
							__dirname,
							'app/client/temp/entrypoints/',
							entrypoint,
							`${entrypoint}.js`
						),
						path.join(
							__dirname,
							'app/client/build/public/entrypoints/',
							entrypoint,
							`${entrypoint}.js`
						),
						dashesToCasing(entrypoint)
					);
				})
			);
		}
	)
);

/**
 * Copy built files
 */
gulp.task(
	'copy',
	gulp.parallel(function copyI18N() {
		return gulp
			.src('*.json', {
				cwd: 'app/client/src/i18n/locales',
				base: 'app/client/src/i18n/locales',
			})
			.pipe(gulp.dest('app/client/build/public/i18n/locales/'));
	})
);

/**
 * Prepare rendering through server-side rendering
 * by bundling all component files
 */

gulp.task('prep-ssr', async function prepSSR() {
	await Promise.all(
		ENTRYPOINTS.map(async (entrypoint: ENTRYPOINTS_TYPE) => {
			// Bundle
			try {
				await createBundle(
					path.join(
						__dirname,
						'app/client/src/entrypoints/',
						entrypoint,
						`exports.js`
					),
					path.join(
						__dirname,
						'app/client/build/private/entrypoints/',
						entrypoint,
						`exports.bundled.js`
					),
					dashesToCasing(entrypoint),
					{
						uglify: false,
						format: 'esm',
					}
				);
			} catch (e) {
				console.log(e);
			}

			// Now copy the definitions
			let definitions = await fs.readFile(
				path.join(
					__dirname,
					'app/client/src/entrypoints/',
					entrypoint,
					`exports.d.ts`
				),
				{
					encoding: 'utf8',
				}
			);

			// Fix the import
			definitions = definitions.replace(
				/'..\/..\/components\//,
				"'../../../../src/components/"
			);
			const definitionsOutPath = path.join(
				__dirname,
				'app/client/build/private/entrypoints/',
				entrypoint,
				'exports.bundled.d.ts'
			);
			await fs.mkdirp(path.dirname(definitionsOutPath));
			await fs.writeFile(definitionsOutPath, definitions, {
				encoding: 'utf8',
			});
		})
	);
});

/**
 * Bundle modules into a single file
 */
gulp.task(
	'modules',
	gulp.parallel(
		gulp.series(
			function copyDefinitionsWCLib() {
				return gulp
					.src([
						'node_modules/wc-lib/**/*.js',
						'node_modules/wc-lib/**/*.d.ts',
					])
					.pipe(gulp.dest('app/server/build/modules/wc-lib'));
			},
			async function bundleWCLib() {
				await createBundle(
					path.join(
						__dirname,
						'node_modules/wc-lib/build/es/wc-lib.js'
					),
					path.join(
						__dirname,
						'app/server/build/modules/wc-lib',
						`build/es/wc-lib.js`
					),
					'wc-lib',
					{
						uglify: false,
						format: 'esm',
					}
				);
			},
			async function bundleWCLibSSR() {
				await createBundle(
					path.join(
						__dirname,
						'node_modules/wc-lib/build/es/wc-lib-ssr.js'
					),
					path.join(
						__dirname,
						'app/server/build/modules/wc-lib',
						`build/es/wc-lib-ssr.js`
					),
					'wc-lib',
					{
						uglify: false,
						format: 'esm',
						plugins: [
							resolve({
								preferBuiltins: true,
								mainFields: ['module', 'main'],
							}),
							commonjs(),
							builtins() as any,
							json(),
						],
					}
				);
			}
		),
		gulp.series(
			function copyDefinitionsLitHTML() {
				return gulp
					.src([
						'node_modules/lit-html/**/*.js',
						'node_modules/lit-html/**/*.d.ts',
						'!node_modules/lit-html/ts3.4/**',
					])
					.pipe(gulp.dest('app/server/build/modules/lit-html'));
			},
			async function bundleLitHTML() {
				await createBundle(
					path.join(__dirname, 'node_modules/lit-html/lit-html.js'),
					path.join(
						__dirname,
						'app/server/build/modules/lit-html',
						`lit-html.js`
					),
					'lit-html',
					{
						uglify: false,
						format: 'esm',
					}
				);
			}
		)
	)
);

gulp.task('stubs', async function writeStubs() {
	// Write stubs for app/server/lib/entrypoints.ts
	await Promise.all(
		ENTRYPOINTS.map(async (entrypoint: ENTRYPOINTS_TYPE) => {
			const bundlePath = path.join(
				__dirname,
				`app/client/build/private/entrypoints/${entrypoint}/exports.bundled.js`
			);
			const definitionsPath = path.join(
				__dirname,
				`app/client/build/private/entrypoints/${entrypoint}/exports.bundled.d.ts`
			);
			await Promise.all([
				fs.mkdirp(path.dirname(bundlePath)),
				fs.mkdirp(path.dirname(definitionsPath)),
			]);
			await Promise.all([
				fs.writeFile(
					bundlePath,
					'const Component = {};\n export { Component };',
					{
						encoding: 'utf8',
					}
				),
				fs.writeFile(
					definitionsPath,
					'export declare const Component: any;',
					{
						encoding: 'utf8',
					}
				),
			]);
		})
	);

	const configPath = path.join(
		__dirname,
		'app/client/build/private/swconfig.json'
	);

	await fs.mkdirp(path.dirname(configPath));

	// Write stubs for serviceworker file
	await fs.writeFile(configPath, '{}', {
		encoding: 'utf8',
	});
});

/**
 * Generate HTML typings
 */
gulp.task('html-typings', async function extractTypings() {
	const htmlFiles = await globPromise(
		path.join(__dirname, 'app/client/src/components/**/*.html.ts')
	);
	await Promise.all(
		htmlFiles.map(async (file) => {
			const typings = await htmlTypings.extractFileTypes(file);
			const parsedPath = path.parse(file);
			const componentName = parsedPath.name.split('.')[0];
			await fs.writeFile(
				path.join(parsedPath.dir, `${componentName}-querymap.d.ts`),
				typings,
				{
					encoding: 'utf8',
				}
			);
		})
	);
});

/**
 * Generate a serviceworker config file
 * and bundle it with the serviceworker
 */
gulp.task(
	'serviceworker',
	gulp.series(
		gulp.parallel(
			async function swConfig() {
				// Find all static files
				const staticDir = 'app/client/static';
				const staticFiles = (
					await globPromise(`${staticDir}/**/*.${EXTENSION_GLOB}`)
				).map((f) => path.relative(staticDir, f));

				const imagesDir = 'app/client/images';
				const imagesFiles = (
					await globPromise(`${imagesDir}/**/*.${EXTENSION_GLOB}`)
				).map((f) => path.relative(imagesDir, f));

				// Find all bundles
				const publicDir = 'app/client/build/public';
				const bundles = (
					await globPromise(`${publicDir}/**/*.${EXTENSION_GLOB}`)
				).map((f) => path.relative(publicDir, f));

				// Generate all routes
				const routes = ENTRYPOINTS.map(
					(entrypoint: ENTRYPOINTS_TYPE): SWConfig['routes'][0] => {
						const entrypointRoutes = [`/${entrypoint}`];
						if (entrypoint === 'index') {
							entrypointRoutes.push('/');
						}
						return {
							aliases: entrypointRoutes,
							isEntrypoint: true,
							src: `/${entrypoint}`,
						};
					}
				);

				const swConfig: SWConfig = {
					serverSideRendered: ENTRYPOINTS,
					groups: [
						{
							// Static files
							notifyOnUpdate: false,
							serveStategy: SERVE_STATEGY.FASTEST,
							files: [
								...staticFiles,
								...imagesFiles,
								...SEMI_STATIC_FILES,
							],
						},
						{
							// Bundled files
							notifyOnUpdate: true,
							serveStategy: SERVE_STATEGY.FASTEST,
							files: bundles,
						},
					],
					routes,
				};

				const outFile = path.join(
					__dirname,
					'app/client/build/private/swconfig.json'
				);
				if (process.env.ENV === 'dev') {
					await fs.writeFile(
						outFile,
						JSON.stringify(swConfig, null, '\t'),
						{
							encoding: 'utf8',
						}
					);
				} else {
					await fs.writeFile(outFile, JSON.stringify(swConfig), {
						encoding: 'utf8',
					});
				}
			},
			async function versions() {
				// Find all static files
				const staticDir = 'app/client/static';
				const staticFiles = (
					await globPromise(`${staticDir}/**/*.${EXTENSION_GLOB}`)
				).map((filePath) => ({
					srcPaths: [filePath],
					servePath: `/${path.relative(staticDir, filePath)}`,
				}));

				// Find all bundles
				const publicDir = 'app/client/build/public';
				const bundles = (
					await globPromise(`${publicDir}/**/*.${EXTENSION_GLOB}`)
				).map((filePath) => ({
					srcPaths: [filePath],
					servePath: `/${path.relative(publicDir, filePath)}`,
				}));

				// Find all "html" files and their corresponding
				// bundles
				const files = ENTRYPOINTS.map(
					(entrypoint: ENTRYPOINTS_TYPE) => {
						return {
							srcPaths: [
								path.join(
									__dirname,
									`app/client/src/entrypoints/${entrypoint}/${entrypoint}.html.ts`
								),
								path.join(
									publicDir,
									`/entrypoints/${entrypoint}/${entrypoint}.js`
								),
							],
							servePath: `/${entrypoint}`,
						};
					}
				);

				const versions: VersionMap = {};
				await Promise.all(
					[...staticFiles, ...bundles, ...files].map(
						async (fileConfig) => {
							const hashes = await Promise.all(
								fileConfig.srcPaths.map((srcPath) => {
									return new Promise<string>((resolve) => {
										const stream = fs.createReadStream(
											srcPath
										);
										const hash = crypto.createHash('md5');
										hash.setEncoding('hex');

										stream.on('end', () => {
											hash.end();
											resolve(hash.read().toString());
										});

										stream.pipe(hash);
									});
								})
							);
							const hash = hashes.join('-');

							versions[fileConfig.servePath] = hash;
						}
					)
				);

				const versionsPath = path.join(
					__dirname,
					'app/client/build/public/versions.json'
				);
				await fs.mkdirp(path.dirname(versionsPath));
				if (process.env.ENV === 'dev') {
					await fs.writeFile(
						versionsPath,
						JSON.stringify(versions, null, '\t'),
						{
							encoding: 'utf8',
						}
					);
				} else {
					await fs.writeFile(versionsPath, JSON.stringify(versions), {
						encoding: 'utf8',
					});
				}
			}
		),
		async function bundle() {
			await createBundle(
				path.join(__dirname, 'app/client/src/sw/serviceworker.js'),
				path.join(
					__dirname,
					'app/client/build/public/serviceworker.js'
				),
				'serviceworker'
			);
		}
	)
);

namespace I18N {
	type Change = {
		direction: 'forwards' | 'backwards';
		name: string;
	};

	interface I18NMessage {
		message: string;
		args?: {
			[key: string]: typeof String | typeof Number | typeof Boolean;
		};
		blank?: boolean;
	}

	type I18NRoot = {
		[key: string]: I18NRoot | I18NMessage;
	};

	function isMessage(
		descriptor: I18NMessage | I18NRoot
	): descriptor is I18NMessage {
		if (!('message' in descriptor)) return false;
		return typeof descriptor.message === 'string';
	}

	function isIgnored(key: string) {
		return key === '$schema' || key === 'comments';
	}

	function walkMessages(
		root: I18NRoot,
		fn: (message: I18NMessage, currentPath: string[], key: string) => void,
		currentPath: string[] = []
	) {
		for (const key in root) {
			const message = root[key];
			if (isIgnored(key)) continue;
			if (isMessage(message)) {
				fn(message, currentPath, key);
			} else {
				walkMessages(message, fn, [...currentPath, key]);
			}
		}
	}

	function genPath(currentPath: string[], key: string) {
		if (currentPath.length === 0) {
			// First item, return key by itself
			return key;
		}
		// Requires an @ and dots for the rest
		return [
			currentPath.slice(0, 2).join('_'),
			...currentPath.slice(2),
			key,
		].join('_');
	}

	export function getMessageFiles(): Promise<[any, string][]> {
		return new Promise<[any, string][]>((resolve, reject) => {
			glob('./app/i18n/locales/*.js', async (err, matches) => {
				if (err) {
					reject();
					return;
				}
				matches = matches.filter((m) => !m.includes('json'));

				const importES = esm(module, {
					cjs: true,
					mode: 'all',
				});
				resolve(
					matches.map((file) => {
						return [importES(file).default, file] as [any, string];
					})
				);
			});
		});
	}

	export namespace Enums {
		function getMatches(a: string[], b: string[]): number {
			let matches: number = 0;
			for (let i = 0; i < Math.max(a.length, b.length); i++) {
				if (a[i] === b[i]) {
					matches++;
				} else {
					return matches;
				}
			}
			return matches;
		}

		function indent(length: number) {
			return '\t'.repeat(length);
		}

		function getDiffPath(a: string[], b: string[]): Change[] {
			let matches = getMatches(a, b);

			if (a.length === b.length && matches === a.length) return [];
			return [
				...a
					.slice(matches)
					.reverse()
					.map((item) => {
						return {
							direction: 'backwards',
							name: item,
						} as Change;
					}),
				...b.slice(matches).map((item) => {
					return {
						direction: 'forwards',
						name: item,
					} as Change;
				}),
			];
		}

		export function genEnumMessages(root: I18NRoot) {
			let str: string[] = [];
			let tree: string[] = [];
			walkMessages(root, (message, currentPath, finalKey) => {
				const diff = getDiffPath(tree, currentPath);
				if (diff.length) {
					for (let i = 0; i < diff.length; i++) {
						const change = diff[i];
						if (change.direction === 'backwards') {
							str.push(indent(tree.length - 1) + '}');
							tree.pop();
						} else if (i === diff.length - 1) {
							// Last one, this is an enum instead
							str.push(
								indent(tree.length) +
									`export const enum ${change.name} {`
							);
							tree.push(change.name);
						} else {
							str.push(
								indent(tree.length) +
									`export namespace ${change.name} {`
							);
							tree.push(change.name);
						}
					}
				}
				const value = message.blank
					? genPath(currentPath, '')
					: genPath(currentPath, finalKey);
				str.push(`${indent(tree.length)}"${finalKey}" = '${value}',`);
			});
			for (let i = 0; i < tree.length; i++) {
				str.push(indent(tree.length - 1) + '}');
			}
			return `export namespace I18NKeys {\n${str
				.map((i) => indent(1) + i)
				.join('\n')}\n}`;
		}
	}

	function normalizeMessages(root: I18NRoot) {
		const normalized: {
			[key: string]: Partial<I18NMessage>;
		} = {};
		walkMessages(root, (message, currentPath, key) => {
			normalized[genPath(currentPath, key)] = filterMessage(message);
		});
		return normalized;
	}

	function filterMessage(message: I18NMessage): Partial<I18NMessage> {
		return {
			message: message.message,
		};
	}

	export namespace GenJSON {
		function getFreshFileExport(file: string) {
			const resolved = require.resolve(`./${file}`);
			if (resolved in require.cache) {
				delete require.cache[resolved];
			}
			const { Messages } = require(`./${file}`);
			return Messages;
		}

		export async function compileI18NFile(file: string, data?: any) {
			const normalized = normalizeMessages(
				data || getFreshFileExport(file)
			);
			const jsonOutFile = path.join(
				path.dirname(file),
				`${path.parse(file).name}.json`
			);
			const jsOutFile = path.join(
				path.dirname(file),
				`${path.parse(file).name}.json.js`
			);
			const defFile = path.join(
				path.dirname(file),
				`${path.parse(file).name}.json.d.ts`
			);

			const jsonContent =
				process.env.ENV === 'dev'
					? JSON.stringify(normalized, null, '\t')
					: JSON.stringify(normalized);
			const jsContent = `export default ${jsonContent};`;
			const defContent = `import { I18NType } from '../i18n-defs';\ndeclare const _default: I18NType;\nexport default _default;\n`;

			await fs.writeFile(jsonOutFile, jsonContent, {
				encoding: 'utf8',
			});
			await fs.writeFile(jsOutFile, jsContent, {
				encoding: 'utf8',
			});
			await fs.writeFile(defFile, defContent, {
				encoding: 'utf8',
			});
		}
	}

	export namespace GenType {
		export async function genType(root: I18NRoot) {
			const normalized = normalizeMessages(root);
			const text = `import { I18NMessage } from '../i18n/i18n';\n\nexport interface I18NType {\n${Object.keys(
				normalized
			)
				.map((key) => {
					return `\t"${key}": I18NMessage;`;
				})
				.join('\n')}\n}\n`;
			return text;
		}
	}
}

/**
 * Generate both development and output files for I18N files
 */
gulp.task(
	'i18n',
	gulp.parallel(
		async function genEnums() {
			const files = await I18N.getMessageFiles();
			if (files.length === 0) {
				console.log('No source files to generate enums from');
				return;
			}
			const enums = I18N.Enums.genEnumMessages(files[0][0]);
			await fs.writeFile(
				path.join(__dirname, 'app/i18n/i18n-keys.d.ts'),
				enums
			);
		},
		async function genJSON() {
			const files = await I18N.getMessageFiles();
			await Promise.all(
				files.map(async ([data, fileName]) => {
					await I18N.GenJSON.compileI18NFile(fileName, data);
				})
			);
		},
		async function genType() {
			const files = await I18N.getMessageFiles();
			if (files.length === 0) {
				console.log('No source files to generate enums from');
				return;
			}
			const defs = await I18N.GenType.genType(files[0][0]);
			await fs.writeFile(
				path.join(__dirname, 'app/i18n/i18n-defs.d.ts'),
				defs
			);
		}
	)
);

/**
 * Generate a html-custom-data file for VSCode
 */
gulp.task('defs', async function generateCustomData() {
	const fileNames = await globPromise(
		'app/client/src/entrypoints/**/exports.js'
	);

	const customDatas = fileNames
		.map((fileName) => {
			const importES = esm(module, {
				cjs: true,
				mode: 'all',
			});
			const exports = importES(path.resolve(fileName));

			const componentExport = exports['Component'];
			if (
				componentExport &&
				'prototype' in componentExport &&
				componentExport.prototype &&
				componentExport.prototype instanceof ConfigurableWebComponent
			) {
				return generateHTMLCustomData(componentExport, true);
			}

			return null;
		})
		.filter((v) => v !== null) as HTMLCustomData[];

	if (customDatas.length === 0) {
		console.log('No custom data files generated');
		return;
	}
	const joined = joinCustomData(...customDatas);

	await fs.writeFile(
		path.join(__dirname, 'types/html.html-data.json'),
		JSON.stringify(joined, null, '\t')
	);
});

function fromEntries<V, A extends [string, V][]>(
	arr: A
): {
	[key: string]: V;
} {
	const obj: {
		[key: string]: V;
	} = {};
	for (const [key, value] of arr) {
		obj[key] = value;
	}
	return obj;
}

gulp.task('sitemap', async function generateSitemap() {
	const importES = esm(module, {
		cjs: true,
		mode: 'all',
	});
	const { LANGUAGES } = importES(
		path.resolve('./app/i18n/i18n')
	) as typeof import('./app/i18n/i18n');

	const files: {
		path: string;
		lastmod: string;
		langmap?: {
			[lang: string]: string;
		};
	}[] = [
		...['/', ...ENTRYPOINTS].map((entrypoint) => {
			if (!entrypoint.endsWith('/')) {
				entrypoint = `${entrypoint}/`;
			}
			if (!entrypoint.startsWith('/')) {
				entrypoint = `/${entrypoint}`;
			}
			return {
				path: entrypoint,
				lastmod: new Date().toISOString(),
				langmap: fromEntries(
					LANGUAGES.map((lang) => {
						return [lang, `${entrypoint}?lang=${lang}`];
					}) as [string, string][]
				) as {
					[lang: string]: string;
				},
			};
		}),
		...(await Promise.all(
			STATIC_FILES.map(async (file) => {
				return {
					path: file.path,
					lastmod: (
						(await fs.stat(file.src)).mtime || new Date()
					).toISOString(),
					langmap: file.langmap || {},
				};
			})
		)),
	];

	function generateHostSitemap(host: string) {
		const schemedHost = `https://${host}`;
		return [
			'<?xml version="1.0" encoding="UTF-8"?>',
			'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
			...files.map((file) => {
				return [
					'<url>',
					...[
						`<loc>${schemedHost}${file.path}</loc>`,
						`<lastmod>${file.lastmod}</lastmod>`,
						...Object.keys(file.langmap || {}).map((lang) => {
							return `<xhtml:link rel="alternate" hreflang="${lang}" href="${schemedHost}${
								file.langmap![lang]
							}" />`;
						}),
					].map((i) => `\t${i}`),
					'</url>',
				]
					.map((i) => `\t${i}`)
					.join('\n');
			}),
			'</urlset>',
		].join('\n');
	}

	const sitemapPath = path.join(__dirname, 'app/client/build/public/');
	await fs.mkdirp(sitemapPath);
	await Promise.all(
		HOSTS.map(async (host) => {
			await fs.writeFile(
				path.join(sitemapPath, `sitemap.${host}.xml`),
				generateHostSitemap(host),
				{
					encoding: 'utf8',
				}
			);
		})
	);
});

/**
 * Tasks that you tend to run while developing to update definitions
 */
gulp.task('dev', gulp.series('i18n', 'defs'));

/**
 * Handle all pre-build stuff like modules for the
 * backend and some stubs
 */
gulp.task(
	'pre-build',
	gulp.series('defs', 'modules', 'stubs', 'i18n', 'sitemap')
);

/**
 * Handle all frontend bundling etc
 */
gulp.task(
	'frontend',
	gulp.series('bundle', 'copy', 'prep-ssr', 'serviceworker')
);
