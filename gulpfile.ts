import * as builtins from 'rollup-plugin-node-builtins';
import * as _resolve from '@rollup/plugin-node-resolve';
import * as _commonjs from '@rollup/plugin-commonjs';
import * as _json from '@rollup/plugin-json';
import * as uglify from 'uglify-es';
import * as rollup from 'rollup';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as gulp from 'gulp';

const json = (_json as unknown) as typeof _json.default;
const resolve = (_resolve as unknown) as typeof _resolve.default;
const commonjs = (_commonjs as unknown) as typeof _commonjs.default;

const ENTRYPOINTS = ['index'];

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
 * Bundle all components into a single file
 */
gulp.task('bundle', async function bundle() {
    await Promise.all(
        ENTRYPOINTS.map(async (entrypoint) => {
            const outFile = path.join(
                __dirname,
                'app/client/build/public/entrypoints/',
                entrypoint,
                `${entrypoint}.js`
            );
            const bundle = await rollup.rollup({
                input: path.join(
                    __dirname,
                    'app/client/src/entrypoints/',
                    entrypoint,
                    `${entrypoint}.js`
                ),
                output: {
                    file: outFile,
                    name: dashesToCasing(entrypoint),
                    format: 'iife',
                },
                plugins: [resolve()],
            });

            const { output } = await bundle.generate({
                file: outFile,
                name: dashesToCasing(entrypoint),
                format: 'iife',
            });

            if (output.length === 0) {
                throw new Error('No output generated');
            }

            const { error, code } = uglify.minify(output[0].code);
            if (error) {
                throw error;
            }

            await fs.mkdirp(path.dirname(outFile));
            await fs.writeFile(outFile, code, {
                encoding: 'utf8',
            });
        })
    );
});

/**
 * Prepare rendering through server-side rendering
 * by bundling all component files
 */

gulp.task('prep-ssr', async function prepSSR() {
    await Promise.all(
        ENTRYPOINTS.map(async (entrypoint) => {
            // Bundle
            try {
                const bundle = await rollup.rollup({
                    input: path.join(
                        __dirname,
                        'app/client/src/entrypoints/',
                        entrypoint,
                        `exports.js`
                    ),
                    plugins: [resolve()],
                });
                await bundle.write({
                    file: path.join(
                        __dirname,
                        'app/client/build/private/entrypoints/',
                        entrypoint,
                        `exports.bundled.js`
                    ),
                    name: dashesToCasing(entrypoint),
                    format: 'esm',
                });
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
                const bundle = await rollup.rollup({
                    input: path.join(
                        __dirname,
                        'node_modules/wc-lib/build/es/wc-lib.js'
                    ),
                });
                const outDir = path.join(
                    __dirname,
                    'app/server/build/modules/wc-lib',
                    `build/es/wc-lib.js`
                );
                await fs.mkdirp(path.dirname(outDir));
                await bundle.write({
                    file: outDir,
                    name: 'wc-lib',
                    format: 'esm',
                });
            },
            async function bundleWCLibSSR() {
                const bundle = await rollup.rollup({
                    input: path.join(
                        __dirname,
                        'node_modules/wc-lib/build/es/wc-lib-ssr.js'
                    ),
                    plugins: [
                        resolve({
                            preferBuiltins: true,
                            mainFields: ['module', 'main'],
                        }),
                        commonjs(),
                        builtins() as any,
                        json(),
                    ],
                });
                const outDir = path.join(
                    __dirname,
                    'app/server/build/modules/wc-lib',
                    `build/es/wc-lib-ssr.js`
                );
                await fs.mkdirp(path.dirname(outDir));
                await bundle.write({
                    file: outDir,
                    name: 'wc-lib',
                    format: 'esm',
                });
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
                const bundle = await rollup.rollup({
                    input: path.join(
                        __dirname,
                        'node_modules/lit-html/lit-html.js'
                    ),
                });
                const outDir = path.join(
                    __dirname,
                    'app/server/build/modules/lit-html',
                    `lit-html.js`
                );
                await fs.mkdirp(path.dirname(outDir));
                await bundle.write({
                    file: outDir,
                    name: 'lit-html',
                    format: 'esm',
                });
            }
        )
    )
);

/**
 * Handle all frontend bundling etc
 */
gulp.task('frontend', gulp.series('bundle', 'prep-ssr'));
