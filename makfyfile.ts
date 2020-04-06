import { cmd as _cmd, choice as _choice, flag, setEnvVar } from 'makfy';
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
        const project = (() => {
            switch (dir) {
                case 'root':
                    return './tsconfig.json';
                case 'client':
                    return './app/tsconfig.client.json';
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

cmd('build')
    .desc('Build and bundle all files')
    .args({
        fresh: flag(),
        dev: flag(),
    })
    .argsDesc({
        fresh: 'Do a fresh build (clean first)',
        dev: 'Development mode, keeps code pretty',
    })
    .run(async (exec, { fresh, dev }) => {
        const env = setEnvVar('ENV', dev ? 'dev' : 'prod');
        if (fresh) {
            await exec('? cleaning');
            await exec('@clean');
        }

        await exec('? creating pre-build requirements');
        await exec(`${env}; gulp pre-build`);

        await exec('? compiling code');
        await exec({
            _: 'compile',
            args: {
                dir: 'root',
                build: true,
            },
        });

        await exec('? creating frontend bundles etc');
        await exec({
            _: 'frontend',
            args: {
                dev,
            },
        });
    });
