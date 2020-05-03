var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'development',
    context: __dirname,
    entry: [
        'webpack-dev-server/client?http://localhost:3000/',
        'webpack/hot/only-dev-server',
        './src/index', // entry point of our app. index.js should require other js modules and dependencies it needs
    ],
    output: {
        path: path.resolve('./'),
        filename: '[name]-[hash].js',
        publicPath: 'http://localhost:3000/frontend/',
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(), // don't reload if there is an error
        new BundleTracker({ filename: './webpack-stats.json' }),
        new HtmlWebpackPlugin({
            favicon: "./static/images/favicon.svg",
        }),
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: ['react-hot-loader/webpack', 'babel-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(jpg|png|svg)$/,
                use: {
                    loader: 'url-loader',
                },
            },
        ],
    },
};