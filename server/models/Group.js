var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GroupSchema = new Schema({
	name: String,
	creation_date: Date,
	members: [{
		user_id: {type: Number, unique: true, required: true}
	}],
	project_id: {type: Number, required: true }
});

var Group = mongoose.model('Group', GroupSchema);