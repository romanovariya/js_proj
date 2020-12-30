const path = require('path');

module.exports = {
	entry: './src/index.js', // точка входа
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, './dist') //куда собираем наш проект
	},
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/env']
					},
				},
				exclude: /node-modules/,
			}
		]
	}
};
