var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ChatSchema = new Schema({
	message: String,
	message_date: Date,
	group_id: {type: Number, unique: true, required: true}
});

var Chat = mongoose.model('Chat', ChatSchema);