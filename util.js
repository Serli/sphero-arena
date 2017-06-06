const util = {};

util.orbSetup = function (orb, color) {
    orb.on("error", function(err, data) {
        if (err) { console.log("ERREUR", err); }
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
};

module.exports = util;