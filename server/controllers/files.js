var fs = require('fs');
var util = require('util');
var mime = require('mime'); 
var path = require('path');
var mkdirp = require('mkdirp');
var group = require('../controllers/groups');

var imageName = null;

exports.groupFiles = function(req, res){

	imageName = req.files.file.name;
	var filePath = req.files.file.path;
	var serverPath = '/uploads/group/' + req.files.file.name;
	moveImage(imageName, filePath, serverPath);

	res.send({
	 	name: imageName
	 });

};

exports.getImageName = function() {
	return imageName;
}



exports.taskFiles = function(req, res){

	var imageName = req.files.file.name;
	var filePath = req.files.file.path;
	var serverPath = '/uploads/task/' + req.files.file.name;

	moveImage(imageName, filePath, serverPath);

	res.send({
	 	name: imageName
	 });
};

exports.projectFiles = function(req, res){

	var projectFolderPath = '/home/miriad/codes/wildfire/server/uploads/project/' + req.params.folderName;
	var groupFolderPath = '/home/miriad/codes/wildfire/server/uploads/project/' + req.params.folderName + '/group';
	var taskFolderPath = '/home/miriad/codes/wildfire/server/uploads/project/' + req.params.folderName + '/task';
	mkdirp(projectFolderPath, function(err) {
		if(err) console.error(err)
		else {
			mkdirp(groupFolderPath, function(err) {
				if(err) console.log(err);
				else console.log('Group Folder created.');
			})
			mkdirp(taskFolderPath, function(err) {
				if(err) console.log(err);
				else console.log('Task folder created.');
			})
			console.log('Success' + projectFolderPath);
		}
	});
	var serverPath = projectFolderPath + '/' + req.files.file.name;

	var imageName = req.files.file.name;
	var filePath = req.files.file.path;

	moveImage(imageName, filePath, serverPath);

	res.send({
	 	name: imageName
	 });

};

function moveImage(imageName, filePath, serverPath) {
	fs.rename(
	 	filePath,
	 	serverPath,
	 	function(error) {
	 		if(error) {
	 			console.log("ERROR: " + error);
	 			return;
	 		} else {
	 			return imageName;
	 		}
	 	}
	 );
}


exports.getProjectFiles = function(req, res) {

	var topLevel = req.params.topLevel;
	var secondaryLevel = req.params.secondaryLevel;
	var filename = req.params.filename;
	console.log('Req.params.filename is: ' + filename);

	var path = __dirname + '/../uploads/' + topLevel + '/' + secondaryLevel + '/' + filename;
	var file = '';
	if(filename !== null ) {

		console.log('The file name is: ' + filename);
	} else {

		file = 'not_available.png';
	}

	var filepath = path;
	console.log(filepath);
	fs.exists(path, function(exists) {
		if(exists) {
			fs.readFile(path, function(err, contents) {
				if(!err) {
					res.writeHead(200, {
						"Content-type": "image/png",
						"Content-length": contents.length
					});
					contents = contents.toString("base64");
					util.format("data:%s;base64,%s", mime.lookup(contents), contents);
					res.end(contents);
				} else {
					console.log('contents: ' + contents);		
				};
			});
		} else {
			fs.readFile(__dirname + '/../views/page404.jade', function(err, contents) {
				if(!err) {
					res.writeHead(404, {'Content-Type': 'text/html'});
					//res.render(__dirname + '/../views/page404.jade');
					res.end(contents);
				} else {
					console.dir(err);
				}
			});
		}
	});

}



/*

	var walk    = require('walk');
var files   = [];

// Walker options
var walker  = walk.walk('./test', { followLinks: false });

walker.on('file', function(root, stat, next) {
    // Add this file to the list of files
    files.push(root + '/' + stat.name);
    next();
});

walker.on('end', function() {
    console.log(files);
});*/