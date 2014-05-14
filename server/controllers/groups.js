var mongoose = require('mongoose'),
	Group = mongoose.model('Group'),
	User = mongoose.model('User'),
	Project = mongoose.model('Project');

/**
* get all groups
*/

exports.getGroups = function(req, res){
	Group.find({}).exec(function(err, collection){	
		res.send(collection);
	})
};

/**
* create a chat log
*/

exports.createGroup = function(req, res, next){
	var groupData = req.body;
	var groupName = groupData.name;
	var groupMembers = groupData.members;
	var groupProject = groupData.project_name;
//	console.log(groupData);
	
	//stub
	var saveGroup = Group.create ({
		"name" : groupName,
		"members" : groupMembers,
		"project_name": groupProject
	}, 
	function(){
	 	res.send(saveGroup);
	});
};

/**
* add new member(s) to group
*/

exports.addMembers = function(req, res, next){
	var GroupData = req.body;
	
	//stub - not sure if update is right in mongoose
	var updateGroup = Group.update ({
	}, 
	function(){
	 	res.send(updateGroup);
	});
};


/**
* get groups by id
*/

exports.getGroupById = function(req, res){
	Group.findOne({_id:req.params.id}).exec(function(err, group) {
		res.send(group);
	});
}

/**
* get groups by project id
*/

exports.getGroupByProjectId = function(req, res){
	Group.findOne({_id:req.params.id}).exec(function(err, group) {
		res.send(group);
	});
}

/**
* get groups by user id
*/

exports.getGroupByUserId = function(req, res){
	Group.findOne({_id:req.params.id}).exec(function(err, group) {
		res.send(group);
	});
}

/**
* remove chat log - admin or project owner access only
*/

exports.removeGroup = function(req, res, next){
	console.log(req);
}
