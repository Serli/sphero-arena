const sphero = require("sphero");
const readline = require('readline');
const server = require('./server.js');
const util = require('./util.js');

server.start();

//orb object creation, defaults ports or ports passed in arguments
if(process.argv[2]){
    orb_chris = sphero(process.argv[2]);
    if (process.argv[3]){
        orb_serli = sphero(process.argv[3]);
    }
}else{
//    orb_chris = sphero("COM6");
  //  orb_serli = sphero("COM4");
}

//orbs connections
/*
orb_chris.connect(function () {
    util.orbSetup(orb_chris, 'blue');
});

orb_serli.connect(function () {
    util.orbSetup(orb_serli, 'gold');
});
*/
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
    }

    try {
  //      moveOrb(key);
    }
    //Exception if no orb selected
    catch (e) {
        console.log('select an orb by pressing 1 key for Serli Orb and 2 for Chris Orb ')
    }
}
});

//The orb can move forward, stop, turn right and left, shoot
function moveOrb(key) {
    //Orb can make complete turns
    if(heading >= 340){
        heading = 0;
    }else if (heading <= 0) {
        heading = 340;
    }

    //Listening keys to move the orb
    if(key.name === 'up'){
        console.log('FORWARD');
        orb_serli.roll(60, heading);
        orb_chris.roll(60, heading);
    }
    else if(key.name === 'right'){
        console.log('RIGHT');
        orb_serli.roll(1, heading+=20, 2);
        orb_chris.roll(1, heading+=20, 2);
        console.log(heading);
    }
    else if(key.name === 'left'){
        console.log('LEFT');
        orb_serli.roll(1, heading-=20, 2);
        orb_chris.roll(1, heading-=20, 2);
        console.log(heading);
    }
    else if(key.name === 'down'){
        console.log('STOP');
        orb_chris.roll(0, heading);
        orb_serli.roll(0, heading);
    }
    else if(key.name === 'space'){
        console.log('SHOOT');
        orb_chris.roll(0, heading);
        orb_serli.roll(0, heading);
    }
}

module.exports = server;