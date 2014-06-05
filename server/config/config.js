var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		db: 'mongodb://localhost/wildFire',
		rootPath: rootPath,
		port: process.env.PORT || 3033
	}
	/*production: {
		db: 'mongodb://miriad:multivision@ds061558.mongolab.com:61558/multivision',
		rootPath: rootPath,
		port: process.env.PORT || 80
	}*/
}