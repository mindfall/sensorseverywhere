var auth = require('./auth'),
	users = require('../controllers/users'),
	files = require('../controllers/files'),
	wildlife = require('../controllers/wildlife'),
	projects = require('../controllers/projects'),
	groups = require('../controllers/groups'),
	tasks = require('../controllers/tasks'),
	chat = require('../controllers/chat'),
	comments = require('../controllers/comments'),
	mail = require('../controllers/mail'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Wildlife = mongoose.model('Wildlife'),
	Project = mongoose.model('Project');

module.exports = function(app){

	app.get('/api/wildlife', wildlife.getWildlife);

	app.get('/api/projects', projects.getProjects);
	app.get('/api/projects/:id', projects.getProjectById);
	app.get('/api/projectsByUser/:id', projects.getProjectsByUserId);
	app.put('/api/projects/edit/:id', projects.updateProject);
	app.put('/api/projects/:id', projects.updateTotalContributions);
	app.post('/api/createProject', projects.createProject);
	app.post('/api/removeProject/:id', projects.removeProject);

	app.get('/api/groups', groups.getGroups);
	app.post('/api/createGroup', groups.createGroup);
	app.post('/api/removeGroup/:id', groups.removeGroup);
	app.post('/api/removeUserFromGroup/:gid/:uid', groups.removeUserFromGroup);

	app.get('/api/tasks', tasks.getTasks);

	app.get('/api/chat', chat.getChatLogs);

	app.get('/api/comments', comments.getComments);

	app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
	app.get('/api/users', auth.requiresRole('owner'), users.getUsers);
	app.post('/api/users', users.createUser);
	app.post('/api/users/:id', auth.requiresRole('admin'), users.removeUser);
	app.put('/api/users/:id', users.updateUser);

	app.get('/api/mail', mail.getMail);
	app.post('/api/sendInvite', mail.sendInvitationEmail);
	
	//app.post('/api/uploads', mail.upload);
	app.post('/api/uploads', files.groupFiles);
	app.get('/api/groupImages/:name', files.getGroupImages);

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
