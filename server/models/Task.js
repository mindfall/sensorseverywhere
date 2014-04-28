var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TaskSchema = new Schema({
	name: String,
	description: String,
	created_date: Date,
	complete_date: Date,
	creator: {
		user_id: {type: Number, unique: true, required: true}
	},
	project_id: {type: Number, required: true},
	priority: {type: Number},
	status: String,
	files: [{
		name: String,
		type: String
	}]
});

var Task = mongoose.model('Task', TaskSchema);