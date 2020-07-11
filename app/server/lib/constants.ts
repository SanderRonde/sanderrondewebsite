import path from 'path';
import os from 'os';

const DIR_SCHEME = (import.meta as any).url as string;
const DIR_FULL = path.dirname(DIR_SCHEME.split('file://')[1]);
const DIR_NAME = os.platform() === 'win32' ? DIR_FULL.slice(1) : DIR_FULL;

// Paths
export const ROOT_DIR = path.join(DIR_NAME, '../../../');
export const APP_DIR = path.join(ROOT_DIR, 'app');
export const CLIENT_DIR = path.join(APP_DIR, 'client');

// Cache
export const CACHE_MAX_AGE = 60 * 60 * 24 * 365;
export const CACHE_HEADER = `public, must-revalidate, max-age=${CACHE_MAX_AGE}`;
