//require modules
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Bootstrap application settings
require('./express')(app);

// Bootstrap routes
require('./routes')(app, io);

exports.start = function() {
    server.listen(8010);
};

exports.close = function () {
    server.close(function () {
        console.log('Server Closing....');
    });
};
