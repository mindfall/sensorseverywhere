var	mongoose = require('mongoose'), 
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = mongoose.model('User');

module.exports = function(){

	passport.use(new LocalStrategy(
		function(username, password, done){
			console.log(username);
			User.findOne({username:username}).exec(function(err, user){
				if(user && user.authenticate(password)){
					console.log('found');
					return done(null, user);
				} else {
					return done(null, false);
				}
			})
		}
	));

	/*app.use(function(req, res, next){
		console.log(req.user);
		next();
	});*/

	passport.serializeUser(function(user, done) {
		if(user){
			done(null, user.id);
		}
	});

	passport.deserializeUser(function(id, done){
		User.findOne({_id:id}).exec(function(err, user){
			if(user){
				return done(null, user);
			} else {
				return done(null, false);
			}
		})
	})

}