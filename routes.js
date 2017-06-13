const sphero = require("sphero");
const util = require('./util.js');



module.exports = function (app, io) {
    app.get('/', function(req, res) {
      res.sendFile(__dirname + "/public/views/" + "index.htm");
    });

    let orb;
    let heading = 0;

    io.on('connection', function(socket){
        console.log('a user connected');
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
        socket.on('chat message', function(msg){
            console.log('message: ' + msg);
        });
        socket.on('message', function(msg){
            console.log('message: ' + msg);
        });
        socket.on('go forward', function(){
            console.log('go forward');
            orb.roll(60, heading);
        });
        socket.on('connect orb', function(port){
            console.log('connect orb');
            orb = sphero(port);
            orb.connect(function () {
                util.orbSetup(orb, 'gold');
            });
        });
        socket.on('stop', function(){
            console.log('stop');
            orb.roll(0);
        });
        socket.on('left', function(){
            console.log('left');
            heading = verifyHeading(heading);
            orb.roll(1, heading-=20, 2);
        });
        socket.on('right', function(){
            console.log('right');
            heading = verifyHeading(heading);
            orb.roll(1, heading+=20, 2);
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