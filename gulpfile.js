// @ts-check

const resolve = require('@rollup/plugin-node-resolve');
const uglify = require('uglify-es');
const rollup = require('rollup');
const fs = require('fs-extra');
const path = require('path');
const gulp = require('gulp');

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
function dashesToCasing(str) {
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
                'app/client/build/entrypoints/',
                entrypoint,
                `index.js`
            );
            const bundle = await rollup.rollup({
                input: path.join(
                    __dirname,
                    'app/client/src/entrypoints/',
                    entrypoint,
                    `index.js`
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

            await fs.writeFile(outFile, code, {
                encoding: 'utf8',
            });
        })
    );
});

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
                        'app/client/build/entrypoints/',
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
            definitions = definitions.replace(/'..\/..\/components\//, '\'../../../src/components/')
            await fs.writeFile(
                path.join(
                    __dirname,
                    'app/client/build/entrypoints/',
                    entrypoint,
                    'exports.bundled.d.ts'
                ),
                definitions,
                {
                    encoding: 'utf8',
                }
            );
        })
    );
});

gulp.task(
    'modules',
    gulp.series(
        function copyDefinitions() {
            return gulp
                .src([
                    'node_modules/lit-html/**/*.js',
                    'node_modules/lit-html/**/*.d.ts',
                    '!node_modules/lit-html/ts3.4/**',
                ])
                .pipe(gulp.dest('app/server/build/modules/lit-html'));
        },
        async function prepSSR() {
            const bundle = await rollup.rollup({
                input: path.join(
                    __dirname,
                    'node_modules/lit-html/lit-html.js'
                ),
            });
            await bundle.write({
                file: path.join(
                    __dirname,
                    'app/server/build/modules/lit-html',
                    `lit-html.js`
                ),
                name: 'lit-html',
                format: 'esm',
            });
        }
    )
);
