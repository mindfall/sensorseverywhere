var mongoose = require('mongoose'),
	Comment = mongoose.model('Comment'),
	User = mongoose.model('User'),
	Group = mongoose.model('Group'),
	Project = mongoose.model('Project'),
	Wildlife = mongoose.model('Wildlife');

exports.getComments = function(req, res){
	Comment.find({}).exec(function(err, collection){
		res.send(collection);
	})
};

exports.createComment = function(req, res, next){
	var commentData = req.body;
	
	//stub
	var saveComment = Comment.create ({
	}, 
	function(){
	 	res.send(saveComment);
	});

};

exports.getCommentById = function(req, res){
	Comment.findOne({_id:req.params.id}).exec(function(err, comment) {
		res.send(comment);
	});
}

exports.removeComment = function(req, res, next){
	console.log(req);
}
