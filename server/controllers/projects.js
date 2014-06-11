var mongoose = require('mongoose'),
	Project = mongoose.model('Project'),
	User = mongoose.model('User');

exports.getProjects = function(req, res){
	Project.find({}).exec(function(err, collection){
		res.send(collection);
	})
};

exports.createProject = function(req, res, next){
	var projectData = req.body;
	var i = 0;
//	console.log(projectData.project_location[0].length);
//	console.log(projectData.project_location[0])
	var projectOwner = projectData.project_owner;
	var projectOwnerFirstName = projectData.project_owner_firstname;
	var projectName = projectData.project_name;
	var projectDescription = projectData.project_description;
	var projectStartDate = req.body.project_start;
	var projectEndDate = req.body.project_end;
	var projectType = req.body.project_type;
	var projectFundingRequired = req.body.project_funding_required;

	var numberOfWildlife = req.body.project_wildlife.length;
	var wildlifeNames = [];

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
		    "project_owner": [{
		       	"owner_id": projectOwner,
		        "owner_name": projectOwnerFirstName
		         //   owner_gravatar: String
		    }],
		    "project_group": [{
		        "groupName": null
		    }],
		    "project_wildlife": {
		        "name": wildlifeNames,
		    },
		    "project_coords": {
		    	"points": pointsArray,
		    },
 		    "project_location_data": {
				"layer_type": projectMapType,
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
//		console.log(saveProject);
	 	res.send(saveProject);
	});

};

exports.addGroupToProject = function(req, res) {
//	console.log('adding group to project ' + JSON.stringify(req.body));
	var addGroup = Project.update( { project_name: req.body.projectName},
		{ $push: {
			project_group: {
				groupName: req.body.groupName
			}
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
			console.log('something happened, I just dont know what' + req.body.pid);
			res.send(req.body);
		});
}
/*
var Kitten = db.model('Kitten', kittySchema);
Kitten.update({name: 'fluffy'},{$pushAll: {values:[2,3]}},{upsert:true},function(err){
        if(err){
                console.log(err);
        }else{
                console.log("Successfully added");
        }
});*/

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

exports.getProjectById = function(req, res){
	Project.findOne({_id:req.params.id}).exec(function(err, projects) {
		res.send(projects);
	});
}

exports.viewProjectDetails = function(req, res){
	Project.findOne({_id:req.params.id}).exec(function(err, projects) {
		res.send(projects);
	});
}

exports.getProjectsByUserId = function(req, res) {
	 Project.find({'project_owner.owner_id': req.params.id}, function(err, project) {
	 	res.send(project)
	 });
}

exports.updateProject = function(req, res) {
	Project.find({'project._id' : req.params.id}, function(err, project) {
		res.send(project);
	});
}

exports.removeProject = function(req, res, next){
	Project.findById(req.params.id, function(err, project) {
		project.remove(function(err, project) {
			res.send(project);
		})
	});
}
