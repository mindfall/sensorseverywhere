var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GroupSchema = new Schema({
	owner: String,
	groupName: String,
	groupProject: String,
	groupDescription: String
}, {strict: 'true'});

var Group = mongoose.model('Group', GroupSchema);


function createDefaultGroups(){

	Group.find({}).exec(function(err, collection){
		
		Group.create({owner: '53735bea630453b24dc3adcd', groupName: 'and appendages', groupProject: 'Yo yos go up and down', groupDescription: 'Description One'});
		Group.create({owner: '53735bea630453b24dc3adcd', groupName: 'you and you and you', groupProject: 'Stringy', groupDescription: 'Description Two'});
		Group.create({owner: '53735bea630453b24dc3adcd', groupName: 'sour grapes', groupProject: 'Minty', groupDescription: 'Description Three'});
		Group.create({owner: '53735bea630453b24dc3adcd', groupName: 'me me me', groupProject: 'Thingy', groupDescription: 'Description Four'});
	})
}


exports.createDefaultGroups = createDefaultGroups;

