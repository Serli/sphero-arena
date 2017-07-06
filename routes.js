const sphero = require("sphero");
const util = require('./util.js');

module.exports = function (app, io) {

    io.on('connection',  (socket) => {
        console.log("Session: ", socket.handshake.session);
        console.log('a user connected');

        socket.on('disconnect', () => console.log('user disconnected'));

        socket.on('connect orb',  (data) => {
            console.log('connect orb');
            socket.handshake.session.orb = sphero(data.port);
            socket.handshake.session.orb.connect(function () {
                util.orbSetup(socket.handshake.session.orb, data.color);
            });
            setInterval(function() {
                socket.handshake.session.orb.readLocator(function(err, data) {
                    if (err) {
                        console.log("error: ", err);
                    } else {
                        console.log(socket.handshake.session.orb.connection.conn, "readLocator:");
                        console.log("  xpos:", data.xpos);
                        console.log("  ypos:", data.ypos);
                        //console.log(socket.handshake.session.heading);

                        if(socket.handshake.session.orb.connection.conn === 'COM4'){
                            io.emit('xposCOM4', data.xpos);
                            io.emit('yposCOM4', data.ypos);
                        }
                        if(socket.handshake.session.orb.connection.conn === 'COM6'){
                            io.emit('xposCOM6', data.xpos);
                            io.emit('yposCOM6', data.ypos);
                        }

                        socket.handshake.session.xpos =data.xpos;
                        socket.handshake.session.ypos =data.ypos;
                    }
                });
            }, 1000);
        });
        socket.on('ping orb', () => {
            console.log('ping orb');
            socket.handshake.session.orb.ping();
        });

        socket.on('go forward',  () => {
            console.log('go forward');
            console.log(socket.handshake.session.heading);

            socket.handshake.session.orb.roll(60, socket.handshake.session.heading);
        });
        socket.on('stop',  () => {
            console.log('stop');
            socket.handshake.session.orb.roll(0, 270);
        });
        socket.on('left',  () => {
            console.log('left');
            console.log(socket.handshake.session.heading);

            socket.handshake.session.heading = verifyHeading(socket.handshake.session.heading);
            socket.handshake.session.orb.roll(60, socket.handshake.session.heading-=20);
        });
        socket.on('right',  () => {
            console.log('right');
            console.log(socket.handshake.session.heading);
            socket.handshake.session.heading = verifyHeading(socket.handshake.session.heading);
            socket.handshake.session.orb.roll(60, socket.handshake.session.heading+=20);
        });

        socket.on('shoot',  () => {
            console.log('shoot');
            io.emit('shoot received');
        });

        socket.on('turn',  (heading) => {
            console.log(heading);
            socket.handshake.session.orb.roll(60, (-heading % 360 + 360) % 360);
        });

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

function normalize(heading){
    //Orb can make complete turns
    heading+=110;

    return heading;
}