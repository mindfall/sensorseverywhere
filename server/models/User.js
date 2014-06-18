var mongoose = require('mongoose'),
	encrypt = require('../utilities/encryption');

var UserSchema = mongoose.Schema({
	firstname: {type: String, unique: true }, 
	lastname: {type: String, unique: true },
	username: {type: String, required: true, unique: true }, 
	salt: String, 
	hashed_pwd: String,
	siteRole: [String],
	projectGroupRole: [{
		project: String,
		group: String,
		role: String
	}]

},{strict: true});

UserSchema.methods = {
	authenticate: function(passwordToMatch){
		return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
	},
	hasRole: function(role){
		return this.siteRole.indexOf(role) > -1;
	}
}

var User = mongoose.model('User', UserSchema);


function createDefaultUsers(){

	User.find({}).exec(function(err, collection){
		if(collection.length === 0){
			var salt, hash;
			salt = encrypt.createSalt();
			hash = encrypt.hashPwd(salt, 'joe');
			User.create({firstname: 'Joe', lastname: 'Eames', username: 'joe', salt: salt, hashed_pwd: hash});
			salt = encrypt.createSalt();
			hash = encrypt.hashPwd(salt, 'wade');
			User.create({firstname: 'wade', lastname: 'Mansell', username: 'wade', salt: salt, hashed_pwd: hash, siteRole: ['admin']});
			salt = encrypt.createSalt();
			hash = encrypt.hashPwd(salt, 'soph');
			User.create({firstname: 'Soph', lastname: 'Buttner', username: 'soph', salt: salt, hashed_pwd: hash});
		}
	});

}

exports.createDefaultUsers = createDefaultUsers;