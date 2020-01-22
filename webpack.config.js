const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const outputDir = path.join(__dirname, "build");
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
	entry: path.join(__dirname, "src/main.js"),
	output: {
		path: outputDir,
		filename: "static/js/[name].bundle.[hash:8].js",
	},
	mode: isProduction ? "production" : "development",
	devtool: isProduction ? "source-map" : false,
	optimization: {
		minimize: isProduction,
		minimizer: [
			new TerserJSPlugin({
				cache: true,
				parallel: true,
				sourceMap: true,
				extractComments: false,
				terserOptions: {
					parse: {
						// We want terser to parse ecma 8 code. However, we don't want it
						// to apply any minification steps that turns valid ecma 5 code
						// into invalid ecma 5 code. This is why the 'compress' and 'output'
						// sections only apply transformations that are ecma 5 safe
						// https://github.com/facebook/create-react-app/pull/4234
						ecma: 8,
					},
					compress: {
						ecma: 5,
						warnings: false,
						// Disabled because of an issue with Uglify breaking seemingly valid code:
						// https://github.com/facebook/create-react-app/issues/2376
						// Pending further investigation:
						// https://github.com/mishoo/UglifyJS2/issues/2011
						comparisons: false,
						// Disabled because of an issue with Terser breaking valid code:
						// https://github.com/facebook/create-react-app/issues/5250
						// Pending further investigation:
						// https://github.com/terser-js/terser/issues/120
						inline: 2,
					},
					mangle: {
						safari10: true,
					},
					// Added for profiling in devtools
					output: {
						ecma: 5,
						comments: false,
						// Turned on because emoji and regex is not minified properly using default
						// https://github.com/facebook/create-react-app/issues/2488
						ascii_only: true,
					},
				},
			}),
			new OptimizeCSSAssetsPlugin({}),
		],
	},
	resolve: {
		modules: [path.resolve(__dirname, "src"), "node_modules"],
	},
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
							loader: "babel-loader",
							options: {
								cacheDirectory: !isProduction,
								cacheCompression: true,
								compact: isProduction,
							},
						},
					},
					{
						test: /\.(s)css$/,
						use: [
							!isProduction && "style-loader",
							isProduction && {
								loader: MiniCssExtractPlugin.loader,
								options: {
									esModule: true,
								},
							},
							"css-loader",
							"sass-loader",
						].filter(Boolean),
					},
					{
						test: /\.(png|svg|jpg|gif)$/,
						use: {
							loader: "file-loader",
							options: {
								name: "static/img/[name].[hash:8].[ext]",
							},
						},

					},
					{
						test: /\.(woff|woff2|eot|ttf|otf)$/,
						use: {
							loader: "file-loader",
							options: {
								name: "static/font/[name].[hash:8].[ext]",
							},
						},
					},
					// catch everything else, any loader place above this
					{
						exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/],
						use: {
							loader: "file-loader",
							options: {
								name: "static/other/[name].[hash:8].[ext]",
							},
						},
					},
				],
			},
		],
	},
	plugins: [
		isProduction && new CleanWebpackPlugin(),
		isProduction && new MiniCssExtractPlugin({
			filename: "static/css/[name].[hash:8].css",
			chunkFilename: "static/css/[id].[hash:8].css",
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
		port: 9000,
	},
};