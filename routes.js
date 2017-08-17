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

                        if(socket.handshake.session.orb.connection.conn === 'COM7'){
                            io.emit('xposCOM4', data.xpos);
                            io.emit('yposCOM4', data.ypos);
                        }
                        if(socket.handshake.session.orb.connection.conn === 'COM9'){
                            io.emit('xposCOM6', data.xpos);
                            io.emit('yposCOM6', data.ypos);
                        }
                    }
                });
            }, 1000);
        });

        socket.on('ping orb', () => {
            console.log('ping orb');
            try {
                socket.handshake.session.orb.ping();
            }
            catch (e) {
                io.emit('exception',"Orb seems to not be able to resynchronize");
            }
        });

        socket.on('stop',  () => {
            console.log('stop');
            try {
                socket.handshake.session.orb.roll(0, 270);
            }
            catch (e) {
                io.emit('exception',"Orb seems not connected or disconnected ! Try pinging orb to resynchronize");
            }
        });

        socket.on('shoot', () => {
            console.log('shoot');
            console.log(socket.handshake.session.orb.connection.conn);
            io.emit('shoot received', socket.handshake.session.orb.connection.conn);
        });

        socket.on('turn',  (heading) => {
            //normalize orb heading
            try {
                socket.handshake.session.orb.roll(60, (-heading % 360 + 360) % 360);
            }
            catch (e) {
                io.emit('exception',"Orb seems not connected or disconnected ! Try pinging orb to resynchronize");
            }
        });

    });

    // catch-all
    app.get('*', function (req, res) { res.status(404).json({ error:'Invalid GET request' });});
    app.post('*', function (req, res) {res.status(404).json({ error:'Invalid POST request' }); });
    app.delete('*', function (req, res) { res.status(404).json({ error:'Invalid DELETE request' });});

};