var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	encrypt = require('../utilities/encryption');

exports.getUsers = function(req, res){
	User.find({}).exec(function(err, collection){
		res.send(collection);
	})
};

exports.createUser = function(req, res, next){
	var userData = req.body;
	var project = userData.project;
	var group = userData.group;
	var role = userData.role;


	userData.username = userData.username.toLowerCase();
	userData.salt = encrypt.createSalt();
	userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);

	var saveUser = User.create ({
		"firstname" : req.body.firstname,
		"lastname": req.body.lastname,
		"username": req.body.username,
		"salt": userData.salt,
		"hashed_pwd": userData.hashed_pwd,
		"siteRole" : [],
		"projectGroupRole":[{
			"project": project,
			"group": group,
			"role" : role
		}]
	}, 
	function(err, user){
		if(err){
			if(err.toString().indexOf('E11000') > -1){
				err = new Error('Duplicate username');
			}
			res.status(400);
			return res.send({reason:err.toString()});
		}
		req.logIn(user, function(err){
			if(err) {return next(err);}
			res.send(user);
		})
 	
	});
};

exports.updateUserGroupRole = function(req, res) {
	console.log(req.data);
}


exports.updateUser = function(req, res){
	var userUpdates = req.body;

	if(req.user.id != userUpdates._id && !req.user.hasRole('admin')){
		res.status(403);
		return res.end();
	}

	req.user.firstname = userUpdates.firstname;
	req.user.lastname = userUpdates.lastname;
	req.user.username = userUpdates.username;
	req.user.email = userUpdates.email;
	if(userUpdates.password && userUpdates.password.length > 0){
		req.user.salt = encrypt.createSalt();
		req.user.hashed_pwd = encrypt.hashPwd(req.user.salt, userUpdates.password);
	}
	req.user.save(function(err){
		if(err) { res.status(400); return res.send({reason:err.toString()})}
		res.send(req.user);
	});
};

exports.findUserByUsername = function(req, res) {
	
	User.findOne({username: req.params.username}).exec(function(err, user) {
		if(err) console.log('There was an error.');
		if(!user) {
			res.send('No user found.');
		} else {
			res.send(user);
		}
	});

}

exports.removeUser = function(req, res) {
	console.log(req.params.id);
}


