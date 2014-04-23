var mongoose = require('mongoose'),
	encrypt = require('../utilities/encryption');



var userSchema = mongoose.Schema({
	firstname: {type: String, unique: true }, 
	lastname: {type: String, unique: true },
	username: {type: String, required: true, unique: true, index: true }, 
	salt: String, 
	hashed_pwd: String,
	roles: [String],
	/*has_projects: [{
		project_id: {type: Number},
		status: Boolean,
		funded: Boolean
	}],
	contributes_to: [{
        project_id: {type: Number},
        contribution_amount: {type: Number}
    }],
    total_contributions: {type: Number}*/

},{strict: true});
userSchema.methods = {
	authenticate: function(passwordToMatch){
		return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
	},
	hasRole: function(role){
		return this.roles.indexOf(role) > -1;
	}
}

var User = mongoose.model('User', userSchema);

function createDefaultUsers(){

	User.find({}).exec(function(err, collection){
		if(collection.length === 0){
			var salt, hash;
			salt = encrypt.createSalt();
			hash = encrypt.hashPwd(salt, 'joe');
			User.create({firstname: 'Joe', lastname: 'Eames', username: 'joe', salt: salt, hashed_pwd: hash, roles: ['admin']});
			salt = encrypt.createSalt();
			hash = encrypt.hashPwd(salt, 'wade');
			User.create({firstname: 'wade', lastname: 'Mansell', username: 'wade', salt: salt, hashed_pwd: hash, roles: ['owner']});
			salt = encrypt.createSalt();
			hash = encrypt.hashPwd(salt, 'soph');
			User.create({firstname: 'Soph', lastname: 'Buttner', username: 'soph', salt: salt, hashed_pwd: hash, roles: ['contributor']});
		}
	})
}

exports.createDefaultUsers = createDefaultUsers;