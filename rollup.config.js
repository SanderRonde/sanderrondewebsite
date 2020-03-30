const path = require('path');

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

export default ENTRYPOINTS.map((entrypoint) => {
    return {
        input: path.join(
            __dirname,
            'app/client/src/entrypoints/',
            entrypoint,
            `${entrypoint}.js`
        ),
        output: {
            file: path.join(
                __dirname,
                'app/client/build/entrypoints/',
                entrypoint,
                `${entrypoint}.js`
            ),
            name: dashesToCasing(entrypoint),
            format: 'iife',
        },
    };
});
