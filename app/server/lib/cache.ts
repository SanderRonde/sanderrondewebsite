export namespace Caching {
    export class CacheStore<CS, V> {
        private _cacheStates: Map<CS, V> = new Map();

        constructor(private _compare: (stored: CS, current: CS) => boolean) {}

        getCache(cacheState: CS): V | null {
            for (const [key, value] of this._cacheStates.entries()) {
                if (this._compare(key, cacheState)) {
                    return value;
                }
            }
            return null;
        }

        setCache(cacheState: CS, value: V) {
            this._cacheStates.set(cacheState, value);
        }
    }

    export class FileCache extends CacheStore<string, string> {
        constructor() {
            super((stored, current) => stored === current);
        }

        has(fileName: string) {
            return this.getCache(fileName) !== null;
        }
    }
}
