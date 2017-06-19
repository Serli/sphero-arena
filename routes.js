const sphero = require("sphero");
const util = require('./util.js');

module.exports = function (app, io) {

    app.get('/', function(req, res) {
      res.sendFile(__dirname + "/public/views/" + "index.htm");
    });

    app.get('/controls', function(req, res) {
        res.sendFile(__dirname + "/public/views/" + "controls.htm");
    });

    // routes will go here
    app.get('/orb', function(req, res) {
        let orbId = req.param('port');
        res.send(orbId);
    });

    io.on('connection', function(socket){
        console.log("Session: ", socket.handshake.session);
        console.log('a user connected');
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });

        socket.on('connect orb', function(port){
            console.log('connect orb');
            socket.handshake.session.orb = sphero(port);
            socket.handshake.session.orb.connect(function () {
                util.orbSetup(socket.handshake.session.orb, 'gold');
            });
            socket.handshake.session.heading = 0;
            setInterval(function() {
                socket.handshake.session.orb.readLocator(function(err, data) {
                    if (err) {
                        console.log("error: ", err);
                    } else {
                        console.log( socket.handshake.session.orb.connection.conn, "readLocator:");
                        console.log("  xpos:", data.xpos);
                        console.log("  ypos:", data.ypos);
                        socket.handshake.session.xpos =data.xpos;
                        socket.handshake.session.ypos =data.ypos;
                    }
                });
            }, 1000);
        });
        socket.on('ping orb', function(){
            console.log('ping orb');
            socket.handshake.session.orb.ping();

        });
        socket.on('go forward', function(){
            console.log('go forward');
            socket.handshake.session.orb.roll(60, socket.handshake.session.heading);
        });
        socket.on('stop', function(){
            console.log('stop');
            socket.handshake.session.orb.roll(0, socket.handshake.session.heading);
        });
        socket.on('left', function(){
            console.log('left');
            socket.handshake.session.heading = verifyHeading(socket.handshake.session.heading);
            socket.handshake.session.orb.roll(1, socket.handshake.session.heading-=20, 2);
        });
        socket.on('right', function(){
            console.log('right');
            socket.handshake.session.heading = verifyHeading(socket.handshake.session.heading);
            socket.handshake.session.orb.roll(1, socket.handshake.session.heading+=20, 2);
        });
/*
        socket.on('change mode', function(data) {
            socket.broadcast.to(data).emit('receive change mode', data.mode)
        });
        */



    });

    // catch-all
    app.get('*', function (req, res) { res.status(404).json({ error:'Invalid GET request' });});
    app.post('*', function (req, res) {res.status(404).json({ error:'Invalid POST request' }); });
    app.delete('*', function (req, res) { res.status(404).json({ error:'Invalid DELETE request' });});

};


function verifyHeading(heading){
    //Orb can make complete turns
    if(heading >= 340){
        heading = 0;
    }else if (heading <= 0) {
        heading = 340;
    }

    return heading;
}