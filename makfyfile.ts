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
import * as path from 'path';
const choice = (_choice as unknown) as choice;
const cmd = (_cmd as unknown) as cmd;

/**
 * Craft a rimraf command
 */
function rimraf(glob: string): string {
	return `rimraf ${glob} || echo "No files to delete"`;
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

cmd('watch')
	.desc('Watch for changes and compile accordingly')
	.args({
		type: choice(['ts', 'html', 'all'], 'all'),
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
		await exec(commands);
	});
