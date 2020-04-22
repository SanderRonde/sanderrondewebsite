import {
	cmd as _cmd,
	choice as _choice,
	flag,
	setEnvVar,
	getFileChangesAsync,
} from 'makfy';
import { choice, cmd } from './types/makfy-extended';
import * as glob from 'glob';
import * as path from 'path';
const choice = (_choice as unknown) as choice;
const cmd = (_cmd as unknown) as cmd;

/**
 * Craft a rimraf command
 */
function rimraf(glob: string): string {
	return `rimraf ${glob} || echo "No files to delete"`;
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

cmd('clean')
	.desc('Clean built files')
	.run(async (exec) => {
		await exec(rimraf('app/client/**/*.d.ts'));
		await exec(rimraf('app/server/**/*.d.ts'));
		await exec(rimraf('app/shared/**/*.d.ts'));
		await exec(rimraf('app/i18n/**/*.d.ts'));
		await exec(rimraf('app/client/**/*.js'));
		await exec(rimraf('app/server/**/*.js'));
		await exec(rimraf('app/shared/**/*.js'));
		await exec(rimraf('app/i18n/**/*.js'));
		await exec(rimraf('app/client/**/*.map'));
		await exec(rimraf('app/server/**/*.map'));
		await exec(rimraf('app/shared/**/*.map'));
		await exec(rimraf('app/i18n/**/*.map'));
		await exec(rimraf('app/i18n/**/*.json'));
		await exec(rimraf('app/server/build/*'));
		await exec(rimraf('app/client/build/*'));

		await exec(rimraf('app/*.tsbuildinfo'));
		await exec(rimraf('*.tsbuildinfo'));
	});

cmd('compile')
	.desc('Compile typescript')
	.args({
		dir: choice(['root', 'all', 'i18n', 'serviceworker'], 'root'),
		watch: flag(),
		'no-initial': flag(),
	})
	.argsDesc({
		dir: 'The directory to compile, root by default',
		watch: 'Whether to compile the files on changes',
		'no-initial': 'Skip initial compile when watching',
	})
	.run(async (exec, args) => {
		const { watch, dir } = args;
		if (dir === 'all') {
			if (!watch || !args['no-initial']) {
				await exec('tsc -p ./app/client/src/sw/tsconfig.json');
				await exec('tsc -p ./app/i18n/tsconfig.json');
				await exec('tsc -p ./tsconfig.json');
			}

			if (watch) {
				await exec([
					'tsc -p ./app/client/src/sw/tsconfig.json -w --preserveWatchOutput',
					'tsc -p ./app/i18n/tsconfig.json -w --preserveWatchOutput',
					'tsc -p ./tsconfig.json -w --preserveWatchOutput',
				]);
			}
			return;
		}

		const project = (() => {
			switch (dir) {
				case 'root':
					return './tsconfig.json';
				case 'i18n':
					return './app/i18n/tsconfig.json';
				case 'serviceworker':
					return `./app/client/src/sw/tsconfig.json`;
			}
		})();

		const flags = `${watch ? '--watch' : ''}`;
		await exec(`tsc -p ${project} ${flags}`);
	});

cmd('frontend')
	.desc('Build just the frontend')
	.args({
		dev: flag(),
	})
	.argsDesc({
		dev: 'Development mode, keeps code pretty',
	})
	.run(async (exec, { dev }) => {
		const env = setEnvVar('ENV', dev ? 'dev' : 'prod');
		await exec(`${env}; gulp frontend`);
	});

cmd('html-typings')
	.desc('Get HTML typings')
	.run(async (exec) => {
		const { hasChanges, added, modified } = await getFileChangesAsync(
			'htm-typings',
			path.join(__dirname, 'app/client/src/components/**/*.html.ts')
		);
		if (!hasChanges) return;
		const htmlFiles = [...added, ...modified];
		await exec(
			htmlFiles.map((file) => {
				const parsedPath = path.parse(file);
				const componentName = parsedPath.name.split('.')[0];
				const outFile = path.join(
					parsedPath.dir,
					`${componentName}-querymap.d.ts`
				);
				return `html-typings -i ${file} -o ${outFile} -e`;
			})
		);
	});

cmd('build')
	.desc('Build and bundle all files')
	.args({
		dev: flag(),
	})
	.argsDesc({
		dev: 'Development mode, keeps code pretty',
	})
	.run(async (exec, { dev }) => {
		const env = setEnvVar('ENV', dev ? 'dev' : 'prod');
		await exec('? cleaning');
		await exec('@clean');

		await exec('? generating HTML typings');
		await exec('@html-typings');

		await exec('? compiling i18n code');
		await exec('@compile --dir i18n');

		await exec('? creating pre-build requirements');
		await exec(`${env}; gulp pre-build`);

		await exec('? compiling code');
		await exec('@compile --dir all');

		await exec('? creating frontend bundles etc');
		await exec({
			_: 'frontend',
			args: {
				dev,
			},
		});
	});
