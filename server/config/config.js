var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
console.log(rootPath);
module.exports = {
	development: {
		db: 'mongodb://localhost/wildFire',
		rootPath: rootPath,
		port: process.env.PORT || 3033
	},
	production: {
		db: 'mongodb://localhost/wildFire',
		rootPath: rootPath,
		port: process.env.PORT || 80
	}
}
