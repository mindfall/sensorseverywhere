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
	//console.log(projectData.user);
	var projectOwner = projectData.project_owner;
	var projectName = projectData.project_name;
	var projectDescription = projectData.project_description;
	var projectStartDate = req.body.project_start;
	var projectEndDate = req.body.project_end;
	var projectType = req.body.project_type;
	var projectFundingRequired = req.body.project_funding_required;

	var numberOfWildlife = req.body.project_wildlife.length;
	var wildlifeNames = [];

	var geopointsLength = req.body.project_location.geometry.coordinates[0].length;
	var projectLocationPoints = [];

	var numberOfMonitors = req.body.project_monitors;

	for(var i = 0; i < numberOfWildlife; i++){
		wildlifeNames.push(req.body.project_wildlife[i].name);
	}
	
	for(var i = 0; i < geopointsLength; i++){
		projectLocationPoints.push(req.body.project_location.geometry.coordinates[0][i][0], req.body.project_location.geometry.coordinates[0][i][1])
	}
	
	var saveProject = Project.create ({

		    //id: Number,
		    "project_name": projectName,
		    "project_owner": [{
		        	"owner_id": {type: projectOwner},
		            "owner_name": "Wade"
		         //   owner_gravatar: String
		    }],
		    "project_wildlife": {
		        "name": wildlifeNames
		    },
		    
		    "project_geopoints": [{
		    	"points": {type: projectLocationPoints}
		    }],
		    "project_description": projectDescription,
	        "project_start_date": projectStartDate,
	        "project_end_date": projectEndDate,
	        "project_funding_required": projectFundingRequired,
	        "total_contributions":0,
	        "project_image":"/project_thumbs/1.jpg"
	}, 
	function(){
	 	res.send(saveProject);
	});

/*		    
		project_contributors: {
	        contributor_name: String,
	        contribution_type: String,
	        contribution_amount: Number, 
	        contributor_gravatar: String
		}
*/
};

exports.updateTotalContributions = function(req, res){
	var contributionAmount = req.body.amount;
	var addAmount = parseInt(contributionAmount);
	console.log('Thie amount is: ' + contributionAmount);
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
	Project.findOne({_id:req.params.id}).exec(function(err, project) {
		res.send(project);
	});
}

exports.removeProject = function(req, res, next){
	console.log(req);
}
