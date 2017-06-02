const sphero = require("sphero");

orb_chris = sphero("COM6");

orb_chris.connect(function () {
    orb_chris.on("error", function(err, data) {
        if (err) { console.log(err); }
    });
    orb_chris.color('blue');
});


