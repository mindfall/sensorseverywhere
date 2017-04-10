var webpack = require('webpack'),
	path = require('path')

module.exports = {
	context: __dirname  + '/public/app',
	entry: './app.js',
	output: {
		path: __dirname + '/public/build',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{  test: /\.styl$/,
    			loader: 'css-loader!stylus-loader?paths=node_modules/bootstrap-stylus/stylus/'
    		},
    		{ 
		        test: /\.(pug|jade)$/, 
		        loader: 'pug-html-loader' 
		    }

		]
	},
	devServer: {
		publicPath: "/",
		contentBase: __dirname + '/public/build',
		filename: 'bundle.js'
	}
};