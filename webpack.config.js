const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const outputDir = path.join(__dirname, "build");
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
	entry: path.join(__dirname, 'src/main.js'),
	output: {
		path: outputDir,
		filename: 'static/js/[name].bundle.[hash:8].js',
	},
	mode: isProduction ? "production" : "development",
	module: {
		rules: [
			{
				oneOf: [
					{
						test: /\.template\.html$/,
						use: "raw-loader",
					},
					{
						test: /\.(js|jsx|mjs)$/,
						exclude: /node_modules/,
						use: {
							loader: 'babel-loader',
							options: {
								cacheDirectory: !isProduction,
								cacheCompression: true,
							}
						}
					},
					{
						test: /\.css$/,
						use: [
							!isProduction && 'style-loader',
							isProduction && {
								loader: MiniCssExtractPlugin.loader,
								options: {
									esModule: true,
								},
							},
							'css-loader',
							{
								loader: 'sass-loader',
								options: {
									implementation: require('sass'),
									sassOptions: {
										fiber: true,
									},
								},
							},
						].filter(Boolean),
					},
					{
						test: /\.(png|svg|jpg|gif)$/,
						use: {
							loader: 'file-loader',
							options: {
								name: 'static/img/[name].[hash:8].[ext]',
							},
						},

					},
					{
						test: /\.(woff|woff2|eot|ttf|otf)$/,
						use: {
							loader: 'file-loader',
							options: {
								name: 'static/font/[name].[hash:8].[ext]',
							},
						},
					},
					// catch everything else, any loader place above this
					{
						exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/],
						use: {
							loader: 'file-loader',
							options: {
								name: 'static/other/[name].[hash:8].[ext]',
							},
						},
					},
				]
			}
		]
	},
	plugins: [
		isProduction && new CleanWebpackPlugin(),
		isProduction && new MiniCssExtractPlugin({
			filename: 'static/css/[name].[hash:8].css',
			chunkFilename: 'static/css/[id].[hash:8].css',
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "public/index.html"),
		}),

	].filter(Boolean),
	stats: {
		assets: true,
		cached: false,
		children: false,
		chunks: false,
		chunkModules: false,
		colors: true,
		hash: true,
		modules: false,
		reasons: false,
		source: false,
		timings: true,
		version: false,
		entrypoints: false,
	},
	devServer: {
		contentBase: outputDir,
		compress: true,
		port: 9000
	}
}