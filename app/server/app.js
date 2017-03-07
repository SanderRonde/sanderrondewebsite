"use strict";
var express = require("express");
var path = require("path");
var http = require("http");
var http2 = require('http2');
var Router = require('router');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var compression = require('compression');
var LEX = require('letsencrypt-express');
var finalhandler = require('finalhandler');
var ports = {
    http: 1337,
    https: 1338
};
new Promise(function (resolve, reject) {
    resolve({});
}).then(function (certs) {
    var app = express();
    var router = new Router();
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views/'));
    app.set('view engine', 'jade');
    router.use(favicon(path.join(__dirname, '../client/public/favicon.ico')));
    router.use(cookieParser());
    router.use(compression());
    router.use(express.static(path.join(__dirname, '../client/public'), {
        maxAge: 3600
    }));
    function render(view) {
        return function (req, res) {
            app.render(view, {}, function (err, html) {
                if (err) {
                    console.log('err', err);
                    res.writeHead(500);
                }
                res.setHeader('Content-type', 'text/html');
                res.end(html);
            });
        };
    }
    router.get('/', render('index'));
    router.use(function (err, req, res, next) {
        if (err) {
            console.log(err);
            res.writeHead(500);
        }
        render('404')(req, res);
    });
    http.createServer(function (req, res) {
        router(req, res, finalhandler(req, res));
    }).listen(ports.http, function () {
        console.log("HTTP server listening on port " + ports.http);
    });
});
//# sourceMappingURL=app.js.map