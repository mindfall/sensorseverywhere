var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GroupSchema = new Schema({
	name: String,
	members: String,
	project_name: String
}, {strict: 'true'});

var Group = mongoose.model('Group', GroupSchema);


function createDefaultGroups(){

	Group.find({}).exec(function(err, collection){
		
		Group.create({name: 'Groupus mainus', members: 'and appendages', project_name: 'Yo yos go up and down'});
		Group.create({name: 'The ugliest soul in the west', members: 'you and you and you', project_name: 'Stringy'});
		Group.create({name: 'Groupus minorus', members: 'sour grapes', project_name: 'Minty'});
		Group.create({name: 'Space flight is for the rich', members: 'me me me', project_name: 'Thingy'});
	})
}


exports.createDefaultGroups = createDefaultGroups;

