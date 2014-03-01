var mongoose = require('mongoose')
	userModel = require('../models/User'), 
	wildlifeModel = require('../models/Wildlife'),
	projectModel = require('../models/Project');



module.exports = function(config){
	mongoose.connect(config.db);

	var db = mongoose.connection;
	db.on('error', console.error.bind('console', 'connection error...'));
	db.once('open', function callback(){
		console.log('wildFire db opened');
	});

	userModel.createDefaultUsers();
	wildlifeModel.createDefaultWildlife();
	projectModel.createDefaultProjects();

};
