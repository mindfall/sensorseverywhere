	var fs = require('fs');

exports.groupFiles = function(req, res){
	console.log('server side');
	var imageName = JSON.stringify(req.files.groupImage.name);
	var imageSize = JSON.stringify(req.files.groupImage.size);
	console.log(JSON.stringify(req.files.groupImage.path));

	//res.send(imageName + ' ' + imageSize);

	var serverPath = '/uploads/group-images/' + req.files.groupImage.name;

	 fs.rename(
	 	req.files.groupImage.path,
	 	'/home/miriad/codes/wildfire/server/' + serverPath,
	 	function(error) {
	 		if(error) {
	 			res.send({
	 				error: 'Whoops, something is not quite right.'
	 			});
	 			return;
	 		}

	 		res.send({
	 			name: imageName
	 		});
	 	}
	 );
};

exports.getGroupImages = function(req, res) {
	//console.log(__dirname + '/../uploads/group-images/');
	var path = __dirname + '/../uploads/group-images/';
	var file = 'monash.png';

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
	})
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


}