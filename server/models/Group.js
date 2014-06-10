var mongoose = require('mongoose');

var GroupSchema = mongoose.Schema({
	owner: String,
	groupName: String,
	groupProject: String,
	groupDescription: String,
	groupMembers: [{
		email: String,
		username: String,
		status: String
	}],
	filename: String
}, {strict: 'true'});

var Group = mongoose.model('Group', GroupSchema);


function createDefaultGroups(){
	Group.find({}).exec(function(err, collection){
		
		Group.create({_id: 'groupOne', owner: 'wade', groupName: 'One', groupProject: 'Yo yos go up and down', groupDescription: 'Description One', groupMembers: {email: 'wade@wade.com', username: 'wade', staus: 'active'}, filename: 'about.svg'});
		Group.create({_id: 'groupTwo', owner: 'wade', groupName: 'Two', groupProject: 'Stringy', groupDescription: 'Description Two'});
		Group.create({_id: 'groupThree', owner: 'wade', groupName: 'Three', groupProject: 'Minty', groupDescription: 'Description Three'});
		Group.create({_id: 'groupFour', owner: 'wade', groupName: 'Four', groupProject: 'Thingy', groupDescription: 'Description Four'});
	}, function() {
		console.log('Groups created.');
	});

}

exports.createDefaultGroups = createDefaultGroups;

