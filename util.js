const util = {};

util.orbSetup = function (orb, color) {
    orb.on("error", function(err) {
        if (err) { console.log("ERREUR", err); }
    });
    orb.ping();
    orb.color(color);
    orb.setTempOptionFlags(0x08); // Back light always on
    orb.setBackLed(255); // Full intensity
    //set orb heading
    orb.roll(0,180,2);

    let opts = {
        flags: 0x01,
        x: 0x0000,
        y: 0x0000,
        yawTare: 0x0
    };

    orb.configureLocator(opts);
};

module.exports = util;