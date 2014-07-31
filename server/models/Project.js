/*
	If you get the following error:
	OverwriteModelError: Cannot overwrite `Animal` model once compiled.
	check to see that there is no animal.js~ file in the models dir
	or any other files that may contain the same schema.
*/

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  //  id: Number,
    project_name:{ type: String, unique: true},
    project_group: String,
    project_owner: {
            owner_id: {type: String},
            owner_name: String
        //    owner_gravatar: String
    },
    project_wildlife: Array,
    project_monitors: Array,
    project_location_data: {
        
        project_coords: {
            layer_type: String,
            coordinates: Array,
        },
        area_acres: {type: Number},
        nearestTown: String,
        distance_to_town: {type: Number}
    },
    project_description: String,
    project_start_date: Date,
    project_end_date: Date,
    project_funding_required: Number,
    total_contributions: {type: Number},
    project_type: String,
    projectTasks: [{
        taskPriority: String,
        taskName: String,
        taskDescription: String,
        taskOwner: String,
        taskStatus: String
    }]
 //   project_image: String
}, {strict: 'true'});


var Project = mongoose.model('Project', ProjectSchema);



