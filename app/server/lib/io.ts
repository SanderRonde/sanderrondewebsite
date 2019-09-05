function getArg(name: string): string|void {
	for (let i = 0; i < process.argv.length; i++) {
		if (process.argv[i] === `--${name}`) {
			return process.argv[i + 1];
		} else if (process.argv[i].startsWith(`--${name}=`)) {
			return process.argv[i].slice(3 + name.length);
		}
	}
	return void 0;
}

function getNumArg(name: string): number|void {
	const arg = getArg(name);
	if (arg === void 0) return void 0;
	return ~~arg;
}

export type IO = ReturnType<typeof getIO>;

export function getIO() {
	return {
		ports: {
			http: getNumArg('http') || undefined,
			https: getNumArg('https') || undefined
		}
	}
}