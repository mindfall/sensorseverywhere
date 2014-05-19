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

exports.getGroupsByUser = function(req, res) {
	Group.find({'owner': req.params.id}, function(err, groups) {
		res.send(groups);
	});
}

/**
* create a chat log
*/

exports.createGroup = function(req, res, next){
	var groupData = req.body;
	var groupOwner = groupData.owner;
	var groupName = groupData.groupName;
	var groupProject = groupData.belongsToProject;
	var groupDescription = groupData.groupDescription;
	
	//stub
	var saveGroup = Group.create ({
		"owner" : owner,
		"groupName" : groupName,
		"groupProject": groupProject,
		"groupDescription": groupDescription
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
	Group.findById(req.params.id, function(err, group) {
		group.remove(function(err, group) {
			res.send(group);
		});
	});
}

exports.removeUserFromGroup = function(req, res) {
	console.log(req.params);
	//Group.findById(req.pa)
}
