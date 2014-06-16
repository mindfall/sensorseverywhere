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
	var status = groupData.status;
	var role = groupData.role;

	filename = files.getImageName();
//	console.log('create group: ' + groupProject);
	
	//stub
	var saveGroup = Group.create ({
		"groupName" : groupName,
		"groupProject": groupProject,
		"groupDescription": groupDescription,
		"groupMembers":[{
			"email" : email,
			"username": username,
			"role": role,
			"status" : status
		}],
		"filename": filename
	}, 
	function(){
	 	res.send(saveGroup);
	});
};

/**
* add new member(s) to group
*/

exports.addUser = function(req, res, next){

	var updateGroup = Group.update ({_id: req.body.gid}, 
		{ $push: {
			groupMembers: {
				email: req.body.email,
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

	var updateUser = Group.update ({'groupMembers.email': req.body.email}, {
			$set: {
				'groupMembers.$.status': 'accepted'
		}
	}, 
	function(){

	/*	var user = User.findOne({'username': req.body.email}, 
			function(err, doc) {
				if(err) console.log('ERR ' + err);
				if(doc) {
					console.log('DOC ' + doc);
				} else {
					console.log('this is the third option' + username)
				}
			});*/

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
	console.log(req.params);
	//Group.findById(req.pa)
}
