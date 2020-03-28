import path from 'path';

const DIR_SCHEME = (import.meta as any).url as string;
const DIR_NAME = path.dirname(DIR_SCHEME.split('file://')[1]);

export const ROOT_DIR = path.join(DIR_NAME, '../../../');
export const APP_DIR = path.join(ROOT_DIR, 'app');
export const CLIENT_DIR = path.join(APP_DIR, 'client');