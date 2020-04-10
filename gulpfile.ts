import {
	SWConfig,
	SERVE_STATEGY,
	VersionMap,
	ENTRYPOINTS_TYPE,
} from './app/shared/types';
import { inlineTypedCSSPipe } from 'wc-lib/build/cjs/tasks/tasks';
import * as builtins from 'rollup-plugin-node-builtins';
import * as _resolve from '@rollup/plugin-node-resolve';
import * as _sourcemaps from 'rollup-plugin-sourcemaps';
import * as _commonjs from '@rollup/plugin-commonjs';
import * as _json from '@rollup/plugin-json';
import * as htmlTypings from 'html-typings';
import * as CleanCSS from 'clean-css';
import * as through2 from 'through2';
import * as uglify from 'uglify-es';
import * as crypto from 'crypto';
import * as rollup from 'rollup';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as glob from 'glob';
import * as gulp from 'gulp';

const ENTRYPOINTS: ENTRYPOINTS_TYPE[] = ['index'];

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

function createPipable(fn: (content: string) => string | Promise<string>) {
	return through2.obj(
		async (
			file: Buffer | { contents: Buffer },
			_: any,
			cb: (
				error: Error | null,
				file: Buffer | { contents: Buffer }
			) => void
		) => {
			const content = Buffer.isBuffer(file)
				? file.toString()
				: file.contents.toString();

			try {
				const transformed = await fn(content);

				if (Buffer.isBuffer(file)) {
					file = Buffer.from(transformed);
				} else {
					file.contents = Buffer.from(transformed);
				}
				cb(null, file);
			} catch (e) {
				cb(e, file);
			}
		}
	);
}

/**
 * Bundle all components into a single file
 */
gulp.task(
	'bundle',
	gulp.series(
		gulp.parallel(
			async function copy() {
				const srcDir = path.join(__dirname, 'app/client/src');
				const destDir = path.join(__dirname, 'app/client/temp');
				return gulp
					.src(['**/*.js', '**/*.json', '!**/*.css.js'], {
						cwd: srcDir,
						base: srcDir,
					})
					.pipe(gulp.dest(destDir));
			},
			async function inlineCSS() {
				const srcDir = path.join(__dirname, 'app/client/src');
				const destDir = path.join(__dirname, 'app/client/temp');
				return gulp
					.src(['**/*.css.js'], {
						cwd: srcDir,
						base: srcDir,
					})
					.pipe(inlineTypedCSSPipe())
					.pipe(
						createPipable(async (content) => {
							const minifier = new CleanCSS();
							return content.replace(
								/<style>((.|\n|\r)*?)<\/style>/g,
								(_, innerContent) => {
									return `<style>${minifier.minify(
										innerContent
									)}</style>`;
								}
							);
						})
					)
					.pipe(gulp.dest(destDir));
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
					groups: [
						{
							// Static files
							notifyOnUpdate: false,
							serveStategy: SERVE_STATEGY.FASTEST,
							files: staticFiles,
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

				await fs.writeFile(
					path.join(
						__dirname,
						'app/client/build/private/swconfig.json'
					),
					JSON.stringify(swConfig, null, '\t'),
					{
						encoding: 'utf8',
					}
				);
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
				await fs.writeFile(
					versionsPath,
					JSON.stringify(versions, null, '\t'),
					{
						encoding: 'utf8',
					}
				);
			}
		),
		async function bundle() {
			await createBundle(
				path.join(__dirname, 'app/client/src/serviceworker.js'),
				path.join(
					__dirname,
					'app/client/build/public/serviceworker.js'
				),
				'serviceworker'
			);
		}
	)
);

/**
 * Handle all pre-build stuff like modules for the
 * backend and some stubs
 */
gulp.task('pre-build', gulp.series('modules', 'stubs'));

/**
 * Handle all frontend bundling etc
 */
gulp.task('frontend', gulp.series('bundle', 'prep-ssr', 'serviceworker'));
