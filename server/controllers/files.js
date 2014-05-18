exports.groupFiles = function(req, res){

	var imageName = JSON.stringify(req.files.groupImage.name);
	var imageSize = JSON.stringify(req.files.groupImage.size);
	//console.log(JSON.stringify(req.files.groupImage.path));

	//res.send(imageName + ' ' + imageSize);

	var serverPath = '/uploads/group-images/' + req.files.groupImage.name;

	 require('fs').rename(
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
	console.log(req.files);
}