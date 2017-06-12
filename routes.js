
module.exports = function (app, io) {
    app.get('/', function(req, res) {
      res.sendFile(__dirname + "/public/views/" + "index.htm");
    });


    io.on('connection', function(socket){
        console.log('a user connected');
    });

    //app.post('/processmessage', processMessage);

    // catch-all
    app.get('*', function (req, res) { res.status(404).json({ error:'Invalid GET request' });});
    app.post('*', function (req, res) {res.status(404).json({ error:'Invalid POST request' }); });
    app.delete('*', function (req, res) { res.status(404).json({ error:'Invalid DELETE request' });});

};