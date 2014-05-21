var fs = require('fs');
var util = require('util');
var mime = require('mime');



exports.groupFiles = function(req, res){

	var imageName = req.files.file.name;
	var serverPath = '/uploads/group-files/' + req.files.file.name;
	console.log(imageName + '  '  + serverPath);
	moveImage(imageName, filePath, serverPath);

	res.send({
	 	name: imageName
	 });
};

exports.taskFiles = function(req, res){

	var imageName = req.files.file.name;
	console.log(3 + '   ' + imageName);
	var filePath = req.files.file.path;
	var serverPath = '/uploads/task-files/' + req.files.file.name;

	moveImage(imageName, filePath, serverPath);

	res.send({
	 	name: imageName
	 });
};

exports.projectFiles = function(req, res){

	var imageName = req.files.file.name;
	var serverPath = '/uploads/project-files/' + req.files.file.name;
	var filePath = req.files.file.path;

	moveImage(imageName, filePath, serverPath);

	res.send({
	 	name: imageName
	 });

};

function moveImage(imageName, filePath, serverPath) {
	console.log(1 + ' ' + imageName);
	fs.rename(
	 	filePath,
	 	'/home/miriad/codes/wildfire/server/' + serverPath,
	 	function(error) {
	 		if(error) {
	 			res.send({
	 				error: 'Whoops, something is not quite right.'
	 			});
	 			return;
	 		} else {
	 			console.log(2 + '  ' + imageName);
	 			return imageName;
	 		}
	 	}
	 );
}


exports.getGroupImages = function(req, res) {
//	var files = fs.readdirSync(dir);

	var path = __dirname + '/../uploads/group-images/';
	var file = req.params.name;

	var filepath = path + file;

	fs.exists(filepath, function(exists) {
		if(exists) {
			fs.readFile(filepath, function(err, contents) {
				if(!err) {
					res.writeHead(200, {
						"Content-type": "image/png",
						"Content-length": contents.length
					});
					//console.log(contents.length);
					contents = contents.toString("base64");
					util.format("data:%s;base64,%s", mime.lookup(contents), contents);
					//console.log(contents);
					res.end(contents);
				} else {
					console.log('contents: ' + contents);		
				};
			});
		} else {
			fs.readFile(page404, function(err, contents) {
				if(!err) {
					res.writeHead(404, {'Content-Type': 'text/html'});
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