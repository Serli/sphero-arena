const sphero = require("sphero");
const readline = require('readline');

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
    orb_chris.on("error", function(err, data) {
        if (err) { console.log(err); }
    });
    orb_chris.color('blue');
    orb_chris.setTempOptionFlags(0x08); // Back light always on
    orb_chris.setBackLed(255); // Full intensity
});

orb_serli.connect(function () {
    orb_serli.on("error", function(err, data) {
        if (err) { console.log(err); }
    });
    orb_serli.color('gold');
    orb_serli.setTempOptionFlags(0x08); // Back light always on
    orb_serli.setBackLed(255); // Full intensity
});

let orb;
let heading = 0;

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
    process.exit();
} else {
    console.log(`You pressed the "${str}" key`);

    if(key.name === '1'){
        console.log('orb serli selected');
        orb = orb_serli;
    }
    else if(key.name === '2'){
        orb = orb_chris;
        console.log('orb chris selected');
    }

    try {
        moveOrb(orb, key);
    }
    catch (e) {
        console.log('select an orb by pressing 1 key for Serli Orb and 2 for Chris Orb ')
    }
}
});

function moveOrb(orb, key) {
    if(key.name === 'up'){
        console.log('FORWARD');
        orb.roll(60, heading);
    }
    else if(key.name === 'right'){
        console.log('RIGHT');
        orb.roll(1, heading+=20, 2);
    }
    else if(key.name === 'left'){
        console.log('LEFT');
        orb.roll(1, heading-=20, 2);
    }
    else if(key.name === 'down'){
        console.log('STOP');
        orb.stop();
    }
    else if(key.name === 'space'){
        console.log('SHOOT');
        orb.stop();
    }
}