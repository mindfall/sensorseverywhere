var mongoose = require('mongoose')
	userModel = require('../models/User'), 
	wildlifeModel = require('../models/Wildlife'),
	projectModel = require('../models/Project'),
	groupModel = require('../models/Group'),
	taskModel = require('../models/Task'),
	chatModel = require('../models/Chat'),
	commentModel = require('../models/Comment'),
	mailModel = require('../models/Mail');


module.exports = function(config){

	mongoose.connect(config.db);

	var db = mongoose.connection;
	db.on('error', console.error.bind('console', 'connection error...'));
	db.once('open', function callback(){
		console.log('wildFire db opened');
	/*	mongoose.connection.db.collectionNames(function(err, names) {
			mongoose.connection.db.dropCollection(names[10]);
		})*/
	});


	
	userModel.createDefaultUsers();
	wildlifeModel.createDefaultWildlife();
	mailModel.createDefaultMail();
	groupModel.createDefaultGroups();

};
