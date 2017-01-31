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
	app.get('/api/removeWildLife/:id', wildlife.removeWildlife);
	app.post('/api/addWildlife', wildlife.addWildlife);
	app.put('/api/updateWildlife/:id', wildlife.updateWildlife);


	app.get('/api/projects', projects.getProjects);
	app.get('/api/getProject/:id', projects.getProject);
	app.get('/api/getProjectTasks/:id', projects.getProjectTasks);
	app.get('/api/projectDetails/:name', projects.viewProjectDetails);
	app.get('/api/projectsByUser/:id', projects.getProjectsByUserId);
	app.get('/api/projectsByGroup/:group', projects.getProjectsByGroup);
	app.put('/api/updateProject/:id', projects.updateProject);
	app.put('/api/projects/:id', projects.updateTotalContributions);
	app.post('/api/createProject', projects.createProject);
	app.post('/api/addGroupToProject', projects.addGroupToProject);
	app.post('/api/removeProject/:id', projects.removeProject);
	app.post('/api/makePayment/:token/:amount/:project', projects.makePayment);

	app.get('/api/groups', groups.getGroups);
	app.get('/api/groupById/:id', groups.getGroupById);
	app.get('/api/groupByName/:name', groups.getGroupByName);
	app.get('/api/groupsByUser/:username', groups.getGroupsByUser);
	app.get('/api/findActiveMembers/:project', groups.findActiveMembers);
	app.post('/api/createGroup', groups.createGroup);
	app.post('/api/addUserToGroup', groups.addUser);
	app.post('/api/removeGroup/:id', groups.removeGroup);
	app.post('/api/removeUserFromGroup/:groupname/:username', groups.removeUserFromGroup);
	app.put('/api/updateUserStatus/:data', groups.updateUserStatus);

	app.get('/api/tasks', tasks.getTasks);
	app.post('/api/addTaskToProject', projects.addTaskToProject);

	app.get('/api/chat', chat.getChatLogs);

	app.get('/api/comments', comments.getComments);

	app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
	app.get('/api/users', auth.requiresRole('owner'), users.getUsers);
	app.get('/api/findUser/:username', users.findUserByUsername);
	app.post('/api/users', users.createUser);
	app.post('/api/users/:id', auth.requiresRole('admin'), users.removeUser);
	app.put('/api/users', users.updateUser);
	app.put('/api/updateUserGroupRole/:data', users.updateUserGroupRole);

	app.get('/api/mail', mail.getMail);
	app.post('/api/sendInvite', mail.sendInvitationEmail);
	app.post('/api/sendEnquiry', mail.sendEnquiry);
	app.post('/api/sendMessage', mail.sendMessage);

	//app.post('/api/mailAttachments', files.mailUploads);
	app.post('/api/groupFileUploads', files.groupFiles);
	app.post('/api/taskFileUploads', files.taskFiles);
	app.post('/api/projectFileUploads/:folderName', files.projectFiles);
	app.get('/api/getProjectFiles/:topLevel/:secondaryLevel/:filename', files.getProjectFiles);

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
	//change to app.get('*', function(req, res)... ) on server
	app.get('/', function(req, res) {

		res.render('index', {
			bootstrappedUser: req.user
		});
	});

}
