var mongoose = require('mongoose'),
	Wildlife = mongoose.model('Wildlife');

exports.getWildlife = function(req, res){
	Wildlife.find({}).exec(function(err, collection){
		res.send(collection);
	})
};