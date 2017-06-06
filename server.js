//require modules
const express = require('express');

//create web server
const app = express();

// Bootstrap application settings
require('./service/express')(app);

// Bootstrap routes
require('./service/routes')(app);

let server;

exports.start = function() {
    server = app.listen(8010, function () {
        const host = server.address().address;
        const port = server.address().port;
        console.log("Sphero-arena service listening at http://%s:%s", host, port)
    });
};

exports.close = function () {
    server.close(function () {
        console.log('Server Closing....');
    });
};
