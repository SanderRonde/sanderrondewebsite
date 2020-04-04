import { cmd as _cmd, choice as _choice, flag } from 'makfy';
import { choice, cmd } from './types/makfy-extended';
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
        await exec(rimraf('app/client/**/*.js'));
        await exec(rimraf('app/server/**/*.js'));
        await exec(rimraf('app/server/build/*'));
        await exec(rimraf('app/client/build/*'));
    });

cmd('compile')
    .desc('Compile typescript')
    .args({
		dir: choice(['root', 'client'], 'root'),
		build: flag(),
        watch: flag(),
    })
    .argsDesc({
		dir: 'The directory to compile, root by default',
		build: 'Run in build mode',
        watch: 'Whether to compile the files on changes',
    })
    .run(async (exec, { watch, build, dir }) => {
        const project =
            (() => {
                switch (dir) {
                    case 'root':
                        return './tsconfig.json';
                    case 'client':
                        return './app/tsconfig.client.json';
                }
            })();
        if (build) {
            await exec(`tsc --build ${project} ${watch ? '--watch' : ''}`);
        } else {
            await exec(`tsc -p ${project} ${watch ? '--watch' : ''}`);
        }
    });

cmd('build')
    .desc('Build and bundle all files')
    .args({
        fresh: flag(),
    })
    .argsDesc({
        fresh: 'Do a fresh build (clean first)'
    })
    .run(async (exec, { fresh }) => {
        if (fresh) {
            await exec('? cleaning');
            await exec('@clean');
        }

        await exec('? building and bundling modules');
        await exec('gulp modules');

        await exec('? compiling client-side code');
        await exec('@compile --dir client');

        await exec(
            '? creating frontend bundles and preparing for server-side-rendering'
        );
        await exec(['gulp bundle', 'gulp prep-ssr']);

        await exec('? compiling all code');
        await exec('@compile --dir root --build');
    });
