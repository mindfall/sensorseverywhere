var mongoose = require('mongoose'),
	Project = mongoose.model('Project'),
	Group = mongoose.model('Group'),
	User = mongoose.model('User'),
	fs = require('fs'),
	stripe = require("stripe")("sk_test_5vk3CX0YjSCSipm9B0Bmuu7U");

/*var util = require('util');
var mime = require('mime'); 
var path = require('path');
var group = require('../controllers/groups');*/

exports.getProjects = function(req, res){
	Project.find({}).exec(function(err, collection){

		if(err){
			res.status(400);
			return res.send({reason:err.toString()});
		} else {
			res.send(collection);
		}
	});
};

exports.createProject = function(req, res, next){
	var projectData = req.body;
	var i;
	var projectOwner = projectData.project_owner;
	var projectOwnerFirstName = projectData.project_owner_firstname;
	var projectName = projectData.project_name;
	var groupName = 'Not set';
	var projectDescription = projectData.project_description;
	var projectStartDate = req.body.project_start;
	var projectEndDate = req.body.project_end;
	var projectType = req.body.project_type;
	var projectFundingRequired = req.body.project_funding_required;
	if(projectFundingRequired === undefined) {
		projectFundingRequired = 0;
		console.log('PFR ' + projectFundingRequired);
	}


	var coordinatesLength = req.body.project_location[0].length;
	var pointData = [];
	var pointsArray = [];

	var projectMapType = req.body.project_map_layer_type;
	var projectNearestTown = req.body.project_town;
	var projectArea = req.body.project_area;
	var projectTownDistance = req.body.project_distance_to_town;

	var projectType = req.body.project_type;

	var taskPriority = '';
	var taskName = '';
	var taskDescription = '';
	var taskOwner = '';
 	var taskStatus = '';

	var monitorNumber = req.body.project_monitors.length;

	var monitorCoords = [];
	var monitor = {};
	var project_monitors = [];

	var projectImage = projectData.project_image;


/*	var wildlifeComments = {
		poster: req.body.wildlife_comment_owner,
		comment: req.body.wildlife_comment
	}*/

	for(i = 0; i < monitorNumber; i++) {

		monitor = {	
			monitorName : req.body.project_monitors[i].name,
			monitorType : req.body.project_monitors[i].type,
			monitorSpecificWildlife : req.body.project_monitors[i].specificWildlife,
			monitorActive : req.body.project_monitors[i].active,
			monitorWildlifeClass: req.body.project_monitors[i].wildlifeClass,
			monitorPosition: req.body.project_monitors[i].position	
		}
		project_monitors.push(monitor);
	}

	var numberOfWildlife = req.body.project_wildlife.length;
	var wildlife = {};
	var project_wildlife = [];


	for(i = 0; i < numberOfWildlife; i++){

		wildlife = {
			wildlifeId: req.body.project_wildlife[i].id,
			wildlifeNames: req.body.project_wildlife[i].name,
			wildlifeNumbers: req.body.project_wildlife[i].numbers,
			wildlifeThumb: req.body.project_wildlife[i].thumb,
			wildlifeClassification: req.body.project_wildlife[i].classification
		}
		project_wildlife.push(wildlife);
	}

	
	for(i = 0; i < coordinatesLength; i++){
		pointsArray.push(req.body.project_location[0][i]);
	}
	pointData.push(pointsArray);

	var saveProject = Project.create ({

		    //id: Number,
		    "project_name": projectName,
		    "project_group": groupName,
		    "project_owner": {
		       	"owner_id": projectOwner,
		        "owner_name": projectOwnerFirstName
		         //   owner_gravatar: String
		    },
		    "project_wildlife": project_wildlife,
		    "project_monitors": project_monitors,
 		    "project_location_data": {
				
				"project_coords": {
					"layer_type": projectMapType,
		    		"coordinates": pointData,
		    	},
				"area_acres": projectArea,
				"nearestTown": projectNearestTown,
				"distance_to_town": projectTownDistance
		    },
		    "project_description": projectDescription,
		    "project_image": projectImage,
	        "project_start_date": projectStartDate,
	        "project_end_date": projectEndDate,
	        "project_funding_required": projectFundingRequired,
	        "total_contributions":0,
	        "project_type": projectType,
	        "projectTasks": [{
				"taskPriority": taskPriority,
				"taskName": taskName,
				"taskDescription": taskDescription,
				"taskOwner": taskOwner,
				"taskStatus": taskStatus
			}]


	}, 
	 function(err, project){
		if(err){
			if(err.toString().indexOf('E11000') > -1){
				err = new Error('Duplicate project name.');
			}
			res.status(400);
			return res.send({reason:err.toString()});
		} else {
			var addUserToProject = User.update({_id: projectOwner},
			{ $push: {
				projectGroupRole: {
					project: projectData.project_name,
				}

			}},
			function() {
				res.send(saveProject);
			});
		}
	});
};

exports.updateProject = function(req, res) {
	var edit = req.body.projectData;
	var name = edit.project_name;
	var description = edit.project_description;
	var start_date = edit.project_start_date;
	var end_date = edit.project_end_date;
	var group = edit.project_group;
	var owner = edit.project_owner;
	var type = edit.project_type;
	var coords = edit.project_coords;
	var monitors = edit.project_monitors;
	var wildlife = edit.project_wildlife;

	Project.findById(req.params.id, function(err, project) {
		Project.update(
		{ 
			$set: {
				'project_location_data.project_coords.layer_type': "Polygon",
				'project_location_data.project_coords.coordinates': coords,
				'project_name': name,
				'project_description': description,
				'project_type': type,
				'project_group': group,
				'project_owner': owner,
				'project_wildlife': wildlife,
				'project_monitors': monitors,
				'project_start_date': start_date,
				'project_end_date': end_date,
			},
		},

		function(err, project) {
			res.send(project);
		});

	});

	// Project.findById(req.params.id, function(err, project) {
	// 	Project.update(
	// 	{ 
	// 		$set: {
	// 			project_name: name,
	// 		},
	// 	},

	// 	function(err, project) {
	// 		res.send(project);
	// 	});

	// });

	// Project.findById(req.params.id, function(err, project) {
	// 	Project.update(
	// 	{ 
	// 		$set: {
	// 			project_description: description,
	// 		},
	// 	},

	// 	function(err, project) {
	// 		res.send(project);
	// 	});

	// });

	// Project.findById(req.params.id, function(err, project) {
	// 	Project.update(
	// 	{ 
	// 		$set: {
	// 			project_type: type,
	// 		},
	// 	},

	// 	function(err, project) {
	// 		res.send(project);
	// 	});

	// });

}

exports.removeProject = function(req, res, next){

	Project.findById(req.params.id, function(err, project) {
		Group.find({'groupName': project.project_group}, function(err, group) {
			Group.remove(function(err, group) {
				// group removed
			}, function(err) {
				console.log(err);
			});
		});
		User.update({_id: project.project_owner.owner_id}, {
 			$pull: {
				projectGroupRole: {
					project: project.project_name
				}
			}}, function(err, user) {
			console.log('removed project from user');
		});
		project.remove(function(err, project) {
			res.send(project);
		});
	});
}

exports.addGroupToProject = function(req, res) {

	var addGroup = Project.update( { project_name: req.body.projectName},
		{ $set: {
			project_group: req.body.groupName
		}},
		function() {
			res.send(req.body);
		});
}

exports.addTaskToProject = function(req, res) {

	var updateTask = Project.update( {_id: req.body.pid},
					{ $push: {
						projectTasks: {
							taskPriority: req.body.taskPriority,
							taskName: req.body.taskName,
							taskDescription: req.body.taskDescription,
							taskOwner: req.body.taskOwner,
							taskStatus: req.body.taskStatus
						}
					}},
		function(){
			res.send(req.body);
		});
}

exports.removeTaskFromProject = function(req, res) {
	console.log(req.params);
	// var updateTask = Project.update({id: req.body.pid},
	// console.log(updateTask);
	// );
}

exports.makePayment = function(req, res) {
	var token = req.params.token;
	var amount = req.params.amount;
	var project = req.params.project;
	console.log(token);
	console.log(amount);
	console.log(project);
	//console.log(data.token + '    ' + data.amount + '    ' + data.project);
	var charge = stripe.charges.create({
		amount: amount, 
		currency: "aud",
		token: token,
		description: "payment to project " + project
	}, function(err, charge) {
		if(err && err.type === 'StripeCardError') {
			console.log('The card has been declined.');
		} else {
			res.send('success');
		}
	});

}

exports.updateTotalContributions = function(req, res){
	var contributionAmount = req.body.amount;
	var addAmount = parseInt(contributionAmount);
	Project.update(
		{_id:req.params.id},
		{
			$inc: {
				total_contributions: addAmount
			}
		}, function(){
			res.send('success' + contributionAmount);
	});

}

exports.getProject = function(req, res){
	Project.findOne({_id:req.params.id}).exec(function(err, projects) {
		res.send(projects);
	});
}

exports.viewProjectDetails = function(req, res){
	Project.findOne({project_name:req.params.name}).exec(function(err, projects) {
		res.send(projects);
	});
}

exports.getProjectsByUserId = function(req, res) {

	 Project.find({'project_owner.owner_id': req.params.id}, function(err, project) {
	 	res.send(project)
	 });
}

exports.getProjectsByGroup = function(req, res) {

	 Project.find({'project_group': req.params.group}, function(err, project) {
	 	res.send(project)
	 });
}

exports.getProjectTasks = function(req, res) {
	Project.findById(req.params.id, function(err, project) {
		res.send(project.projectTasks);
	})
}

