import { cmd as _cmd, choice as _choice, flag, setEnvVar } from 'makfy';
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
		await exec(rimraf('app/client/**/*.js'));
		await exec(rimraf('app/server/**/*.js'));
		await exec(rimraf('app/server/build/*'));
		await exec(rimraf('app/client/build/*'));
	});

cmd('compile')
	.desc('Compile typescript')
	.args({
		dir: choice(
			['root', 'i18n', 'shared', 'serviceworker', 'client'],
			'root'
		),
		build: flag(),
		watch: flag(),
	})
	.argsDesc({
		dir: 'The directory to compile, root by default',
		build: 'Run in build mode',
		watch: 'Whether to compile the files on changes',
	})
	.run(async (exec, { watch, build, dir }) => {
		const project = (() => {
			switch (dir) {
				case 'root':
					return './tsconfig.json';
				case 'client':
				case 'i18n':
				case 'shared':
				case 'serviceworker':
					return `./app/tsconfig.${dir}.json`;
			}
		})();

		const flags = `${watch ? '--watch' : ''}`;
		if (build) {
			await exec(`tsc --build ${project} ${flags}`);
		} else {
			await exec(`tsc -p ${project} ${flags}`);
		}
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
		const htmlFiles = await globPromise(
			path.join(__dirname, 'app/client/src/components/**/*.html.ts')
		);
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
		await exec('@compile --dir root --build');

		await exec('? creating frontend bundles etc');
		await exec({
			_: 'frontend',
			args: {
				dev,
			},
		});
	});
