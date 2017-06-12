//require modules
const express = require('express');

//create web server
const app = express();

// Bootstrap application settings
require('./express')(app);

// Bootstrap routes
require('./routes')(app);

let server;

exports.start = function() {
    server = app.listen(8010, function () {
        const host = server.address().address;
        const port = server.address().port;
        console.log("Sphero-arena service listening at http://%s:%s", host, port)
    });

    const io = require('socket.io').listen(server);

    io.on('connection', function(socket){
        console.log('a user connected');
    });
};

exports.close = function () {
    server.close(function () {
        console.log('Server Closing....');
    });
};
