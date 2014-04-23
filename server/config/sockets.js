var io = require('socket.io');

exports.initialize = function(socket){
	var name = 'Wade';//userNames.getGuestName();

  // send the new user their name and a list of users
  socket.emit('init', {
    name: name,
    //users: userNames.get()
  });

  // notify other clients that a new user has joined
  socket.on('user:join', function(data) {
  	socket.broadcast.emit('user:join', {
	    name: name
	});
  })


  // broadcast a user's message to other users
  socket.on('send:message', function (data) {
    socket.broadcast.emit('send:message', {
      user: name,
      text: data
    });
  });

  // clean up when a user leaves, and broadcast it to other users
  socket.on('disconnect', function () {
    socket.broadcast.emit('user:left', {
      name: name
    });
   // userNames.free(name);
  });
}
