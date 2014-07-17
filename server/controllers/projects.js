var mongoose = require('mongoose'),
	Project = mongoose.model('Project'),
	Group = mongoose.model('Group'),
	User = mongoose.model('User');

exports.getProjects = function(req, res){
	Project.find({}).exec(function(err, collection){
		res.send(collection);
	})
};

exports.createProject = function(req, res, next){
	var projectData = req.body;
	var i = 0;
	var projectOwner = projectData.project_owner;
	var projectOwnerFirstName = projectData.project_owner_firstname;
	var projectName = projectData.project_name;
	var groupName = 'Not set';
	var projectDescription = projectData.project_description;
	var projectStartDate = req.body.project_start;
	var projectEndDate = req.body.project_end;
	var projectType = req.body.project_type;
	var projectFundingRequired = req.body.project_funding_required;

	//number of species in santuary
	var wildlife_id = req.body.project_wildlife.id;
	var numberOfWildlife = req.body.project_wildlife.length;
	//names of species
	var wildlifeNames = [];
	var wildlifeNumbers = 0;
	var wildlifeComments = {
		poster: req.body.wildlife_comment_owner,
		comment: req.body.wildlife_comment
	}

	//var monitorNumber = req.body.project_monitor.length;
	var monitorNumber = 0;
	var monitorPointData = [];
	var	monitorPointsArray = [];

	var monitorData = {
		monitorName : req.body.monitorName,
		monitorType : req.body.monitorType,
		monitorCoords : req.body.monitor_location,
		monitorComment : req.body.monitorComment,
		monitorActive : req.body.monitorActive,
		monitorLastUser : req.body.monitor_lastUser,
		monitorLastUsed : req.body.monitor_lastUsed,
		monitor_totalHours :req.body.monitor_totalHours
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


//	var numberOfMonitors = req.body.project_monitors;

	for(i; i < numberOfWildlife; i++){
		wildlifeNames.push(req.body.project_wildlife[i].name);
	}
	
	for(i; i < coordinatesLength; i++){
		pointsArray.push(req.body.project_location[0][i]);
	}

	var saveProject = Project.create ({

		    //id: Number,
		    "project_name": projectName,
		    "project_group": groupName,
		    "project_owner": {
		       	"owner_id": projectOwner,
		        "owner_name": projectOwnerFirstName
		         //   owner_gravatar: String
		    },
		    "project_wildlife": [{
		        "id": wildlife_id,
		        "name": wildlifeNames,
		        "number": wildlifeNumbers,
		        "comments": [{
		            "owner": wildlifeComments.poster,
		            "comment": wildlifeComments.comment
		        }]
		    }],
		    "project_monitors": {
		    	"name": monitorData.monitorName,
		        "type": monitorData.monitorType,
		        "number": monitorData.monitorNumber,
		        "coords": monitorData.monitorCoords,
		        "comment": monitorData.monitorComment,
		        "active": monitorData.monitorActive,
		        "last_user": monitorData.monitorLastUser,
		        "last_used": monitorData.monitorLastUsed,
		        "total_hours": monitorData.monitor_totalHours
		    },
 		    "project_location_data": {
				"layer_type": projectMapType,
				 "project_coords": {
		    	"points": pointsArray,
		    	},
				"area_acres": projectArea,
				"nearestTown": projectNearestTown,
				"distance_to_town": projectTownDistance
		    },
		    "project_description": projectDescription,
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
	function(){
		var addUserToProject = User.update({_id: projectOwner},
			{ $push: {
				projectGroupRole: {
					project: projectData.project_name,
				}

			}},
			function() {
				console.log('save project ' + JSON.stringify(saveProject));
				res.send(saveProject);
			});
	}, function(err){
		console.log(err);
	});
};

exports.addGroupToProject = function(req, res) {
//	console.log('adding group to project ' + JSON.stringify(req.body));
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

exports.updateTotalContributions = function(req, res){
	var contributionAmount = req.body.amount;
	var addAmount = parseInt(contributionAmount);
	//console.log('Thie amount is: ' + contributionAmount);
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
	//	res.send(projects);
	});
}

exports.getProjectsByUserId = function(req, res) {
	console.log(req.params);
	 Project.find({'project_owner.owner_id': req.params.id}, function(err, project) {
	 	console.log(project);
	 	res.send(project)
	 });
}

exports.updateProject = function(req, res) {
/*	Project.find({'project._id' : req.params.id}, function(err, project) {
		res.send(project);
	});*/
}

exports.removeProject = function(req, res, next){

	Project.findById(req.params.id, function(err, project) {
		Group.find({'groupName': project.project_group}, function(err, group) {
			Group.remove(function(err, group) {
				console.log('removed group');
			})
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
