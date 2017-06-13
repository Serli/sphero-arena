const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const join = require('path').join;
const parseurl = require('parseurl');
const session = require('express-session');
const store  = new express.session.MemoryStore;

module.exports = function (app) {
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use(express.static(__dirname + '/public'));

    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        store:store,
        saveUninitialized: true
    }));

    app.use(function (req, res, next) {
        console.log(req.session);
        let views = req.session.views;

        if (!views) {
            views = req.session.views = {}
        }

        // get the url pathname
        let pathname = parseurl(req).pathname;

        // count the views
        views[pathname] = (views[pathname] || 0) + 1;

        next()
    });

    app.use(favicon( join(__dirname, './public/icons/favicon.ico')));

    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        next();
    });
};