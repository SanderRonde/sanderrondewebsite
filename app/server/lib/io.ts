export namespace IO {
    /**
     * Check if an argument with given name is present
     * 
     * @param {string} name - The name of the argument
     * @param {string} [short] - A short name for the argument
     * 
     * @returns {boolean} Whether the argument was passed
     */
    function hasArg(name: string, short?: string): boolean {
        for (let i = 0; i < process.argv.length; i++) {
            const arg = process.argv[i];
            if (arg === `--${name}` || (short && arg === `-${short}`)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Get a string-type argument by name
     * 
     * @param {string} name - The name of the argument
     * @param {string} [short] - A short name for the argument
     * 
     * @returns {string|void} The argument's value or undefined
     */
    function getArg(name: string, short?: string): string | void {
        for (let i = process.argv.length - 1; i; i--) {
            const arg = process.argv[i];
            if (arg === `--${name}` || (short && arg === `-${short}`)) {
                return process.argv[i + 1];
            } else if (arg.startsWith(`--${name}=`)) {
                return arg.slice(3 + name.length);
            }
        }
        return void 0;
    }

    /**
     * Get a number-type argument by name
     * 
     * @param {string} name - The name of the argument
     * @param {string} [short] - A short name for the argument
     * 
     * @returns {number|void} A number-representation of the argument
     * 	or undefined
     */
    function getNumArg(name: string, short?: string): number | void {
        const arg = getArg(name, short);
        if (arg === void 0) return void 0;
        return ~~arg;
    }

    export type IO = ReturnType<typeof getIO>;

    /**
     * Get all IO
     */
    export function getIO() {
        return {
            dev: hasArg('dev', 'd'),
            noSSR: hasArg('no-ssr'),
            ports: {
                http: getNumArg('http') || 1234,
                https: getNumArg('https') || 1235,
            },
        };
    }
}