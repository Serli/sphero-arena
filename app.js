const sphero = require("sphero");
const readline = require('readline');
const server = require('./server.js');

server.start();

//orb object creation, defaults ports or ports passed in arguments
if(process.argv[2]){
    orb_chris = sphero(process.argv[2]);
    if (process.argv[3]){
        orb_chris = sphero(process.argv[3]);
    }
}else{
    orb_chris = sphero("COM6");
    orb_serli = sphero("COM4");
}

//orbs connections
orb_chris.connect(function () {
    orbSetup(orb_chris, 'blue');
});

orb_serli.connect(function () {
    orbSetup(orb_serli, 'gold');
});

let orb;
let heading = 0;

//Keyboard keys listeners
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
    //terminate process command Ctrl+C
    if (key.ctrl && key.name === 'c') {
    process.exit();
} else {
    //orb selection with keyboard numbers
    if(key.name === '1'){
        console.log('orb serli selected');
        orb = orb_serli;
        console.log(orb);
    }
    else if(key.name === '2'){
        orb = orb_chris;
        console.log(orb);
        console.log('orb chris selected');
        console.log(orb.connection.conn);
    }

    try {
        moveOrb(orb, key);
    }
    //Exception if no orb selected
    catch (e) {
        console.log('select an orb by pressing 1 key for Serli Orb and 2 for Chris Orb ')
    }
}
});

//The orb can move forward, stop, turn right and left, shoot
function moveOrb(orb, key) {
    if(heading >= 340){
        heading = 0;
    }else if (heading < 0) {
        heading = 340;
    }

    if(key.name === 'up'){
        console.log('FORWARD');
        orb.roll(60, heading);
    }
    else if(key.name === 'right'){
        console.log('RIGHT');
        orb.roll(1, heading+=20, 2);
        console.log(heading);
    }
    else if(key.name === 'left'){
        console.log('LEFT');
        orb.roll(1, heading-=20, 2);
        console.log(heading);
    }
    else if(key.name === 'down'){
        console.log('STOP');
        orb.roll(0, heading);
    }
    else if(key.name === 'space'){
        console.log('SHOOT');
        orb.roll(0, heading);
    }
}


function orbSetup(orb, color){
    orb.on("error", function(err, data) {
        if (err) { console.log(err); }
    });
    orb.ping();
    orb.color(color);
    orb.setTempOptionFlags(0x08); // Back light always on
    orb.setBackLed(255); // Full intensity

    let opts = {
        flags: 0x01,
        x: 0x0000,
        y: 0x0000,
        yawTare: 0x0
    };

    orb.configureLocator(opts);

    setInterval(function() {
        orb.readLocator(function(err, data) {
            if (err) {
                console.log("error: ", err);
            } else {
                console.log(orb.connection.conn, "readLocator:");
                console.log("  xpos:", data.xpos);
                console.log("  ypos:", data.ypos);
            }
        });
    }, 1000);
}

module.exports = server;