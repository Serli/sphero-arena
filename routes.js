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
        console.log(req.params);
        res.send(orbId);
    });

    let orb_serli;
    let orb_chris;
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
        socket.on('connect orb', function(port){
            console.log('connect orb');
            if(port === 'COM4'){
                orb_serli = sphero(port);
                orb_serli.connect(function () {
                    util.orbSetup(orb_serli, 'gold');
                });
            }
            else if(port === 'COM6'){
                orb_chris = sphero(port);
                orb_chris.connect(function () {
                    util.orbSetup(orb_chris, 'gold');
                });
            }
        });
        socket.on('ping orb', function(msg){
            console.log('ping orb');
            if(msg ==='COM4'){
                orb_serli.ping();
            }
            else if(msg ==='COM6'){
                orb_chris.ping();
            }

        });
        socket.on('go forward', function(){
            console.log('go forward');
            if(orb_chris && !orb_serli){
                orb_chris.roll(60, heading);
            }else if(!orb_chris && orb_serli){
                orb_serli.roll(60, heading);
            }else if(orb_chris && orb_serli){
                orb_chris.roll(60, heading);
                orb_serli.roll(60, heading);
            }
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