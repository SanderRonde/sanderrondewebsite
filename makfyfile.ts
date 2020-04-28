import {
	cmd as _cmd,
	choice as _choice,
	flag,
	setEnvVar,
	getFileChangesAsync,
	getUtilsContext,
	setUtilsContext,
} from 'makfy';
import { ExecFunction } from 'makfy/dist/lib/schema/runtime';
import { choice, cmd } from './types/makfy-extended';
import * as chokidar from 'chokidar';
import * as rimraf from 'rimraf';
import * as globby from 'globby';
import * as fs from 'fs-extra';
import * as path from 'path';
const choice = (_choice as unknown) as choice;
const cmd = (_cmd as unknown) as cmd;

/**
 * Craft a rimraf command
 */
async function remove(
	exec: ExecFunction,
	pattern: string,
	...additional: string[]
): Promise<any> {
	if (additional.length === 0) {
		return exec(`rimraf ${pattern} || echo "No files to delete"`);
	} else {
		const files = await globby([pattern, ...additional]);
		await Promise.all([
			files.map(
				(file) =>
					new Promise((resolve, reject) => {
						rimraf(file, (err) => {
							if (err) {
								reject(err);
							} else {
								resolve();
							}
						});
					})
			),
		]);
	}
}

cmd('clean')
	.desc('Clean built files')
	.run(async (exec) => {
		await remove(exec, 'app/client/**/*.d.ts', '!app/client/src/components/types.d.ts');
		await remove(exec, 'app/server/**/*.d.ts');
		await remove(exec, 'app/shared/**/*.d.ts');
		await remove(exec, 'app/i18n/**/*.d.ts', '!app/i18n/spec-check.d.ts');
		await remove(exec, 'app/client/**/*.js');
		await remove(exec, 'app/server/**/*.js');
		await remove(exec, 'app/shared/**/*.js');
		await remove(exec, 'app/i18n/**/*.js');
		await remove(exec, 'app/client/**/*.map');
		await remove(exec, 'app/server/**/*.map');
		await remove(exec, 'app/shared/**/*.map');
		await remove(exec, 'app/i18n/**/*.map');
		await remove(exec, 'app/i18n/**/*.json', '!app/i18n/tsconfig.json');
		await remove(exec, 'app/server/build/*');
		await remove(exec, 'app/client/build/*');

		await remove(exec, 'app/*.tsbuildinfo');
		await remove(exec, '*.tsbuildinfo');
	});

cmd('compile')
	.desc('Compile typescript')
	.args({
		dir: choice(['root', 'all', 'i18n', 'serviceworker'], 'root'),
		watch: flag(),
	})
	.argsDesc({
		dir: 'The directory to compile, root by default',
		watch: 'Whether to compile the files on changes',
	})
	.run(async (exec, args) => {
		const { watch, dir } = args;
		if (dir === 'all') {
			if (!watch) {
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

async function updateHTMLTypings(exec: ExecFunction) {
	const { hasChanges, added, modified } = await getFileChangesAsync(
		'htm-typings',
		path.join(__dirname, 'app/client/src/components/**/*.html.ts')
	);
	if (!hasChanges) {
		console.log('No changes');
	}
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
}

cmd('html-typings')
	.desc('Get HTML typings')
	.args({
		watch: flag(),
	})
	.argsDesc({
		watch: 'Watch for changes',
	})
	.run(async (exec, { watch }) => {
		const context = getUtilsContext();
		if (watch) {
			chokidar
				.watch(
					path.join(
						__dirname,
						'app/client/src/components/**/*.html.ts'
					),
					{
						persistent: true,
						awaitWriteFinish: {
							stabilityThreshold: 500,
						},
						cwd: __dirname,
						ignoreInitial: false,
						ignored: /.*\.(js|map)/,
					}
				)
				.on('change', async () => {
					console.log('Changes detected');
					setUtilsContext(context);
					await updateHTMLTypings(exec);
				});
		}
		await updateHTMLTypings(exec);
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

cmd('i18n')
	.desc('Rebuild i18n files')
	.args({
		watch: flag(),
	})
	.argsDesc({
		watch: 'Whether to update the i18n files as they are changed',
	})
	.run(async (exec, { watch }) => {
		await exec('gulp i18n');

		if (watch) {
			chokidar
				.watch(path.join(__dirname, 'app/i18n/locales/*.js'), {
					persistent: true,
					awaitWriteFinish: {
						stabilityThreshold: 1000,
					},
					cwd: __dirname,
					ignoreInitial: false,
					ignored: /.*\.(map|json\.js|ts)/,
				})
				.on('change', async () => {
					console.log('Changes detected');
					await exec('gulp i18n');
				});
		}
	});

cmd('sw')
	.desc('Rebuild serviceworker file')
	.args({
		watch: flag(),
	})
	.argsDesc({
		watch: 'Whether to update the serviceworker file as it is changed',
	})
	.run(async (exec, { watch }) => {
		await exec('gulp serviceworker');

		if (watch) {
			chokidar
				.watch(
					path.join(__dirname, 'app/client/src/sw/serviceworker.js'),
					{
						persistent: true,
						awaitWriteFinish: {
							stabilityThreshold: 1000,
						},
						cwd: __dirname,
						ignoreInitial: true,
					}
				)
				.on('change', async () => {
					console.log('Changes detected');
					await exec('gulp serviceworker');
				});
		}
	});

cmd('watch')
	.desc('Watch for changes and compile accordingly')
	.args({
		type: choice(['ts', 'html', 'i18n', 'sw', 'all'], 'all'),
	})
	.argsDesc({
		type: 'The type of changes to watch',
	})
	.run(async (exec, { type }) => {
		const commands = [];
		if (type === 'ts' || type === 'all') {
			commands.push('@compile --dir all --watch');
		}
		if (type === 'html' || type === 'all') {
			commands.push('@html-typings --watch');
		}
		if (type === 'i18n' || type === 'all') {
			commands.push('@i18n --watch');
		}
		if (type === 'sw' || type === 'all') {
			commands.push('@sw --watch');
		}
		await exec(commands);
	});

cmd('sourcemaps')
	.desc('Clone source repo in order to provide source maps')
	.run(async (exec) => {
		await remove(exec, 'types/clones');

		// Get wc-lib version
		const manifestText = await fs.readFile(
			path.join(__dirname, 'package.json'),
			{
				encoding: 'utf8',
			}
		);
		const manifest = JSON.parse(manifestText);
		const wclibVersionString: string = manifest['dependencies']['wc-lib'];
		const wclibVersion = wclibVersionString.replace(/[^0-9\.]/g, '');

		// Clone
		await exec(
			`git clone -b ${wclibVersion} https://github.com/SanderRonde/wc-lib types/clones/wc-lib`
		);
	});
