export interface EntrypointHTMLFileOptions {
    defer?: boolean;
    mainTag?: string;
}

export const enum SERVE_STATEGY {
    /**
     * First serve the (offline) cached version of the file.
     * If that fails, serve the remote (online) version
     */
    OFFLINE_FIRST,
}

export interface SWConfig {
    /**
     * Groups of to-be-cached files
     */
    groups: {
        /**
         * Attempt to update the file by asking the
         * server if a new version exists
         */
        attemptUpdate: boolean;
        /**
         * Notify the client that a new version is
         * available if a file has been updated
         * (false by default)
         */
        notifyOnUpdate?: boolean;
        /**
         * The serving strategy
         */
        serveStategy: SERVE_STATEGY;
        /**
         * The actual files to cache
         */
        files: string[];
    }[];
    /**
     * The different routes that can be
     * served and their corresponding HTML file
     */
    routes: {
        /**
         * Aliases/names for this route.
         * If one of these are requested,
         * the source is served
         */
        aliases: string[];
        /**
         * The source route from which to
         * get the file
         */
        src: string;
    }[];
}

/**
 * A map from file paths to version hashes
 */
export type VersionMap = {
	[filePath: string]: string;
}

export type ENTRYPOINTS_TYPE = 'index';