const path = require('path');
const { VueSSRServerPlugin } = require('vue-ssr-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    watch: process.env.NODE_ENV === 'development',
    target: 'node',
    entry: path.join(__dirname, '../client/entry-server.js'),
    output: {
        filename: 'bundle.js',
        publicPath: '/',
        path: path.join(__dirname, '../server/client'),
        libraryTarget: 'commonjs2'
    },
    resolve: {
        alias: {
            'request-api': './request-api-server.js',
            'vue-masonry': './ignore-plugin.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS: true
                }
            },
            {
                test: /\.css$/,
                loader: 'ignore-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'ignore-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'ignore-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new VueSSRServerPlugin({
            filename: 'bundle.json'
        }),
        new ExtractTextPlugin({
            filename: '_'
        })
    ],
    externals: Object.keys(require('../package.json').dependencies)
};
