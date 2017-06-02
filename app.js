const sphero = require("sphero");
const readline = require('readline');

orb_chris = sphero("COM6");
orb_serli = sphero("COM4");

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

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
    process.exit();
} else {
    console.log(`You pressed the "${str}" key`);

    if(key.name === '1'){
        console.log('orb serli');
        orb = orb_serli;
    }
    else if(key.name === '2'){
        orb = orb_chris;
        console.log('orb chris');
    }
    else{
    }

    try {
        moveOrb(orb, key);
    }
    catch (e) {
        console.log('choose an orb by pressing 1 key for Serli Orb and 2 for Chris Orb ')
    }
}
});

function moveOrb(orb, key) {
    if(key.name === 'up'){
        console.log('up');
        orb.roll(60);
    }
    else if(key.name === 'right'){
        console.log('right');
        //orb.setHeading(20);
        orb.roll(1, 270, 2);
    }
    else if(key.name === 'left'){
        console.log('left');
        //orb.setHeading(-20);
        orb.roll(1, 270, 2);
    }
    else if(key.name === 'down'){
        console.log('down');
        orb.stop();
    }
}