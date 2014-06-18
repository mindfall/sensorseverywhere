var mongoose = require('mongoose'),
	Group = mongoose.model('Group'),
	User = mongoose.model('User'),
	Project = mongoose.model('Project'),
	files = require('../controllers/files');;

/**
* get all groups
*/



exports.getGroups = function(req, res){
	Group.find({}).exec(function(err, collection){	
		res.send(collection);
	})
};

exports.getGroupsByUser = function(req, res) {
	Group.find({'groupMembers.username': req.params.username}, function(err, groups) {
		res.send(groups);
	});
};

exports.getGroupById = function(req, res) {
	Group.findOne({_id: req.params.id}, function(err, group) {
		res.send(group);
	});
}

/**
* create a chat log
*/

exports.createGroup = function(req, res, next){

	var groupData = req.body;
	var groupName = groupData.groupName;
	var groupProject = groupData.projectName;
	var groupDescription = groupData.groupDescription;
	var email = groupData.email;
	var username = groupData.username;
	console.log(username);
	var status = groupData.status;
	var role = groupData.role;

	filename = files.getImageName();
	
	//stub
	var saveGroup = Group.create ({
		"groupName" : groupName,
		"groupProject": groupProject,
		"groupDescription": groupDescription,
		"groupMembers":[{
			"username": username,
			"role": role,
			"status" : status
		}],
		"filename": filename
	}, 
	function(){
		var addGroupToUser = User.update({username: username, 'projectGroupRole.project': groupData.projectName},
			{ $set: {
				'projectGroupRole.$.group': groupData.groupName,
				'projectGroupRole.$.role': 'owner'
			}},
			function() {
				res.send(saveGroup);
			});
 	
	});
};

exports.findActiveMembers = function(req, res) {
	var activeMembers = Group.find({'groupMembers.status': 'accepted', 'groupProject': req.params.project},
		{'groupMembers.username': 1, _id: 0},
		function(err, activeMembers) {
			res.send(activeMembers);
		});
}

/**
* add new member(s) to group
*/

exports.addUser = function(req, res, next){

	var updateGroup = Group.update ({_id: req.body.gid}, 
		{ $push: {
			groupMembers: {
				username: req.body.username,
				role: 'member',
				status: req.body.status
			}
		}}, 
	function(){
	 	res.send(req.body);
	});
};



exports.updateUserStatus = function(req, res, next){
	console.log(req.body.username);
	var updateUser = Group.update ({_id: req.body.gid, 'groupMembers.username': req.body.username}, {
			$set: {
				'groupMembers.$.status': 'accepted'
		}
	}, 
	function(){
		res.send(req.params);
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
	console.log(req.params)

	Group.update({groupName: req.params.groupname}, {
		$pull: {
			groupMembers: {
				username: req.params.username
			}
		}}, function(err, user) {
		console.log('removed project from user');
	});


	User.update({username: req.params.username}, {
		$pull: {
			projectGroupRole: {
				group: req.params.groupname
			}
		}}, function(err, user) {
		console.log('removed project from user');
	});
}
