export namespace Caching {
	export function createStore<CS extends string | number | boolean, V>(
		complex: false
	): CacheStore<CS, V>;
	export function createStore<CS extends object | any[] | Function, V>(
		complex: true,
		compare: (stored: CS, current: CS) => boolean
	): CacheStore<CS, V>;
	export function createStore<CS, V>(
		complex: boolean,
		compare?: (stored: CS, current: CS) => boolean
	): CacheStore<CS, V> {
		if (!complex) {
			return (new SimpleCacheStore<any, V>() as unknown) as CacheStore<
				CS,
				V
			>;
		} else {
			return (new ComplexCacheStore<any, V>(
				compare!
			) as unknown) as CacheStore<CS, V>;
		}
	}

	export interface CacheStore<CS, V> {
		has(state: CS): boolean;
		get(state: CS): V | null;
		set(state: CS, value: V): void;
		delete(state: CS): boolean;
	}

	class SimpleCacheStore<CS extends string | number | boolean, V>
		implements CacheStore<CS, V> {
		private _cacheStates: Map<CS, V> = new Map();

		has(state: CS) {
			return this._cacheStates.has(state);
		}

		get(state: CS): V | null {
			const value = this._cacheStates.get(state);
			if (value === undefined) return null;
			return value;
		}

		set(state: CS, value: V) {
			return this._cacheStates.set(state, value);
		}

		delete(state: CS) {
			return this._cacheStates.delete(state);
		}
	}

	class ComplexCacheStore<CS, V> {
		private _cacheStates: Map<CS, V> = new Map();
		private _lastMatch: [CS, V] | null = null;

		constructor(private _compare: (stored: CS, current: CS) => boolean) {}

		private _match(cacheState: CS): V | null {
			if (
				this._lastMatch &&
				this._compare(this._lastMatch[0], cacheState)
			) {
				return this._lastMatch[1];
			}

			for (const [key, value] of this._cacheStates.entries()) {
				if (this._compare(key, cacheState)) {
					this._lastMatch = [key, value];
					return value;
				}
			}
			return null;
		}

		getCache(cacheState: CS): V | null {
			return this._match(cacheState);
		}

		hasCache(cacheState: CS): boolean {
			return this._match(cacheState) !== null;
		}

		setCache(cacheState: CS, value: V) {
			this._lastMatch = [cacheState, value];
			this._cacheStates.set(cacheState, value);
		}
	}

	export class FileCache extends SimpleCacheStore<string, string> {}
}
