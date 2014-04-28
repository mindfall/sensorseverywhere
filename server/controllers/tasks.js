var mongoose = require('mongoose'),
	Task = mongoose.model('Task'),
	User = mongoose.model('User'),
	Group = mongoose.model('Group'),
	Project = mongoose.model('Project');

/**
* get all tasks regardless what project or group they belong to
*/

exports.getTasks = function(req, res){
	Task.find({}).exec(function(err, collection){
		res.send(collection);
	})
};

/**
* create a task and assign it to a user, group and project
*/

exports.createTask = function(req, res, next){
	var taskData = req.body;
	
	//stub
	var saveTask = Task.create ({
	}, 
	function(){
	 	res.send(saveTask);
	});

};

/**
* organise tasks by project
*/

exports.getTaskByProjectId = function(req, res){
	Task.findOne({_id:req.params.id}).exec(function(err, Task) {
		res.send(task);
	});
}

/**
* organise tasks by group
*/

exports.getTaskByGroupId = function(req, res){
	Task.findOne({_id:req.params.id}).exec(function(err, Task) {
		res.send(task);
	});
}

/**
* organise tasks by user id
*/

exports.getTaskByUserId = function(req, res){
	Task.findOne({_id:req.params.id}).exec(function(err, Task) {
		res.send(task);
	});
}

/**
* organise tasks by id
*/

exports.getTaskById = function(req, res){
	Task.findOne({_id:req.params.id}).exec(function(err, Task) {
		res.send(task);
	});
}

/**
* delete tasks by id
*/

exports.removeTask = function(req, res, next){
	console.log(req);
}
