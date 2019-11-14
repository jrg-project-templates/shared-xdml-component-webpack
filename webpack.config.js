const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const DESTINATION = path.resolve(__dirname, 'dist')
const pkg = require('./package.json')
const ROOT = path.resolve(__dirname, 'src')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
	context: ROOT,
	entry: {
		[pkg.name]: './main.js'
	},
	output: {
		library: ['xdmlShared', pkg.name],
		libraryTarget: 'umd',
		filename: `[name]-${pkg.version}.js`,
		path: DESTINATION
	},
	resolve: {
		alias: {
			svelte: path.resolve('node_modules', 'svelte')
		},
		extensions: ['.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main'],
		modules: [
			ROOT,
			'node_modules'
		]
	},
	module: {
		rules: [
			{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						emitCss: true,
						hotReload: true,
						preprocess: require('svelte-preprocess')({
							scss: true,
							postcss: {
								plugins: [require('autoprefixer')({ browsers: 'last 2 versions' })],
							}
						})
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					/**
					 * MiniCssExtractPlugin doesn't support HMR.
					 * For developing, use 'style-loader' instead.
					 * */
					prod ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader'
				]
			}
		]
	},
	mode,
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new CleanWebpackPlugin()
	],
	devtool: prod ? false: 'source-map'
};
