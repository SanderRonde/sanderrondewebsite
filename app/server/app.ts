import { Entrypoints } from './lib/entrypoints.js';
import serverTiming from 'server-timing';
import { Routes } from './lib/routes.js';
import { IO } from './lib/io.js';
import express from 'express';
import morgan from 'morgan';
import http from 'http';

/**
 * The main app class used to wrap everything up
 */
export class WebServer {
    public app!: express.Express;

    constructor(public io: IO.IO) {
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

    private _markSendMethods() {
        this.app.use((_req, res, next) => {
            res.startTime('route-resolution', 'Resolving matching route');
            next();
        });
    }

	/**
	 * Initialize all routes to the website
	 */
    private _initRoutes() {
        this.app.use(serverTiming() as express.RequestHandler);
        this.app.use(morgan('dev'))
        this._markSendMethods();
        Entrypoints.registerEntrypointHandlers(this);
        Routes.initRoutes(this);
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

new WebServer(IO.getIO());
