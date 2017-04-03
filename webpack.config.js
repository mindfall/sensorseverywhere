module.exports = {
	context: __dirname  + '/public/app',
	entry: './app.js',
	output: {
		path: __dirname + '/public/build',
		filename: 'bundle.js'
	}
};