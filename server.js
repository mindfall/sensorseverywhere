var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'production';

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/passport')();

require('./server/config/routes')(app);

var io = require('socket.io').listen(app.listen(config.port));
//console.log(server);
console.log('listening on port ' + config.port + '....');

require('./server/config/sockets.js').initialize(io);