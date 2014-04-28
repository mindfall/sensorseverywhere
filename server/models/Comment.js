var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
	comment: String,
	comment_date: Date,
	wildlife_id: {type: Number, unique: true, required: true},
	user_id: {type: Number, unique: true, required: true},
	group_id: {type: Number, unique: true, required: true},
	project_id: {type: Number, unique: true, required: true}

});

var Comment = mongoose.model('Comment', CommentSchema);