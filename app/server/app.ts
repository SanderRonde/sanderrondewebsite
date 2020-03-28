import { initRoutes } from './lib/routes';
import { getIO, IO } from './lib/io';
import * as express from 'express';
import * as http from 'http';

/**
 * The main app class used to wrap everything up
 */
export class WebServer {
    public app!: express.Express;

    constructor(public io: IO) {
        this._initVars();
        this._initRoutes();
        this._listen();
    }

	/**
	 * Initialize all variables
	 */
    private _initVars() {
        this.app = express();
    }

	/**
	 * Initialize all routes to the website
	 */
    private _initRoutes() {
        initRoutes(this);
    }

	/**
	 * Start listening for requests
	 */
    private _listen() {
        // HTTPS is unused for now since this is behind a proxy
        http.createServer(this.app).listen(this.io.ports.http, () => {
            console.log(`HTTP server listening on port ${this.io.ports.http}`);
        });
    }
}

new WebServer(getIO());
