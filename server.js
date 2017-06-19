//require modules
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cookieParser = require('cookie-parser')();
const session = require('cookie-session')({ secret: 'secret' });

// Bootstrap application settings
require('./express')(app);

// Bootstrap routes
require('./routes')(app, io);

exports.start = function() {
    app.use(cookieParser);
    app.use(session);

    io.use(function(socket, next) {
        let req = socket.handshake;
        let res = {};
        cookieParser(req, res, function(err) {
            if (err) return next(err);
            session(req, res, next);
        });
    });

    server.listen(8080);
};

exports.close = function () {
    server.close(function () {
        console.log('Server Closing....');
    });
};
