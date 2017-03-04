var express = require('express'),
	session = require('express-session'),
	stylus = require('stylus'),
	passport = require('passport');

module.exports = function(app, config) {

	function compile(str, path){
		return stylus(str).set('filename', path);
	}

	app.configure(function(){
		app.set('views', config.rootPath + '/server/views');
		app.set('view engine', 'jade');
		app.set('view options', { pretty: false });
		app.use(express.logger('dev'));
		app.use(express.cookieParser());
		app.use(express.bodyParser());
		app.use(express.multipart());
		app.use(express.session({
									secret: 'you are on wild fire',
									resave: true,
									saveUninitialized: true
								}));
		app.use(passport.initialize());
		app.use(passport.session());
		app.use(stylus.middleware(
			{
				src: config.rootPath + '/public',
				compile: compile
			}
		));
		//location of client side files
		app.use(express.static(config.rootPath + '/public'));
	});

}