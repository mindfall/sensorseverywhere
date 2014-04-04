var auth = require('./auth'),
	users = require('../controllers/users'),
	wildlife = require('../controllers/wildlife'),
	projects = require('../controllers/projects'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Wildlife = mongoose.model('Wildlife'),
	Project = mongoose.model('Project');



module.exports = function(app){

	app.get('/api/wildlife', wildlife.getWildlife);
	app.get('/api/projects', projects.getProjects);
	app.get('/api/projects/:id', projects.getProjectById);
	app.put('/api/projects/:id', projects.updateTotalContributions);
	app.get('/api/users', auth.requiresRole('admin'), users.getUsers);

	app.post('/api/users', users.createUser);
	app.put('/api/users', users.updateUser);
	app.post('/api/createProject', projects.createProject);

	app.get('/partials/*', function(req, res) {
		res.render('../../public/app/' + req.params);
	});

	app.post('/login', auth.authenticate);

	app.post('/logout', function(req, res) {
		req.logout();
		res.end();
	});

	app.all('/api/*', function(req, res) {
		res.send(404);
	})

	//set to all so that any unspecified views will default to index
	//this is designed for client side routing
	app.get('*', function(req, res) {
		res.render('index', {
			bootstrappedUser: req.user
		});
	});

}
